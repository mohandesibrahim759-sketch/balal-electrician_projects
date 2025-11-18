// js/booking.js
class BookingSystem {
    constructor() {
        this.bookings = this.loadBookings();
        this.init();
    }

    init() {
        this.initCalendar();
        this.initBookingForm();
        this.initTimeSlots();
    }

    initCalendar() {
        const calendarEl = document.getElementById('bookingCalendar');
        if (!calendarEl) return;

        // استخدام مكتبة خارجية مثل Flatpickr أو إنشاء تقويم مخصص
        flatpickr(calendarEl, {
            locale: 'ar',
            minDate: 'today',
            disable: [
                function(date) {
                    // تعطيل Fridays
                    return date.getDay() === 5;
                }
            ],
            onChange: (selectedDates) => {
                this.updateTimeSlots(selectedDates[0]);
            }
        });
    }

    initTimeSlots() {
        this.timeSlots = [
            '08:00', '09:00', '10:00', '11:00', 
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00'
        ];
    }

    updateTimeSlots(selectedDate) {
        const timeContainer = document.getElementById('timeSlots');
        if (!timeContainer) return;

        const bookedSlots = this.getBookedSlots(selectedDate);
        
        timeContainer.innerHTML = this.timeSlots.map(slot => `
            <div class="time-slot ${bookedSlots.includes(slot) ? 'booked' : 'available'}" 
                 onclick="${!bookedSlots.includes(slot) ? `bookingSystem.selectTime('${slot}')` : ''}">
                ${slot}
                ${bookedSlots.includes(slot) ? '<small>محجوز</small>' : ''}
            </div>
        `).join('');
    }

    getBookedSlots(date) {
        const dateStr = date.toISOString().split('T')[0];
        return this.bookings
            .filter(booking => booking.date === dateStr)
            .map(booking => booking.time);
    }

    selectTime(time) {
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        event.target.classList.add('selected');
        document.getElementById('selectedTime').value = time;
    }

    initBookingForm() {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.submitBooking(new FormData(form));
        });
    }

    async submitBooking(formData) {
        const booking = {
            id: Date.now(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time'),
            address: formData.get('address'),
            notes: formData.get('notes'),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // التحقق من التوفر
        if (this.isSlotBooked(booking.date, booking.time)) {
            this.showNotification('هذا الموعد محجوز مسبقاً، يرجى اختيار وقت آخر', 'error');
            return;
        }

        this.bookings.push(booking);
        this.saveBookings();

        // إرسال إشعار عبر واتساب
        await this.sendWhatsAppNotification(booking);

        this.showNotification('تم الحجز بنجاح! سنتواصل معك لتأكيد الموعد', 'success');
        document.getElementById('bookingForm').reset();
    }

    isSlotBooked(date, time) {
        return this.bookings.some(booking => 
            booking.date === date && booking.time === time
        );
    }

    async sendWhatsAppNotification(booking) {
        const message = `📅 حجز جديد:
👤 الاسم: ${booking.name}
📞 الجوال: ${booking.name}
🛠️ الخدمة: ${booking.service}
📅 التاريخ: ${booking.date}
⏰ الوقت: ${booking.time}
📍 العنوان: ${booking.address}
📝 ملاحظات: ${booking.notes || 'لا يوجد'}`;

        const url = `https://wa.me/966546788947?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    saveBookings() {
        localStorage.setItem('electrician_bookings', JSON.stringify(this.bookings));
    }

    loadBookings() {
        const saved = localStorage.getItem('electrician_bookings');
        return saved ? JSON.parse(saved) : [];
    }

    showNotification(message, type) {
        if (window.website) {
            window.website.showNotification(message, type);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.bookingSystem = new BookingSystem();
});