/* ========= EDIT BUSINESS DETAILS HERE (everything marked PLACEHOLDER is unverified) ========= */
const CONFIG = {
  name: "Outskirt Cafe & Restaurant",
  address: "Gyan Khera, Tanakpur, Uttarakhand 262309",
  rating: 4.4, reviews: 269,                 // from supplied Google reference
  whatsapp: "",        // PLACEHOLDER: country code + number, digits only, e.g. "91XXXXXXXXXX"
  phoneDisplay: "",    // PLACEHOLDER: e.g. "+91 XXXXX XXXXX"
  hours: "",           // PLACEHOLDER: e.g. "Daily, 8 AM to 10 PM"
  dining: "",          // PLACEHOLDER: e.g. "Dine-in, takeaway" (only once verified)
  mapsListingUrl: "",  // PLACEHOLDER: the cafe's real Google Maps share link
  instagram: "",       // PLACEHOLDER: full Instagram profile URL
  menuIsSample: true,  // set false once menu and prices are verified
  aboutImage: "photo-1555396273-367ea4eb4db5",
  gallery: [           // Unsplash sample IDs: temporary, replace with real photos
    ["photo-1504674900247-0877df9cc836","Sample plated meal"],
    ["photo-1555396273-367ea4eb4db5","Sample restaurant interior"],
    ["photo-1495474472287-4d71bcdd2085","Sample coffee cup"],
    ["photo-1513104890138-7c749659a591","Sample pizza"],
    ["photo-1567620905732-2d1ec7ab7445","Sample pancakes"],
    ["photo-1551024601-bec78aea704b","Sample donuts"]
  ],
  // category, name, description, price (leave "" until verified), image ID, veg: "veg" | "nonveg" | "" (only if verified)
  menu: [
    ["Starters","Sample Starter Platter","Placeholder item for demo.","","photo-1546069901-ba9599a7e63c",""],
    ["Starters","Sample Crispy Bites","Placeholder item for demo.","","photo-1504674900247-0877df9cc836",""],
    ["Main Course","Sample Thali","Placeholder item for demo.","","photo-1414235077428-338989a2e8c0",""],
    ["Main Course","Sample Rice Bowl","Placeholder item for demo.","","photo-1546069901-ba9599a7e63c",""],
    ["Fast Food","Sample Pizza","Placeholder item for demo.","","photo-1565299624946-b28f40a0ae38",""],
    ["Fast Food","Sample Sandwich","Placeholder item for demo.","","photo-1482049016688-2d3e1b311543",""],
    ["Beverages","Sample Coffee","Placeholder item for demo.","","photo-1495474472287-4d71bcdd2085",""],
    ["Desserts","Sample Pancakes","Placeholder item for demo.","","photo-1567620905732-2d1ec7ab7445",""],
    ["Desserts","Sample Donuts","Placeholder item for demo.","","photo-1551024601-bec78aea704b",""]
  ]
};
/* ============================================================================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const img = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=65`;
const el = (t, props = {}, html = "") => Object.assign(document.createElement(t), props, html ? { innerHTML: html } : {});
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waReady = /^\d{8,15}$/.test(CONFIG.whatsapp || "");
const dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CONFIG.name + ", " + CONFIG.address);
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const MSG = { menu: "Hello, I would like to enquire about your menu.", table: "Hello, I would like to ask about table availability." };

function init() {
  // Hero badge, reviews
  $("#ratingBadge").innerHTML = `<b>${CONFIG.rating} ★</b> ${CONFIG.reviews} Google reviews`;
  $("#rBig").textContent = CONFIG.rating; $("#rCount").textContent = `Based on ${CONFIG.reviews} Google reviews (supplied reference)`;
  $("#reviewBtn").href = CONFIG.mapsListingUrl || "#reviews";
  if (!CONFIG.mapsListingUrl) { $("#reviewBtn").setAttribute("aria-disabled", "true"); $("#reviewBtn").title = "Set mapsListingUrl in script.js"; $("#reviewBtn").removeAttribute("target"); }

  // Info cards
  const miss = "To be confirmed by the owner";
  const cards = [["Location", CONFIG.address], ["Opening hours", CONFIG.hours], ["Food and dining", CONFIG.dining], ["Contact", CONFIG.phoneDisplay || (waReady ? "WhatsApp available" : "")]];
  $("#info").innerHTML = cards.map(([h, v]) => `<div class="card"><h3>${h}</h3><p>${v ? esc(v) : `<span class="tag">${miss}</span>`}</p></div>`).join("");

  // Menu
  $("#menuNote").textContent = CONFIG.menuIsSample ? "Sample menu for demo purposes. Items and prices are placeholders until the owner confirms them." : "";
  const cats = ["All", ...new Set(CONFIG.menu.map(m => m[0]))];
  const grid = $("#menuGrid"), fl = $("#filters");
  const draw = cat => {
    grid.innerHTML = CONFIG.menu.filter(m => cat === "All" || m[0] === cat).map(m => `
      <article class="dish"><img loading="lazy" src="${img(m[4])}" alt="${esc(m[1])} (sample image)" onerror="this.removeAttribute('src')">
      <div><h3>${esc(m[1])}</h3><p>${esc(m[2])}</p>
      <span class="price">${m[3] ? "₹" + esc(m[3]) : "Price to be added"}</span>${m[5] ? ` <span class="tag">${m[5] === "veg" ? "Veg" : "Non-veg"}</span>` : ""}</div></article>`).join("");
    $$("button", fl).forEach(b => b.setAttribute("aria-pressed", b.textContent === cat));
  };
  cats.forEach(c => fl.append(el("button", { type: "button", textContent: c, onclick: () => draw(c) })));
  draw("All");

  // About + gallery
  $("#aboutImg").src = img(CONFIG.aboutImage);
  $("#galleryGrid").innerHTML = CONFIG.gallery.map(([id, alt], i) => `<button type="button" data-i="${i}" aria-label="Enlarge: ${esc(alt)}"><img loading="lazy" src="${img(id)}" alt="${esc(alt)} (temporary demo image)"></button>`).join("");
  $("#galleryGrid").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const [id, alt] = CONFIG.gallery[b.dataset.i]; $("#lbImg").src = img(id).replace("w=800", "w=1400"); $("#lbImg").alt = alt; $("#lb").hidden = false; $("#lbClose").focus();
  });
  const closeLb = () => { $("#lb").hidden = true; };
  $("#lbClose").onclick = closeLb; $("#lb").onclick = e => { if (e.target.id === "lb") closeLb(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeLb(); setNav(false); } });

  // Location
  $("#addr").textContent = CONFIG.address; $("#fAddr").textContent = CONFIG.address;
  $("#map").src = "https://maps.google.com/maps?q=" + encodeURIComponent(CONFIG.name + " " + CONFIG.address) + "&output=embed";
  $$("[data-directions]").forEach(a => a.href = dirUrl);
  $("#copyAddr").onclick = async () => {
    const m = $("#copyMsg");
    try { await navigator.clipboard.writeText(CONFIG.address); m.textContent = "Address copied."; }
    catch { m.textContent = "Copy failed. Please select the address and copy it manually."; }
    setTimeout(() => m.textContent = "", 3000);
  };

  // WhatsApp
  $$("[data-wa]").forEach(a => {
    if (waReady) { a.href = waLink(MSG[a.dataset.wa]); a.target = "_blank"; a.rel = "noopener"; }
    else { a.setAttribute("aria-disabled", "true"); a.href = "#contact"; a.title = "Demo: WhatsApp number not configured"; a.addEventListener("click", e => e.preventDefault()); }
  });
  $("#waNote").textContent = waReady ? "Opens WhatsApp with a ready message. Nothing is booked until the cafe confirms." : "Demo notice: WhatsApp number not configured yet. Set CONFIG.whatsapp in script.js to enable these buttons.";
  $("#fPhone").textContent = CONFIG.phoneDisplay || "Phone: to be confirmed";
  $("#enq").addEventListener("submit", e => {
    e.preventDefault();
    const n = $("#fn").value.trim(), m = $("#fm").value.trim(), er = $("#fe");
    if (n.length < 2 || m.length < 5) { er.textContent = "Please enter your name and a message of at least 5 characters."; return; }
    if (!waReady) { er.textContent = "Demo only: WhatsApp number not configured, so nothing was sent."; return; }
    er.textContent = ""; window.open(waLink(`Hello, I am ${n}. ${m}`), "_blank", "noopener");
  });

  // Footer
  const ig = $("#insta"); if (CONFIG.instagram) ig.href = CONFIG.instagram; else { ig.removeAttribute("target"); ig.title = "Instagram link not set"; ig.addEventListener("click", e => e.preventDefault()); }
  $("#yr").textContent = new Date().getFullYear();

  // Nav + back to top
  const setNav = o => { $("#links").classList.toggle("open", o); $("#burger").setAttribute("aria-expanded", o); };
  $("#burger").onclick = () => setNav(!$("#links").classList.contains("open"));
  $$("#links a").forEach(a => a.addEventListener("click", () => setNav(false)));
  const tt = $("#toTop"); tt.onclick = () => scrollTo({ top: 0 });
  addEventListener("scroll", () => tt.hidden = scrollY < 600, { passive: true });

  // QR
  const url = location.href.split("#")[0];
  try {
    if (typeof QRCode === "undefined") throw new Error("lib");
    new QRCode($("#qrBox"), { text: url, width: 180, height: 180, correctLevel: QRCode.CorrectLevel.M });
  } catch { $("#qrErr").textContent = "QR code could not be generated. Check your internet connection and reload."; }
  $("#qrDl").onclick = () => {
    const c = $("#qrBox canvas"), i = $("#qrBox img");
    const src = c ? c.toDataURL("image/png") : (i && i.src);
    if (!src) { $("#qrErr").textContent = "No QR code to download yet. Reload the page and try again."; return; }
    const a = el("a", { href: src, download: "outskirt-cafe-qr.png" }); a.click();
  };
}
init();
