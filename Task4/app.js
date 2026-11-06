(() => {
  "use strict";

  const image = (id, width = 900) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

  const products = [
    { id: "zinger", name: "Classic Zinger Burger", shortName: "Zinger Burger", category: "Burgers", price: 650, rating: "4.8", badge: "Spicy", restaurant: "Spice Route Kitchen", description: "Crispy chicken, fresh lettuce and signature sauce.", image: image("photo-1551782450-a2132b4ba21d") },
    { id: "pepperoni", name: "Pepperoni Pizza", shortName: "Pepperoni Pizza", category: "Pizza", price: 1450, rating: "4.9", badge: "Spicy", restaurant: "Oven & Stone", description: "Loaded with pepperoni, mozzarella and rich tomato sauce.", image: image("photo-1513104890138-7c749659a591") },
    { id: "biryani", name: "Chicken Biryani", shortName: "Chicken Biryani", category: "Pakistani", price: 520, rating: "4.7", badge: "Bestseller", restaurant: "Spice Route Kitchen", description: "Fragrant basmati rice with tender chicken and aromatic spices.", image: image("photo-1603894584373-5ac82b2ae398") },
    { id: "mango-shake", name: "Mango Shake", shortName: "Mango Shake", category: "Drinks", price: 380, rating: "4.6", badge: "Vegetarian", restaurant: "The Chill Cup", description: "Creamy seasonal mango blended with chilled milk.", image: image("photo-1572490122747-3968b75cc699") },
    { id: "fries", name: "Loaded Masala Fries", shortName: "Masala Fries", category: "Fast Food", price: 420, rating: "4.7", badge: "Vegetarian", restaurant: "Street Side", description: "Golden fries tossed with house masala and a tangy dip.", image: image("photo-1573080496219-bb080dd4f877") },
    { id: "cheeseburger", name: "Double Cheese Burger", shortName: "Cheese Burger", category: "Burgers", price: 890, rating: "4.8", badge: "Popular", restaurant: "Burger District", description: "Two juicy patties, cheddar cheese and crisp pickles.", image: image("photo-1568901346375-23c9450c58cd") },
    { id: "margherita", name: "Garden Margherita", shortName: "Margherita Pizza", category: "Pizza", price: 1190, rating: "4.6", badge: "Vegetarian", restaurant: "Oven & Stone", description: "Mozzarella, basil and tomato on a hand-stretched crust.", image: image("photo-1574071318508-1cdbab80d002") },
    { id: "karahi", name: "Chicken Karahi", shortName: "Chicken Karahi", category: "Pakistani", price: 980, rating: "4.9", badge: "Bestseller", restaurant: "Spice Route Kitchen", description: "Wok-cooked chicken, ripe tomatoes, ginger and green chilli.", image: image("photo-1603894584373-5ac82b2ae398") },
    { id: "lemonade", name: "Mint Lemonade", shortName: "Mint Lemonade", category: "Drinks", price: 260, rating: "4.5", badge: "Refreshing", restaurant: "The Chill Cup", description: "Fresh lemon and mint served ice cold.", image: image("photo-1572490122747-3968b75cc699") },
    { id: "brownie", name: "Fudge Brownie", shortName: "Fudge Brownie", category: "Desserts", price: 450, rating: "4.8", badge: "Sweet", restaurant: "Sugar & Crumb", description: "Warm chocolate brownie with a soft, fudgy centre.", image: image("photo-1606313564200-e75d5e30476c") },
    { id: "gulab-jamun", name: "Gulab Jamun", shortName: "Gulab Jamun", category: "Desserts", price: 320, rating: "4.7", badge: "Traditional", restaurant: "Sugar & Crumb", description: "Soft milk dumplings soaked in fragrant rose syrup.", image: image("photo-1606313564200-e75d5e30476c") },
    { id: "club-sandwich", name: "Grilled Club Sandwich", shortName: "Club Sandwich", category: "Fast Food", price: 590, rating: "4.6", badge: "Popular", restaurant: "Street Side", description: "Toasted triple-decker with chicken, egg and garden greens.", image: image("photo-1551782450-a2132b4ba21d") },
  ];

  const combos = [
    {
      id: "family",
      name: "Family Feast",
      description: "A generous spread of burgers and pizza for everyone.",
      image: products[0].image,
      items: [{ id: "zinger", quantity: 2 }, { id: "pepperoni", quantity: 1 }],
    },
    {
      id: "desi",
      name: "Desi Comfort Box",
      description: "Homestyle biryani and comforting sides in one box.",
      image: products[2].image,
      items: [{ id: "biryani", quantity: 2 }],
    },
  ];

  const categories = [
    { name: "All Food", icon: "▦" },
    { name: "Burgers", icon: "▰" },
    { name: "Pizza", icon: "◉" },
    { name: "Fast Food", icon: "✦" },
    { name: "Pakistani", icon: "♨" },
    { name: "Drinks", icon: "♜" },
    { name: "Desserts", icon: "❋" },
  ];

  const statusSteps = [
    { name: "Order Confirmed", detail: "We received your order", icon: "✓" },
    { name: "Preparing Food", detail: "The kitchen is on it", icon: "♨" },
    { name: "Ready for Delivery", detail: "Your meal is packed", icon: "▣" },
    { name: "Out for Delivery", detail: "Your rider is on the way", icon: "➜" },
    { name: "Delivered", detail: "Enjoy your meal!", icon: "✓" },
  ];

  const currency = (amount) =>
    `PKR ${Number(amount).toLocaleString("en-PK")}`;
  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);

  function normalizeCart(value) {
    if (!Array.isArray(value)) {
      console.warn("Saved cart data is invalid; starting with an empty cart.");
      return [];
    }
    let discarded = 0;
    const cart = value.reduce((items, item) => {
      const product = products.find((candidate) => candidate.id === item?.id);
      const quantity = Number(item?.quantity);
      if (!product || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
        discarded += 1;
        return items;
      }
      const existing = items.find((entry) => entry.id === product.id);
      if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
      else items.push({ id: product.id, quantity });
      return items;
    }, []);
    if (discarded) console.warn(`Ignored ${discarded} invalid saved cart item(s).`);
    return cart;
  }

  function normalizeOrders(value) {
    if (!Array.isArray(value)) {
      console.warn("Saved order data is invalid; starting with an empty order history.");
      return [];
    }
    const orders = value.flatMap((order) => {
      if (!order || typeof order !== "object" || Array.isArray(order) || typeof order.id !== "string") return [];
      const status = Number(order.status);
      const items = Array.isArray(order.items) ? order.items.flatMap((item) => {
        const product = products.find((candidate) => candidate.id === item?.id);
        const quantity = Number(item?.quantity);
        if (!product || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) return [];
        return [{ id: product.id, name: product.name, price: product.price, quantity }];
      }) : [];
      const customer = order.customer && typeof order.customer === "object" ? order.customer : {};
      return [{
        id: order.id.slice(0, 40),
        created: typeof order.created === "string" ? order.created.slice(0, 40) : "Recently",
        customer: {
          name: typeof customer.name === "string" ? customer.name.slice(0, 100) : "",
          phone: typeof customer.phone === "string" ? customer.phone.slice(0, 30) : "",
          email: typeof customer.email === "string" ? customer.email.slice(0, 254) : "",
          address: typeof customer.address === "string" ? customer.address.slice(0, 300) : "",
          payment: typeof customer.payment === "string" ? customer.payment.slice(0, 40) : "",
        },
        items,
        total: Number.isFinite(Number(order.total)) && Number(order.total) >= 0 ? Number(order.total) : 0,
        restaurant: typeof order.restaurant === "string" ? order.restaurant.slice(0, 100) : "Spice Route Kitchen",
        status: Number.isInteger(status) ? Math.max(0, Math.min(status, statusSteps.length - 1)) : 0,
        coupon: order.coupon === "WELCOME20" ? "WELCOME20" : "",
      }];
    });
    if (orders.length !== value.length) console.warn("Ignored invalid saved order record(s).");
    return orders;
  }

  function normalizeChat(value) {
    if (!Array.isArray(value)) {
      console.warn("Saved chat data is invalid; starting with an empty conversation.");
      return [];
    }
    const messages = value.filter((message) =>
      message && ["user", "assistant"].includes(message.role) && typeof message.text === "string");
    if (messages.length !== value.length) console.warn("Ignored invalid saved chat message(s).");
    return messages
      .slice(-100)
      .map((message) => ({ role: message.role, text: message.text.slice(0, 500) }));
  }

  function readStorage(storageName, key, fallback, normalize) {
    try {
      const value = window[storageName].getItem(key);
      return value ? normalize(JSON.parse(value)) : fallback;
    } catch (error) {
      console.warn(`Could not restore ${key}; starting with fresh data.`, error);
      return fallback;
    }
  }

  const state = {
    cart: readStorage("localStorage", "foodhub-cart", [], normalizeCart),
    orders: readStorage("localStorage", "foodhub-orders", [], normalizeOrders),
    coupon: "",
    category: "All Food",
    search: "",
    chat: readStorage("sessionStorage", "foodhub-chat", [], normalizeChat),
    checkoutDraft: {},
  };

  const app = document.getElementById("app");
  const toastRegion = document.getElementById("toast-region");
  let toastTimer;

  function saveState() {
    const values = [
      ["localStorage", "foodhub-cart", state.cart],
      ["localStorage", "foodhub-orders", state.orders],
      ["sessionStorage", "foodhub-chat", state.chat],
    ];
    let failed = false;
    values.forEach(([storageName, key, value]) => {
      try {
        window[storageName].setItem(key, JSON.stringify(value));
      } catch (error) {
        failed = true;
        console.error(`Could not save ${key}.`, error);
      }
    });
    if (failed) notify("Your changes could not be saved and may be lost when you leave this page.");
  }

  function activeOrder() {
    return state.orders[0] || null;
  }

  function cartCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function cartSubtotal() {
    return state.cart.reduce((sum, item) => {
      const product = products.find((candidate) => candidate.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function deliveryFee() {
    return cartSubtotal() === 0 || cartSubtotal() >= 1500 ? 0 : 120;
  }

  function discountAmount() {
    return state.coupon === "WELCOME20" ? Math.round(cartSubtotal() * 0.2) : 0;
  }

  function orderTotal() {
    return Math.max(0, cartSubtotal() + deliveryFee() - discountAmount());
  }

  function notify(message) {
    if (!toastRegion) {
      console.warn(message);
      return;
    }
    toastRegion.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastRegion.innerHTML = ""; }, 2800);
  }

  function pageName(route) {
    return ({
      dashboard: "Dashboard",
      "food-menu": "Food Menu",
      "shopping-cart": "Shopping Cart",
      "order-tracking": "Order Tracking",
      "ai-customer-support": "AI Customer Support",
    })[route] || "Dashboard";
  }

  function route() {
    const name = location.hash.replace(/^#\/?/, "");
    return ["dashboard", "food-menu", "shopping-cart", "order-tracking", "ai-customer-support"].includes(name)
      ? name
      : "dashboard";
  }

  function navigation(routeName) {
    const entries = [
      ["dashboard", "▦", "Dashboard"],
      ["food-menu", "♨", "Food Menu"],
      ["shopping-cart", "🛒", "Shopping Cart"],
      ["order-tracking", "▣", "Order Tracking"],
      ["ai-customer-support", "✧", "AI Support"],
    ];
    return `
      <aside class="sidebar">
        <a class="brand" href="#dashboard" aria-label="FoodHub home">
          <span class="brand-mark">⚒</span><span class="brand-name">FoodHub</span><span class="ai-tag">AI</span>
        </a>
        <nav class="side-nav" aria-label="Main navigation">
          ${entries.map(([key, icon, label]) => `
            <a class="nav-link ${routeName === key ? "active" : ""}" href="#${key}" aria-label="${label}" ${routeName === key ? 'aria-current="page"' : ""}>
              <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>
              ${key === "shopping-cart" && cartCount() ? `<span class="nav-count">${cartCount()}</span>` : ""}
            </a>`).join("")}
        </nav>
        <a class="nav-link help-link" href="#ai-customer-support" aria-label="Help and Support"><span class="nav-icon" aria-hidden="true">ⓘ</span><span>Help &amp; Support</span></a>
      </aside>`;
  }

  function header(routeName) {
    return `
      <header class="topbar">
        <div><p class="eyebrow">Workspace</p><h1>${pageName(routeName)}</h1></div>
        <div class="profile"><span class="profile-avatar">AK</span><span class="profile-copy"><strong>Ayesha Khan</strong><small>Customer</small></span><span class="chevron">⌄</span></div>
      </header>`;
  }

  function shell(routeName, body) {
    app.innerHTML = `${navigation(routeName)}<main class="main-content">${header(routeName)}<div class="page">${body}</div></main>`;
  }

  function categoryTiles(active = "All Food", compact = false) {
    return `<div class="category-grid ${compact ? "category-grid-compact" : ""}">
      ${categories.map(({ name, icon }) => `
        <button class="category-tile ${active === name ? "selected" : ""}" data-action="category" data-category="${escapeHTML(name)}" aria-pressed="${active === name}">
          <span class="category-icon" aria-hidden="true">${icon}</span><span>${escapeHTML(name)}</span>
        </button>`).join("")}
    </div>`;
  }

  function productCard(product, compact = false) {
    return `
      <article class="product-card ${compact ? "product-card-compact" : ""}">
        <img class="product-image" src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy">
        <div class="product-info">
          <div class="product-meta"><span class="food-badge">${escapeHTML(product.badge)}</span><span class="rating">★ ${product.rating}</span></div>
          <h3>${escapeHTML(product.name)}</h3>
          <p class="product-description">${escapeHTML(product.description)}</p>
          <div class="product-footer"><strong>${currency(product.price)}</strong><button class="button button-small" data-action="add" data-id="${product.id}">Add</button></div>
        </div>
      </article>`;
  }

  function offerPanel() {
    return `<article class="panel offer-panel">
      <div class="panel-heading"><h3>Special offers</h3><span class="offer-icon">↗</span></div>
      <p>Get 20% off your order with WELCOME20. Free delivery on orders of PKR 1,500 or more.</p>
      <button class="coupon-chip" data-action="copy-coupon">Use code WELCOME20</button>
    </article>`;
  }

  function recentOrders() {
    const recent = state.orders.slice(0, 3);
    const entries = recent.length ? recent : [
      { id: "#FH-20841", created: "12 June", status: 1 },
      { id: "#FH-20798", created: "10 June", status: 4 },
      { id: "#FH-20761", created: "8 June", status: 4 },
    ];
    return `<article class="panel recent-panel"><h3>Recent orders</h3>
      <div class="recent-list">${entries.map((order) => {
        const status = statusSteps[order.status] || statusSteps[0];
        const displayId = String(order.id).startsWith("#") ? order.id : `#${order.id}`;
        return `<button class="recent-row" data-route="order-tracking"><span><strong>${escapeHTML(displayId)}</strong><small>${escapeHTML(order.created || "Just now")}</small></span><span class="status-pill status-${order.status}">${escapeHTML(status.name)}</span></button>`;
      }).join("")}</div></article>`;
  }

  function dashboard() {
    const featured = products.slice(0, 4);
    return `
      <section class="greeting"><p class="eyebrow">${new Intl.DateTimeFormat("en-PK", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</p><h2>Good afternoon, Ayesha</h2><p>What are you craving today?</p></section>
      <section class="hero-banner">
        <div class="hero-copy"><span class="offer-code">WELCOME20</span><h2>Get 20% off your first order</h2><p>Fresh meals, delivered with a little extra joy.</p><a class="button" href="#food-menu">Order Now</a></div>
        <img src="${image("photo-1547573854-74d2a71d0826", 1100)}" alt="A table filled with a shared meal" fetchpriority="high">
      </section>
      <section class="section-block"><h2 class="section-title">Browse by category</h2>${categoryTiles()}</section>
      <section class="section-block"><div class="section-heading"><h2 class="section-title">Featured for you</h2><a href="#shopping-cart" class="muted-link">Cart items: ${cartCount()}</a></div>
        <div class="product-grid product-grid-featured">${featured.map((product) => productCard(product, true)).join("")}</div>
      </section>
      <section class="dashboard-bottom">${offerPanel()}${recentOrders()}</section>`;
  }

  function filteredProducts() {
    const query = state.search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = state.category === "All Food" || product.category === state.category;
      const matchesQuery = !query || [product.name, product.description, product.restaurant, product.category].some((value) => value.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }

  function menu() {
    return `
      <section class="intro"><h2>Find your next favorite meal</h2><p>Made fresh by local kitchens, delivered to your door.</p></section>
      <div class="menu-tools"><label class="search-field"><span aria-hidden="true">⌕</span><input id="menu-search" type="search" placeholder="Search dishes, restaurants or ingredients" value="${escapeHTML(state.search)}" autocomplete="off"></label>
        <a class="button button-outline" href="#shopping-cart">🛒 Cart <span class="cart-number">${cartCount()}</span></a></div>
      <p class="result-count" id="result-count"></p>
      <div class="filter-row" role="group" aria-label="Filter menu by category">${categories.map(({ name }) => `
        <button class="filter-chip ${state.category === name ? "selected" : ""}" data-action="category" data-category="${escapeHTML(name)}" aria-pressed="${state.category === name}">${escapeHTML(name === "All Food" ? "All" : name)}</button>`).join("")}
      </div>
      <section class="section-block"><h2 class="section-title">Popular right now</h2><div class="product-grid menu-products" id="menu-products"></div></section>
      <section class="section-block combo-section"><h2 class="section-title">Featured combos</h2><div class="combo-grid">
        ${combos.map((combo) => `<article class="combo-card"><img src="${combo.image}" alt="${escapeHTML(combo.name)}"><div><h3>${escapeHTML(combo.name)}</h3><p>${escapeHTML(combo.description)}</p><strong>${currency(combo.items.reduce((total, item) => total + products.find((product) => product.id === item.id).price * item.quantity, 0))}</strong><button class="button button-small" data-action="add-combo" data-combo="${combo.id}">Add combo</button></div></article>`).join("")}
      </div></section>`;
  }

  function renderMenuProducts() {
    const target = document.getElementById("menu-products");
    if (!target) return;
    const items = filteredProducts();
    target.innerHTML = items.length
      ? items.map((product) => productCard(product)).join("")
      : `<div class="empty-state"><span>⌕</span><h3>No dishes found</h3><p>Try another search or choose a different category.</p></div>`;
    const count = document.getElementById("result-count");
    if (count) count.textContent = `Showing ${items.length} ${items.length === 1 ? "dish" : "dishes"} from ${new Set(items.map((item) => item.restaurant)).size} restaurants`;
  }

  function orderSummary() {
    return `<aside class="panel order-summary"><h3>Order summary</h3>
      <div class="summary-row"><span>Subtotal</span><strong>${currency(cartSubtotal())}</strong></div>
      <div class="summary-row"><span>Delivery fee</span><strong>${deliveryFee() ? currency(deliveryFee()) : "Free"}</strong></div>
      ${discountAmount() ? `<div class="summary-row discount"><span>Discount (WELCOME20)</span><strong>−${currency(discountAmount())}</strong></div>` : ""}
      <div class="summary-total"><strong>Total</strong><strong>${currency(orderTotal())}</strong></div>
      ${discountAmount() ? `<p class="savings-note">You save ${currency(discountAmount())} today</p>` : ""}
      <button class="button summary-button" data-action="checkout" ${state.cart.length ? "" : "disabled"}>Continue to checkout</button>
      <p class="delivery-note">${deliveryFee() ? `Add ${currency(1500 - cartSubtotal())} for free delivery` : "Your order qualifies for free delivery"}</p>
    </aside>`;
  }

  function cartRow(item) {
    return `<article class="cart-row">
      <img src="${item.image}" alt="${escapeHTML(item.name)}">
      <div class="cart-item-copy"><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description)}</p><span class="price-tag">${currency(item.price)} each</span></div>
      <div class="quantity-control" aria-label="Quantity of ${escapeHTML(item.name)}">
        <button data-action="quantity" data-id="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-action="quantity" data-id="${item.id}" data-change="1" aria-label="Increase quantity">+</button>
      </div>
      <strong class="line-price">${currency(item.price * item.quantity)}</strong>
      <button class="icon-button remove-button" data-action="remove" data-id="${item.id}" aria-label="Remove ${escapeHTML(item.name)}">×</button>
    </article>`;
  }

  function cart() {
    const items = state.cart.map((entry) => {
      const product = products.find((candidate) => candidate.id === entry.id);
      return product ? { ...product, quantity: entry.quantity } : null;
    }).filter(Boolean);

    return `<section class="intro"><p class="eyebrow">Home / Shopping Cart</p><h2>Complete your order</h2></section>
      ${items.length ? `<div class="cart-layout"><div class="cart-main">
        <section class="panel cart-panel"><div class="panel-heading"><h3>Your items</h3><span class="muted-link">${cartCount()} items</span></div>${items.map(cartRow).join("")}
        <a class="text-link" href="#food-menu">＋ Add more items</a></section>
        <form class="panel checkout-panel" id="checkout-form">
          <h3>Delivery details</h3><div class="form-grid">
            <label>Full name<input name="name" autocomplete="name" required minlength="2" value="${escapeHTML(state.checkoutDraft.name ?? activeOrder()?.customer?.name ?? "Ayesha Khan")}"></label>
            <label>Phone number<input name="phone" type="tel" autocomplete="tel" required pattern="\\+?[0-9 ]{7,20}" placeholder="+92 300 1234567" value="${escapeHTML(state.checkoutDraft.phone ?? "")}"></label>
            <label class="form-wide">Email<input name="email" type="email" autocomplete="email" required placeholder="you@example.com" value="${escapeHTML(state.checkoutDraft.email ?? "")}"></label>
            <label class="form-wide">Delivery address<textarea name="address" autocomplete="street-address" rows="3" required minlength="8" placeholder="House, street, area and city">${escapeHTML(state.checkoutDraft.address ?? "")}</textarea></label>
          </div>
          <fieldset class="payment-options"><legend>Payment method</legend><label><input type="radio" name="payment" value="Cash on Delivery" ${(state.checkoutDraft.payment ?? "Cash on Delivery") === "Cash on Delivery" ? "checked" : ""}> Cash on Delivery</label><label><input type="radio" name="payment" value="Online Payment" ${state.checkoutDraft.payment === "Online Payment" ? "checked" : ""}> Online Payment</label></fieldset>
          <div class="coupon-form"><label for="coupon-code">Promo code</label><div><input id="coupon-code" value="${state.coupon}" placeholder="Enter code e.g. WELCOME20"><button type="button" class="button button-outline" data-action="apply-coupon">Apply</button></div><small>Use WELCOME20 for 20% off your order.</small></div>
          <button class="button submit-order" type="submit">Place order</button>
        </form>
      </div>${orderSummary()}</div>` : `<section class="panel empty-cart"><span class="empty-icon">🛒</span><h3>Your cart is waiting for something delicious</h3><p>Explore the menu and add your favourite dishes.</p><a class="button" href="#food-menu">Browse the menu</a></section>`}`;
  }

  function tracking() {
    const order = activeOrder();
    if (!order) {
      return `<section class="intro"><h2>Track your order</h2><p>We’ll keep you posted every step of the way.</p></section>
        <section class="panel empty-cart"><span class="empty-icon">▣</span><h3>No active orders yet</h3><p>Your placed orders and live updates will appear here.</p><a class="button" href="#food-menu">Order something tasty</a></section>`;
    }
    const step = Math.max(0, Math.min(Number(order.status) || 0, statusSteps.length - 1));
    const remaining = Math.max(0, (3 - step) * 10 + 15);
    const items = order.items || [];
    return `<section class="intro"><p class="eyebrow"><a href="#shopping-cart">‹ My orders</a></p><h2>Track your order</h2><p>We’ll keep you posted every step of the way.</p></section>
      <section class="tracking-banner"><span class="tracking-mark">▣</span><div class="order-id"><small>Order ID</small><strong>#${escapeHTML(order.id)}</strong></div><div class="tracking-current"><div class="tracking-status-line"><span class="status-pill status-${step}">${escapeHTML(statusSteps[step].name)}</span><strong>${step === 4 ? "Delivered" : `Estimated delivery ${remaining}–${remaining + 10} min`}</strong></div><div class="progress-track"><span style="width:${(step / (statusSteps.length - 1)) * 100}%"></span></div><small>${step === 4 ? "Thanks for ordering with FoodHub!" : `Arriving today, ${new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "long" }).format(new Date())}`}</small></div></section>
      <div class="tracking-layout"><div class="tracking-main">
        <section class="panel progress-panel"><h3>Delivery progress</h3><div class="progress-steps">${statusSteps.map((status, index) => `
          <div class="progress-step ${index < step ? "complete" : ""} ${index === step ? "current" : ""}">
            <span class="step-icon">${status.icon}</span><strong>${status.name}</strong><small>${index < step ? "Completed" : index === step ? "In progress" : status.detail}</small>
          </div>`).join("")}</div>
          ${step < 4 ? `<button class="button button-outline advance-button" data-action="advance-order">Advance demo status</button>` : ""}
        </section>
        <section class="panel order-details"><h3>Order details</h3>${items.map((item) => `<div class="detail-row"><span>${escapeHTML(item.name)} ×${item.quantity}</span><strong>${currency(item.price * item.quantity)}</strong></div>`).join("")}<div class="summary-total"><strong>Total paid</strong><strong>${currency(order.total)}</strong></div></section>
      </div>
      <aside class="panel restaurant-card"><h3>${escapeHTML(order.restaurant || "Spice Route Kitchen")}</h3><p>${step === 4 ? "Order delivered" : ` ${escapeHTML(statusSteps[step].name)} — your meal is in good hands.`}</p><p class="restaurant-address">⌖ &nbsp; Gulberg III, Lahore</p><div class="map-placeholder"><span>●</span><i></i><span>●</span></div><button class="button button-outline help-order" data-route="ai-customer-support">☏ &nbsp; Get help</button></aside></div>`;
  }

  const suggestedQuestions = [
    "Where is my order?",
    "What food items are available?",
    "What are today’s special offers?",
    "How long will delivery take?",
    "What payment methods are available?",
  ];

  function chatbotResponse(question) {
    const text = question.toLowerCase();
    const order = activeOrder();
    if (/menu|food|dish|available|vegetarian|vegan/.test(text)) {
      const names = products.slice(0, 6).map((product) => product.shortName).join(", ");
      return `Our menu includes ${names}, and lots more. You can browse all ${products.length} dishes and filter by category in the Food Menu.`;
    }
    if (/offer|promo|discount|coupon|code/.test(text)) {
      return "Use code WELCOME20 at checkout to save 20% on your order. Orders of PKR 1,500 or more also get free delivery.";
    }
    if (/payment|pay|cash|online/.test(text)) {
      return "You can pay by Cash on Delivery or choose Online Payment at checkout.";
    }
    if (/delivery|long|time|arrive|rider|track|where.*order|status/.test(text)) {
      if (!order) return "You don’t have an active order yet. Once you place one, I can help you follow its progress here.";
      const current = statusSteps[Math.max(0, Math.min(Number(order.status) || 0, statusSteps.length - 1))].name;
      return `Order #${order.id} is currently ${current.toLowerCase()}${order.status === 4 ? " — enjoy your meal!" : ". Estimated delivery is about 25–45 minutes. Open Order Tracking for live progress."}`;
    }
    if (/restaurant|kitchen|location|address|hours|open/.test(text)) {
      return "We partner with kitchens around Lahore, including Spice Route Kitchen, Oven & Stone, and The Chill Cup. Delivery is available across central Lahore.";
    }
    if (/hello|hi|hey|help/.test(text)) {
      return "Hi Ayesha! I can help with menu recommendations, special offers, delivery updates, order tracking, and payment questions. What would you like to know?";
    }
    return "I can help with our food menu, current offers, order tracking, delivery times, and payment methods. Try asking me about one of those!";
  }

  function support() {
    const messages = state.chat.length ? state.chat : [{
      role: "assistant",
      text: "Hi Ayesha! I’m the FoodHub AI Assistant. I can help with your order, menu, offers, and delivery questions.",
    }];
    return `<section class="intro"><h2>How can we help today?</h2><p>FoodHub AI is here for orders, menus and delivery questions.</p></section>
      <div class="support-layout">
        <section class="panel chat-panel"><div class="chat-heading"><span class="assistant-avatar">✧</span><span><strong>FoodHub AI Assistant</strong><small>Online</small></span><button class="text-button" data-action="clear-chat">Clear chat</button></div>
          <div class="chat-history" id="chat-history" aria-live="polite">${messages.map((message) => `<div class="chat-message ${message.role === "user" ? "from-user" : "from-assistant"}">${escapeHTML(message.text)}</div>`).join("")}</div>
          <form class="chat-form" id="chat-form"><label class="sr-only" for="chat-input">Type your message</label><input id="chat-input" name="message" placeholder="Type your message..." autocomplete="off" required maxlength="500"><button class="button" type="submit">Send</button><small>I’m ready when you are.</small></form>
        </section>
        <div class="support-side"><section class="panel suggested-panel"><h3>Suggested questions</h3>${suggestedQuestions.map((question) => `<button class="suggestion" data-action="suggest" data-question="${escapeHTML(question)}">${escapeHTML(question)}</button>`).join("")}</section>
          <section class="panel topics-panel"><h3>Popular help topics</h3><div class="topic-tags"><span>Delivery</span><span>Refunds</span><span>Account</span></div><p>Typically replies in under a minute.</p></section></div>
      </div>`;
  }

  function render() {
    const current = route();
    if (current === "shopping-cart") captureCheckoutDraft();
    const content = ({
      dashboard,
      "food-menu": menu,
      "shopping-cart": cart,
      "order-tracking": tracking,
      "ai-customer-support": support,
    })[current]();
    shell(current, content);
    if (current === "food-menu") {
      renderMenuProducts();
      const search = document.getElementById("menu-search");
      search?.addEventListener("input", (event) => {
        state.search = event.target.value;
        renderMenuProducts();
      });
    }
    if (current === "ai-customer-support") {
      const history = document.getElementById("chat-history");
      history.scrollTop = history.scrollHeight;
    }
  }

  function addToCart(id, quantity = 1) {
    const product = products.find((candidate) => candidate.id === id);
    if (!product || !Number.isSafeInteger(quantity) || quantity < 1) {
      notify("That menu item is unavailable. Please refresh the menu and try again.");
      return;
    }
    const item = state.cart.find((entry) => entry.id === id);
    if (item) item.quantity = Math.min(99, item.quantity + quantity);
    else state.cart.push({ id, quantity });
    saveState();
    render();
    notify(`${product.shortName} added to your cart`);
  }

  function addCombo(type) {
    const combo = combos.find((candidate) => candidate.id === type);
    if (!combo) {
      notify("That combo is unavailable. Please refresh the menu and try again.");
      return;
    }
    combo.items.forEach(({ id, quantity }) => {
      const existing = state.cart.find((item) => item.id === id);
      if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
      else state.cart.push({ id, quantity });
    });
    saveState();
    render();
    notify("Combo items added to your cart");
  }

  function setQuantity(id, amount) {
    const item = state.cart.find((entry) => entry.id === id);
    if (!item || ![-1, 1].includes(amount)) return;
    item.quantity = Math.min(99, item.quantity + amount);
    if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
    saveState();
    render();
  }

  function placeOrder(form) {
    if (!state.cart.length) return;
    captureCheckoutDraft(form);
    const data = new FormData(form);
    const customer = {
      name: data.get("name").trim(),
      phone: data.get("phone").trim(),
      email: data.get("email").trim(),
      address: data.get("address").trim(),
      payment: data.get("payment"),
    };
    const order = {
      id: `FH-${Math.floor(10000 + Math.random() * 89999)}`,
      created: new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short" }).format(new Date()),
      customer,
      items: state.cart.map((entry) => {
        const product = products.find((candidate) => candidate.id === entry.id);
        return { id: product.id, name: product.name, price: product.price, quantity: entry.quantity };
      }),
      total: orderTotal(),
      restaurant: "Spice Route Kitchen",
      status: 0,
      coupon: state.coupon,
    };
    state.orders.unshift(order);
    state.cart = [];
    state.coupon = "";
    state.checkoutDraft = {};
    saveState();
    location.hash = "order-tracking";
    notify(`Order ${order.id} placed successfully`);
  }

  function appendChat(role, text) {
    state.chat.push({ role, text });
    saveState();
  }

  function submitChat(form) {
    const input = form.elements.message;
    const message = input.value.trim();
    if (!message) return;
    appendChat("user", message);
    appendChat("assistant", chatbotResponse(message));
    render();
    document.getElementById("chat-input")?.focus();
  }

  function captureCheckoutDraft(form = document.getElementById("checkout-form")) {
    if (!form) return;
    const data = new FormData(form);
    state.checkoutDraft = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      address: String(data.get("address") ?? ""),
      payment: String(data.get("payment") ?? "Cash on Delivery"),
    };
  }

  app.addEventListener("input", (event) => {
    if (event.target.closest("#checkout-form")) captureCheckoutDraft();
  });
  app.addEventListener("change", (event) => {
    if (event.target.closest("#checkout-form")) captureCheckoutDraft();
  });

  app.addEventListener("click", (event) => {
    const routeLink = event.target.closest("[data-route]");
    if (routeLink) {
      location.hash = routeLink.dataset.route;
      return;
    }
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const { action, id } = control.dataset;

    if (action === "add") addToCart(id);
    if (action === "add-combo") addCombo(control.dataset.combo);
    if (action === "quantity") setQuantity(id, Number(control.dataset.change));
    if (action === "remove") {
      state.cart = state.cart.filter((item) => item.id !== id);
      saveState();
      render();
      notify("Item removed from your cart");
    }
    if (action === "category") {
      state.category = control.dataset.category;
      if (route() === "dashboard") location.hash = "food-menu";
      else render();
    }
    if (action === "checkout") {
      document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector('#checkout-form input[name="name"]')?.focus({ preventScroll: true });
    }
    if (action === "apply-coupon") {
      const input = document.getElementById("coupon-code");
      const code = input.value.trim().toUpperCase();
      if (code === "WELCOME20") {
        state.coupon = code;
        saveState();
        render();
        notify("WELCOME20 applied — 20% off your order");
      } else {
        notify("That code isn’t valid. Try WELCOME20.");
      }
    }
    if (action === "copy-coupon") {
      state.coupon = "WELCOME20";
      location.hash = "shopping-cart";
      notify("WELCOME20 is ready to apply at checkout");
    }
    if (action === "advance-order") {
      const order = activeOrder();
      if (order && order.status < statusSteps.length - 1) {
        order.status += 1;
        saveState();
        render();
        notify(`Order status updated: ${statusSteps[order.status].name}`);
      }
    }
    if (action === "suggest") {
      const form = document.getElementById("chat-form");
      const input = document.getElementById("chat-input");
      if (form && input) {
        input.value = control.dataset.question;
        submitChat(form);
      }
    }
    if (action === "clear-chat") {
      state.chat = [];
      saveState();
      render();
    }
  });

  app.addEventListener("submit", (event) => {
    if (event.target.id === "checkout-form") {
      event.preventDefault();
      if (!event.target.reportValidity()) return;
      placeOrder(event.target);
    }
    if (event.target.id === "chat-form") {
      event.preventDefault();
      submitChat(event.target);
    }
  });

  window.addEventListener("hashchange", render);

  render();
})();
