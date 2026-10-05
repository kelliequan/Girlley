// Girlley CX — site behaviour
(function () {
  var WA_NUMBER = "2348161705601";
  var EMAIL = "Joyovedje6055@gmail.com";

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }

  // WhatsApp label teaser
  var label = document.querySelector(".wa-label");
  if (label) {
    setTimeout(function () { label.classList.add("show"); }, 2500);
    setTimeout(function () { label.classList.remove("show"); }, 8000);
  }

  // Year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Contact form → WhatsApp or email
  var form = document.getElementById("enquiry-form");
  if (form) {
    function buildMessage() {
      var d = new FormData(form);
      var lines = [
        "Hello Girlley CX, I'd like to start a conversation.",
        "",
        "Name: " + (d.get("name") || ""),
        "Business: " + (d.get("business") || ""),
        "Email: " + (d.get("email") || ""),
        "WhatsApp: " + (d.get("whatsapp") || ""),
        "What we do: " + (d.get("about") || ""),
        "Help needed: " + (d.get("need") || ""),
        "Preferred start date: " + (d.get("start") || ""),
        "",
        "Current challenge: " + (d.get("challenge") || "")
      ];
      return lines.join("\n");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMessage()), "_blank", "noopener");
    });
    var emailBtn = document.getElementById("send-email");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        if (!form.reportValidity()) return;
        var d = new FormData(form);
        var subject = "New enquiry from " + (d.get("business") || d.get("name") || "website");
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(buildMessage());
      });
    }
  }
})();
