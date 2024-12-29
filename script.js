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

// Canlı Destek Widget
class LiveChatWidget {
    constructor() {
        this.button = document.getElementById('liveChatBtn');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.button.addEventListener('click', () => this.openChat());
    }

    openChat() {
        // Chat penceresi açma mantığı
        alert('Canlı destek yakında hizmetinizde olacak!');
    }
}

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
        this.updateCartCount();
        this.bindEvents();
        this.calculateTotal();
    }

    bindEvents() {
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = {
                    id: e.target.dataset.id,
                    name: e.target.dataset.name,
                    price: parseFloat(e.target.dataset.price),
                    quantity: 1
                };
                this.addToCart(product);
                this.showNotification('Ürün sepete eklendi!');
            });
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(product);
        }
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.calculateTotal();
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartCount').textContent = count;
    }

    calculateTotal() {
        this.total = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = this.total.toFixed(2) + ' ₺';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }
}

// Form Validasyon Geliştirmeleri
class FormValidator {
    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static validatePhone(phone) {
        return /^(\+90|0)?[0-9]{10}$/.test(phone.replace(/\s/g, ''));
    }

    static validateDate(date) {
        const selected = new Date(date);
        const today = new Date();
        return selected >= today;
    }

    static showError(element, message) {
        const parent = element.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        parent.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Animasyon Yöneticisi
class AnimationManager {
    static animate(element, animation, duration = 1000) {
        element.style.animation = `${animation} ${duration}ms`;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, {once: true});
    }

    static fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        setTimeout(() => element.style.opacity = '1', 10);
    }

    static fadeOut(element) {
        element.style.opacity = '0';
        setTimeout(() => element.style.display = 'none', 300);
    }
}

// Fiyat Hesaplayıcı
class PriceCalculator {
    static calculateDiscount(price, discountPercent) {
        return price - (price * discountPercent / 100);
    }

    static formatPrice(price) {
        return price.toFixed(2) + ' ₺';
    }

    static calculateInstallment(price, months) {
        const interest = 1.2; // %20 faiz
        return (price * interest) / months;
    }
}

// Yerel Depolama Yöneticisi
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    }

    static get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

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
    new CartManager();
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