// js/map.js
class GoogleMapIntegration {
    constructor() {
        this.map = null;
        this.marker = null;
        this.serviceArea = null;
        this.init();
    }

    async init() {
        await this.loadGoogleMaps();
        this.initMap();
        this.addServiceArea();
        this.addClickEvents();
    }

    loadGoogleMaps() {
        return new Promise((resolve, reject) => {
            if (window.google) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=geometry`;
            script.async = true;
            script.defer = true;
            
            window.initMap = () => resolve();
            script.onerror = reject;
            
            document.head.appendChild(script);
        });
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 24.7136, lng: 46.6753 },
            zoom: 11,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{ "weight": "2.00" }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [{ "visibility": "off" }]
                }
            ]
        });

        // إضافة علامة الموقع الرئيسي
        this.marker = new google.maps.Marker({
            position: { lat: 24.7136, lng: 46.6753 },
            map: this.map,
            title: 'معلم كهرباء منازل - بلال المخلافي',
            icon: {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzMCA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDNi43MTU3MyAwIDAgNi43MTU3MyAwIDE1QzAgMjUuNSAxNSA0MiAxNSA0MkMzMCA0MiA0NSAyNS41IDQ1IDE1QzQ1IDYuNzE1NzMgMzguMjg0MyAwIDMwIDBaIiBmaWxsPSIjMzQ5OGRiIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjciIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
                scaledSize: new google.maps.Size(30, 42),
                anchor: new google.maps.Point(15, 42)
            }
        });
    }

    addServiceArea() {
        // تحديد منطقة الخدمة (دائرة نصف قطرها 15 كم)
        this.serviceArea = new google.maps.Circle({
            strokeColor: '#3498db',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3498db',
            fillOpacity: 0.2,
            map: this.map,
            center: { lat: 24.7136, lng: 46.6753 },
            radius: 15000 // 15 كم
        });
    }

    addClickEvents() {
        // إضافة حدث النقر على الخريطة للتحقق من منطقة الخدمة
        this.map.addListener('click', (e) => {
            this.checkServiceAvailability(e.latLng);
        });
    }

    checkServiceAvailability(latLng) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(24.7136, 46.6753),
            latLng
        );

        const isInServiceArea = distance <= 15000;
        const message = isInServiceArea ? 
            '📍 نعم، أخدم هذه المنطقة!' : 
            '⚠️ هذه المنطقة خارج نطاق الخدمة، لكن يمكنني مساعدتك في استشارة';

        this.showServicePopup(latLng, message, isInServiceArea);
    }

    showServicePopup(position, message, isAvailable) {
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; text-align: center;">
                    <h4 style="margin: 0 0 10px 0; color: ${isAvailable ? '#27ae60' : '#e74c3c'}">
                        ${message}
                    </h4>
                    ${isAvailable ? 
                        '<button onclick="window.open(\'https://wa.me/966546788947?text=مرحبا، أريد خدمة كهربائية في هذه المنطقة\', \'_blank\')" style="background: #25D366; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">طلب خدمة</button>' : 
                        '<button onclick="window.open(\'https://wa.me/966546788947?text=أحتاج استشارة كهربائية\', \'_blank\')" style="background: #3498db; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">استشارة مجانية</button>'
                    }
                </div>
            `,
            position: position
        });

        infoWindow.open(this.map);
        setTimeout(() => infoWindow.close(), 5000);
    }
}

// التهيئة
document.addEventListener('DOMContentLoaded', () => {
    window.siteMap = new GoogleMapIntegration();
});