// Products data - GamePort Nepal Digital Store
const products = [
    // Special Items
    {
        id: '1',
        name: 'Menace Cape',
        price: 250,
        image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=300&fit=crop&crop=center',
        category: 'Cosmetic',
        platform: 'Game Item',
        description: 'Exclusive Menace Cape for your gaming character. Stand out in style!',
        inStock: true
    },
    
    // PUBG UC Packages
    {
        id: '2',
        name: 'PUBG UC - 60 UC',
        price: 150,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash - 60 UC for in-game purchases and upgrades.',
        inStock: true
    },
    {
        id: '3',
        name: 'PUBG UC - 120 UC',
        price: 295,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash - 120 UC for in-game purchases and upgrades.',
        inStock: true
    },
    {
        id: '4',
        name: 'PUBG UC - 325 UC',
        price: 762,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash - 325 UC for in-game purchases and upgrades.',
        inStock: true
    },
    {
        id: '5',
        name: 'PUBG UC - 660 UC',
        price: 1485,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash - 660 UC for in-game purchases and upgrades.',
        inStock: true
    },
    {
        id: '6',
        name: 'PUBG UC - 985 UC',
        price: 2231,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'PUBG Mobile',
        description: 'PUBG Unknown Cash - 985 UC for in-game purchases and upgrades.',
        inStock: true
    },

    // Free Fire Diamonds - Popular Packages
    {
        id: '7',
        name: 'Free Fire - 115 Diamonds',
        price: 90,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds - 115💎 for characters, skins and upgrades. UID Required.',
        inStock: true
    },
    {
        id: '8',
        name: 'Free Fire - 240 Diamonds',
        price: 180,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds - 240💎 for characters, skins and upgrades. UID Required.',
        inStock: true
    },
    {
        id: '9',
        name: 'Free Fire - 610 Diamonds',
        price: 435,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds - 610💎 for characters, skins and upgrades. UID Required.',
        inStock: true
    },
    {
        id: '10',
        name: 'Free Fire - 1240 Diamonds',
        price: 855,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds - 1240💎 for characters, skins and upgrades. UID Required.',
        inStock: true
    },
    {
        id: '11',
        name: 'Free Fire - 5060 Diamonds',
        price: 3410,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Free Fire',
        description: 'Free Fire Diamonds - 5060💎 MEGA PACK for characters, skins and upgrades. UID Required.',
        inStock: true
    },

    // Free Fire Passes
    {
        id: '12',
        name: 'Free Fire Weekly Pass',
        price: 175,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Pass',
        platform: 'Free Fire',
        description: 'Free Fire Weekly Pass - Unlock exclusive rewards and benefits.',
        inStock: true
    },
    {
        id: '13',
        name: 'Free Fire Monthly Pass',
        price: 860,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Pass',
        platform: 'Free Fire',
        description: 'Free Fire Monthly Pass - Unlock exclusive rewards and benefits.',
        inStock: true
    },
    {
        id: '14',
        name: 'Free Fire Combo Pass (Weekly + Monthly)',
        price: 1020,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop&crop=center',
        category: 'Game Pass',
        platform: 'Free Fire',
        description: '🔥 COMBO OFFER! Weekly + Monthly Pass bundle - Best value deal!',
        inStock: true
    },

    // Discord Nitro
    {
        id: '15',
        name: 'Discord Nitro Basic - 1 Month',
        price: 440,
        image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&h=300&fit=crop&crop=center',
        category: 'Subscription',
        platform: 'Discord',
        description: 'Discord Nitro Basic subscription - Enhanced chat features and perks.',
        inStock: true
    },
    {
        id: '16',
        name: 'Discord Nitro - 1 Month',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&h=300&fit=crop&crop=center',
        category: 'Subscription',
        platform: 'Discord',
        description: 'Discord Nitro Premium subscription - All features unlocked.',
        inStock: true
    },

    // Roblox & Minecraft
    {
        id: '17',
        name: 'Roblox 400 Robux Gift Card',
        price: 720,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=300&fit=crop&crop=center',
        category: 'Game Currency',
        platform: 'Roblox',
        description: 'Roblox Digital Gift Card - 400 Robux for games, accessories, and upgrades.',
        inStock: true
    },
    {
        id: '18',
        name: 'Minecraft Account (Java + Bedrock)',
        price: 3999,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
        category: 'Game Account',
        platform: 'PC/Mobile',
        description: 'Brand New Minecraft Account with Java + Bedrock editions included.',
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