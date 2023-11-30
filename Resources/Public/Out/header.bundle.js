var mr = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, J = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, Fr = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], q = {
  CSS: {},
  springs: {}
};
function E(r, e, n) {
  return Math.min(Math.max(r, e), n);
}
function R(r, e) {
  return r.indexOf(e) > -1;
}
function K(r, e) {
  return r.apply(null, e);
}
var c = {
  arr: function(r) {
    return Array.isArray(r);
  },
  obj: function(r) {
    return R(Object.prototype.toString.call(r), "Object");
  },
  pth: function(r) {
    return c.obj(r) && r.hasOwnProperty("totalLength");
  },
  svg: function(r) {
    return r instanceof SVGElement;
  },
  inp: function(r) {
    return r instanceof HTMLInputElement;
  },
  dom: function(r) {
    return r.nodeType || c.svg(r);
  },
  str: function(r) {
    return typeof r == "string";
  },
  fnc: function(r) {
    return typeof r == "function";
  },
  und: function(r) {
    return typeof r > "u";
  },
  nil: function(r) {
    return c.und(r) || r === null;
  },
  hex: function(r) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r);
  },
  rgb: function(r) {
    return /^rgb/.test(r);
  },
  hsl: function(r) {
    return /^hsl/.test(r);
  },
  col: function(r) {
    return c.hex(r) || c.rgb(r) || c.hsl(r);
  },
  key: function(r) {
    return !mr.hasOwnProperty(r) && !J.hasOwnProperty(r) && r !== "targets" && r !== "keyframes";
  }
};
function pr(r) {
  var e = /\(([^)]+)\)/.exec(r);
  return e ? e[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function yr(r, e) {
  var n = pr(r), a = E(c.und(n[0]) ? 1 : n[0], 0.1, 100), t = E(c.und(n[1]) ? 100 : n[1], 0.1, 100), u = E(c.und(n[2]) ? 10 : n[2], 0.1, 100), o = E(c.und(n[3]) ? 0 : n[3], 0.1, 100), s = Math.sqrt(t / a), i = u / (2 * Math.sqrt(t * a)), m = i < 1 ? s * Math.sqrt(1 - i * i) : 0, f = 1, l = i < 1 ? (i * s + -o) / m : -o + s;
  function h(p) {
    var v = e ? e * p / 1e3 : p;
    return i < 1 ? v = Math.exp(-v * i * s) * (f * Math.cos(m * v) + l * Math.sin(m * v)) : v = (f + l * v) * Math.exp(-v * s), p === 0 || p === 1 ? p : 1 - v;
  }
  function T() {
    var p = q.springs[r];
    if (p)
      return p;
    for (var v = 1 / 6, b = 0, x = 0; ; )
      if (b += v, h(b) === 1) {
        if (x++, x >= 16)
          break;
      } else
        x = 0;
    var g = b * v * 1e3;
    return q.springs[r] = g, g;
  }
  return e ? h : T;
}
function Vr(r) {
  return r === void 0 && (r = 10), function(e) {
    return Math.ceil(E(e, 1e-6, 1) * r) * (1 / r);
  };
}
var jr = function() {
  var r = 11, e = 1 / (r - 1);
  function n(f, l) {
    return 1 - 3 * l + 3 * f;
  }
  function a(f, l) {
    return 3 * l - 6 * f;
  }
  function t(f) {
    return 3 * f;
  }
  function u(f, l, h) {
    return ((n(l, h) * f + a(l, h)) * f + t(l)) * f;
  }
  function o(f, l, h) {
    return 3 * n(l, h) * f * f + 2 * a(l, h) * f + t(l);
  }
  function s(f, l, h, T, p) {
    var v, b, x = 0;
    do
      b = l + (h - l) / 2, v = u(b, T, p) - f, v > 0 ? h = b : l = b;
    while (Math.abs(v) > 1e-7 && ++x < 10);
    return b;
  }
  function i(f, l, h, T) {
    for (var p = 0; p < 4; ++p) {
      var v = o(l, h, T);
      if (v === 0)
        return l;
      var b = u(l, h, T) - f;
      l -= b / v;
    }
    return l;
  }
  function m(f, l, h, T) {
    if (!(0 <= f && f <= 1 && 0 <= h && h <= 1))
      return;
    var p = new Float32Array(r);
    if (f !== l || h !== T)
      for (var v = 0; v < r; ++v)
        p[v] = u(v * e, f, h);
    function b(x) {
      for (var g = 0, d = 1, P = r - 1; d !== P && p[d] <= x; ++d)
        g += e;
      --d;
      var S = (x - p[d]) / (p[d + 1] - p[d]), w = g + S * e, O = o(w, f, h);
      return O >= 1e-3 ? i(x, w, f, h) : O === 0 ? w : s(x, g, g + e, f, h);
    }
    return function(x) {
      return f === l && h === T || x === 0 || x === 1 ? x : u(b(x), l, T);
    };
  }
  return m;
}(), br = function() {
  var r = { linear: function() {
    return function(a) {
      return a;
    };
  } }, e = {
    Sine: function() {
      return function(a) {
        return 1 - Math.cos(a * Math.PI / 2);
      };
    },
    Expo: function() {
      return function(a) {
        return a ? Math.pow(2, 10 * a - 10) : 0;
      };
    },
    Circ: function() {
      return function(a) {
        return 1 - Math.sqrt(1 - a * a);
      };
    },
    Back: function() {
      return function(a) {
        return a * a * (3 * a - 2);
      };
    },
    Bounce: function() {
      return function(a) {
        for (var t, u = 4; a < ((t = Math.pow(2, --u)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - u) - 7.5625 * Math.pow((t * 3 - 2) / 22 - a, 2);
      };
    },
    Elastic: function(a, t) {
      a === void 0 && (a = 1), t === void 0 && (t = 0.5);
      var u = E(a, 1, 10), o = E(t, 0.1, 2);
      return function(s) {
        return s === 0 || s === 1 ? s : -u * Math.pow(2, 10 * (s - 1)) * Math.sin((s - 1 - o / (Math.PI * 2) * Math.asin(1 / u)) * (Math.PI * 2) / o);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint"];
  return n.forEach(function(a, t) {
    e[a] = function() {
      return function(u) {
        return Math.pow(u, t + 2);
      };
    };
  }), Object.keys(e).forEach(function(a) {
    var t = e[a];
    r["easeIn" + a] = t, r["easeOut" + a] = function(u, o) {
      return function(s) {
        return 1 - t(u, o)(1 - s);
      };
    }, r["easeInOut" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? t(u, o)(s * 2) / 2 : 1 - t(u, o)(s * -2 + 2) / 2;
      };
    }, r["easeOutIn" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? (1 - t(u, o)(1 - s * 2)) / 2 : (t(u, o)(s * 2 - 1) + 1) / 2;
      };
    };
  }), r;
}();
function G(r, e) {
  if (c.fnc(r))
    return r;
  var n = r.split("(")[0], a = br[n], t = pr(r);
  switch (n) {
    case "spring":
      return yr(r, e);
    case "cubicBezier":
      return K(jr, t);
    case "steps":
      return K(Vr, t);
    default:
      return K(a, t);
  }
}
function wr(r) {
  try {
    var e = document.querySelectorAll(r);
    return e;
  } catch {
    return;
  }
}
function U(r, e) {
  for (var n = r.length, a = arguments.length >= 2 ? arguments[1] : void 0, t = [], u = 0; u < n; u++)
    if (u in r) {
      var o = r[u];
      e.call(a, o, u, r) && t.push(o);
    }
  return t;
}
function W(r) {
  return r.reduce(function(e, n) {
    return e.concat(c.arr(n) ? W(n) : n);
  }, []);
}
function lr(r) {
  return c.arr(r) ? r : (c.str(r) && (r = wr(r) || r), r instanceof NodeList || r instanceof HTMLCollection ? [].slice.call(r) : [r]);
}
function X(r, e) {
  return r.some(function(n) {
    return n === e;
  });
}
function rr(r) {
  var e = {};
  for (var n in r)
    e[n] = r[n];
  return e;
}
function Y(r, e) {
  var n = rr(r);
  for (var a in r)
    n[a] = e.hasOwnProperty(a) ? e[a] : r[a];
  return n;
}
function N(r, e) {
  var n = rr(r);
  for (var a in e)
    n[a] = c.und(r[a]) ? e[a] : r[a];
  return n;
}
function zr(r) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
  return e ? "rgba(" + e[1] + ",1)" : r;
}
function Rr(r) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = r.replace(e, function(s, i, m, f) {
    return i + i + m + m + f + f;
  }), a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), t = parseInt(a[1], 16), u = parseInt(a[2], 16), o = parseInt(a[3], 16);
  return "rgba(" + t + "," + u + "," + o + ",1)";
}
function Hr(r) {
  var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(r) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(r), n = parseInt(e[1], 10) / 360, a = parseInt(e[2], 10) / 100, t = parseInt(e[3], 10) / 100, u = e[4] || 1;
  function o(h, T, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? h + (T - h) * 6 * p : p < 1 / 2 ? T : p < 2 / 3 ? h + (T - h) * (2 / 3 - p) * 6 : h;
  }
  var s, i, m;
  if (a == 0)
    s = i = m = t;
  else {
    var f = t < 0.5 ? t * (1 + a) : t + a - t * a, l = 2 * t - f;
    s = o(l, f, n + 1 / 3), i = o(l, f, n), m = o(l, f, n - 1 / 3);
  }
  return "rgba(" + s * 255 + "," + i * 255 + "," + m * 255 + "," + u + ")";
}
function qr(r) {
  if (c.rgb(r))
    return zr(r);
  if (c.hex(r))
    return Rr(r);
  if (c.hsl(r))
    return Hr(r);
}
function k(r) {
  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(r);
  if (e)
    return e[1];
}
function Ur(r) {
  if (R(r, "translate") || r === "perspective")
    return "px";
  if (R(r, "rotate") || R(r, "skew"))
    return "deg";
}
function _(r, e) {
  return c.fnc(r) ? r(e.target, e.id, e.total) : r;
}
function D(r, e) {
  return r.getAttribute(e);
}
function er(r, e, n) {
  var a = k(e);
  if (X([n, "deg", "rad", "turn"], a))
    return e;
  var t = q.CSS[e + n];
  if (!c.und(t))
    return t;
  var u = 100, o = document.createElement(r.tagName), s = r.parentNode && r.parentNode !== document ? r.parentNode : document.body;
  s.appendChild(o), o.style.position = "absolute", o.style.width = u + n;
  var i = u / o.offsetWidth;
  s.removeChild(o);
  var m = i * parseFloat(e);
  return q.CSS[e + n] = m, m;
}
function xr(r, e, n) {
  if (e in r.style) {
    var a = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t = r.style[e] || getComputedStyle(r).getPropertyValue(a) || "0";
    return n ? er(r, t, n) : t;
  }
}
function nr(r, e) {
  if (c.dom(r) && !c.inp(r) && (!c.nil(D(r, e)) || c.svg(r) && r[e]))
    return "attribute";
  if (c.dom(r) && X(Fr, e))
    return "transform";
  if (c.dom(r) && e !== "transform" && xr(r, e))
    return "css";
  if (r[e] != null)
    return "object";
}
function Mr(r) {
  if (c.dom(r)) {
    for (var e = r.style.transform || "", n = /(\w+)\(([^)]*)\)/g, a = /* @__PURE__ */ new Map(), t; t = n.exec(e); )
      a.set(t[1], t[2]);
    return a;
  }
}
function Wr(r, e, n, a) {
  var t = R(e, "scale") ? 1 : 0 + Ur(e), u = Mr(r).get(e) || t;
  return n && (n.transforms.list.set(e, u), n.transforms.last = e), a ? er(r, u, a) : u;
}
function tr(r, e, n, a) {
  switch (nr(r, e)) {
    case "transform":
      return Wr(r, e, a, n);
    case "css":
      return xr(r, e, n);
    case "attribute":
      return D(r, e);
    default:
      return r[e] || 0;
  }
}
function ar(r, e) {
  var n = /^(\*=|\+=|-=)/.exec(r);
  if (!n)
    return r;
  var a = k(r) || 0, t = parseFloat(e), u = parseFloat(r.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return t + u + a;
    case "-":
      return t - u + a;
    case "*":
      return t * u + a;
  }
}
function Tr(r, e) {
  if (c.col(r))
    return qr(r);
  if (/\s/g.test(r))
    return r;
  var n = k(r), a = n ? r.substr(0, r.length - n.length) : r;
  return e ? a + e : a;
}
function ir(r, e) {
  return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
}
function Nr(r) {
  return Math.PI * 2 * D(r, "r");
}
function Zr(r) {
  return D(r, "width") * 2 + D(r, "height") * 2;
}
function $r(r) {
  return ir(
    { x: D(r, "x1"), y: D(r, "y1") },
    { x: D(r, "x2"), y: D(r, "y2") }
  );
}
function Pr(r) {
  for (var e = r.points, n = 0, a, t = 0; t < e.numberOfItems; t++) {
    var u = e.getItem(t);
    t > 0 && (n += ir(a, u)), a = u;
  }
  return n;
}
function Qr(r) {
  var e = r.points;
  return Pr(r) + ir(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Ir(r) {
  if (r.getTotalLength)
    return r.getTotalLength();
  switch (r.tagName.toLowerCase()) {
    case "circle":
      return Nr(r);
    case "rect":
      return Zr(r);
    case "line":
      return $r(r);
    case "polyline":
      return Pr(r);
    case "polygon":
      return Qr(r);
  }
}
function Kr(r) {
  var e = Ir(r);
  return r.setAttribute("stroke-dasharray", e), e;
}
function Yr(r) {
  for (var e = r.parentNode; c.svg(e) && c.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Cr(r, e) {
  var n = e || {}, a = n.el || Yr(r), t = a.getBoundingClientRect(), u = D(a, "viewBox"), o = t.width, s = t.height, i = n.viewBox || (u ? u.split(" ") : [0, 0, o, s]);
  return {
    el: a,
    viewBox: i,
    x: i[0] / 1,
    y: i[1] / 1,
    w: o,
    h: s,
    vW: i[2],
    vH: i[3]
  };
}
function _r(r, e) {
  var n = c.str(r) ? wr(r)[0] : r, a = e || 100;
  return function(t) {
    return {
      property: t,
      el: n,
      svg: Cr(n),
      totalLength: Ir(n) * (a / 100)
    };
  };
}
function Jr(r, e, n) {
  function a(f) {
    f === void 0 && (f = 0);
    var l = e + f >= 1 ? e + f : 0;
    return r.el.getPointAtLength(l);
  }
  var t = Cr(r.el, r.svg), u = a(), o = a(-1), s = a(1), i = n ? 1 : t.w / t.vW, m = n ? 1 : t.h / t.vH;
  switch (r.property) {
    case "x":
      return (u.x - t.x) * i;
    case "y":
      return (u.y - t.y) * m;
    case "angle":
      return Math.atan2(s.y - o.y, s.x - o.x) * 180 / Math.PI;
  }
}
function vr(r, e) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, a = Tr(c.pth(r) ? r.totalLength : r, e) + "";
  return {
    original: a,
    numbers: a.match(n) ? a.match(n).map(Number) : [0],
    strings: c.str(r) || e ? a.split(n) : []
  };
}
function ur(r) {
  var e = r ? W(c.arr(r) ? r.map(lr) : lr(r)) : [];
  return U(e, function(n, a, t) {
    return t.indexOf(n) === a;
  });
}
function Er(r) {
  var e = ur(r);
  return e.map(function(n, a) {
    return { target: n, id: a, total: e.length, transforms: { list: Mr(n) } };
  });
}
function Gr(r, e) {
  var n = rr(e);
  if (/^spring/.test(n.easing) && (n.duration = yr(n.easing)), c.arr(r)) {
    var a = r.length, t = a === 2 && !c.obj(r[0]);
    t ? r = { value: r } : c.fnc(e.duration) || (n.duration = e.duration / a);
  }
  var u = c.arr(r) ? r : [r];
  return u.map(function(o, s) {
    var i = c.obj(o) && !c.pth(o) ? o : { value: o };
    return c.und(i.delay) && (i.delay = s ? 0 : e.delay), c.und(i.endDelay) && (i.endDelay = s === u.length - 1 ? e.endDelay : 0), i;
  }).map(function(o) {
    return N(o, n);
  });
}
function Xr(r) {
  for (var e = U(W(r.map(function(u) {
    return Object.keys(u);
  })), function(u) {
    return c.key(u);
  }).reduce(function(u, o) {
    return u.indexOf(o) < 0 && u.push(o), u;
  }, []), n = {}, a = function(u) {
    var o = e[u];
    n[o] = r.map(function(s) {
      var i = {};
      for (var m in s)
        c.key(m) ? m == o && (i.value = s[m]) : i[m] = s[m];
      return i;
    });
  }, t = 0; t < e.length; t++)
    a(t);
  return n;
}
function re(r, e) {
  var n = [], a = e.keyframes;
  a && (e = N(Xr(a), e));
  for (var t in e)
    c.key(t) && n.push({
      name: t,
      tweens: Gr(e[t], r)
    });
  return n;
}
function ee(r, e) {
  var n = {};
  for (var a in r) {
    var t = _(r[a], e);
    c.arr(t) && (t = t.map(function(u) {
      return _(u, e);
    }), t.length === 1 && (t = t[0])), n[a] = t;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function ne(r, e) {
  var n;
  return r.tweens.map(function(a) {
    var t = ee(a, e), u = t.value, o = c.arr(u) ? u[1] : u, s = k(o), i = tr(e.target, r.name, s, e), m = n ? n.to.original : i, f = c.arr(u) ? u[0] : m, l = k(f) || k(i), h = s || l;
    return c.und(o) && (o = m), t.from = vr(f, h), t.to = vr(ar(o, f), h), t.start = n ? n.end : 0, t.end = t.start + t.delay + t.duration + t.endDelay, t.easing = G(t.easing, t.duration), t.isPath = c.pth(u), t.isPathTargetInsideSVG = t.isPath && c.svg(e.target), t.isColor = c.col(t.from.original), t.isColor && (t.round = 1), n = t, t;
  });
}
var Dr = {
  css: function(r, e, n) {
    return r.style[e] = n;
  },
  attribute: function(r, e, n) {
    return r.setAttribute(e, n);
  },
  object: function(r, e, n) {
    return r[e] = n;
  },
  transform: function(r, e, n, a, t) {
    if (a.list.set(e, n), e === a.last || t) {
      var u = "";
      a.list.forEach(function(o, s) {
        u += s + "(" + o + ") ";
      }), r.style.transform = u;
    }
  }
};
function kr(r, e) {
  var n = Er(r);
  n.forEach(function(a) {
    for (var t in e) {
      var u = _(e[t], a), o = a.target, s = k(u), i = tr(o, t, s, a), m = s || k(i), f = ar(Tr(u, m), i), l = nr(o, t);
      Dr[l](o, t, f, a.transforms, !0);
    }
  });
}
function te(r, e) {
  var n = nr(r.target, e.name);
  if (n) {
    var a = ne(e, r), t = a[a.length - 1];
    return {
      type: n,
      property: e.name,
      animatable: r,
      tweens: a,
      duration: t.end,
      delay: a[0].delay,
      endDelay: t.endDelay
    };
  }
}
function ae(r, e) {
  return U(W(r.map(function(n) {
    return e.map(function(a) {
      return te(n, a);
    });
  })), function(n) {
    return !c.und(n);
  });
}
function Sr(r, e) {
  var n = r.length, a = function(u) {
    return u.timelineOffset ? u.timelineOffset : 0;
  }, t = {};
  return t.duration = n ? Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration;
  })) : e.duration, t.delay = n ? Math.min.apply(Math, r.map(function(u) {
    return a(u) + u.delay;
  })) : e.delay, t.endDelay = n ? t.duration - Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration - u.endDelay;
  })) : e.endDelay, t;
}
var dr = 0;
function ie(r) {
  var e = Y(mr, r), n = Y(J, r), a = re(n, r), t = Er(r.targets), u = ae(t, a), o = Sr(u, n), s = dr;
  return dr++, N(e, {
    id: s,
    children: [],
    animatables: t,
    animations: u,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var C = [], Or = function() {
  var r;
  function e() {
    !r && (!gr() || !y.suspendWhenDocumentHidden) && C.length > 0 && (r = requestAnimationFrame(n));
  }
  function n(t) {
    for (var u = C.length, o = 0; o < u; ) {
      var s = C[o];
      s.paused ? (C.splice(o, 1), u--) : (s.tick(t), o++);
    }
    r = o > 0 ? requestAnimationFrame(n) : void 0;
  }
  function a() {
    y.suspendWhenDocumentHidden && (gr() ? r = cancelAnimationFrame(r) : (C.forEach(
      function(t) {
        return t._onDocumentVisibility();
      }
    ), Or()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", a), e;
}();
function gr() {
  return !!document && document.hidden;
}
function y(r) {
  r === void 0 && (r = {});
  var e = 0, n = 0, a = 0, t, u = 0, o = null;
  function s(g) {
    var d = window.Promise && new Promise(function(P) {
      return o = P;
    });
    return g.finished = d, d;
  }
  var i = ie(r);
  s(i);
  function m() {
    var g = i.direction;
    g !== "alternate" && (i.direction = g !== "normal" ? "normal" : "reverse"), i.reversed = !i.reversed, t.forEach(function(d) {
      return d.reversed = i.reversed;
    });
  }
  function f(g) {
    return i.reversed ? i.duration - g : g;
  }
  function l() {
    e = 0, n = f(i.currentTime) * (1 / y.speed);
  }
  function h(g, d) {
    d && d.seek(g - d.timelineOffset);
  }
  function T(g) {
    if (i.reversePlayback)
      for (var P = u; P--; )
        h(g, t[P]);
    else
      for (var d = 0; d < u; d++)
        h(g, t[d]);
  }
  function p(g) {
    for (var d = 0, P = i.animations, S = P.length; d < S; ) {
      var w = P[d], O = w.animatable, F = w.tweens, L = F.length - 1, M = F[L];
      L && (M = U(F, function(Br) {
        return g < Br.end;
      })[0] || M);
      for (var A = E(g - M.start - M.delay, 0, M.duration) / M.duration, H = isNaN(A) ? 1 : M.easing(A), I = M.to.strings, Z = M.round, $ = [], Ar = M.to.numbers.length, B = void 0, V = 0; V < Ar; V++) {
        var j = void 0, or = M.to.numbers[V], sr = M.from.numbers[V] || 0;
        M.isPath ? j = Jr(M.value, H * or, M.isPathTargetInsideSVG) : j = sr + H * (or - sr), Z && (M.isColor && V > 2 || (j = Math.round(j * Z) / Z)), $.push(j);
      }
      var fr = I.length;
      if (!fr)
        B = $[0];
      else {
        B = I[0];
        for (var z = 0; z < fr; z++) {
          I[z];
          var cr = I[z + 1], Q = $[z];
          isNaN(Q) || (cr ? B += Q + cr : B += Q + " ");
        }
      }
      Dr[w.type](O.target, w.property, B, O.transforms), w.currentValue = B, d++;
    }
  }
  function v(g) {
    i[g] && !i.passThrough && i[g](i);
  }
  function b() {
    i.remaining && i.remaining !== !0 && i.remaining--;
  }
  function x(g) {
    var d = i.duration, P = i.delay, S = d - i.endDelay, w = f(g);
    i.progress = E(w / d * 100, 0, 100), i.reversePlayback = w < i.currentTime, t && T(w), !i.began && i.currentTime > 0 && (i.began = !0, v("begin")), !i.loopBegan && i.currentTime > 0 && (i.loopBegan = !0, v("loopBegin")), w <= P && i.currentTime !== 0 && p(0), (w >= S && i.currentTime !== d || !d) && p(d), w > P && w < S ? (i.changeBegan || (i.changeBegan = !0, i.changeCompleted = !1, v("changeBegin")), v("change"), p(w)) : i.changeBegan && (i.changeCompleted = !0, i.changeBegan = !1, v("changeComplete")), i.currentTime = E(w, 0, d), i.began && v("update"), g >= d && (n = 0, b(), i.remaining ? (e = a, v("loopComplete"), i.loopBegan = !1, i.direction === "alternate" && m()) : (i.paused = !0, i.completed || (i.completed = !0, v("loopComplete"), v("complete"), !i.passThrough && "Promise" in window && (o(), s(i)))));
  }
  return i.reset = function() {
    var g = i.direction;
    i.passThrough = !1, i.currentTime = 0, i.progress = 0, i.paused = !0, i.began = !1, i.loopBegan = !1, i.changeBegan = !1, i.completed = !1, i.changeCompleted = !1, i.reversePlayback = !1, i.reversed = g === "reverse", i.remaining = i.loop, t = i.children, u = t.length;
    for (var d = u; d--; )
      i.children[d].reset();
    (i.reversed && i.loop !== !0 || g === "alternate" && i.loop === 1) && i.remaining++, p(i.reversed ? i.duration : 0);
  }, i._onDocumentVisibility = l, i.set = function(g, d) {
    return kr(g, d), i;
  }, i.tick = function(g) {
    a = g, e || (e = a), x((a + (n - e)) * y.speed);
  }, i.seek = function(g) {
    x(f(g));
  }, i.pause = function() {
    i.paused = !0, l();
  }, i.play = function() {
    i.paused && (i.completed && i.reset(), i.paused = !1, C.push(i), l(), Or());
  }, i.reverse = function() {
    m(), i.completed = !i.reversed, l();
  }, i.restart = function() {
    i.reset(), i.play();
  }, i.remove = function(g) {
    var d = ur(g);
    Lr(d, i);
  }, i.reset(), i.autoplay && i.play(), i;
}
function hr(r, e) {
  for (var n = e.length; n--; )
    X(r, e[n].animatable.target) && e.splice(n, 1);
}
function Lr(r, e) {
  var n = e.animations, a = e.children;
  hr(r, n);
  for (var t = a.length; t--; ) {
    var u = a[t], o = u.animations;
    hr(r, o), !o.length && !u.children.length && a.splice(t, 1);
  }
  !n.length && !a.length && e.pause();
}
function ue(r) {
  for (var e = ur(r), n = C.length; n--; ) {
    var a = C[n];
    Lr(e, a);
  }
}
function oe(r, e) {
  e === void 0 && (e = {});
  var n = e.direction || "normal", a = e.easing ? G(e.easing) : null, t = e.grid, u = e.axis, o = e.from || 0, s = o === "first", i = o === "center", m = o === "last", f = c.arr(r), l = parseFloat(f ? r[0] : r), h = f ? parseFloat(r[1]) : 0, T = k(f ? r[1] : r) || 0, p = e.start || 0 + (f ? l : 0), v = [], b = 0;
  return function(x, g, d) {
    if (s && (o = 0), i && (o = (d - 1) / 2), m && (o = d - 1), !v.length) {
      for (var P = 0; P < d; P++) {
        if (!t)
          v.push(Math.abs(o - P));
        else {
          var S = i ? (t[0] - 1) / 2 : o % t[0], w = i ? (t[1] - 1) / 2 : Math.floor(o / t[0]), O = P % t[0], F = Math.floor(P / t[0]), L = S - O, M = w - F, A = Math.sqrt(L * L + M * M);
          u === "x" && (A = -L), u === "y" && (A = -M), v.push(A);
        }
        b = Math.max.apply(Math, v);
      }
      a && (v = v.map(function(I) {
        return a(I / b) * b;
      })), n === "reverse" && (v = v.map(function(I) {
        return u ? I < 0 ? I * -1 : -I : Math.abs(b - I);
      }));
    }
    var H = f ? (h - l) / b : l;
    return p + H * (Math.round(v[g] * 100) / 100) + T;
  };
}
function se(r) {
  r === void 0 && (r = {});
  var e = y(r);
  return e.duration = 0, e.add = function(n, a) {
    var t = C.indexOf(e), u = e.children;
    t > -1 && C.splice(t, 1);
    function o(h) {
      h.passThrough = !0;
    }
    for (var s = 0; s < u.length; s++)
      o(u[s]);
    var i = N(n, Y(J, r));
    i.targets = i.targets || r.targets;
    var m = e.duration;
    i.autoplay = !1, i.direction = e.direction, i.timelineOffset = c.und(a) ? m : ar(a, m), o(e), e.seek(i.timelineOffset);
    var f = y(i);
    o(f), u.push(f);
    var l = Sr(u, r);
    return e.delay = l.delay, e.endDelay = l.endDelay, e.duration = l.duration, e.seek(0), e.reset(), e.autoplay && e.play(), e;
  }, e;
}
y.version = "3.2.1";
y.speed = 1;
y.suspendWhenDocumentHidden = !0;
y.running = C;
y.remove = ue;
y.get = tr;
y.set = kr;
y.convertPx = er;
y.path = _r;
y.setDashoffset = Kr;
y.stagger = oe;
y.timeline = se;
y.easing = G;
y.penner = br;
y.random = function(r, e) {
  return Math.floor(Math.random() * (e - r + 1)) + r;
};
const fe = () => {
  const r = document.querySelectorAll(".header");
  r && r.forEach((e) => {
    const n = e.querySelector(".header-image img"), a = e.querySelector(".header-scroll-down");
    if (n) {
      const t = y({
        targets: n,
        scale: [2, 1],
        duration: 800,
        elasticity: 200,
        easing: "easeInOutSine",
        autoplay: !1
      }), u = () => {
        if (window.scrollY < n.offsetTop) {
          const o = (n.offsetTop - window.scrollY) / 3.49;
          t.seek(t.duration * (o / 100));
        }
      };
      u(), window.addEventListener("scroll", u), window.addEventListener("resize", () => {
        t.restart(), u();
      });
    }
    a && a.addEventListener("click", () => {
      const t = e.parentElement.childNodes;
      t.forEach((u, o) => {
        if (u === e && t.length - 1 > o) {
          const s = t[o + 1];
          if (!s)
            return;
          s.scrollIntoView();
        }
      });
    });
  });
};
fe();
