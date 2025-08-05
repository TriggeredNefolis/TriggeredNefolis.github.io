// Simulated database in localStorage
const ADMIN_USERNAME = "GameportAdmin";
const ADMIN_PASSWORD = "NefoliRam";

function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function getProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
}
function setProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
function getReviews() {
    return JSON.parse(localStorage.getItem("reviews") || "[]");
}
function setReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
}
function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function showLogin() {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("signup-section").style.display = "none";
}
function showSignup() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "block";
}
function showShop() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("shop-section").style.display = "block";
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setCurrentUser({ username, isAdmin: true });
        loadShop();
        showShop();
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        setCurrentUser({ username, isAdmin: false });
        loadShop();
        showShop();
    } else {
        document.getElementById("login-msg").textContent = "Invalid credentials.";
    }
}
function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    let users = getUsers();
    if (!username || !password) {
        document.getElementById("signup-msg").textContent = "Please fill all fields.";
        return;
    }
    if (username === ADMIN_USERNAME) {
        document.getElementById("signup-msg").textContent = "This username is reserved.";
        return;
    }
    if (users.find(u => u.username === username)) {
        document.getElementById("signup-msg").textContent = "Username already exists.";
        return;
    }
    users.push({ username, password });
    setUsers(users);
    document.getElementById("signup-msg").textContent = "Signup successful. You can now login.";
}
function logout() {
    setCurrentUser(null);
    document.getElementById("shop-section").style.display = "none";
    showLogin();
}
function loadShop() {
    const user = getCurrentUser();
    document.getElementById("user-role").textContent = user.isAdmin ? "(Admin)" : `(${user.username})`;
    document.getElementById("admin-panel").style.display = user.isAdmin ? "block" : "none";
    loadProducts();
    loadReviews();
}
function loadProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    const products = getProducts();
    const user = getCurrentUser();
    products.forEach((p, idx) => {
        const li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `<span class="product-name">${p.name}</span> - $${p.price.toFixed(2)}`;
        if (user.isAdmin) {
            const del = document.createElement("button");
            del.textContent = "Delete";
            del.className = "delete-btn";
            del.onclick = () => deleteProduct(idx);
            li.appendChild(del);
        }
        list.appendChild(li);
    });
}
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    if (!name || isNaN(price)) return;
    const products = getProducts();
    products.push({ name, price });
    setProducts(products);
    loadProducts();
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
}
function deleteProduct(idx) {
    let products = getProducts();
    products.splice(idx, 1);
    setProducts(products);
    loadProducts();
}
function loadReviews() {
    const reviews = getReviews();
    const ul = document.getElementById("reviews");
    ul.innerHTML = "";
    reviews.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="review-author">${r.author}:</span> ${r.text}`;
        ul.appendChild(li);
    });
}
function addReview() {
    const user = getCurrentUser();
    if (!user) return;
    const text = document.getElementById("review-input").value;
    if (!text) return;
    const reviews = getReviews();
    reviews.push({ author: user.username, text });
    setReviews(reviews);
    loadReviews();
    document.getElementById("review-input").value = "";
}

// Auto show shop if already logged in
window.onload = function() {
    if (!getUsers().length) setUsers([]); // initialize users
    if (!getProducts().length) setProducts([]); // initialize products
    if (!getReviews().length) setReviews([]); // initialize reviews
    const user = getCurrentUser();
    if (user) {
        loadShop();
        showShop();
    }
};