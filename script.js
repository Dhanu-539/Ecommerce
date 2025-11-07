// =====================
// E-Commerce JS Logic
// =====================

// ---------- Sample Products ----------
const products = [
  { id: 1, name: "Smartphone", price: 12000, category: "electronics", img: "https://thetechteam.com.au/wp-content/uploads/2024/12/AVEcca7TuDmt8wjaFZPkzj-1200-80.jpg" },
  { id: 2, name: "Headphones", price: 899, category: "electronics", img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495" },
  { id: 3, name: "Men's Jacket", price: 2499, category: "fashion", img: "https://cdn.pixabay.com/photo/2017/10/06/04/32/jacket-2821961_1280.jpg" },
  { id: 4, name: "LED TV", price: 32000, category: "electronics", img: "https://5.imimg.com/data5/BO/MV/GN/SELLER-5541525/led-tv.png" },
  { id: 5, name: "Sofa Cushion", price: 799, category: "home", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTCaksDQ4itHAF9jgd1vcJMxZ9D5rrlUyPJg&s" },
  { id: 6, name: "Mixer Grinder", price: 2199, category: "home", img: "https://m.media-amazon.com/images/I/61arz2nJBbL._AC_UF894,1000_QL80_.jpg" },
  { id: 7, name: "One plus Phone",price:14099,category:"electronics",img:"https://m.media-amazon.com/images/I/61amb0CfMGL.jpg" },
  { id: 8, name: "Hp Pavilion Laptop",price:540000,category:"electronics",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBs-h6m8ACsaFCAJAtPAyGxVjLIzBGOrulQ&s"},
  { id: 9, name: "Sony Speakers ",price:1654,category:"electronics",img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQGxrRoxAsQyGMCmG9OsdpJXeHprkKvMS3QXHMCLY6CrE2U-wmPQHG64fIdRtxU_MVdE0aofopgktoDlk2Abx3QtROZ_QkZwIUxIP1kUsx54SW6FgmnOLdah5YYN5YCX0tJXO01ow&usqp=CAc"},
  { id: 10,name: "Home Theatre ",price:3999,category:"electronics",img:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTdL0LvIGvWpJWJsZfBI6tjfWPBmhSx_b_3zrz5UU6bEri4K1Vc4qZA15FTIlEaHyUWfq-372AKMHxjIimULD4lSAFgye13MDKN1zh-lm_P0yfn5yTEuI8L6GZRwzpe6dl3D-Hkhw&usqp=CAc" },
  { id: 11,name: "Beauty Products",price:1149,category:"home",img:"https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0="},
  { id: 12,name: "T-Shirt",price:799,category:"fahion",img:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTNQrrRJdPytd5_yWWUjV9jCg8nYO6PQ0L2fjlKDR89MlVSEfzx98OA5FWPP3dLwRJoNMrKHnk1mMBfUy8RYvaYBZBWxD89NS_1-sKdkkBmrz_t5W3_qno4jg&usqp=CAc"},
  { id: 13,name: "Toys for kids",price:799,category:"home",img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRGL9xlGeDII10IgKmwcD-yIJZqFS_jasE6LLbr04BFIaYi0QKP_njgsccE-u43SbqMp4uvTIIi3_0yhptUe8vRlb_oqrkj5L6SWVb_9-lXVPKdq2IrQQhKYc6kCgr_S2nUGTLzCQ&usqp=CAc"}
];

// ---------- Discount Codes ----------
const discountCodes = {
  SAVE10: 10,
  WELCOME15: 15,
  SMART20: 20,
  FESTIVE30: 30,
  NEWYEAR25: 25
};

// ---------- Local Storage State ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;
let user = localStorage.getItem("user") || null;

// ---------- DOM Helper ----------
const el = id => document.getElementById(id);

// ---------- Utility ----------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = el("cartCount");
  if (cartCount) {
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCount.textContent = total;
  }
}

// ---------- Login / Logout ----------
const loginBtn = el("loginBtn");
const logoutBtn = el("logoutBtn");
const loginModal = el("loginModal");
const loginSubmit = el("loginSubmit");
const usernameInput = el("username");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });
}

if (loginSubmit) {
  loginSubmit.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username === "") return alert("Please enter your name!");
    user = username;
    localStorage.setItem("user", user);
    loginModal.classList.add("hidden");
    alert(`Welcome, ${user}!`);
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    user = null;
    alert("You have logged out!");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  });
}

// ---------- Close modal when clicking outside ----------
if (loginModal) {
  window.addEventListener("click", e => {
    if (e.target === loginModal) loginModal.classList.add("hidden");
  });
}

// ---------- Display Products ----------
if (el("productContainer")) {
  const productContainer = el("productContainer");

  function renderProducts(list) {
    productContainer.innerHTML = "";
    list.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      `;
      productContainer.appendChild(div);
    });

    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(parseInt(btn.dataset.id));
      });
    });
  }

  renderProducts(products);
  updateCartCount();

  // ---------- Filters ----------
  const categoryFilter = el("categoryFilter");
  const priceFilter = el("priceFilter");

  function filterProducts() {
    const category = categoryFilter.value;
    const price = priceFilter.value;

    const filtered = products.filter(p => {
      if (category !== "all" && p.category !== category) return false;
      if (price === "low" && p.price > 1000) return false;
      if (price === "medium" && (p.price < 1000 || p.price > 3000)) return false;
      if (price === "high" && p.price < 3000) return false;
      return true;
    });

    renderProducts(filtered);
  }

  categoryFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("change", filterProducts);
}

// ---------- Add to Cart ----------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// ---------- Cart Section ----------
if (el("cartItems")) {
  const cartItems = el("cartItems");
  const totalPriceEl = el("totalPrice");
  const discountCode = el("discountCode");
  const applyDiscountBtn = el("applyDiscount");
  const discountMsg = el("discountMsg");

  function renderCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty!</p>";
      totalPriceEl.textContent = 0;
      discountMsg.textContent = "";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("p");
      div.innerHTML = `
        ${item.name} (₹${item.price}) × 
        <input type="number" min="1" value="${item.qty}" style="width:60px;" data-index="${index}"> 
        <button data-index="${index}">Remove</button>
      `;
      cartItems.appendChild(div);
    });

    document.querySelectorAll("#cartItems input").forEach(input => {
      input.addEventListener("change", e => {
        const i = e.target.dataset.index;
        cart[i].qty = parseInt(e.target.value);
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll("#cartItems button").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = e.target.dataset.index;
        cart.splice(i, 1);
        saveCart();
        renderCart();
        updateCartCount();
      });
    });

    updateTotal();
  }

  // ---------- Update Total with Discount ----------
  function updateTotal() {
    let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (discount > 0) {
      total = total - (total * discount) / 100;
    }
    totalPriceEl.textContent = total.toFixed(2);
  }

  // ---------- Apply Discount ----------
  applyDiscountBtn.addEventListener("click", () => {
    const code = discountCode.value.trim().toUpperCase();
    let discountPercent = 0;

    if (discountCodes[code]) {
      discountPercent = discountCodes[code];
    } else if (!isNaN(code) && Number(code) > 0 && Number(code) <= 70) {
      discountPercent = Number(code);
    }

    if (discountPercent > 0) {
      discount = discountPercent;
      discountMsg.textContent = `✅ ${discountPercent}% discount applied successfully!`;
      discountMsg.style.color = "green";
      updateTotal();
    } else {
      discountMsg.textContent = "❌ Invalid discount code or percentage!";
      discountMsg.style.color = "red";
    }
  });

  renderCart();
}

// ---------- Init ----------
updateCartCount();
if (user) {
  if (loginBtn && logoutBtn) {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  }
}