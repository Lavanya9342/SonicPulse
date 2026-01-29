// --- PRODUCT DATA ---
const products = [
    { id: 1, name: "Sonic Pro X", type: "Wireless / Over-Ear", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", description: "Experience professional-grade sound with the Sonic Pro X. Featuring advanced active noise cancellation and 40-hour battery life." },
    { id: 2, name: "BassMaster 3000", type: "Wired / Studio", price: 149.99, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80", description: "Designed for bass lovers and studio mixing. The closed-back design ensures maximum isolation and punchy low-end frequencies." },
    { id: 4, name: "Retro Gold", type: "Wired / On-Ear", price: 199.99, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80", description: "Vintage aesthetics meet modern audio technology. Premium leather ear pads and gold-plated connectors for a luxurious feel." },
    { id: 5, name: "Sony WH-1000XM5", type: "Noise Cancelling", price: 348.00, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80", description: "Industry-leading noise cancellation. Automatic noise optimization based on your wearing conditions and environment." },
    { id: 6, name: "Marshall Major IV", type: "On-Ear / Retro", price: 149.00, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80", description: "Iconic Marshall design with 80+ hours of wireless playtime, wireless charging, and an improved ergonomic design." },
    { id: 8, name: "Audio-Technica M50x", type: "Studio Monitor", price: 169.00, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80", description: "Acclaimed sonic performance, praised by top audio engineers and pro audio reviewers. Exceptional clarity." },
    { id: 9, name: "JBL Tune 760NC", type: "Wireless / Bass", price: 99.95, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", description: "Pure Bass Sound. Lightweight and foldable design, perfect for everyday use with active noise cancelling." },
    { id: 10, name: "Beats Studio 3", type: "Wireless / Fashion", price: 249.99, image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=800&q=80", description: "High-performance wireless noise cancelling headphones. Compatible with iOS and Android devices." },
    { id: 11, name: "Skullcandy Crusher", type: "Haptic Bass", price: 189.99, image: "https://images.unsplash.com/photo-1519326844852-704caea5679e?auto=format&fit=crop&w=800&q=80", description: "Bass you can feel. Adjustable sensory bass and personal sound customization for a unique experience." },
    { id: 12, name: "Bowers & Wilkins Px7", type: "Luxury Wireless", price: 399.00, image: "https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=800&q=80", description: "High-resolution audio performance with adaptive noise cancellation and premium carbon fiber composite arms." },
    { id: 13, name: "AKG Pro Audio K72", type: "Closed-Back Studio", price: 49.00, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80", description: "Professional drivers for solid bass and clear highs. The self-adjusting headband ensures a comfortable fit." },
    { id: 14, name: "Bang & Olufsen H95", type: "High-End Luxury", price: 899.00, image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80", description: "Ultimate over-ear headphones with world-class noise cancellation, titanium drivers, and lambskin ear cushions." },

];

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentDetailProductId = null; 

// --- SELECTORS ---
const productGrid = document.getElementById('product-grid');
const featuredGrid = document.getElementById('featured-grid'); 
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const grandTotalElement = document.getElementById('grand-total');

// Views
const homeView = document.getElementById('home-view');
const productsView = document.getElementById('products-view');
const cartView = document.getElementById('cart-view');
const productDetailsView = document.getElementById('product-details-view');
const contactView = document.getElementById('contact-view');
const aboutView = document.getElementById('about-view');

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadFeaturedProducts();
    updateCartCount();
});

// --- NAVIGATION LOGIC ---
function navigateTo(page) {
    // Hide all views
    homeView.classList.add('hidden');
    productsView.classList.add('hidden');
    cartView.classList.add('hidden');
    productDetailsView.classList.add('hidden');
    contactView.classList.add('hidden');
    aboutView.classList.add('hidden');
    
    navLinks.classList.remove('active'); // Close mobile menu

    if (page === 'home') {
        homeView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (page === 'products') {
        productsView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (page === 'cart') {
        cartView.classList.remove('hidden');
        renderCartItems();
        window.scrollTo(0, 0);
    } else if (page === 'product-details') {
        productDetailsView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (page === 'contact') {
        contactView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (page === 'about') {
        aboutView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (page === 'reviews') {
        homeView.classList.remove('hidden');
        setTimeout(() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' }), 10);
    }
}

// --- LOADING PRODUCTS ---
function loadProducts() {
    productGrid.innerHTML = '';
    createProductCards(products, productGrid);
}

function loadFeaturedProducts() {
    featuredGrid.innerHTML = '';
    createProductCards(products.slice(0, 4), featuredGrid);
}

// Helper: Create Cards
function createProductCards(items, container) {
    items.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Clicking card opens Details View (unless clicking the button)
        card.onclick = (e) => {
            if (!e.target.classList.contains('btn')) {
                openProductDetails(product.id);
            }
        };

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-type">${product.type}</p>
                <span class="price">$${product.price}</span>
                <button class="btn" onclick="addToCart(${product.id}, 1)">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- PRODUCT DETAILS LOGIC ---
function openProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentDetailProductId = id;

    // Populate Data
    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-name').innerText = product.name;
    document.getElementById('detail-type').innerText = product.type;
    document.getElementById('detail-price').innerText = "$" + product.price;
    document.getElementById('detail-desc').innerText = product.description;
    
    // Reset Quantity
    document.getElementById('detail-qty').value = 1;

    // Load Related Products (Random 3 excluding current)
    const related = products.filter(p => p.id !== id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const relatedGrid = document.getElementById('related-grid');
    relatedGrid.innerHTML = '';
    createProductCards(related, relatedGrid);

    // Setup Add to Cart Button for this page
    const addBtn = document.getElementById('add-to-cart-detail-btn');
    addBtn.onclick = () => {
        const qty = parseInt(document.getElementById('detail-qty').value);
        addToCart(product.id, qty);
    };

    navigateTo('product-details');
}

function updateDetailQty(change) {
    const input = document.getElementById('detail-qty');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}

// --- CART LOGIC ---
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    saveCart();
    updateCartCount();
    
    // Animation
    const badge = document.getElementById('cart-count');
    badge.classList.remove('bump'); // reset
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems(); 
    updateCartCount();
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId);
        else {
            saveCart();
            renderCartItems();
            updateCartCount();
        }
    }
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        grandTotalElement.innerText = "$0.00";
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div style="display:flex; align-items:center;">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                </div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="item-total">$${itemTotal.toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    grandTotalElement.innerText = "$" + grandTotal.toFixed(2);
}

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
}

// --- EXTRAS ---
hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });

const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Message sent! We will contact you shortly.");
        contactForm.reset();
    });
}