// Quick Access Menu
class QuickAccessMenu {
    constructor() {
        this.createMenu();
        this.addEventListeners();
    }

    createMenu() {
        const menu = document.createElement('div');
        menu.className = 'quick-access-menu';
        menu.innerHTML = `
            <button class="quick-menu-toggle">
                <i class="fas fa-plus"></i>
            </button>
            <div class="quick-menu-items">
                <button title="Hızlı Arama" class="quick-search">
                    <i class="fas fa-search"></i>
                </button>
                <button title="Sepete Git" class="quick-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-count">0</span>
                </button>
                <button title="Yukarı Git" class="quick-top">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button title="Whatsapp İletişim" class="quick-whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        `;
        document.body.appendChild(menu);
    }

    addEventListeners() {
        const toggle = document.querySelector('.quick-menu-toggle');
        const menu = document.querySelector('.quick-access-menu');
        
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Scroll to top
        document.querySelector('.quick-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // WhatsApp
        document.querySelector('.quick-whatsapp').addEventListener('click', () => {
            window.open('https://wa.me/+905555555555', '_blank');
        });

        // Quick Search
        document.querySelector('.quick-search').addEventListener('click', () => {
            this.showSearchModal();
        });
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <input type="text" placeholder="Ne aramıştınız?" class="search-input" autofocus>
                <div class="quick-filters">
                    <button data-filter="all">Tümü</button>
                    <button data-filter="kedi">Kedi</button>
                    <button data-filter="kopek">Köpek</button>
                    <button data-filter="aksesuar">Aksesuar</button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Search functionality
        const input = modal.querySelector('.search-input');
        const results = modal.querySelector('.search-results');
        const filters = modal.querySelectorAll('.quick-filters button');

        filters.forEach(button => {
            button.addEventListener('click', () => {
                filters.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                this.performSearch(input.value, button.dataset.filter);
            });
        });

        input.addEventListener('input', () => {
            this.performSearch(input.value, 'all');
        });
    }

    performSearch(query, filter) {
        const results = document.querySelector('.search-results');
        // Simulate search results
        const products = document.querySelectorAll('.product-card');
        const filteredProducts = Array.from(products).filter(product => {
            const matchesFilter = filter === 'all' || product.dataset.category === filter;
            const matchesQuery = product.textContent.toLowerCase().includes(query.toLowerCase());
            return matchesFilter && matchesQuery;
        });

        results.innerHTML = filteredProducts.length ? 
            filteredProducts.map(product => `
                <div class="search-result-item">
                    <img src="${product.querySelector('img').src}" alt="">
                    <div class="result-details">
                        <h4>${product.querySelector('h5').textContent}</h4>
                        <p>${product.querySelector('.price').textContent}</p>
                    </div>
                </div>
            `).join('') :
            '<p class="no-results">Sonuç bulunamadı</p>';
    }
}

// Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.count = 0;
        this.updateCart();
        this.addEventListeners();
    }

    addEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = e.target.closest('.product-card');
                this.addItem({
                    id: product.dataset.productId,
                    name: product.querySelector('h5').textContent,
                    price: parseFloat(product.dataset.price),
                    image: product.querySelector('img').src
                });
                this.showNotification('Ürün sepete eklendi!');
            });
        });

        // Quick cart button
        document.querySelector('.quick-cart').addEventListener('click', () => {
            this.showCart();
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.updateCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateCart() {
        this.count = this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.total = this.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        
        document.querySelector('.cart-count').textContent = this.count;
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    showCart() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-modal-content">
                <h3>Alışveriş Sepeti <span class="close-cart">&times;</span></h3>
                <div class="cart-items">
                    ${this.items.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <p>${item.price.toFixed(2)} TL</p>
                                <div class="quantity-controls">
                                    <button class="decrease">-</button>
                                    <span>${item.quantity || 1}</span>
                                    <button class="increase">+</button>
                                </div>
                            </div>
                            <button class="remove-item">&times;</button>
                        </div>
                    `).join('') || '<p>Sepetiniz boş</p>'}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">Toplam: ${this.total.toFixed(2)} TL</div>
                    <button class="checkout-button" ${this.items.length ? '' : 'disabled'}>
                        Siparişi Tamamla
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close cart
        modal.querySelector('.close-cart').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Quantity controls
        modal.querySelectorAll('.quantity-controls button').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const item = this.items.find(item => item.id === itemId);
                if (button.classList.contains('increase')) {
                    item.quantity = (item.quantity || 1) + 1;
                } else if (button.classList.contains('decrease') && item.quantity > 1) {
                    item.quantity--;
                }
                this.updateCart();
                this.showCart();
            });
        });

        // Remove items
        modal.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.removeItem(itemId);
                this.showCart();
            });
        });

        // Checkout
        modal.querySelector('.checkout-button').addEventListener('click', () => {
            if (this.items.length) {
                this.checkout();
            }
        });
    }

    checkout() {
        // Implement checkout logic here
        this.showNotification('Sipariş alındı! Teşekkür ederiz.');
        this.items = [];
        this.updateCart();
        document.querySelector('.cart-modal').remove();
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

// Product Filter
class ProductFilter {
    constructor() {
        this.setupFilters();
    }

    setupFilters() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'product-filters';
        filterContainer.innerHTML = `
            <div class="filter-group">
                <label>Sırala:</label>
                <select class="sort-select">
                    <option value="default">Varsayılan</option>
                    <option value="price-low">Fiyat (Düşük > Yüksek)</option>
                    <option value="price-high">Fiyat (Yüksek > Düşük)</option>
                    <option value="name">İsim (A-Z)</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Kategori:</label>
                <div class="category-filters">
                    <button class="active" data-category="all">Tümü</button>
                    <button data-category="kedi">Kedi</button>
                    <button data-category="kopek">Köpek</button>
                    <button data-category="aksesuar">Aksesuar</button>
                </div>
            </div>
            <div class="filter-group">
                <label>Fiyat Aralığı:</label>
                <div class="price-range">
                    <input type="range" min="0" max="1000" value="1000" class="price-slider">
                    <span class="price-value">1000 TL</span>
                </div>
            </div>
        `;

        const productSection = document.querySelector('#urunler .container');
        productSection.insertBefore(filterContainer, productSection.firstChild);

        this.addFilterListeners();
    }

    addFilterListeners() {
        const sortSelect = document.querySelector('.sort-select');
        const categoryButtons = document.querySelectorAll('.category-filters button');
        const priceSlider = document.querySelector('.price-slider');
        const priceValue = document.querySelector('.price-value');

        sortSelect.addEventListener('change', () => this.filterProducts());
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterProducts();
            });
        });

        priceSlider.addEventListener('input', (e) => {
            priceValue.textContent = `${e.target.value} TL`;
            this.filterProducts();
        });
    }

    filterProducts() {
        const products = document.querySelectorAll('.product-card');
        const sortValue = document.querySelector('.sort-select').value;
        const activeCategory = document.querySelector('.category-filters button.active').dataset.category;
        const maxPrice = document.querySelector('.price-slider').value;

        const productArray = Array.from(products);

        // Filter by category and price
        productArray.forEach(product => {
            const price = parseFloat(product.dataset.price);
            const category = product.dataset.category;
            const shouldShow = (activeCategory === 'all' || category === activeCategory) && price <= maxPrice;
            product.style.display = shouldShow ? '' : 'none';
        });

        // Sort products
        const sortedProducts = productArray.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const nameA = a.querySelector('h5').textContent;
            const nameB = b.querySelector('h5').textContent;

            switch(sortValue) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name':
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });

        const productContainer = document.querySelector('#product-list');
        sortedProducts.forEach(product => productContainer.appendChild(product));
    }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuickAccessMenu();
    new ShoppingCart();
    new ProductFilter();
});
