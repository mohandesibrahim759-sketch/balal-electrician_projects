// js/reviews.js
class ReviewsSystem {
    constructor() {
        this.reviews = this.loadReviews();
        this.init();
    }

    init() {
        this.renderReviews();
        this.initReviewForm();
        this.calculateAverageRating();
    }

    loadReviews() {
        const saved = localStorage.getItem('electrician_reviews');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                name: 'أحمد محمد',
                rating: 5,
                comment: 'عمل ممتاز ومحترف، أنصح الجميع بالتعامل معه',
                date: '2024-01-15',
                service: 'تركيب إنارة'
            },
            {
                id: 2,
                name: 'فاطمة العتيبي',
                rating: 4,
                comment: 'خدمة سريعة وأسعار معقولة',
                date: '2024-01-10',
                service: 'إصلاح أعطال'
            }
        ];
    }

    saveReviews() {
        localStorage.setItem('electrician_reviews', JSON.stringify(this.reviews));
    }

    renderReviews() {
        const container = document.getElementById('reviewsContainer');
        if (!container) return;

        container.innerHTML = this.reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <span class="review-service">${review.service}</span>
                    </div>
                    <div class="review-meta">
                        <div class="rating-stars">
                            ${this.generateStars(review.rating)}
                        </div>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-comment">
                    <p>${review.comment}</p>
                </div>
            </div>
        `).join('');
    }

    generateStars(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    initReviewForm() {
        const form = document.getElementById('reviewForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview(new FormData(form));
        });

        // تفعيل نظام النجوم في التقييم
        this.initStarRating();
    }

    initStarRating() {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.dataset.rating;
                this.setRating(rating);
            });
        });
    }

    setRating(rating) {
        document.querySelectorAll('.star-rating .star').forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
            star.style.color = index < rating ? '#f39c12' : '#ddd';
        });
        document.getElementById('rating').value = rating;
    }

    submitReview(formData) {
        const review = {
            id: Date.now(),
            name: formData.get('name'),
            rating: parseInt(formData.get('rating')),
            comment: formData.get('comment'),
            service: formData.get('service'),
            date: new Date().toISOString().split('T')[0]
        };

        this.reviews.unshift(review);
        this.saveReviews();
        this.renderReviews();
        this.calculateAverageRating();
        
        this.showNotification('شكراً لك! تم إضافة تقييمك بنجاح', 'success');
        document.getElementById('reviewForm').reset();
    }

    calculateAverageRating() {
        if (this.reviews.length === 0) return;

        const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = (total / this.reviews.length).toFixed(1);

        // تحديث متوسط التقييم في الموقع
        const avgElement = document.getElementById('averageRating');
        if (avgElement) {
            avgElement.textContent = average;
        }

        // تحديث النجوم في header إذا وجدت
        const headerRating = document.querySelector('.header-rating');
        if (headerRating) {
            headerRating.innerHTML = `
                <span class="rating-stars">${this.generateStars(Math.round(average))}</span>
                <small>(${this.reviews.length} تقييم)</small>
            `;
        }
    }

    showNotification(message, type) {
        // استخدام دالة الإشعارات من main.js
        if (window.website) {
            window.website.showNotification(message, type);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.reviewsSystem = new ReviewsSystem();
});