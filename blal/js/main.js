// 🚀 موقع معلم كهرباء منازل - JavaScript متكامل
// 📍 ملف واحد شامل لجميع الوظائف - بدون تكرار

class ElectricianWebsite {
    constructor() {
        this.currentPhone = "0546788947";
        this.currentWhatsapp = "966546788947";
        this.init();
    }

    // 📦 تهيئة الموقع
    init() {
        console.log('🚀 موقع معلم كهرباء - جاهز للتشغيل');
        
        this.initNavbar();
        this.initSmoothScroll();
        this.initAnimations();
        this.initContactForm();
        this.initGallery();
        this.initBlog();
        this.initServiceRequests();
        this.initWorkingHours();
        this.initFloatingButtons();
        this.initMap();
        this.initPerformance();
        this.initResponsiveFeatures();
        this.initFAQ();
    }

    // 📱 وظائف التجاوب في JavaScript
    initResponsiveFeatures() {
        this.handleResize();
        this.touchOptimizations();
    }

    // 🔄 التعامل مع تغيير حجم الشاشة
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateResponsiveElements();
            }, 250);
        });
    }

    // 📱 تحديث العناصر بناءً على حجم الشاشة
    updateResponsiveElements() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('no-hover');
        } else {
            document.body.classList.remove('no-hover');
        }
        
        this.updateHeaderState();
    }

    // 👆 تحسينات اللمس
    touchOptimizations() {
        const buttons = document.querySelectorAll('.btn, .nav-link, .service-card');
        buttons.forEach(btn => {
            btn.style.cursor = 'pointer';
        });
    }

    // 🎯 تحديث حالة الشريط العلوي
    updateHeaderState() {
        const header = document.querySelector('.header');
        if (window.innerWidth <= 768) {
            header.classList.add('mobile-header');
        } else {
            header.classList.remove('mobile-header');
        }
    }

    // 🎯 الشريط العلوي المتقدم
    initNavbar() {
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.nav-link');
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        // تأثير التمرير
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            this.highlightActiveSection();
        });

        // تفعيل القائمة المتنقلة
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
        }

        // إغلاق القائمة عند النقر على رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    }

    // 🎯 التمرير السلس
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 🎭 الأنيميشن المتقدمة
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .service-card, .gallery-item, .contact-method, .blog-card').forEach(el => {
            observer.observe(el);
        });

        this.animateNumbers();
    }

    // 🔢 أنيميشن الأرقام
    animateNumbers() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue('.stat-number');
                }
            });
        });

        numberObserver.observe(statsSection);
    }

    animateValue(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const text = element.textContent;
            const target = parseInt(text.replace('+', '').replace('%', ''));
            if (isNaN(target)) return;

            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current) + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
            }, 16);
        });
    }

    // ❓ الأسئلة الشائعة
    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // إغلاق جميع الإجابات الأخرى
                document.querySelectorAll('.faq-answer').forEach(item => {
                    if (item !== answer) {
                        item.classList.remove('active');
                    }
                });
                
                // تدوير الأيقونات الأخرى
                document.querySelectorAll('.faq-question i').forEach(item => {
                    if (item !== icon) {
                        item.style.transform = 'rotate(0deg)';
                    }
                });
                
                // تبديل الحالة الحالية
                answer.classList.toggle('active');
                icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        });
    }

    // 📧 نظام النماذج المتكامل
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (this.validateForm(contactForm)) {
                    await this.handleFormSubmission(contactForm);
                }
            });

            this.initRealTimeValidation(contactForm);
        }
    }

    // ✅ التحقق من النموذج
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'هذا الحقل مطلوب');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }

            if (input.type === 'tel' && input.value.trim()) {
                if (!this.validatePhone(input.value)) {
                    this.showFieldError(input, 'رقم الجوال غير صحيح');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // 📱 تحقق من رقم الجوال
    validatePhone(phone) {
        const phoneRegex = /^(05)([0-9]{8})$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // ⚡ التحقق في الوقت الحقيقي
    initRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    this.showFieldError(input, 'هذا الحقل مطلوب');
                } else {
                    this.clearFieldError(input);
                }
            });

            if (input.type === 'tel') {
                input.addEventListener('input', (e) => {
                    if (e.target.value && !this.validatePhone(e.target.value)) {
                        this.showFieldError(input, 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام');
                    } else {
                        this.clearFieldError(input);
                    }
                });
            }
        });
    }

    // ❌ عرض خطأ في الحقل
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    // 🗑️ مسح خطأ الحقل
    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // 📤 معالجة إرسال النموذج
    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري الإرسال...
        `;
        submitBtn.disabled = true;

        try {
            await this.sendFormData(formData);
            
            this.showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('خطأ في الإرسال:', error);
            this.showNotification('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // 📨 إرسال بيانات النموذج
    async sendFormData(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = Object.fromEntries(formData);
                console.log('📨 بيانات النموذج:', data);
                
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('فشل في الإرسال'));
                }
            }, 2000);
        });
    }

    // 🖼️ نظام المعرض المتكامل
    initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.addEventListener('click', () => {
                this.openLightbox(item);
            });
        });

        this.lazyLoadImages();
        this.initGalleryFilter();
    }

    // 🎯 نظام تصفية المعرض
    initGalleryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                this.filterGallery(filterValue);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterGallery(filterValue) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, 100);
            } else {
                item.classList.remove('animate-in');
                item.style.display = 'none';
            }
        });
    }

    // 🖼️ التحميل البطيء للصور
    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 🔦 Lightbox للمعرض
    openLightbox(item) {
        const img = item.querySelector('img');
        if (!img) return;

        const imgSrc = img.src;
        const title = item.querySelector('h4')?.textContent || '';
        const description = item.querySelector('p')?.textContent || '';

        const lightboxHTML = `
            <div class="lightbox-overlay" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.9); z-index: 2000; display: flex; 
                align-items: center; justify-content: center; padding: 20px;
            ">
                <div class="lightbox-content" style="
                    max-width: 90%; max-height: 90%; position: relative;
                ">
                    <img src="${imgSrc}" alt="${title}" style="
                        width: 100%; height: auto; max-height: 70vh; 
                        object-fit: contain; border-radius: 10px;
                    ">
                    <div class="lightbox-info" style="
                        color: white; text-align: center; margin-top: 15px;
                    ">
                        <h3 style="margin-bottom: 5px;">${title}</h3>
                        <p style="opacity: 0.8;">${description}</p>
                    </div>
                    <button class="lightbox-close" style="
                        position: absolute; top: -40px; right: 0; 
                        background: none; border: none; color: white; 
                        font-size: 2rem; cursor: pointer;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        const lightbox = document.querySelector('.lightbox-overlay');
        const closeBtn = document.querySelector('.lightbox-close');

        closeBtn.addEventListener('click', () => {
            lightbox.remove();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox) {
                lightbox.remove();
            }
        });
    }

    // 📝 نظام المدونة المتكامل
    initBlog() {
        this.initBlogSearch();
        this.initBlogFilters();
        this.initBlogLoadMore();
        this.initNewsletter();
    }

    // 🔍 نظام البحث في المدونة
    initBlogSearch() {
        const searchInput = document.getElementById('blogSearch');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performBlogSearch(e.target.value);
            });

            searchBtn.addEventListener('click', () => {
                this.performBlogSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performBlogSearch(searchInput.value);
                }
            });
        }
    }

    performBlogSearch(query) {
        const posts = document.querySelectorAll('.blog-card');
        const normalizedQuery = query.trim().toLowerCase();

        posts.forEach(post => {
            const title = post.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const matches = title.includes(normalizedQuery) || 
                           excerpt.includes(normalizedQuery) ||
                           tags.some(tag => tag.includes(normalizedQuery));

            post.style.display = matches ? 'block' : 'none';
            
            if (matches) {
                post.classList.add('search-match');
                setTimeout(() => post.classList.add('animate-in'), 100);
            } else {
                post.classList.remove('search-match', 'animate-in');
            }
        });
    }

    // 🎯 نظام التصفية في المدونة
    initBlogFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                this.filterBlog(filterValue);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterBlog(filterValue) {
        const posts = document.querySelectorAll('.blog-card');
        
        posts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || postCategory === filterValue;

            post.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) {
                setTimeout(() => post.classList.add('animate-in'), 100);
            } else {
                post.classList.remove('animate-in');
            }
        });
    }

    // ➕ تحميل المزيد في المدونة
    initBlogLoadMore() {
        const loadMoreBtn = document.getElementById('loadMorePosts');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreBlogPosts();
            });
        }
    }

    loadMoreBlogPosts() {
        const loadMoreBtn = document.getElementById('loadMorePosts');
        const originalText = loadMoreBtn.innerHTML;

        loadMoreBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري تحميل المزيد...
        `;
        loadMoreBtn.disabled = true;

        setTimeout(() => {
            this.showNotification('سيتم إضافة المزيد من المقالات قريباً', 'info');
            
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
        }, 1500);
    }

    // 📧 النشرة البريدية
    initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(newsletterForm);
            });
        }
    }

    async handleNewsletterSubscription(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();

        if (!this.isValidEmail(email)) {
            this.showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            جاري الاشتراك...
        `;
        submitBtn.disabled = true;

        try {
            await this.subscribeToNewsletter(email);
            
            this.showNotification('تم اشتراكك بنجاح في النشرة البريدية!', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('حدث خطأ في الاشتراك. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async subscribeToNewsletter(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('📧 اشتراك في النشرة:', email);
                
                if (Math.random() > 0.1) {
                    resolve({ email, subscribed: true });
                } else {
                    reject(new Error('فشل في الاشتراك'));
                }
            }, 2000);
        });
    }

    // 📧 تحقق من البريد الإلكتروني
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 🛠️ طلبات الخدمة
    initServiceRequests() {
        const serviceButtons = document.querySelectorAll('.service-card .btn');
        
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceCard = e.target.closest('.service-card');
                const serviceName = serviceCard.querySelector('h3').textContent;
                const servicePrice = serviceCard.querySelector('.service-price').textContent;
                
                this.openServiceModal(serviceName, servicePrice);
            });
        });
    }

    // 🪟 نافذة الخدمة
    openServiceModal(serviceName, servicePrice) {
        const modalHTML = `
            <div class="service-modal" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.8); z-index: 2000; display: flex; 
                align-items: center; justify-content: center; padding: 20px;
            ">
                <div class="modal-content" style="
                    background: white; padding: 30px; border-radius: 15px; 
                    max-width: 500px; width: 100%; text-align: center;
                ">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">طلب خدمة: ${serviceName}</h3>
                    <p style="color: #7f8c8d; margin-bottom: 20px;">${servicePrice}</p>
                    
                    <div class="modal-buttons" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="openWhatsApp('${serviceName}')" 
                            style="background: #25D366; color: white; border: none; 
                            padding: 12px 25px; border-radius: 25px; cursor: pointer; 
                            font-weight: bold; display: flex; align-items: center; gap: 8px;">
                            <i class="fab fa-whatsapp"></i> طلب عبر واتساب
                        </button>
                        
                        <button onclick="makeCall()" 
                            style="background: #3498db; color: white; border: none; 
                            padding: 12px 25px; border-radius: 25px; cursor: pointer; 
                            font-weight: bold; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-phone"></i> اتصال فوري
                        </button>
                    </div>
                    
                    <button class="modal-close" style="
                        background: none; border: none; color: #7f8c8d; 
                        margin-top: 20px; cursor: pointer; font-size: 0.9rem;
                    ">
                        إغلاق
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.service-modal');
        const closeBtn = document.querySelector('.modal-close');

        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // 🕒 حالة ساعات العمل
    initWorkingHours() {
        this.updateWorkingStatus();
        
        setInterval(() => {
            this.updateWorkingStatus();
        }, 60000);
    }

    updateWorkingStatus() {
        const now = new Date();
        const hours = now.getHours();
        const isWorkingHours = hours >= 8 && hours < 22;
        
        const statusElement = document.getElementById('workingStatus');
        if (!statusElement) return;

        if (isWorkingHours) {
            statusElement.innerHTML = '<i class="fas fa-circle"></i> متاح الآن';
            statusElement.className = 'status available';
        } else {
            statusElement.innerHTML = '<i class="fas fa-circle"></i> خارج أوقات العمل';
            statusElement.className = 'status unavailable';
        }
    }

    // 📞 أزرار الاتصال العائمة
    initFloatingButtons() {
        this.addFloatingButtonEffects();
    }

    addFloatingButtonEffects() {
        const floatingBtns = document.querySelectorAll('.floating-btn');
        
        floatingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const btnType = btn.classList.contains('floating-call') ? 'call' : 'whatsapp';
                
                if (btnType === 'call') {
                    makeCall();
                } else {
                    openWhatsApp('استفسار عام');
                }
            });
        });
    }

    // 🗺️ الخريطة
    initMap() {
        if (typeof google !== 'undefined') {
            this.loadGoogleMap();
        } else {
            this.showMapPlaceholder();
        }
    }

    loadGoogleMap() {
        try {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            const map = new google.maps.Map(mapElement, {
                center: { lat: 24.7136, lng: 46.6753 },
                zoom: 11,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [{ "weight": "2.00" }]
                    }
                ]
            });

            new google.maps.Marker({
                position: { lat: 24.7136, lng: 46.6753 },
                map: map,
                title: 'معلم كهرباء منازل'
            });

        } catch (error) {
            console.error('خطأ في تحميل الخريطة:', error);
            this.showMapPlaceholder();
        }
    }

    showMapPlaceholder() {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <div class="map-placeholder">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>خريطة منطقة الخدمة</h4>
                    <p>أخدم جميع أحياء الرياض</p>
                    <small>لتفعيل الخريطة، يرجى إضافة مفتاح Google Maps API</small>
                </div>
            `;
        }
    }

    // 🚀 تحسين الأداء
    initPerformance() {
        this.debounceScrollEvents();
        this.preloadCriticalImages();
    }

    // ⏰ تقليل أحداث التمرير
    debounceScrollEvents() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.highlightActiveSection();
            }, 100);
        });
    }

    // 🖼️ تحميل الصور المهمة مسبقاً
    preloadCriticalImages() {
        const criticalImages = [
            'images/1.png',
            'images/2.png', 
            'images/3.png',
            'images/4.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // 🎯 تحديد القسم النشط
    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // 🔔 نظام الإشعارات
    showNotification(message, type = 'info') {
        this.removeExistingNotifications();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };

        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${icons[type] || 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" style="background: none; border: none; color: white; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: colors[type] || '#3498db',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            maxWidth: '400px',
            fontFamily: 'inherit'
        });

        document.body.appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    removeExistingNotifications() {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
    }
}

// 📞 وظائف الاتصال المباشر (Global)
function makeCall() {
    window.open('tel:966546788947', '_self');
}

function openWhatsApp(serviceName = '') {
    const message = serviceName ? 
        `مرحباً، أريد الاستفسار عن خدمة: ${serviceName}` :
        'مرحباً، أريد الاستفسار عن خدمات الكهرباء';
    
    const url = `https://api.whatsapp.com/send?phone=966546788947&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// 🚀 تشغيل الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.website = new ElectricianWebsite();
});

// 🌐 دعم متصفحات قديمة
if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

console.log('⚡ JavaScript للموقع الكهربائي - جاهز للتشغيل!');ط
// 🍔 تفعيل القائمة المتنقلة للهواتف
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // منع التمرير عند فتح القائمة
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
    
    // منع إغلاق القائمة عند النقر داخلها
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// 📱 كشف نوع الجهاز وإضافة كلاس مساعد
function detectMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        document.body.classList.remove('desktop-device');
    } else {
        document.body.classList.add('desktop-device');
        document.body.classList.remove('mobile-device');
    }
}

// تشغيل الكشف عند التحميل وعند تغيير الحجم
detectMobile();
window.addEventListener('resize', detectMobile);