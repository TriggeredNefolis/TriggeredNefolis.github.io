// Products data
const products = [
    {
        id: '1',
        name: 'The Witcher 3: Wild Hunt - Complete Edition',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85',
        category: 'RPG',
        platform: 'PC/Console',
        description: 'Award-winning open-world RPG with all DLCs included. Experience Geralt\'s final adventure.',
        inStock: true
    },
    {
        id: '2',
        name: 'PlayStation 5 DualSense Controller',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85',
        category: 'Controller',
        platform: 'PlayStation 5',
        description: 'Next-gen wireless controller with haptic feedback and adaptive triggers.',
        inStock: true
    },
    {
        id: '3',
        name: 'Cyberpunk 2077',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85',
        category: 'Action RPG',
        platform: 'PC/Console',
        description: 'Open-world action-adventure RPG set in Night City. Now fully optimized!',
        inStock: true
    },
    {
        id: '4',
        name: 'Xbox Series X/S Wireless Controller',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1616341317041-cf93b2389ef5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85',
        category: 'Controller',
        platform: 'Xbox',
        description: 'Precision gaming controller with enhanced D-pad and textured grips.',
        inStock: true
    },
    {
        id: '5',
        name: 'God of War Ragnarök',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85',
        category: 'Action Adventure',
        platform: 'PlayStation',
        description: 'Epic Norse mythology adventure featuring Kratos and Atreus.',
        inStock: true
    },
    {
        id: '6',
        name: 'Gaming Headset Pro',
        price: 5500,
        image: 'https://images.pexels.com/photos/21067/pexels-photo.jpg',
        category: 'Accessory',
        platform: 'Universal',
        description: 'Professional gaming headset with 7.1 surround sound and noise cancellation.',
        inStock: true
    },
    {
        id: '7',
        name: 'Elden Ring',
        price: 3800,
        image: 'https://images.pexels.com/photos/4842487/pexels-photo-4842487.jpeg',
        category: 'Action RPG',
        platform: 'PC/Console',
        description: 'FromSoftware\'s masterpiece. Explore the Lands Between in this epic adventure.',
        inStock: true
    },
    {
        id: '8',
        name: 'Nintendo Switch Game Boy Edition',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1555864326-5cf22ef123cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85',
        category: 'Console',
        platform: 'Nintendo',
        description: 'Retro-styled Nintendo Switch with classic Game Boy aesthetics.',
        inStock: true
    }
];

// Cart functionality
let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
});

function loadProducts() {
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
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-overlay">
                <button class="btn btn-primary" onclick="addToCart('${product.id}')">
                    <i class="fas fa-plus"></i>
                    Add to Cart
                </button>
                <button class="btn btn-outline" onclick="buyNow('${product.id}')">
                    Buy Now
                </button>
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
                <span class="product-price">Rs. ${product.price.toLocaleString()}</span>
                <span class="product-stock">In Stock</span>
            </div>
        </div>
    `;
    
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Added to cart!', 'success');
}

function buyNow(productId) {
    // Clear cart and add this item
    cart = [];
    addToCart(productId);
    
    // Open cart modal
    setTimeout(() => {
        showCart();
    }, 100);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
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

function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const notes = document.getElementById('notes').value.trim();
    
    if (!name || !phone || !address) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Create order summary for Discord
    const orderSummary = cart.map(item => 
        `• ${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    // Send to Discord Webhook
    sendToDiscord(name, phone, email, address, notes, orderSummary);
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeOrder();
    document.getElementById('order-form').reset();
    
    // Show success and redirect
    showNotification('Order sent to Discord! Redirecting...', 'success');
    setTimeout(() => {
        window.open('https://discord.gg/XjuaQBFD8W', '_blank');
    }, 2000);
}

async function sendToDiscord(name, phone, email, address, notes, orderSummary) {
    // Your GamePort Nepal Discord Webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1406851782096846910/npe0FHRlNnqEDQ-NUFssyMn9Y_rqDB_wPXompXYmXwFK6H4eoBwF7wHV6hAJ_-plYxYl';
    
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
            console.log('Order sent to Discord successfully!');
        } else {
            throw new Error('Failed to send to Discord');
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
        // Fallback: still redirect to Discord for manual order
        showNotification('Webhook failed, but redirecting to Discord...', 'info');
    }
}

function showNotification(message, type) {
    // Create notification element
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
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const orderModal = document.getElementById('order-modal');
    
    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === orderModal) {
        closeOrder();
    }
}