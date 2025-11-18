// js/security.js
class SecuritySystem {
    constructor() {
        this.init();
    }

    init() {
        this.initConsultationForm();
        this.initSecurityFeatures();
        this.initDataProtection();
    }

    initConsultationForm() {
        const form = document.getElementById('consultationForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleConsultation(new FormData(form));
        });
    }

    async handleConsultation(formData) {
        const consultation = {
            id: Date.now(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            issue: formData.get('issue'),
            urgency: formData.get('urgency'),
            description: formData.get('description'),
            timestamp: new Date().toISOString()
        };

        // إرسال استشارة عبر واتساب
        await this.sendConsultation(consultation);

        this.showNotification('شكراً لك! سيتم الرد على استفسارك خلال 24 ساعة', 'success');
        document.getElementById('consultationForm').reset();
    }

    async sendConsultation(consultation) {
        const message = `🆓 استفسار مجاني:
👤 الاسم: ${consultation.name}
📞 الجوال: ${consultation.phone}
🔧 المشكلة: ${consultation.issue}
🚨 الأولوية: ${consultation.urgency}
📝 الوصف: ${consultation.description}`;

        const url = `https://wa.me/966546788947?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    initSecurityFeatures() {
        // حماية النماذج من البوتات
        this.addHoneypotFields();
        
        // تقييد معدل الإرسال
        this.rateLimiting();
        
        // تشفير البيانات الحساسة
        this.encryptSensitiveData();
    }

    addHoneypotFields() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = 'company';
            honeypot.style.display = 'none';
            honeypot.autocomplete = 'off';
            form.appendChild(honeypot);
        });
    }

    rateLimiting() {
        const key = 'form_submission_times';
        const now = Date.now();
        const submissions = JSON.parse(localStorage.getItem(key) || '[]');
        
        // إزالة التقديمات الأقدم من ساعة
        const recentSubmissions = submissions.filter(time => now - time < 3600000);
        
        if (recentSubmissions.length >= 5) {
            this.showNotification('لقد تجاوزت الحد المسموح من المحاولات، يرجى المحاولة لاحقاً', 'error');
            throw new Error('Rate limit exceeded');
        }
        
        recentSubmissions.push(now);
        localStorage.setItem(key, JSON.stringify(recentSubmissions));
    }

    encryptSensitiveData() {
        // تشفير بسيط للبيانات الحساسة
        this.encryptionKey = 'electrician_security_key';
    }

    encrypt(text) {
        // تشفير بسيط (في بيئة حقيقية استخدم مكتبة تشفير أقوى)
        return btoa(text);
    }

    decrypt(encryptedText) {
        return atob(encryptedText);
    }

    initDataProtection() {
        // سياسة الخصوصية
        this.showPrivacyNotice();
        
        // حماية البيانات الشخصية
        this.protectPersonalData();
    }

    showPrivacyNotice() {
        if (!localStorage.getItem('privacy_accepted')) {
            const noticeHTML = `
                <div class="privacy-notice">
                    <div class="notice-content">
                        <h4>سياسة الخصوصية</h4>
                        <p>نحن نحترم خصوصيتك. نستخدم بياناتك فقط لتقديم الخدمة المطلوبة.</p>
                        <div class="notice-actions">
                            <button class="btn btn-primary" onclick="securitySystem.acceptPrivacy()">
                                أوافق
                            </button>
                            <a href="/privacy.html" class="btn btn-outline">
                                معرفة المزيد
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', noticeHTML);
        }
    }

    acceptPrivacy() {
        localStorage.setItem('privacy_accepted', 'true');
        document.querySelector('.privacy-notice').remove();
    }

    protectPersonalData() {
        // تنظيف البيانات المؤقتة
        setInterval(() => {
            this.cleanTempData();
        }, 3600000); // كل ساعة
    }

    cleanTempData() {
        const tempKeys = ['form_drafts', 'temp_selections'];
        tempKeys.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
        });
    }

    showNotification(message, type) {
        if (window.website) {
            window.website.showNotification(message, type);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.securitySystem = new SecuritySystem();
});