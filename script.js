// Advanced Product System with Sub-Products & Admin Management
let products = [
    {
        id: '1',
        name: 'Free Fire Diamonds',
        basePrice: 90,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '1-1', name: '115 Diamonds', price: 90, description: '115💎 Basic Pack' },
            { id: '1-2', name: '240 Diamonds', price: 180, description: '240💎 Popular Choice' },
            { id: '1-3', name: '610 Diamonds', price: 435, description: '610💎 Best Value' },
            { id: '1-4', name: '1240 Diamonds', price: 855, description: '1240💎 Premium Pack' },
            { id: '1-5', name: '5060 Diamonds', price: 3410, description: '5060💎 MEGA PACK' }
        ],
        inStock: true
    },
    {
        id: '2',
        name: 'PUBG UC',
        basePrice: 150,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '2-1', name: '60 UC', price: 150, description: '60 UC Basic Pack' },
            { id: '2-2', name: '120 UC', price: 295, description: '120 UC Popular Choice' },
            { id: '2-3', name: '325 UC', price: 762, description: '325 UC Great Value' },
            { id: '2-4', name: '660 UC', price: 1485, description: '660 UC Best Deal' },
            { id: '2-5', name: '985 UC', price: 2231, description: '985 UC Premium Pack' }
        ],
        inStock: true
    },
    {
        id: '3',
        name: 'Minecraft Account (Java + Bedrock)',
        basePrice: 3999,
        image: 'https://tse3.mm.bing.net/th/id/OIP.KO2HbRC_h67s9ACdI4VyzAHaDu?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Game Account',
        platform: 'PC/Mobile',
        description: 'Brand New Minecraft Account with Java + Bedrock editions included.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4',
        name: 'Discord Nitro',
        basePrice: 440,
        image: 'https://tse4.mm.bing.net/th/id/OIP.htlr6BrX9NbKhKFN6uQabgHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Subscription',
        platform: 'Discord',
        description: 'Discord Nitro subscription with enhanced features.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '4-1', name: 'Nitro Basic - 1 Month', price: 440, description: 'Basic features and perks' },
            { id: '4-2', name: 'Nitro Premium - 1 Month', price: 1499, description: 'All features unlocked' }
        ],
        inStock: true
    },
    {
        id: '5',
        name: 'Roblox Robux',
        basePrice: 720,
        image: 'https://thfvnext.bing.com/th/id/OIP.J-WwjuivvLUHs1bRtOw6hwHaIy?r=0&o=7&cb=thfvnextrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Game Currency',
        platform: 'Roblox',
        description: 'Roblox Robux for games, accessories, and upgrades.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '5-1', name: '400 Robux Gift Card', price: 720, description: 'Digital Gift Card' }
        ],
        inStock: true
    },
    {
        id: '6',
        name: 'Menace Cape',
        basePrice: 250,
        image: 'https://minecraft.wiki/images/Menace_cape_artwork.png?0f97f&format=original',
        category: 'Cosmetic',
        platform: 'Minecraft',
        description: 'Exclusive Menace Cape for your Minecraft character.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    }
];

// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'helpiamlaggy@gmail.com',
    password: 'Triggared_nefolis1'
};

// Admin session
let isAdminLoggedIn = false;

// Cart functionality
let cart = [];

// Load products and setup on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    checkAdminSession();
});

// Admin Functions
function showAdminLogin() {
    if (isAdminLoggedIn) {
        showAdminPanel();
    } else {
        document.getElementById('admin-login-modal').style.display = 'block';
    }
}

function closeAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'none';
    document.getElementById('admin-error').style.display = 'none';
}

function adminLogin(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const errorDiv = document.getElementById('admin-error');
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        localStorage.setItem('gameport_admin', 'true');
        closeAdminLogin();
        showAdminPanel();
        updateAdminButton();
        showNotification('Admin login successful!', 'success');
    } else {
        errorDiv.textContent = 'Invalid credentials! Please try again.';
        errorDiv.style.display = 'block';
        showNotification('Invalid admin credentials!', 'error');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    localStorage.removeItem('gameport_admin');
    closeAdminPanel();
    updateAdminButton();
    showNotification('Admin logged out', 'info');
}

function checkAdminSession() {
    if (localStorage.getItem('gameport_admin')) {
        isAdminLoggedIn = true;
        updateAdminButton();
    }
}

function updateAdminButton() {
    const adminBtn = document.getElementById('admin-btn');
    if (isAdminLoggedIn) {
        adminBtn.innerHTML = '<i class="fas fa-user-shield"></i> Admin Panel';
        adminBtn.classList.add('admin-active');
    } else {
        adminBtn.innerHTML = '<i class="fas fa-user-shield"></i> Admin';
        adminBtn.classList.remove('admin-active');
    }
}

function showAdminPanel() {
    if (!isAdminLoggedIn) {
        showAdminLogin();
        return;
    }
    
    document.getElementById('admin-panel-modal').style.display = 'block';
    loadAdminProducts();
}

function closeAdminPanel() {
    document.getElementById('admin-panel-modal').style.display = 'none';
}

function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

function loadAdminProducts() {
    const adminList = document.getElementById('admin-products-list');
    adminList.innerHTML = '';
    
    products.forEach(product => {
        const discountedPrice = product.basePrice - (product.basePrice * product.discount / 100);
        const adminProductCard = document.createElement('div');
        adminProductCard.className = 'admin-product-card';
        
        adminProductCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p class="admin-product-platform">${product.platform}</p>
                <p class="admin-product-price">Rs. ${discountedPrice.toLocaleString()}
                    ${product.discount > 0 ? `<span class="original-price">Rs. ${product.basePrice.toLocaleString()}</span>` : ''}
                </p>
                ${product.discount > 0 ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
                ${product.hasSubProducts ? `<span class="sub-badge">${product.subProducts.length} Sub-Products</span>` : ''}
            </div>
            <div class="admin-product-actions">
                <button class="btn btn-outline btn-sm" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm" onclick="setDiscount('${product.id}')">
                    <i class="fas fa-percentage"></i> Discount
                </button>
                <button class="btn btn-outline btn-sm danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        adminList.appendChild(adminProductCard);
    });
}

function addProduct(event) {
    event.preventDefault();
    
    const newProduct = {
        id: Date.now().toString(),
        name: document.getElementById('product-name').value,
        basePrice: parseInt(document.getElementById('product-price').value),
        image: document.getElementById('product-image').value,
        category: document.getElementById('product-category').value,
        platform: document.getElementById('product-platform').value,
        description: document.getElementById('product-description').value,
        discount: 0,
        hasSubProducts: false,
        inStock: true
    };
    
    products.push(newProduct);
    saveProducts();
    loadProducts();
    loadAdminProducts();
    
    // Reset form
    document.getElementById('add-product-form').reset();
    
    showNotification('Product added successfully!', 'success');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Fill form with existing data
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.basePrice;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-platform').value = product.platform;
    document.getElementById('product-description').value = product.description;
    
    // Switch to add product tab (which becomes edit mode)
    showTab('add-product');
    
    // Change the form submit to edit mode
    const form = document.getElementById('add-product-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateProduct(productId);
    };
    
    // Change button text
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Product';
}

function updateProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    product.name = document.getElementById('product-name').value;
    product.basePrice = parseInt(document.getElementById('product-price').value);
    product.image = document.getElementById('product-image').value;
    product.category = document.getElementById('product-category').value;
    product.platform = document.getElementById('product-platform').value;
    product.description = document.getElementById('product-description').value;
    
    saveProducts();
    loadProducts();
    loadAdminProducts();
    
    // Reset form and button
    document.getElementById('add-product-form').reset();
    document.getElementById('add-product-form').onsubmit = addProduct;
    const submitBtn = document.querySelector('#add-product-form button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Product';
    
    showNotification('Product updated successfully!', 'success');
}

function setDiscount(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const discount = prompt(`Set discount for ${product.name} (0-100%):`, product.discount);
    if (discount !== null) {
        const discountNum = parseInt(discount);
        if (discountNum >= 0 && discountNum <= 100) {
            product.discount = discountNum;
            saveProducts();
            loadProducts();
            loadAdminProducts();
            showNotification(`Discount set to ${discountNum}%`, 'success');
        } else {
            showNotification('Invalid discount percentage!', 'error');
        }
    }
}

function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        loadProducts();
        loadAdminProducts();
        showNotification('Product deleted successfully!', 'success');
    }
}

function saveProducts() {
    localStorage.setItem('gameport_products', JSON.stringify(products));
}

function loadStoredProducts() {
    const stored = localStorage.getItem('gameport_products');
    if (stored) {
        products = JSON.parse(stored);
    }
}

// Product Display Functions
function loadProducts() {
    loadStoredProducts();
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discountedPrice = product.basePrice - (product.basePrice * product.discount / 100);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.discount > 0 ? `<div class="discount-overlay">${product.discount}% OFF</div>` : ''}
            <div class="product-overlay">
                ${product.hasSubProducts ? `
                    <button class="btn btn-primary" onclick="showSubProducts('${product.id}')">
                        <i class="fas fa-list"></i>
                        View Options
                    </button>
                ` : `
                    <button class="btn btn-primary" onclick="addToCart('${product.id}')">
                        <i class="fas fa-plus"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="buyNow('${product.id}')">
                        Buy Now
                    </button>
                `}
            </div>
        </div>
        <div class="product-info">
            <div class="product-header">
                <div>
                    <h4 class="product-title">${product.name}</h4>
                    <span class="product-platform">${product.platform}</span>
                </div>
                <span class="product-category">${product.category}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">
                    Rs. ${discountedPrice.toLocaleString()}
                    ${product.discount > 0 ? `<span class="original-price">Rs. ${product.basePrice.toLocaleString()}</span>` : ''}
                </span>
                <span class="product-stock">In Stock</span>
            </div>
        </div>
    `;
    
    return card;
}

function showSubProducts(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.hasSubProducts) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'sub-products-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h4>${product.name} - Choose Option</h4>
                <span class="close" onclick="closeSubProducts()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="sub-products-grid">
                    ${product.subProducts.map(subProduct => {
                        const discountedPrice = subProduct.price - (subProduct.price * product.discount / 100);
                        return `
                            <div class="sub-product-card" onclick="addSubProductToCart('${product.id}', '${subProduct.id}')">
                                <h5>${subProduct.name}</h5>
                                <p class="sub-product-desc">${subProduct.description}</p>
                                <p class="sub-product-price">
                                    Rs. ${discountedPrice.toLocaleString()}
                                    ${product.discount > 0 ? `<span class="original-price">Rs. ${subProduct.price.toLocaleString()}</span>` : ''}
                                </p>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeSubProducts() {
    const modal = document.getElementById('sub-products-modal');
    if (modal) {
        modal.remove();
    }
}

function addSubProductToCart(productId, subProductId) {
    const product = products.find(p => p.id === productId);
    const subProduct = product.subProducts.find(sp => sp.id === subProductId);
    
    if (!product || !subProduct) return;
    
    const discountedPrice = subProduct.price - (subProduct.price * product.discount / 100);
    const existingItem = cart.find(item => item.id === subProductId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: subProductId,
            name: `${product.name} - ${subProduct.name}`,
            price: discountedPrice,
            image: product.image,
            quantity: 1,
            parentProduct: product.name
        });
    }
    
    updateCartCount();
    closeSubProducts();
    showNotification(`${subProduct.name} added to cart!`, 'success');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const discountedPrice = product.basePrice - (product.basePrice * product.discount / 100);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: discountedPrice,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Added to cart!', 'success');
}

function buyNow(productId) {
    addToCart(productId);
    setTimeout(() => showCart(), 100);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartModal();
    showNotification('Removed from cart', 'info');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function showCart() {
    updateCartModal();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #64748b; padding: 40px;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                    <span class="cart-item-quantity">Qty: ${item.quantity}</span>
                </div>
            </div>
            <span class="remove-item" onclick="removeFromCart('${item.id}')">
                <i class="fas fa-times"></i>
            </span>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = calculateTotal().toLocaleString();
}

function proceedToOrder() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    closeCart();
    updateOrderModal();
    document.getElementById('order-modal').style.display = 'block';
}

function closeOrder() {
    document.getElementById('order-modal').style.display = 'none';
}

function updateOrderModal() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    orderItems.innerHTML = '';
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
        `;
        orderItems.appendChild(orderItem);
    });
    
    orderTotal.textContent = calculateTotal().toLocaleString();
}

async function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const notes = document.getElementById('notes').value.trim();
    
    if (!name || !phone || !address) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Send to Discord webhook
    await sendToDiscord(name, phone, email, address, notes);
}

async function sendToDiscord(name, phone, email, address, notes) {
    const webhookUrl = 'https://discord.com/api/webhooks/1406851782096846910/npe0FHRlNnqEDQ-NUFssyMn9Y_rqDB_wPXompXYmXwFK6H4eoBwF7wHV6hAJ_-plYxYl';
    
    const orderSummary = cart.map(item => 
        `• ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const embed = {
        title: '🎮 New Order - GamePort Nepal',
        color: 0x10b981,
        fields: [
            { name: '👤 Customer', value: name, inline: true },
            { name: '📞 Phone', value: phone, inline: true },
            { name: '📧 Email', value: email || 'Not provided', inline: true },
            { name: '📍 Address', value: address, inline: false },
            { name: '🛒 Items', value: orderSummary, inline: false },
            { name: '💰 Total', value: `Rs. ${calculateTotal().toLocaleString()}`, inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'GamePort Nepal • Order Management' }
    };
    
    if (notes) {
        embed.fields.push({ name: '📝 Notes', value: notes, inline: false });
    }
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
        
        if (response.ok) {
            // Clear cart and close modals
            cart = [];
            updateCartCount();
            closeOrder();
            document.getElementById('order-form').reset();
            
            showNotification('Order sent successfully! Redirecting to Discord...', 'success');
            setTimeout(() => {
                window.open('https://discord.gg/XjuaQBFD8W', '_blank');
            }, 2000);
        } else {
            throw new Error('Failed to send to Discord');
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
        showNotification('Order failed, but redirecting to Discord for manual order...', 'info');
        setTimeout(() => {
            window.open('https://discord.gg/XjuaQBFD8W', '_blank');
        }, 2000);
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#06b6d4'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const orderModal = document.getElementById('order-modal');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminPanelModal = document.getElementById('admin-panel-modal');
    const subProductsModal = document.getElementById('sub-products-modal');
    
    if (event.target === cartModal) closeCart();
    if (event.target === orderModal) closeOrder();
    if (event.target === adminLoginModal) closeAdminLogin();
    if (event.target === adminPanelModal) closeAdminPanel();
    if (event.target === subProductsModal) closeSubProducts();
};