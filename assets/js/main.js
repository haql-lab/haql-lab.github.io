(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile navigation ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  /* ---------- active nav item ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  var navLinks = document.querySelectorAll(".nav a:not(.nav__cta)");
  Array.prototype.forEach.call(navLinks, function (a) {
    var target = (a.getAttribute("href") || "").split("/").pop().split("#")[0];
    if (target && target === path) a.setAttribute("aria-current", "page");
  });

  /* ---------- reading progress ---------- */
  var ticking = false;
  function progress() {
    var h = doc.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    doc.style.setProperty("--progress", p.toFixed(4));
    ticking = false;
  }
  if (!reduce) {
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(progress); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", progress);
    progress();
  }

  /* ---------- scroll reveal ---------- */
  var revealSel = [
    ".hero__copy > *",
    ".hero__panel",
    ".sec .eyebrow", ".sec h2", ".sec .lede",
    ".sec .anchor", ".sec .svc", ".sec .juris", ".sec .verify",
    ".tool", ".pain", ".tier", ".ben > div",
    ".flow > li", ".flow > .step",
    ".after__c", ".stat", ".io__b", ".finding",
    ".plain li", "#faq details", ".links > div"
  ].join(",");

  var targets = document.querySelectorAll(revealSel);

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    var vh = window.innerHeight || doc.clientHeight;
    Array.prototype.forEach.call(targets, function (el) {
      /* only animate elements that start below the fold, so in-view
         content (hero) is never hidden then flashed back in */
      if (el.getBoundingClientRect().top < vh * 0.92) return;

      el.setAttribute("data-reveal", "");
      var parent = el.parentElement;
      if (parent) {
        var sibs = parent.querySelectorAll(':scope > [data-reveal]');
        var i = Array.prototype.indexOf.call(sibs, el);
        if (i > 0) el.style.transitionDelay = Math.min(i * 55, 330) + "ms";
      }
      io.observe(el);
    });
  }

  /* ---------- copy buttons on code panels ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".panel__bar"), function (bar) {
    var panel = bar.closest(".hero__panel");
    if (!panel) return;
    var code = panel.querySelector(".panel__body");
    if (!code) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy";
    btn.textContent = "Copy";

    btn.addEventListener("click", function () {
      var text = code.innerText;
      var done = function () {
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        window.setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("is-done");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });

    bar.appendChild(btn);
  });

  /* ---------- year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
