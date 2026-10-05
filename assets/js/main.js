(function () {
  "use strict";

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
      if (window.innerWidth > 940) setOpen(false);
    });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
