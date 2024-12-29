// Randevu yönetimi için sınıf
class RandevuManager {
    constructor() {
        this.storageKey = 'randevular';
        this.form = document.getElementById('randevuForm');
        this.initializeEventListeners();
    }

    // Event listener'ları başlat
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        });
    }

    // Form gönderimini işle
    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const randevu = this.createRandevuObject();
        this.saveRandevu(randevu);
        this.showSuccess();
        this.form.reset();
    }

    // Form validasyonu
    validateForm() {
        const isim = document.getElementById('isim').value.trim();
        const telefon = document.getElementById('telefon').value.trim();
        const hizmet = document.getElementById('hizmet').value;
        const tarih = document.getElementById('tarih').value;

        if (!isim || !telefon || !hizmet || !tarih) {
            this.showError('Lütfen tüm alanları doldurun.');
            return false;
        }

        if (!this.validatePhone(telefon)) {
            this.showError('Geçerli bir telefon numarası giriniz.');
            return false;
        }

        if (!this.validateDate(tarih)) {
            this.showError('Geçerli bir tarih seçiniz.');
            return false;
        }

        return true;
    }

    // Telefon numarası validasyonu
    validatePhone(phone) {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
    }

    // Tarih validasyonu
    validateDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
    }

    // Randevu objesi oluştur
    createRandevuObject() {
        return {
            id: Date.now(),
            isim: document.getElementById('isim').value.trim(),
            telefon: document.getElementById('telefon').value.trim(),
            hizmet: document.getElementById('hizmet').value,
            tarih: document.getElementById('tarih').value,
            olusturmaTarihi: new Date().toISOString()
        };
    }

    // Randevuyu kaydet
    saveRandevu(randevu) {
        try {
            let randevular = this.getRandevular();
            randevular.push(randevu);
            localStorage.setItem(this.storageKey, JSON.stringify(randevular));
        } catch (error) {
            console.error('Randevu kaydedilirken hata oluştu:', error);
            this.showError('Randevu kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }

    // Tüm randevuları getir
    getRandevular() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch (error) {
            console.error('Randevular alınırken hata oluştu:', error);
            return [];
        }
    }

    // Randevuları görüntüle (konsol)
    randevulariGoster() {
        const randevular = this.getRandevular();
        console.table(randevular);
    }

    // Başarı mesajı göster
    showSuccess() {
        alert('Randevunuz başarıyla oluşturuldu!');
    }

    // Hata mesajı göster
    showError(message) {
        alert(`Hata: ${message}`);
    }
}

// Randevu yöneticisini başlat
const randevuManager = new RandevuManager();

// Geliştirici konsolu için yardımcı fonksiyon
window.randevulariGoster = () => randevuManager.randevulariGoster();

// Canlı Destek
class LiveChatWidget {
    constructor() {
      this.button = document.getElementById('liveChatBtn');
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      this.button.addEventListener('click', () => this.openChat());
    }
  
    openChat() {
      window.open('https://wa.me/905551234567', '_blank');
    }
  }
  
  new LiveChatWidget();

// İletişim Formu
class ContactForm {
    constructor() {
        this.form = document.getElementById('iletisimForm');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        // Form gönderme mantığı
        alert('Mesajınız başarıyla gönderildi!');
        this.form.reset();
    }
}

// Tema değiştirme
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateIcon();
    }

    updateIcon() {
        const icon = this.toggle.querySelector('i');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Slider yönetimi
class SliderManager {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.init();
    }

    init() {
        setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
}

// Ürün filtreleme
class ProductFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.products = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                // Get filter value
                const filter = button.getAttribute('data-filter');
                this.filterProducts(filter);
            });
        });
    }

    filterProducts(filter) {
        this.products.forEach(product => {
            const category = product.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

const productFilter = new ProductFilter();

// Blog yönetimi için yeni sınıf ekleyin
class BlogManager {
    constructor() {
        this.blogs = [
            {
                id: 1,
                title: "Kedilerde Doğru Beslenme",
                image: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg",
                summary: "Kedinizin sağlıklı ve mutlu olması için beslenme önerileri...",
                content: `
                    <h3>Kedilerde Doğru Beslenme Rehberi</h3>
                    <p>Kedilerin sağlıklı ve mutlu bir yaşam sürmesi için doğru beslenme çok önemlidir. İşte dikkat edilmesi gerekenler:</p>
                    <h4>1. Protein Ağırlıklı Beslenme</h4>
                    <p>Kediler etobur hayvanlardır ve protein açısından zengin gıdalara ihtiyaç duyarlar. Kaliteli kedi maması veya ev yapımı et bazlı yiyecekler tercih edilmelidir.</p>
                    <h4>2. Su Tüketimi</h4>
                    <p>Kedilerin her zaman temiz ve taze suya erişimi olmalıdır. Günlük su tüketimi çok önemlidir.</p>
                    <h4>3. Öğün Düzeni</h4>
                    <p>Günde 2-3 öğün düzenli besleme önerilir. Porsiyon kontrolü önemlidir.</p>
                `
            },
            {
                id: 2,
                title: "Köpek Eğitiminde İpuçları",
                image: "https://images.pexels.com/photos/1870301/pexels-photo-1870301.jpeg",
                summary: "Köpeğinizi eğitirken dikkat etmeniz gerekenler...",
                content: `
                    <h3>Etkili Köpek Eğitimi İçin Öneriler</h3>
                    <p>Köpek eğitimi sabır ve tutarlılık gerektirir. İşte başarılı eğitim için ipuçları:</p>
                    <h4>1. Pozitif Pekiştirme</h4>
                    <p>Olumlu davranışları ödüllendirmek en etkili eğitim yöntemidir. Ödül olarak mama veya oyuncak kullanılabilir.</p>
                    <h4>2. Tutarlı Komutlar</h4>
                    <p>Her zaman aynı komutları kullanın ve tüm aile üyelerinin aynı komutları kullanmasını sağlayın.</p>
                    <h4>3. Düzenli Egzersiz</h4>
                    <p>Fiziksel ve zihinsel aktiviteler eğitimi kolaylaştırır. Günlük yürüyüşler ve oyunlar önemlidir.</p>
                `
            },
            {
                id: 3,
                title: "Evcil Hayvan Bakım Rehberi",
                image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg",
                summary: "Evcil hayvanınızın bakımı için temel bilgiler...",
                content: `
                    <h3>Evcil Hayvan Bakım Rehberi</h3>
                    <p>Evcil hayvanınızın sağlıklı ve mutlu bir yaşam sürmesi için temel bakım önerileri:</p>
                    <h4>1. Düzenli Veteriner Kontrolleri</h4>
                    <p>Yıllık aşılar ve düzenli sağlık kontrolleri çok önemlidir.</p>
                    <h4>2. Temizlik ve Bakım</h4>
                    <p>Düzenli tüy bakımı, tırnak kesimi ve diş bakımı ihmal edilmemelidir.</p>
                    <h4>3. Sosyalleşme</h4>
                    <p>Evcil hayvanınızın diğer hayvanlar ve insanlarla sosyalleşmesi önemlidir.</p>
                `
            }
        ];
        this.modal = new bootstrap.Modal(document.getElementById('blogModal'));
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', (e) => {
                const blogId = parseInt(e.target.dataset.blogId);
                this.showBlogDetails(blogId);
            });
        });
    }

    showBlogDetails(blogId) {
        const blog = this.blogs.find(b => b.id === blogId);
        if (blog) {
            document.getElementById('blogTitle').textContent = blog.title;
            document.getElementById('blogImage').src = blog.image;
            document.getElementById('blogContent').innerHTML = blog.content;
            this.modal.show();
        }
    }
}

// Sepet Yönetimi
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
            this.updateCart();
        });
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const product = {
                        id: productCard.dataset.productId,
                        name: productCard.querySelector('.card-title').textContent,
                        price: parseFloat(productCard.dataset.price),
                        quantity: 1
                    };
                    this.addToCart(product);
                }
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        this.showNotification(`${product.name} sepete eklendi!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCart();
        }
    }

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.getElementById('cart-total');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                <div class="cart-item-details">
                    <h6 class="mb-1">${item.name}</h6>
                    <div class="price-info text-muted">
                        <small>Birim Fiyat: ${item.price.toFixed(2)} TL</small>
                    </div>
                    <div class="quantity-controls mt-2">
                        <button class="btn btn-sm btn-outline-secondary" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity} adet</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-actions text-end">
                    <div class="item-total fw-bold mb-2">
                        Toplam: ${(item.price * item.quantity).toFixed(2)} TL
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="cartManager.removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i> Kaldır
                    </button>
                </div>
            </div>
        `).join('');

        // Update total
        this.total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${this.total.toFixed(2)} TL`;

        // Show empty cart message if no items
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="text-center text-muted p-3">Sepetiniz boş</div>';
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Sepetiniz boş!', 'warning');
            return;
        }

        // Here you would typically integrate with a payment system
        alert('Ödeme sistemi entegrasyonu yapılacak');
        
        // For now, just clear the cart
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
        this.showNotification('Siparişiniz alındı!', 'success');
    }

    showNotification(message, type = 'success') {
        const notificationManager = new NotificationManager();
        notificationManager.showNotification(message, type);
    }
}

// Initialize cart manager - make sure it's created after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});

// Favori Ürünler Yöneticisi
class FavoritesManager {
    constructor() {
        this.favorites = StorageManager.get('favorites') || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateFavoriteButtons();
    }

    bindEvents() {
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                this.toggleFavorite(productId);
            });
        });
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        if (index === -1) {
            this.favorites.push(productId);
            this.showNotification('Ürün favorilere eklendi!');
        } else {
            this.favorites.splice(index, 1);
            this.showNotification('Ürün favorilerden çıkarıldı!');
        }
        StorageManager.set('favorites', this.favorites);
        this.updateFavoriteButtons();
    }

    updateFavoriteButtons() {
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            const productId = btn.dataset.id;
            btn.classList.toggle('active', this.favorites.includes(productId));
        });
    }

    showNotification(message) {
        // Bildirim gösterme mantığı...
    }
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        moonIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Toggle icon
    moonIcon.classList.toggle('fa-moon');
    moonIcon.classList.toggle('fa-sun');
});

// Dark Mode Functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.toggle('dark-mode');
  });
  
  // Save preference
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check saved preference on load
window.onload = function() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('dark-mode');
    });
  }
}

// Shopping Cart Functionality
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Add to Cart Function
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

// Update Cart Display
function updateCart() {
    cartCount.textContent = cart.length;

    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price.toFixed(2)} TL</span>
            <button onclick="removeFromCart('${item.name}')" class="btn btn-sm btn-danger">Sil</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `${total.toFixed(2)} TL`;
}

// Remove from Cart
function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Checkout Function
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }

    alert('Siparişiniz alındı! Teşekkür ederiz.');
    cart = [];
    updateCart();
    $('#cartModal').modal('hide');
});

// Widget'ları başlat
document.addEventListener('DOMContentLoaded', () => {
    new LiveChatWidget();
    new ContactForm();
    new ThemeManager();
    new SliderManager();
    new BlogManager();
    new FavoritesManager();
});

// Google Maps Başlangıç
function initMap() {
    // İşletmenizin konumu (örnek koordinatlar)
    const businessLocation = { lat: 41.0082, lng: 28.9784 }; // İstanbul koordinatları

    // Harita oluştur
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: businessLocation,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });

    // Marker ekle
    const marker = new google.maps.Marker({
        position: businessLocation,
        map: map,
        title: 'Happy Pets',
        animation: google.maps.Animation.DROP
    });

    // Info window ekle
    const infowindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h5 style="margin: 0 0 5px 0;">Happy Pets</h5>
                <p style="margin: 0;">Evcil dostlarınız için en iyi bakım merkezi</p>
            </div>
        `
    });

    // Marker'a tıklandığında info window'u göster
    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
}

// Harita yüklenemezse hata göster
function handleMapError() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div class="alert alert-warning">
                Harita yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </div>
        `;
    }
}

// Ürün Arama Yöneticisi
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.products = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    handleSearch(query) {
        query = query.toLowerCase();
        this.products.forEach(product => {
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            const description = product.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// Ürün Değerlendirme Yöneticisi
class RatingManager {
    constructor() {
        this.storageKey = 'productRatings';
        this.ratings = this.loadRatings();
        this.init();
    }

    init() {
        this.addRatingStars();
        this.bindEvents();
    }

    loadRatings() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    }

    saveRatings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.ratings));
    }

    addRatingStars() {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const productId = product.dataset.productId;
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating-container mt-2';
            ratingContainer.innerHTML = `
                <div class="stars">
                    ${this.createStars(productId)}
                </div>
                <small class="rating-count">(${this.getRatingCount(productId)} değerlendirme)</small>
            `;
            product.querySelector('.card-body').appendChild(ratingContainer);
        });
    }

    createStars(productId) {
        const rating = this.getAverageRating(productId);
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="fas fa-star ${i <= rating ? 'active' : ''}" data-rating="${i}"></i>`;
        }
        return starsHtml;
    }

    bindEvents() {
        document.querySelectorAll('.product-card').forEach(product => {
            const stars = product.querySelectorAll('.stars i');
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.dataset.rating);
                    const productId = product.dataset.productId;
                    this.rateProduct(productId, rating);
                });
            });
        });
    }

    rateProduct(productId, rating) {
        if (!this.ratings[productId]) {
            this.ratings[productId] = [];
        }
        this.ratings[productId].push(rating);
        this.saveRatings();
        this.updateProductRating(productId);
        notificationManager.showNotification('Değerlendirmeniz için teşekkürler!');
    }

    getAverageRating(productId) {
        const ratings = this.ratings[productId] || [];
        if (ratings.length === 0) return 0;
        return ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }

    getRatingCount(productId) {
        return (this.ratings[productId] || []).length;
    }

    updateProductRating(productId) {
        const product = document.querySelector(`[data-product-id="${productId}"]`);
        if (product) {
            const stars = product.querySelectorAll('.stars i');
            const rating = this.getAverageRating(productId);
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < rating);
            });
            product.querySelector('.rating-count').textContent = 
                `(${this.getRatingCount(productId)} değerlendirme)`;
        }
    }
}

// Bildirim Yöneticisi
class NotificationManager {
    constructor() {
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
    }

    showNotification(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} animate__animated animate__fadeIn`;
        notification.textContent = message;
        
        document.getElementById('notification-container').appendChild(notification);

        setTimeout(() => {
            notification.classList.replace('animate__fadeIn', 'animate__fadeOut');
            setTimeout(() => notification.remove(), 1000);
        }, duration);
    }
}

// Initialize new features
const searchManager = new SearchManager();
const ratingManager = new RatingManager();
const notificationManager = new NotificationManager();

// Quick View Manager
class QuickViewManager {
    constructor() {
        this.modal = document.getElementById('quickViewModal');
        this.currentProduct = null;
        this.init();
    }

    init() {
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('.quick-view').dataset.productId;
                this.showQuickView(productId);
            });
        });

        // Quantity controls
        document.getElementById('decreaseQuantity').addEventListener('click', () => {
            const input = document.getElementById('quickViewQuantity');
            if (input.value > 1) input.value = parseInt(input.value) - 1;
        });

        document.getElementById('increaseQuantity').addEventListener('click', () => {
            const input = document.getElementById('quickViewQuantity');
            input.value = parseInt(input.value) + 1;
        });

        // Add to cart from quick view
        document.querySelector('.quick-view-add-to-cart').addEventListener('click', () => {
            if (this.currentProduct) {
                const quantity = parseInt(document.getElementById('quickViewQuantity').value);
                cartManager.addToCart({
                    ...this.currentProduct,
                    quantity: quantity
                });
                bootstrap.Modal.getInstance(this.modal).hide();
            }
        });
    }

    showQuickView(productId) {
        const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
        if (!productCard) return;

        this.currentProduct = {
            id: productId,
            name: productCard.querySelector('.card-title').textContent,
            price: parseFloat(productCard.dataset.price),
            image: productCard.querySelector('img').src,
            description: productCard.querySelector('.card-text').textContent
        };

        // Update modal content
        document.getElementById('quickViewTitle').textContent = this.currentProduct.name;
        document.getElementById('quickViewPrice').textContent = `${this.currentProduct.price.toFixed(2)} TL`;
        document.getElementById('quickViewDescription').textContent = this.currentProduct.description;
        document.getElementById('quickViewImage').innerHTML = `<img src="${this.currentProduct.image}" alt="${this.currentProduct.name}">`;
        document.getElementById('quickViewQuantity').value = 1;
    }
}

// Wishlist Manager
class WishlistManager {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.init();
    }

    init() {
        this.updateWishlistButtons();
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.toggle-favorite').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                this.toggleWishlist(productId);
            });
        });
    }

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            notificationManager.showNotification('Ürün favorilere eklendi', 'success');
        } else {
            this.wishlist.splice(index, 1);
            notificationManager.showNotification('Ürün favorilerden çıkarıldı', 'info');
        }
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistButtons();
    }

    updateWishlistButtons() {
        document.querySelectorAll('.toggle-favorite').forEach(button => {
            const productId = button.closest('.product-card').dataset.productId;
            const icon = button.querySelector('i');
            if (this.wishlist.includes(productId)) {
                button.classList.add('active');
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                button.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }
}

// Coupon Manager
class CouponManager {
    constructor() {
        this.coupons = {
            'WELCOME10': 10,
            'PETSALE20': 20
        };
        this.init();
    }

    init() {
        document.getElementById('applyCoupon').addEventListener('click', () => {
            const code = document.getElementById('couponCode').value.toUpperCase();
            this.applyCoupon(code);
        });

        document.querySelectorAll('.copy-coupon').forEach(button => {
            button.addEventListener('click', (e) => {
                const code = e.target.closest('.coupon-item').querySelector('strong').textContent;
                navigator.clipboard.writeText(code);
                notificationManager.showNotification('Kupon kodu kopyalandı', 'success');
            });
        });
    }

    applyCoupon(code) {
        const discount = this.coupons[code];
        if (discount) {
            cartManager.applyDiscount(discount);
            notificationManager.showNotification(`%${discount} indirim uygulandı`, 'success');
            bootstrap.Modal.getInstance(document.getElementById('couponModal')).hide();
        } else {
            notificationManager.showNotification('Geçersiz kupon kodu', 'error');
        }
    }
}

// Rating Manager
class RatingManager {
    constructor() {
        this.ratings = JSON.parse(localStorage.getItem('ratings')) || {};
        this.init();
    }

    init() {
        this.bindRatingEvents();
        this.loadRatings();
    }

    bindRatingEvents() {
        document.querySelectorAll('.rating-input i').forEach(star => {
            star.addEventListener('mouseover', (e) => this.handleStarHover(e));
            star.addEventListener('mouseout', (e) => this.handleStarOut(e));
            star.addEventListener('click', (e) => this.handleStarClick(e));
        });

        document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview();
        });
    }

    handleStarHover(e) {
        const rating = parseInt(e.target.dataset.rating);
        this.updateStars(rating, true);
    }

    handleStarOut(e) {
        const container = e.target.closest('.rating-input');
        const selected = container.querySelector('.selected');
        const rating = selected ? parseInt(selected.dataset.rating) : 0;
        this.updateStars(rating, true);
    }

    handleStarClick(e) {
        const rating = parseInt(e.target.dataset.rating);
        const container = e.target.closest('.rating-input');
        container.querySelectorAll('i').forEach(star => star.classList.remove('selected'));
        e.target.classList.add('selected');
        this.updateStars(rating, false);
    }

    updateStars(rating, isHover) {
        const container = document.querySelector('.rating-input');
        container.querySelectorAll('i').forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    submitReview() {
        const form = document.getElementById('reviewForm');
        const rating = form.querySelector('.selected')?.dataset.rating;
        if (!rating) {
            notificationManager.showNotification('Lütfen bir puan seçin', 'warning');
            return;
        }

        const review = {
            rating: parseInt(rating),
            title: form.querySelector('input[type="text"]').value,
            comment: form.querySelector('textarea').value,
            date: new Date().toISOString()
        };

        const productId = this.currentProductId;
        if (!this.ratings[productId]) {
            this.ratings[productId] = [];
        }
        this.ratings[productId].push(review);
        localStorage.setItem('ratings', JSON.stringify(this.ratings));

        notificationManager.showNotification('Değerlendirmeniz kaydedildi', 'success');
        bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
        form.reset();
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
    window.quickViewManager = new QuickViewManager();
    window.wishlistManager = new WishlistManager();
    window.couponManager = new CouponManager();
    window.ratingManager = new RatingManager();
});