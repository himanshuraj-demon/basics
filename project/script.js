// ================= PRODUCTS =================

const products = [

    {
        id: 1,
        name: "Laptop",
        category: "electronics",
        price: 55000,
        icon: "💻"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        icon: "🎧"
    },

    {
        id: 3,
        name: "Smart Watch",
        category: "accessories",
        price: 3999,
        icon: "⌚"
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 2999,
        icon: "👟"
    },

    {
        id: 5,
        name: "Smartphone",
        category: "electronics",
        price: 24999,
        icon: "📱"
    },

    {
        id: 6,
        name: "Backpack",
        category: "fashion",
        price: 1499,
        icon: "🎒"
    },

    {
        id: 7,
        name: "Sunglasses",
        category: "accessories",
        price: 999,
        icon: "🕶️"
    },

    {
        id: 8,
        name: "Gaming Mouse",
        category: "electronics",
        price: 1299,
        icon: "🖱️"
    }

];


// Cart array

let cart = [];


// ================= DISPLAY PRODUCTS =================

function displayProducts(productList) {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existing =
        cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    let total = 0;
    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(div);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


// ================= CHANGE QUANTITY =================

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item =>
                item.id !== productId
            );

    }


    updateCart();

}


// ================= REMOVE =================

function removeFromCart(productId) {

    cart =
        cart.filter(item =>
            item.id !== productId
        );

    updateCart();

}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


// ================= SEARCH =================

function searchProducts() {

    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("category")
            .value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return matchesSearch &&
                   matchesCategory;

        });


    displayProducts(filtered);

}


// ================= CATEGORY =================

function filterProducts() {

    searchProducts();

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping with ShopEase! 🎉"
    );

    cart = [];

    updateCart();

    closeCart();

}


// ================= INITIAL LOAD =================

displayProducts(products);

updateCart();