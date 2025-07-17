// Utensalis For Life - Main JavaScript File

// Global Variables
let cart = JSON.parse(localStorage.getItem('utensilsCart')) || [];
let products = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Product Data with Stock Photos
const productData = [
    // Kitchen Utensils
    {
        id: 1,
        name: "Professional Chef's Knife Set",
        category: "utensils",
        price: 89.99,
        originalPrice: 129.99,
        rating: 5,
        reviews: 234,
        image: "https://pixabay.com/get/ge0d3c1e8dc00cf03fa2659a38408f305e8c6e75da17f0686dc4735d694a2039a46cb976c3cfe08f195ce18c7bae15ca588fb13a0677aee6224c00bb50f23c8e1_1280.jpg",
        description: "High-quality stainless steel knife set with ergonomic handles",
        badge: "Sale",
        inStock: true
    },
    {
        id: 2,
        name: "Wooden Cooking Utensil Set",
        category: "utensils",
        price: 24.99,
        rating: 4,
        reviews: 156,
        image: "https://pixabay.com/get/g72b668665dfd2727fd70c8e7ef25982f2359d04a5032aa2e2f6e3781376f1b8dd30511bc496d3a7c56e02c162d194f5a1abaac9fde763981bcf05cba3be16a6f_1280.jpg",
        description: "Natural bamboo utensil set including spoons, spatulas, and tongs",
        inStock: true
    },
    {
        id: 3,
        name: "Silicone Kitchen Tools",
        category: "utensils",
        price: 34.99,
        rating: 4,
        reviews: 89,
        image: "https://pixabay.com/get/gc10c2cd5922d3d44bcb6abaeb85e72d62d7642e4647b4dbc524e95d209358262b6f4c0e0f57b08d75b8550930bc44bc54b2f49bd6832f374389f87400bea492e_1280.jpg",
        description: "Heat-resistant silicone cooking tools in various colors",
        inStock: true
    },
    {
        id: 4,
        name: "Stainless Steel Measuring Cups",
        category: "utensils",
        price: 19.99,
        rating: 5,
        reviews: 203,
        image: "https://pixabay.com/get/g8621ee3a2e86813fafe38e0c809c386ca984a59a4327f73766bb69e5c994ebd221a8b2a4878661b05981c9228a190663f26e9eca5002cf402fdf5f96722ba451_1280.jpg",
        description: "Precision measuring cups with easy-pour spouts",
        inStock: true
    },
    {
        id: 5,
        name: "Non-Stick Kitchen Utensils",
        category: "utensils",
        price: 29.99,
        rating: 4,
        reviews: 112,
        image: "https://pixabay.com/get/ge18f08de69f69222ee34389f6cf24b57b6b07864de1571ba79227aa50ed76aab18fc3e53e12bdafc79be20b942f460cf9d8d3f37945c37e59ff12d8452fa23b4_1280.jpg",
        description: "Non-scratch utensils perfect for non-stick cookware",
        inStock: true
    },
    {
        id: 6,
        name: "Premium Cutting Board Set",
        category: "utensils",
        price: 45.99,
        rating: 5,
        reviews: 178,
        image: "https://pixabay.com/get/gb4b382a8b368dff614be42282602ca4b2758bc1f4ab0dddbee237ff647dbf0f5347be0187827a5906df26ad551257cfd3978e88254d369b9ba0641f9e4cb5c15_1280.jpg",
        description: "Bamboo cutting boards in multiple sizes with juice grooves",
        inStock: true
    },
    {
        id: 7,
        name: "Kitchen Tongs Set",
        category: "utensils",
        price: 16.99,
        rating: 4,
        reviews: 95,
        image: "https://pixabay.com/get/g1103b9a9dd99091f4fcad09acdef8d88c8c016b29e37a5132d28f5db3a618e766992c7a7c41d8269b2b919cc97156f6007e1642466ea89e8f68a2d03dd50d019_1280.jpg",
        description: "Stainless steel tongs with comfortable grip handles",
        inStock: true
    },
    {
        id: 8,
        name: "Digital Kitchen Scale",
        category: "utensils",
        price: 39.99,
        rating: 5,
        reviews: 267,
        image: "https://pixabay.com/get/g2d73def25553c07a7fbcb90decba14ef9859e79e781b6e98779e25c2326206b304dc3735f5e815b0b944f8f32b3477752ce8beba04110dcce2622409743d5dcd_1280.jpg",
        description: "Precise digital scale with tare function and multiple units",
        badge: "New",
        inStock: true
    },

    // Steel Cookware
    {
        id: 9,
        name: "Stainless Steel Cookware Set",
        category: "cookware",
        price: 199.99,
        originalPrice: 299.99,
        rating: 5,
        reviews: 345,
        image: "https://pixabay.com/get/g18ba6ee32de5686d467ad23841d7f02653cb36cad0bcf068b1f9ee38976fadeee8c214d5b3cc6fd8c2b42af3e58940a631722037917c35c07748eca2f09b1f95_1280.jpg",
        description: "Professional-grade 10-piece stainless steel cookware set",
        badge: "Best Seller",
        inStock: true
    },
    {
        id: 10,
        name: "Steel Frying Pan Set",
        category: "cookware",
        price: 79.99,
        rating: 4,
        reviews: 189,
        image: "https://pixabay.com/get/g2b67170abf6fd4a2e5673eba09add99f45aed5c1bf868124461833dcef6b5c4216fb34a15427491573b729e683c2ad0780312a7ca7ca7f3f3d6d14c090644c14d59_1280.jpg",
        description: "Non-stick steel frying pans in multiple sizes",
        inStock: true
    },
    {
        id: 11,
        name: "Stainless Steel Pot Set",
        category: "cookware",
        price: 129.99,
        rating: 5,
        reviews: 156,
        image: "https://pixabay.com/get/g5486d880938a575f73b530a61a2441e843bf01f56f002695b2ddf0e53714d3a0254d5a3e22ae9d3528898cb7a93442fa64c2b7d72d3e40e8fecff92a6e7d9dae_1280.jpg",
        description: "Heavy-duty steel pots with tight-fitting lids",
        inStock: true
    },
    {
        id: 12,
        name: "Steel Steamer Insert",
        category: "cookware",
        price: 34.99,
        rating: 4,
        reviews: 78,
        image: "https://pixabay.com/get/g228ef7ef60b7677dab08ecdaea90d36ad58217a5856a7978f4d0e06ba56066b6fc3a60ce0525597634784c3b37d807cf2d6d1ccff3f2aaa81aee672cead830e3_1280.jpg",
        description: "Collapsible steamer insert for healthy cooking",
        inStock: true
    },
    {
        id: 13,
        name: "Professional Steel Wok",
        category: "cookware",
        price: 89.99,
        rating: 5,
        reviews: 234,
        image: "https://pixabay.com/get/g257fd10bb00fb67183b897e7ba8d7e48aeb22f5a56f22893a72fe20decf26c8ed4186c67dd6dc3641eb58cc1b2c2012be7f01faf8a1674cc5c92cf539afef27e_1280.jpg",
        description: "Traditional carbon steel wok with wooden handles",
        inStock: true
    },
    {
        id: 14,
        name: "Steel Pressure Cooker",
        category: "cookware",
        price: 149.99,
        rating: 5,
        reviews: 298,
        image: "https://pixabay.com/get/g3dbb215ed97938cc2425693a20bac7d7b1c9c739f479e5a6e9b6555a09ceb75123af4488cad50fbf5eaadb6fea9e33acc5ea3b4f483063fbf3914dab87f7a083_1280.jpg",
        description: "Multi-function pressure cooker with safety features",
        badge: "Featured",
        inStock: true
    },

    // Kitchen Accessories
    {
        id: 15,
        name: "Modern Spice Rack",
        category: "accessories",
        price: 59.99,
        rating: 4,
        reviews: 134,
        image: "https://pixabay.com/get/g78f1d4e75a289d4137c796c0f76d735c42a50e2745c14800be4989d163fede6ca2b7cf520f648235576602a67be842493b940ecaea44c5a0aa6d408b577ef376_1280.jpg",
        description: "Rotating spice rack with 20 glass containers",
        inStock: true
    },
    {
        id: 16,
        name: "Kitchen Storage Containers",
        category: "accessories",
        price: 49.99,
        rating: 5,
        reviews: 189,
        image: "https://pixabay.com/get/g3a52f694607b30eff520e4d48ce33e82f707bb87977232986351f3819619683a9e7ae896a12f852153df16b93e901d6a29884b1b84390750b9f9d4a293773331_1280.jpg",
        description: "Airtight storage containers in various sizes",
        inStock: true
    },
    {
        id: 17,
        name: "Digital Kitchen Timer",
        category: "accessories",
        price: 24.99,
        rating: 4,
        reviews: 89,
        image: "https://pixabay.com/get/g9190b1d3614459276672a93b901d894cb845bdd210b10217a47b5b9672d0cc917cd119022cfa62636e6299dac6b0747ae506481c5ed9085b818d1e8c065458e2_1280.jpg",
        description: "Multi-function digital timer with magnetic back",
        inStock: true
    },
    {
        id: 18,
        name: "Kitchen Organizer Set",
        category: "accessories",
        price: 39.99,
        rating: 4,
        reviews: 156,
        image: "https://pixabay.com/get/g4cdaae97a8b3d042f070d07e076441b151618aded9cd50bb1a6861e4e87938983241d1925f0e708c8dbc6a009565d6389d8ced76ce40ca07ce8cd474a9b04860_1280.jpg",
        description: "Drawer organizers and cabinet storage solutions",
        inStock: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    products = [...productData];
    filteredProducts = [...products];
    
    initializeApp();
    updateCartCount();
    
    // Load page-specific content
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
    } else if (window.location.pathname.includes('products.html')) {
        initializeProductsPage();
    } else if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    } else if (window.location.pathname.includes('checkout.html')) {
        loadCheckoutPage();
    } else if (window.location.pathname.includes('order-success.html')) {
        loadOrderSuccessPage();
    } else if (window.location.pathname.includes('faq.html')) {
        initializeFAQPage();
    }
});

// Initialize application
function initializeApp() {
    // Event listeners for common elements
    setupHeaderEventListeners();
    setupModalEventListeners();
    setupFormValidations();
    
    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubscription);
    });
}

// Header event listeners
function setupHeaderEventListeners() {
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
}

// Modal event listeners
function setupModalEventListeners() {
    // Login/Register forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Forgot password
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const password = document.getElementById('loginPassword');
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Cart modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', loadCartModal);
    }
}

// Form validations
function setupFormValidations() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutForm);
        
        // Billing address toggle
        const sameAsBilling = document.getElementById('sameAsBilling');
        if (sameAsBilling) {
            sameAsBilling.addEventListener('change', toggleBillingAddress);
        }
        
        // Payment method change
        const paymentMethods = document.querySelectorAll('input[name="payment"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', handlePaymentMethodChange);
        });
        
        // Shipping method change
        const shippingMethods = document.querySelectorAll('input[name="shipping"]');
        shippingMethods.forEach(method => {
            method.addEventListener('change', updateShippingCost);
        });
    }
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length >= 2) {
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        showSearchSuggestions(results, e.target);
    } else {
        hideSearchSuggestions();
    }
}

function performSearch(query) {
    if (query.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

function showSearchSuggestions(results, input) {
    hideSearchSuggestions();
    
    if (results.length === 0) return;
    
    const suggestions = document.createElement('div');
    suggestions.className = 'search-suggestions';
    suggestions.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    results.slice(0, 5).forEach(product => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.style.cssText = `
            padding: 0.75rem;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            display: flex;
            align-items: center;
        `;
        
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 0.75rem;">
            <div>
                <div style="font-weight: 500;">${product.name}</div>
                <div style="font-size: 0.875rem; color: #666;">$${product.price}</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            window.location.href = `products.html?id=${product.id}`;
        });
        
        suggestions.appendChild(item);
    });
    
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(suggestions);
}

function hideSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

// Authentication handlers
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Simulate login process
    showAlert('Login successful! Welcome back.', 'success');
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    
    // Store user session
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // Reset form
    e.target.reset();
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    if (password.length < 8) {
        showAlert('Password must be at least 8 characters long', 'danger');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    // Simulate registration process
    showAlert('Account created successfully! Please log in.', 'success');
    
    // Switch to login tab
    const loginTab = document.querySelector('[data-bs-target="#login"]');
    if (loginTab) {
        loginTab.click();
    }
    
    // Reset form
    e.target.reset();
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    if (!email) {
        showAlert('Please enter your email address', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    showAlert('Password reset link sent to your email', 'success');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
    modal.hide();
    
    e.target.reset();
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!firstName || !lastName || !email || !subject || !message) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        e.target.reset();
    }, 1000);
}

// Newsletter subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showAlert('Please enter your email address', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    showAlert('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Product functionality
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const featuredProducts = products.slice(0, 8);
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners for featured products
    featuredContainer.addEventListener('click', handleProductCardClick);
}

function createProductCard(product) {
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
    const originalPrice = product.originalPrice ? `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice}</span>` : '';
    
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    ${badge}
                </div>
                <div class="product-content">
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-price">
                        ${originalPrice}$${product.price}
                    </div>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="text-muted">(${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline-primary btn-sm quick-view" data-product-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleProductCardClick(e) {
    e.preventDefault();
    
    if (e.target.closest('.add-to-cart')) {
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.productId);
        addToCart(productId);
    } else if (e.target.closest('.quick-view')) {
        const productId = parseInt(e.target.closest('.quick-view').dataset.productId);
        showQuickView(productId);
    } else if (e.target.closest('.product-card')) {
        const productId = parseInt(e.target.closest('.product-card').dataset.productId);
        window.location.href = `products.html?id=${productId}`;
    }
}

// Cart functionality
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartCount();
    saveCart();
    showAlert(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    
    // Reload cart displays
    loadCartModal();
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    }
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartCount();
            saveCart();
            
            // Update displays
            loadCartModal();
            if (window.location.pathname.includes('cart.html')) {
                loadCartPage();
            }
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

function saveCart() {
    localStorage.setItem('utensilsCart', JSON.stringify(cart));
}

function loadCartModal() {
    const cartModalBody = document.getElementById('cartModalBody');
    if (!cartModalBody) return;
    
    if (cart.length === 0) {
        cartModalBody.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5>Your cart is empty</h5>
                <p class="text-muted">Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }
    
    const cartItems = cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-3">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <div class="d-flex align-items-center">
                    <span class="text-primary fw-bold me-3">$${item.price}</span>
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartModalBody.innerHTML = `
        ${cartItems}
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <h5>Total: $${total.toFixed(2)}</h5>
            <a href="cart.html" class="btn btn-outline-primary">View Cart</a>
        </div>
    `;
}

// Products page functionality
function initializeProductsPage() {
    loadProducts();
    setupProductFilters();
    setupProductSort();
    setupPagination();
    
    // Handle URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const searchQuery = urlParams.get('search');
    const productId = urlParams.get('id');
    
    if (category) {
        filterByCategory(category);
    }
    
    if (searchQuery) {
        filterBySearch(searchQuery);
        document.getElementById('productSearch').value = searchQuery;
    }
    
    if (productId) {
        showProductDetail(parseInt(productId));
    }
}

function loadProducts() {
    displayProducts();
    updateProductCount();
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5>No products found</h5>
                <p class="text-muted">Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" id="clearFilters">Clear All Filters</button>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    productsGrid.addEventListener('click', handleProductCardClick);
}

function setupProductFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[type="checkbox"][value]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Search
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', handleProductSearch);
    }
}

function setupProductSort() {
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[value="utensils"]:checked, input[value="cookware"]:checked, input[value="accessories"]:checked')).map(f => f.value);
    const priceFilters = Array.from(document.querySelectorAll('input[value*="-"]:checked')).map(f => f.value);
    const ratingFilters = Array.from(document.querySelectorAll('input[value="5"]:checked, input[value="4"]:checked, input[value="3"]:checked')).map(f => parseInt(f.value));
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (priceFilters.length > 0) {
            const matchesPrice = priceFilters.some(range => {
                if (range === '0-25') return product.price <= 25;
                if (range === '25-50') return product.price > 25 && product.price <= 50;
                if (range === '50-100') return product.price > 50 && product.price <= 100;
                if (range === '100-plus') return product.price > 100;
                return false;
            });
            if (!matchesPrice) return false;
        }
        
        // Rating filter
        if (ratingFilters.length > 0) {
            const matchesRating = ratingFilters.some(rating => product.rating >= rating);
            if (!matchesRating) return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    displayProducts();
    updateProductCount();
    updatePagination();
}

function handleProductSearch(e) {
    const query = e.target.value.toLowerCase();
    filterBySearch(query);
}

function filterBySearch(query) {
    if (!query) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    displayProducts();
    updateProductCount();
    updatePagination();
}

function filterByCategory(category) {
    const categoryFilter = document.querySelector(`input[value="${category}"]`);
    if (categoryFilter) {
        categoryFilter.checked = true;
        applyFilters();
    }
}

function handleSort(e) {
    const sortValue = e.target.value;
    
    switch (sortValue) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Featured - restore original order
            filteredProducts = products.filter(product => 
                filteredProducts.find(fp => fp.id === product.id)
            );
    }
    
    displayProducts();
}

function clearAllFilters() {
    // Clear all filter checkboxes
    const allFilters = document.querySelectorAll('.product-filters input[type="checkbox"]');
    allFilters.forEach(filter => filter.checked = false);
    
    // Clear search
    const productSearch = document.getElementById('productSearch');
    if (productSearch) productSearch.value = '';
    
    // Reset products
    filteredProducts = [...products];
    currentPage = 1;
    
    displayProducts();
    updateProductCount();
    updatePagination();
}

function updateProductCount() {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = `Showing ${filteredProducts.length} products`;
    }
}

// Pagination
function setupPagination() {
    updatePagination();
}

function updatePagination() {
    const paginationElement = document.getElementById('productsPagination');
    if (!paginationElement) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        paginationElement.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `;
    
    paginationElement.innerHTML = paginationHTML;
    
    // Add event listeners
    paginationElement.addEventListener('click', handlePagination);
}

function handlePagination(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('page-link') && !e.target.parentElement.classList.contains('disabled')) {
        const page = parseInt(e.target.dataset.page);
        if (page && page !== currentPage) {
            currentPage = page;
            displayProducts();
            updatePagination();
            
            // Scroll to top of products
            document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Quick view functionality
function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quickViewContent = document.getElementById('quickViewContent');
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    quickViewContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4>${product.name}</h4>
                <div class="mb-3">
                    <span class="stars text-warning">${stars}</span>
                    <span class="text-muted ms-2">(${product.reviews} reviews)</span>
                </div>
                <p class="text-muted">${product.description}</p>
                <div class="mb-3">
                    <span class="h4 text-primary">$${product.price}</span>
                    ${product.originalPrice ? `<span class="text-decoration-line-through text-muted ms-2">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="d-flex gap-2">
                    <div class="quantity-controls me-3">
                        <button class="btn btn-outline-secondary" id="qvDecrease">-</button>
                        <input type="number" class="form-control text-center" id="qvQuantity" value="1" min="1" style="width: 60px;">
                        <button class="btn btn-outline-secondary" id="qvIncrease">+</button>
                    </div>
                    <button class="btn btn-primary" id="qvAddToCart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for quick view
    document.getElementById('qvDecrease').addEventListener('click', () => {
        const qty = document.getElementById('qvQuantity');
        if (qty.value > 1) qty.value = parseInt(qty.value) - 1;
    });
    
    document.getElementById('qvIncrease').addEventListener('click', () => {
        const qty = document.getElementById('qvQuantity');
        qty.value = parseInt(qty.value) + 1;
    });
    
    document.getElementById('qvAddToCart').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('qvQuantity').value);
        addToCart(productId, quantity);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
        modal.hide();
    });
    
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    quickViewModal.show();
}

// Cart page functionality
function loadCartPage() {
    const cartItemsList = document.getElementById('cartItemsList');
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
                <h3>Your cart is empty</h3>
                <p class="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="btn btn-primary btn-lg">Start Shopping</a>
            </div>
        `;
        
        // Hide cart summary
        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) cartSummary.style.display = 'none';
        
        return;
    }
    
    cartItemsList.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    updateCartSummary();
    setupCartEventListeners();
    loadRelatedProducts();
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <p class="text-muted">Kitchen Essential</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="col-md-2">
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="form-control" value="${item.quantity}" min="1" data-product-id="${item.id}" style="width: 60px;">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function setupCartEventListeners() {
    // Clear cart
    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                cart = [];
                saveCart();
                updateCartCount();
                loadCartPage();
            }
        });
    }
    
    // Quantity input changes
    const quantityInputs = document.querySelectorAll('.quantity-controls input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.dataset.productId);
            const newQuantity = parseInt(this.value);
            updateCartQuantity(productId, newQuantity);
        });
    });
    
    // Promo code
    const applyPromoBtn = document.getElementById('applyPromo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    
    if (!promoCode) {
        showAlert('Please enter a promo code', 'warning');
        return;
    }
    
    // Simple promo code validation
    const validCodes = {
        'SAVE10': 0.10,
        'WELCOME': 0.15,
        'UTENSILS20': 0.20
    };
    
    if (validCodes[promoCode]) {
        const discount = validCodes[promoCode];
        showAlert(`Promo code applied! You saved ${(discount * 100)}%`, 'success');
        // In a real app, you'd update the cart with the discount
    } else {
        showAlert('Invalid promo code', 'danger');
    }
}

function loadRelatedProducts() {
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;
    
    // Get random products (excluding cart items)
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(p => !cartProductIds.includes(p.id));
    const relatedProducts = availableProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    relatedContainer.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
    relatedContainer.addEventListener('click', handleProductCardClick);
}

// Checkout page functionality
function loadCheckoutPage() {
    loadCheckoutItems();
    updateCheckoutSummary();
    
    // Update order date
    const orderDate = document.getElementById('orderDate');
    if (orderDate) {
        orderDate.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="order-item d-flex align-items-center mb-2">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" class="me-3">
            <div class="flex-grow-1">
                <div class="fw-bold">${item.name}</div>
                <small class="text-muted">Qty: ${item.quantity}</small>
            </div>
            <div class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = getShippingCost();
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function getShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 0;
    
    switch (selectedShipping.value) {
        case 'express': return 9.99;
        case 'overnight': return 24.99;
        default: return 0; // standard is free
    }
}

function updateShippingCost() {
    updateCheckoutSummary();
}

function toggleBillingAddress() {
    const sameAsBilling = document.getElementById('sameAsBilling');
    const billingSection = document.getElementById('billingSection');
    
    if (billingSection) {
        billingSection.style.display = sameAsBilling.checked ? 'none' : 'block';
    }
}

function handlePaymentMethodChange(e) {
    const creditCardForm = document.getElementById('creditCardForm');
    if (creditCardForm) {
        creditCardForm.style.display = e.target.value === 'credit' ? 'block' : 'none';
    }
}

function handleCheckoutForm(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = e.target.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    if (!isValid) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    // Validate email
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Simulate payment processing
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Generate order number
        const orderNumber = 'UT-2025-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        localStorage.setItem('lastOrderNumber', orderNumber);
        localStorage.setItem('lastOrderDate', new Date().toLocaleDateString());
        localStorage.setItem('lastOrderTotal', document.getElementById('checkoutTotal').textContent);
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    }, 2000);
}

// Order success page functionality
function loadOrderSuccessPage() {
    // Load order details from localStorage
    const orderNumber = localStorage.getItem('lastOrderNumber') || '#UT-2025-001234';
    const orderDate = localStorage.getItem('lastOrderDate') || new Date().toLocaleDateString();
    const orderTotal = localStorage.getItem('lastOrderTotal') || '$0.00';
    
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('orderDate').textContent = orderDate;
    
    // Load order items (use previous cart data or demo data)
    const orderItems = JSON.parse(localStorage.getItem('lastOrderItems') || '[]');
    loadOrderItems(orderItems);
    loadOrderSummary();
}

function loadOrderItems(items) {
    const orderItemsList = document.getElementById('orderItemsList');
    if (!orderItemsList) return;
    
    if (items.length === 0) {
        // Use demo data if no items
        items = [
            { name: "Professional Chef's Knife Set", price: 89.99, quantity: 1, image: products[0].image },
            { name: "Stainless Steel Cookware Set", price: 199.99, quantity: 1, image: products[8].image }
        ];
    }
    
    orderItemsList.innerHTML = items.map(item => `
        <div class="order-item d-flex align-items-center mb-3 p-3 border rounded">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" class="me-3">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <small class="text-muted">Quantity: ${item.quantity}</small>
            </div>
            <div class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function loadOrderSummary() {
    // Load from localStorage or use demo data
    const subtotal = 289.98;
    const shipping = 0;
    const tax = 23.20;
    const total = subtotal + shipping + tax;
    
    document.getElementById('orderSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('orderShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('orderTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
    
    // Load addresses
    document.getElementById('shippingAddress').innerHTML = `
        <p class="mb-1"><strong>John Doe</strong></p>
        <p class="mb-1">123 Main Street</p>
        <p class="mb-1">Anytown, ST 12345</p>
        <p class="mb-0">United States</p>
    `;
    
    document.getElementById('paymentMethod').innerHTML = `
        <p class="mb-1"><i class="fas fa-credit-card me-2"></i>Credit Card</p>
        <p class="mb-0">**** **** **** 1234</p>
    `;
}

// FAQ page functionality
function initializeFAQPage() {
    setupFAQCategories();
    setupFAQSearch();
}

function setupFAQCategories() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide categories
            const category = this.dataset.category;
            const faqCategories = document.querySelectorAll('.faq-category');
            
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.dataset.category === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

function setupFAQSearch() {
    const faqSearch = document.getElementById('faqSearch');
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.accordion-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.accordion-button').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
                
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showAlert('An unexpected error occurred. Please try again.', 'danger');
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.applyPromoCode = applyPromoCode;
