const products = [
    { id: 1, name: "Product 1", category: "electronics", price: 100, rating: 4 },
    { id: 2, name: "Product 2", category: "clothing", price: 50, rating: 3 },
    { id: 3, name: "Product 3", category: "electronics", price: 200, rating: 5 },
    { id: 4, name: "Product 4", category: "clothing", price: 75, rating: 4 },
];

const productList = document.querySelector(".product-list");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const sortOptions = document.getElementById("sort-options");

function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
        const productHTML = `
            <div class="product">
                <h2>${product.name}</h2>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}/5</p>
            </div>
        `;
        productList.insertAdjacentHTML("beforeend", productHTML);
    });
}

renderProducts(products);

function saveFilterToLocalStorage() {
    localStorage.setItem("filters", JSON.stringify({
        category: categoryFilter.value,
        price: priceFilter.value,
        sort: sortOptions.value
    }));
}

function loadFilters() {
    const filters = JSON.parse(localStorage.getItem("filters"));
    if (filters) {
        categoryFilter.value = filters.category;
        priceFilter.value = filters.price;
        sortOptions.value = filters.sort;
    }
}

loadFilters();

categoryFilter.addEventListener("change", () => {
    saveFilterToLocalStorage();
    renderProducts(products.filter((p) => categoryFilter.value === "all" || p.category === categoryFilter.value));
});

priceFilter.addEventListener("change", () => {
    saveFilterToLocalStorage();
    const sorted = [...products];
    sorted.sort(priceFilter.value === "low-to-high" ? (a, b) => a.price - b.price : (b, a) => a.price - b.price);
    renderProducts(priceFilter.value === "all" ? products : sorted);
});

sortOptions.addEventListener("change", () => {
    saveFilterToLocalStorage();
    const sorted = [...products];
    sorted.sort(sortOptions.value === "rating" ? (b, a) => a.rating - b.rating : (a, b) => a.price - b.price);
    renderProducts(sorted);
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Form validation
document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        alert("All fields must be filled!");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Message sent successfully!");
});
