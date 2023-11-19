let m = {
  init: function() {
    let l = document.querySelectorAll("[data-background]"), o = document.querySelectorAll("[data-foreground]");
    l.forEach(function(n) {
      n.style.backgroundColor = n.getAttribute("data-background");
    }), o.forEach(function(n) {
      n.style.color = n.getAttribute("data-foreground");
    });
  }
}, p = {
  init: function() {
    let l = document.querySelector(".mobile-menu-btn"), o = document.querySelector("nav.mobile");
    !l || !o || l.addEventListener("click", function() {
      l.classList.toggle("mobile-btn-active"), o.classList.toggle("mobile-open");
    });
  }
}, g = {
  init: function() {
    window.addEventListener("scroll", function() {
      window.scrollY > 0 && !document.body.classList.contains("fixed") ? document.body.classList.add("fixed") : window.scrollY === 0 && document.body.classList.remove("fixed");
    });
  }
}, E = {
  init: function() {
    let l = document.querySelectorAll(".svg");
    if (l)
      for (let o = 0; o < l.length; o += 1) {
        let n = l[o].src.split(".");
        if (n[n.length - 1].toLowerCase() === "svg") {
          let a = new XMLHttpRequest();
          a.open("GET", l[o].src), a.overrideMimeType("image/svg+xml"), a.addEventListener("load", function() {
            let r = a.responseXML.documentElement;
            r.classList.add("fade-in"), l[o].parentElement.replaceChild(r, l[o]);
          }), a.send();
        }
      }
  }
}, w = {
  init: function(l = ".equal-height", o = "", n = !0) {
    let c, a;
    if (o) {
      if (c = document.querySelectorAll(o), !c)
        return;
    } else if (a = document.querySelectorAll(l), !a)
      return;
    let r = 0, u = function() {
      c ? c.forEach(function(t) {
        let i = t.querySelectorAll(l);
        i && i.forEach(function(e) {
          if (n) {
            let s = t.getAttribute(
              "data-equal-height"
            );
            e.clientHeight > s && t.setAttribute(
              "data-equal-height",
              Math.floor(e.clientHeight).toString()
            );
          } else
            e.clientHeight > r && (r = Math.floor(e.clientHeight));
        });
      }) : a.forEach(function(t) {
        if (n) {
          let i = t.parentElement, e = i.getAttribute(
            "data-equal-height"
          );
          t.clientHeight > e && i.setAttribute(
            "data-equal-height",
            Math.floor(t.clientHeight).toString()
          );
        } else
          t.clientHeight > r && (r = Math.floor(t.clientHeight));
      });
    }, d = function() {
      c ? c.forEach(function(t) {
        let i = t.querySelectorAll(l);
        i && i.forEach(function(e) {
          if (n) {
            let s = t.getAttribute(
              "data-equal-height"
            );
            e.style.height = s + "px";
          } else
            e.style.height = r + "px";
        });
      }) : a.forEach(function(t) {
        if (n) {
          let e = t.parentElement.getAttribute(
            "data-equal-height"
          );
          t.style.height = e + "px";
        } else
          t.style.height = r + "px";
      });
    }, h = function() {
      c ? (c.forEach(function(t) {
        let i = t.querySelectorAll(l);
        i && i.forEach(function(e) {
          n ? t.setAttribute(
            "data-equal-height",
            "0"
          ) : r > 0 && (r = 0), e.style.height = "auto";
        });
      }), u(), d()) : (a.forEach(function(t) {
        n ? t.parentElement.setAttribute(
          "data-equal-height",
          "0"
        ) : r > 0 && (r = 0), t.style.height = "auto";
      }), u(), d());
    };
    h(), window.addEventListener("resize", h);
  }
}, b = {
  init: function() {
    let l = document.querySelectorAll(".parallax-top"), o = document.querySelectorAll(".parallax-bottom"), n = document.querySelectorAll(".parallax-left"), c = document.querySelectorAll(".parallax-right"), a = window.innerHeight, r = 15, u = 15, d = 15, h = 15, t = function(e, s) {
      if (window.scrollY >= e.parentElement.offsetTop - a && window.scrollY <= e.parentElement.offsetTop + e.parentElement.clientHeight + a) {
        if (s === "top") {
          let f = (window.scrollY - e.parentElement.offsetTop) / r;
          e.style.top = f + "px";
        } else if (s === "bottom") {
          let f = (window.scrollY - e.parentElement.offsetTop) / u;
          e.style.bottom = f + "px";
        } else if (s === "left") {
          let f = (window.scrollY - e.parentElement.offsetTop) / d;
          e.style.left = f + "px";
        } else if (s === "right") {
          let f = (window.scrollY - e.parentElement.offsetTop) / h;
          e.style.right = f + "px";
        }
      }
    }, i = function() {
      l.forEach(function(e) {
        t(e, "top");
      }), o.forEach(function(e) {
        t(e, "bottom");
      }), n.forEach(function(e) {
        t(e, "left");
      }), c.forEach(function(e) {
        t(e, "right");
      });
    };
    i(), window.addEventListener("scroll", i, { passive: !0 });
  }
}, y = {
  init: function() {
    let l = document.createElement("button");
    l.className = "content-scroll-top", l.innerText = "T", l.addEventListener("click", function() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }), window.addEventListener("scroll", function() {
      window.scrollY > 250 ? l.classList.add("scroll-top-show") : l.classList.remove("scroll-top-show");
    }), document.body.appendChild(l);
  }
};
m.init();
p.init();
g.init();
E.init();
w.init();
b.init();
y.init();
console.log("WE LOVE TYPO3");
