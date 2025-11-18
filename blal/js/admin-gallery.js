// نظام إدارة أعمال بلال
class AdminGallerySystem {
    constructor() {
        this.currentWorks = [];
        this.selectedFeatures = [];
        this.init();
    }

    init() {
        this.loadWorks();
        this.setupEventListeners();
        this.renderWorksList();
    }

    setupEventListeners() {
        // زر التحكم في لوحة الإدارة
        document.getElementById('toggleAdmin').addEventListener('click', () => {
            this.toggleAdminPanel();
        });

        // إضافة مميزات
        document.getElementById('addFeatureBtn').addEventListener('click', () => {
            this.addFeature();
        });

        // رفع الصور
        document.querySelectorAll('.image-input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleImageUpload(e.target);
            });
        });

        // إرسال النموذج
        document.getElementById('addWorkForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWork();
        });

        // معاينة العمل
        document.getElementById('previewWork').addEventListener('click', () => {
            this.previewWork();
        });
    }

    toggleAdminPanel() {
        const adminSection = document.getElementById('adminWorks');
        const isVisible = adminSection.style.display !== 'none';
        
        adminSection.style.display = isVisible ? 'none' : 'block';
        
        // تحريك الصفحة للقسم
        if (!isVisible) {
            adminSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    addFeature() {
        const featureInput = document.getElementById('featureInput');
        const featureText = featureInput.value.trim();
        
        if (featureText && !this.selectedFeatures.includes(featureText)) {
            this.selectedFeatures.push(featureText);
            this.renderFeaturesList();
            featureInput.value = '';
        }
    }

    removeFeature(index) {
        this.selectedFeatures.splice(index, 1);
        this.renderFeaturesList();
    }

    renderFeaturesList() {
        const featuresList = document.getElementById('featuresList');
        featuresList.innerHTML = this.selectedFeatures.map((feature, index) => `
            <div class="feature-tag">
                <span>${feature}</span>
                <button type="button" onclick="adminSystem.removeFeature(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    handleImageUpload(input) {
        const files = Array.from(input.files);
        const type = input.getAttribute('data-type');
        const previewContainer = input.parentElement.querySelector('.preview-container');
        
        files.forEach(file => {
            if (this.validateImage(file)) {
                this.previewImage(file, previewContainer, type);
            }
        });
    }

    validateImage(file) {
        if (!file.type.startsWith('image/')) {
            this.showMessage('يرجى رفع ملفات صور فقط', 'error');
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showMessage('حجم الصورة كبير جداً (الحد الأقصى 5MB)', 'error');
            return false;
        }

        return true;
    }

    previewImage(file, container, type) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = `preview-item ${type}`;
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="معاينة">
                <button type="button" class="remove-preview">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // إزالة المعاينات القديمة للصورة الرئيسية
            if (type === 'main') {
                container.innerHTML = '';
            }
            
            container.appendChild(previewItem);
            
            // إضافة حدث إزالة المعاينة
            previewItem.querySelector('.remove-preview').addEventListener('click', () => {
                previewItem.remove();
            });
        };

        reader.readAsDataURL(file);
    }

    saveWork() {
        const formData = new FormData(document.getElementById('addWorkForm'));
        
        const workData = {
            id: Date.now(),
            title: formData.get('workTitle'),
            location: formData.get('workLocation'),
            category: formData.get('workCategory'),
            date: formData.get('workDate'),
            description: formData.get('workDescription'),
            features: [...this.selectedFeatures],
            images: this.getPreviewImages(),
            createdAt: new Date().toISOString()
        };

        // التحقق من البيانات
        if (!this.validateWorkData(workData)) {
            return;
        }

        this.currentWorks.unshift(workData); // إضافة في البداية
        this.saveToStorage();
        this.renderWorksList();
        this.updateMainGallery();
        this.resetForm();
        
        this.showMessage('تم حفظ العمل بنجاح!', 'success');
    }

    validateWorkData(workData) {
        if (!workData.title || !workData.location || !workData.category || !workData.date) {
            this.showMessage('يرجى ملء جميع الحقول الإلزامية', 'error');
            return false;
        }

        if (!workData.images.main) {
            this.showMessage('يرجى إضافة صورة رئيسية للعمل', 'error');
            return false;
        }

        return true;
    }

    getPreviewImages() {
        const images = {
            main: '',
            additional: []
        };

        // الحصول على الصور من المعاينات (في التطبيق الحقيقي، يتم رفعها لخادم)
        const mainPreview = document.querySelector('.main-image .preview-item img');
        if (mainPreview) {
            images.main = mainPreview.src; // في الواقع، هذا سيكون رابط الصورة بعد الرفع
        }

        document.querySelectorAll('.additional-images .preview-item img').forEach(img => {
            images.additional.push(img.src);
        });

        return images;
    }

    saveToStorage() {
        localStorage.setItem('balalWorks', JSON.stringify(this.currentWorks));
    }

    loadWorks() {
        const savedWorks = localStorage.getItem('balalWorks');
        this.currentWorks = savedWorks ? JSON.parse(savedWorks) : [];
        this.updateMainGallery();
    }

    renderWorksList() {
        const worksList = document.getElementById('worksList');
        
        worksList.innerHTML = this.currentWorks.map(work => `
            <div class="work-item" data-id="${work.id}">
                <div class="work-item-header">
                    <h5>${work.title}</h5>
                    <div class="work-actions">
                        <button class="btn-sm edit-work" onclick="adminSystem.editWork(${work.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-sm delete-work" onclick="adminSystem.deleteWork(${work.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn-sm view-work" onclick="adminSystem.viewWork(${work.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="work-item-details">
                    <span class="work-location"><i class="fas fa-map-marker-alt"></i> ${work.location}</span>
                    <span class="work-date"><i class="fas fa-calendar"></i> ${work.date}</span>
                    <span class="work-category">${this.getCategoryName(work.category)}</span>
                </div>
                <div class="work-item-preview">
                    ${work.images.main ? `<img src="${work.images.main}" alt="${work.title}">` : ''}
                </div>
            </div>
        `).join('');
    }

    updateMainGallery() {
        // تحديث المعرض الرئيسي في الصفحة
        const mainGallery = document.querySelector('.gallery-grid');
        if (!mainGallery) return;

        // دمج الأعمال المحفوظة مع الأعمال الافتراضية
        const allWorks = [...this.currentWorks];
        
        // هنا يمكنك تحديث المعرض الرئيسي حسب احتياجك
        console.log('تم تحديث المعرض الرئيسي بـ', allWorks.length, 'عمل');
    }

    getCategoryName(category) {
        const categories = {
            'installation': 'تركيب إنارة',
            'repair': 'إصلاح أعطال',
            'extension': 'تمديدات جديدة',
            'maintenance': 'صيانة',
            'smart': 'أنظمة ذكية'
        };
        return categories[category] || category;
    }

    editWork(workId) {
        const work = this.currentWorks.find(w => w.id === workId);
        if (work) {
            this.fillFormForEdit(work);
            this.toggleAdminPanel();
        }
    }

    fillFormForEdit(work) {
        document.getElementById('workTitle').value = work.title;
        document.getElementById('workLocation').value = work.location;
        document.getElementById('workCategory').value = work.category;
        document.getElementById('workDate').value = work.date;
        document.getElementById('workDescription').value = work.description;
        
        this.selectedFeatures = [...work.features];
        this.renderFeaturesList();
        
        // هنا يمكنك إعادة تعبئة الصور إذا كانت محفوظة
    }

    deleteWork(workId) {
        if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
            this.currentWorks = this.currentWorks.filter(w => w.id !== workId);
            this.saveToStorage();
            this.renderWorksList();
            this.updateMainGallery();
            this.showMessage('تم حذف العمل بنجاح', 'success');
        }
    }

    viewWork(workId) {
        const work = this.currentWorks.find(w => w.id === workId);
        if (work) {
            this.showWorkDetails(work);
        }
    }

    showWorkDetails(work) {
        const detailsHTML = `
            <div class="work-details-modal">
                <div class="modal-content">
                    <h3>${work.title}</h3>
                    <div class="work-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${work.location}</span>
                        <span><i class="fas fa-calendar"></i> ${work.date}</span>
                        <span>${this.getCategoryName(work.category)}</span>
                    </div>
                    <div class="work-description">
                        <h4>شرح العمل:</h4>
                        <p>${work.description}</p>
                    </div>
                    ${work.features.length > 0 ? `
                    <div class="work-features">
                        <h4>مميزات العمل:</h4>
                        <ul>
                            ${work.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    <div class="work-images">
                        ${work.images.main ? `<img src="${work.images.main}" alt="الصورة الرئيسية">` : ''}
                    </div>
                    <button class="btn btn-primary close-modal">إغلاق</button>
                </div>
            </div>
        `;
        
        // إضافة المودال للصفحة
        document.body.insertAdjacentHTML('beforeend', detailsHTML);
        
        // إضافة حدث الإغلاق
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.work-details-modal').remove();
        });
    }

    previewWork() {
        // معاينة العمل قبل الحفظ
        const formData = new FormData(document.getElementById('addWorkForm'));
        alert('سيتم عرض معاينة العمل هنا (وظيفة قيد التطوير)');
    }

    resetForm() {
        document.getElementById('addWorkForm').reset();
        this.selectedFeatures = [];
        this.renderFeaturesList();
        document.querySelectorAll('.preview-container').forEach(container => {
            container.innerHTML = '';
        });
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `admin-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            ${message}
        `;
        
        document.querySelector('.admin-form-container').prepend(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// تفعيل النظام
const adminSystem = new AdminGallerySystem();