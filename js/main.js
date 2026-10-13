(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Active section highlight in nav ---------- */
  var ids = ["overview", "platform", "workflow", "intelligence", "benefits", "faqs"];
  var navLinks = $$("[data-nav]");
  function setActive(id) {
    navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === id); });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-24% 0px -60% 0px", threshold: [0, 0.15, 0.35] });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("#menu-btn"), mobileNav = $("#mobile-nav");
  function setMenu(open) {
    mobileNav.hidden = !open;
    $("#icon-open").hidden = open;
    $("#icon-close").hidden = !open;
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () { setMenu(mobileNav.hidden); });
  $$(".mobile-link").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Workflow steps ---------- */
  var steps = [
    ["Choose a product", "Start with the insurance product and the right guided intake."],
    ["Structure the RFQ", "Capture risk details, exposure, requested cover and notes."],
    ["Prepare the email", "Create a purpose-specific underwriting submission."],
    ["Reach insurers", "Address the submission to selected insurer contacts."],
    ["Upload quotations", "Add the quotation files your team receives."],
    ["Review extracted data", "Use AI-assisted extraction, then review the values."],
    ["Compare clearly", "Review normalized commercial and coverage details side by side."],
    ["Track the work", "Follow RFQs, team activity and renewals in one place."]
  ];
  var stepIndex = 0;
  function setStep(i) {
    stepIndex = i;
    $$("[data-step]").forEach(function (b) {
      var on = Number(b.getAttribute("data-step")) === i;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-pressed", String(on));
    });
    $("#wf-label").textContent = "STEP 0" + (i + 1) + " / 08";
    $("#wf-title").textContent = steps[i][0];
    $("#wf-detail").textContent = steps[i][1];
  }
  $$("[data-step]").forEach(function (b) {
    b.addEventListener("click", function () { setStep(Number(b.getAttribute("data-step"))); });
  });
  $("#wf-next").addEventListener("click", function () { setStep((stepIndex + 1) % steps.length); });

  /* ---------- Comparison table ---------- */
  $$("[data-quote]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-quote");
      $$("[data-row]").forEach(function (row) {
        var on = row.getAttribute("data-row") === name;
        row.classList.toggle("is-selected", on);
        var radio = $(".comparison-radio", row);
        radio.innerHTML = on ? "<span></span>" : "";
      });
      $("#selected-quote").textContent = name;
    });
  });

  /* ---------- Assistant language ---------- */
  var assistant = {
    English: ["What should I check before sending a Fire Insurance RFQ?", "Start with occupancy, property values, construction details, risk location, existing coverage, claims history and required extensions."],
    Hindi: ["Fire Insurance RFQ भेजने से पहले क्या जाँचें?", "ऑक्यूपेंसी, संपत्ति का मूल्य, निर्माण विवरण, जोखिम का स्थान, मौजूदा कवर, क्लेम इतिहास और आवश्यक एक्सटेंशन जाँचें।"],
    Hinglish: ["Fire Insurance RFQ bhejne se pehle kya check karna chahiye?", "Occupancy, property values, construction details, risk location, existing cover, claims history aur required extensions check karein."]
  };
  $$("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      $$("[data-lang]").forEach(function (b) { b.classList.toggle("selected", b === btn); });
      $("#as-question").textContent = assistant[lang][0];
      $("#as-answer").textContent = assistant[lang][1];
    });
  });

  /* ---------- Persona tabs ---------- */
  var personas = [
    ["Operational leaders", "See RFQ progress, work allocation and operational patterns in one shared view."],
    ["Placement specialists", "Prepare product-wise submissions, coordinate insurer contact and review uploaded quotations."],
    ["Sales teams", "Learn product details, compare options clearly and prepare consistent client materials."],
    ["Enterprise administrators", "Manage team access, standardize brand settings and maintain a connected workflow."]
  ];
  $$("[data-persona]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = Number(btn.getAttribute("data-persona"));
      $$("[data-persona]").forEach(function (b) { b.classList.toggle("selected", b === btn); });
      $("#pe-num").textContent = "0" + (i + 1);
      $("#pe-title").textContent = personas[i][0];
      $("#pe-desc").textContent = personas[i][1];
    });
  });

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var items = $$(".faq-item");
  items.forEach(function (item) {
    var trigger = $(".faq-trigger", item);
    trigger.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      items.forEach(function (it) {
        it.classList.remove("is-open");
        $(".faq-trigger", it).setAttribute("aria-expanded", "false");
      });
      if (willOpen) { item.classList.add("is-open"); trigger.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ---------- Demo form (preview only, nothing is sent) ---------- */
  $("#demo-form").addEventListener("submit", function (e) {
    e.preventDefault();
    $("#form-notice").hidden = false;
  });
})();
