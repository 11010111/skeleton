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
function E(r, e, t) {
  return Math.min(Math.max(r, e), t);
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
  return e ? e[1].split(",").map(function(t) {
    return parseFloat(t);
  }) : [];
}
function yr(r, e) {
  var t = pr(r), a = E(c.und(t[0]) ? 1 : t[0], 0.1, 100), n = E(c.und(t[1]) ? 100 : t[1], 0.1, 100), u = E(c.und(t[2]) ? 10 : t[2], 0.1, 100), o = E(c.und(t[3]) ? 0 : t[3], 0.1, 100), s = Math.sqrt(n / a), i = u / (2 * Math.sqrt(n * a)), m = i < 1 ? s * Math.sqrt(1 - i * i) : 0, f = 1, l = i < 1 ? (i * s + -o) / m : -o + s;
  function h(p) {
    var v = e ? e * p / 1e3 : p;
    return i < 1 ? v = Math.exp(-v * i * s) * (f * Math.cos(m * v) + l * Math.sin(m * v)) : v = (f + l * v) * Math.exp(-v * s), p === 0 || p === 1 ? p : 1 - v;
  }
  function T() {
    var p = q.springs[r];
    if (p)
      return p;
    for (var v = 1 / 6, b = 0, M = 0; ; )
      if (b += v, h(b) === 1) {
        if (M++, M >= 16)
          break;
      } else
        M = 0;
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
  function t(f, l) {
    return 1 - 3 * l + 3 * f;
  }
  function a(f, l) {
    return 3 * l - 6 * f;
  }
  function n(f) {
    return 3 * f;
  }
  function u(f, l, h) {
    return ((t(l, h) * f + a(l, h)) * f + n(l)) * f;
  }
  function o(f, l, h) {
    return 3 * t(l, h) * f * f + 2 * a(l, h) * f + n(l);
  }
  function s(f, l, h, T, p) {
    var v, b, M = 0;
    do
      b = l + (h - l) / 2, v = u(b, T, p) - f, v > 0 ? h = b : l = b;
    while (Math.abs(v) > 1e-7 && ++M < 10);
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
    function b(M) {
      for (var g = 0, d = 1, P = r - 1; d !== P && p[d] <= M; ++d)
        g += e;
      --d;
      var S = (M - p[d]) / (p[d + 1] - p[d]), x = g + S * e, O = o(x, f, h);
      return O >= 1e-3 ? i(M, x, f, h) : O === 0 ? x : s(M, g, g + e, f, h);
    }
    return function(M) {
      return f === l && h === T || M === 0 || M === 1 ? M : u(b(M), l, T);
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
        for (var n, u = 4; a < ((n = Math.pow(2, --u)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - u) - 7.5625 * Math.pow((n * 3 - 2) / 22 - a, 2);
      };
    },
    Elastic: function(a, n) {
      a === void 0 && (a = 1), n === void 0 && (n = 0.5);
      var u = E(a, 1, 10), o = E(n, 0.1, 2);
      return function(s) {
        return s === 0 || s === 1 ? s : -u * Math.pow(2, 10 * (s - 1)) * Math.sin((s - 1 - o / (Math.PI * 2) * Math.asin(1 / u)) * (Math.PI * 2) / o);
      };
    }
  }, t = ["Quad", "Cubic", "Quart", "Quint"];
  return t.forEach(function(a, n) {
    e[a] = function() {
      return function(u) {
        return Math.pow(u, n + 2);
      };
    };
  }), Object.keys(e).forEach(function(a) {
    var n = e[a];
    r["easeIn" + a] = n, r["easeOut" + a] = function(u, o) {
      return function(s) {
        return 1 - n(u, o)(1 - s);
      };
    }, r["easeInOut" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? n(u, o)(s * 2) / 2 : 1 - n(u, o)(s * -2 + 2) / 2;
      };
    }, r["easeOutIn" + a] = function(u, o) {
      return function(s) {
        return s < 0.5 ? (1 - n(u, o)(1 - s * 2)) / 2 : (n(u, o)(s * 2 - 1) + 1) / 2;
      };
    };
  }), r;
}();
function G(r, e) {
  if (c.fnc(r))
    return r;
  var t = r.split("(")[0], a = br[t], n = pr(r);
  switch (t) {
    case "spring":
      return yr(r, e);
    case "cubicBezier":
      return K(jr, n);
    case "steps":
      return K(Vr, n);
    default:
      return K(a, n);
  }
}
function xr(r) {
  try {
    var e = document.querySelectorAll(r);
    return e;
  } catch {
    return;
  }
}
function U(r, e) {
  for (var t = r.length, a = arguments.length >= 2 ? arguments[1] : void 0, n = [], u = 0; u < t; u++)
    if (u in r) {
      var o = r[u];
      e.call(a, o, u, r) && n.push(o);
    }
  return n;
}
function W(r) {
  return r.reduce(function(e, t) {
    return e.concat(c.arr(t) ? W(t) : t);
  }, []);
}
function lr(r) {
  return c.arr(r) ? r : (c.str(r) && (r = xr(r) || r), r instanceof NodeList || r instanceof HTMLCollection ? [].slice.call(r) : [r]);
}
function X(r, e) {
  return r.some(function(t) {
    return t === e;
  });
}
function rr(r) {
  var e = {};
  for (var t in r)
    e[t] = r[t];
  return e;
}
function _(r, e) {
  var t = rr(r);
  for (var a in r)
    t[a] = e.hasOwnProperty(a) ? e[a] : r[a];
  return t;
}
function N(r, e) {
  var t = rr(r);
  for (var a in e)
    t[a] = c.und(r[a]) ? e[a] : r[a];
  return t;
}
function zr(r) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
  return e ? "rgba(" + e[1] + ",1)" : r;
}
function Rr(r) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, t = r.replace(e, function(s, i, m, f) {
    return i + i + m + m + f + f;
  }), a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t), n = parseInt(a[1], 16), u = parseInt(a[2], 16), o = parseInt(a[3], 16);
  return "rgba(" + n + "," + u + "," + o + ",1)";
}
function Hr(r) {
  var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(r) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(r), t = parseInt(e[1], 10) / 360, a = parseInt(e[2], 10) / 100, n = parseInt(e[3], 10) / 100, u = e[4] || 1;
  function o(h, T, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? h + (T - h) * 6 * p : p < 1 / 2 ? T : p < 2 / 3 ? h + (T - h) * (2 / 3 - p) * 6 : h;
  }
  var s, i, m;
  if (a == 0)
    s = i = m = n;
  else {
    var f = n < 0.5 ? n * (1 + a) : n + a - n * a, l = 2 * n - f;
    s = o(l, f, t + 1 / 3), i = o(l, f, t), m = o(l, f, t - 1 / 3);
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
function Y(r, e) {
  return c.fnc(r) ? r(e.target, e.id, e.total) : r;
}
function D(r, e) {
  return r.getAttribute(e);
}
function er(r, e, t) {
  var a = k(e);
  if (X([t, "deg", "rad", "turn"], a))
    return e;
  var n = q.CSS[e + t];
  if (!c.und(n))
    return n;
  var u = 100, o = document.createElement(r.tagName), s = r.parentNode && r.parentNode !== document ? r.parentNode : document.body;
  s.appendChild(o), o.style.position = "absolute", o.style.width = u + t;
  var i = u / o.offsetWidth;
  s.removeChild(o);
  var m = i * parseFloat(e);
  return q.CSS[e + t] = m, m;
}
function Mr(r, e, t) {
  if (e in r.style) {
    var a = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), n = r.style[e] || getComputedStyle(r).getPropertyValue(a) || "0";
    return t ? er(r, n, t) : n;
  }
}
function nr(r, e) {
  if (c.dom(r) && !c.inp(r) && (!c.nil(D(r, e)) || c.svg(r) && r[e]))
    return "attribute";
  if (c.dom(r) && X(Fr, e))
    return "transform";
  if (c.dom(r) && e !== "transform" && Mr(r, e))
    return "css";
  if (r[e] != null)
    return "object";
}
function wr(r) {
  if (c.dom(r)) {
    for (var e = r.style.transform || "", t = /(\w+)\(([^)]*)\)/g, a = /* @__PURE__ */ new Map(), n; n = t.exec(e); )
      a.set(n[1], n[2]);
    return a;
  }
}
function Wr(r, e, t, a) {
  var n = R(e, "scale") ? 1 : 0 + Ur(e), u = wr(r).get(e) || n;
  return t && (t.transforms.list.set(e, u), t.transforms.last = e), a ? er(r, u, a) : u;
}
function tr(r, e, t, a) {
  switch (nr(r, e)) {
    case "transform":
      return Wr(r, e, a, t);
    case "css":
      return Mr(r, e, t);
    case "attribute":
      return D(r, e);
    default:
      return r[e] || 0;
  }
}
function ar(r, e) {
  var t = /^(\*=|\+=|-=)/.exec(r);
  if (!t)
    return r;
  var a = k(r) || 0, n = parseFloat(e), u = parseFloat(r.replace(t[0], ""));
  switch (t[0][0]) {
    case "+":
      return n + u + a;
    case "-":
      return n - u + a;
    case "*":
      return n * u + a;
  }
}
function Tr(r, e) {
  if (c.col(r))
    return qr(r);
  if (/\s/g.test(r))
    return r;
  var t = k(r), a = t ? r.substr(0, r.length - t.length) : r;
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
  for (var e = r.points, t = 0, a, n = 0; n < e.numberOfItems; n++) {
    var u = e.getItem(n);
    n > 0 && (t += ir(a, u)), a = u;
  }
  return t;
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
function _r(r) {
  for (var e = r.parentNode; c.svg(e) && c.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Cr(r, e) {
  var t = e || {}, a = t.el || _r(r), n = a.getBoundingClientRect(), u = D(a, "viewBox"), o = n.width, s = n.height, i = t.viewBox || (u ? u.split(" ") : [0, 0, o, s]);
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
function Yr(r, e) {
  var t = c.str(r) ? xr(r)[0] : r, a = e || 100;
  return function(n) {
    return {
      property: n,
      el: t,
      svg: Cr(t),
      totalLength: Ir(t) * (a / 100)
    };
  };
}
function Jr(r, e, t) {
  function a(f) {
    f === void 0 && (f = 0);
    var l = e + f >= 1 ? e + f : 0;
    return r.el.getPointAtLength(l);
  }
  var n = Cr(r.el, r.svg), u = a(), o = a(-1), s = a(1), i = t ? 1 : n.w / n.vW, m = t ? 1 : n.h / n.vH;
  switch (r.property) {
    case "x":
      return (u.x - n.x) * i;
    case "y":
      return (u.y - n.y) * m;
    case "angle":
      return Math.atan2(s.y - o.y, s.x - o.x) * 180 / Math.PI;
  }
}
function vr(r, e) {
  var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, a = Tr(c.pth(r) ? r.totalLength : r, e) + "";
  return {
    original: a,
    numbers: a.match(t) ? a.match(t).map(Number) : [0],
    strings: c.str(r) || e ? a.split(t) : []
  };
}
function ur(r) {
  var e = r ? W(c.arr(r) ? r.map(lr) : lr(r)) : [];
  return U(e, function(t, a, n) {
    return n.indexOf(t) === a;
  });
}
function Er(r) {
  var e = ur(r);
  return e.map(function(t, a) {
    return { target: t, id: a, total: e.length, transforms: { list: wr(t) } };
  });
}
function Gr(r, e) {
  var t = rr(e);
  if (/^spring/.test(t.easing) && (t.duration = yr(t.easing)), c.arr(r)) {
    var a = r.length, n = a === 2 && !c.obj(r[0]);
    n ? r = { value: r } : c.fnc(e.duration) || (t.duration = e.duration / a);
  }
  var u = c.arr(r) ? r : [r];
  return u.map(function(o, s) {
    var i = c.obj(o) && !c.pth(o) ? o : { value: o };
    return c.und(i.delay) && (i.delay = s ? 0 : e.delay), c.und(i.endDelay) && (i.endDelay = s === u.length - 1 ? e.endDelay : 0), i;
  }).map(function(o) {
    return N(o, t);
  });
}
function Xr(r) {
  for (var e = U(W(r.map(function(u) {
    return Object.keys(u);
  })), function(u) {
    return c.key(u);
  }).reduce(function(u, o) {
    return u.indexOf(o) < 0 && u.push(o), u;
  }, []), t = {}, a = function(u) {
    var o = e[u];
    t[o] = r.map(function(s) {
      var i = {};
      for (var m in s)
        c.key(m) ? m == o && (i.value = s[m]) : i[m] = s[m];
      return i;
    });
  }, n = 0; n < e.length; n++)
    a(n);
  return t;
}
function re(r, e) {
  var t = [], a = e.keyframes;
  a && (e = N(Xr(a), e));
  for (var n in e)
    c.key(n) && t.push({
      name: n,
      tweens: Gr(e[n], r)
    });
  return t;
}
function ee(r, e) {
  var t = {};
  for (var a in r) {
    var n = Y(r[a], e);
    c.arr(n) && (n = n.map(function(u) {
      return Y(u, e);
    }), n.length === 1 && (n = n[0])), t[a] = n;
  }
  return t.duration = parseFloat(t.duration), t.delay = parseFloat(t.delay), t;
}
function ne(r, e) {
  var t;
  return r.tweens.map(function(a) {
    var n = ee(a, e), u = n.value, o = c.arr(u) ? u[1] : u, s = k(o), i = tr(e.target, r.name, s, e), m = t ? t.to.original : i, f = c.arr(u) ? u[0] : m, l = k(f) || k(i), h = s || l;
    return c.und(o) && (o = m), n.from = vr(f, h), n.to = vr(ar(o, f), h), n.start = t ? t.end : 0, n.end = n.start + n.delay + n.duration + n.endDelay, n.easing = G(n.easing, n.duration), n.isPath = c.pth(u), n.isPathTargetInsideSVG = n.isPath && c.svg(e.target), n.isColor = c.col(n.from.original), n.isColor && (n.round = 1), t = n, n;
  });
}
var Dr = {
  css: function(r, e, t) {
    return r.style[e] = t;
  },
  attribute: function(r, e, t) {
    return r.setAttribute(e, t);
  },
  object: function(r, e, t) {
    return r[e] = t;
  },
  transform: function(r, e, t, a, n) {
    if (a.list.set(e, t), e === a.last || n) {
      var u = "";
      a.list.forEach(function(o, s) {
        u += s + "(" + o + ") ";
      }), r.style.transform = u;
    }
  }
};
function kr(r, e) {
  var t = Er(r);
  t.forEach(function(a) {
    for (var n in e) {
      var u = Y(e[n], a), o = a.target, s = k(u), i = tr(o, n, s, a), m = s || k(i), f = ar(Tr(u, m), i), l = nr(o, n);
      Dr[l](o, n, f, a.transforms, !0);
    }
  });
}
function te(r, e) {
  var t = nr(r.target, e.name);
  if (t) {
    var a = ne(e, r), n = a[a.length - 1];
    return {
      type: t,
      property: e.name,
      animatable: r,
      tweens: a,
      duration: n.end,
      delay: a[0].delay,
      endDelay: n.endDelay
    };
  }
}
function ae(r, e) {
  return U(W(r.map(function(t) {
    return e.map(function(a) {
      return te(t, a);
    });
  })), function(t) {
    return !c.und(t);
  });
}
function Sr(r, e) {
  var t = r.length, a = function(u) {
    return u.timelineOffset ? u.timelineOffset : 0;
  }, n = {};
  return n.duration = t ? Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration;
  })) : e.duration, n.delay = t ? Math.min.apply(Math, r.map(function(u) {
    return a(u) + u.delay;
  })) : e.delay, n.endDelay = t ? n.duration - Math.max.apply(Math, r.map(function(u) {
    return a(u) + u.duration - u.endDelay;
  })) : e.endDelay, n;
}
var dr = 0;
function ie(r) {
  var e = _(mr, r), t = _(J, r), a = re(t, r), n = Er(r.targets), u = ae(n, a), o = Sr(u, t), s = dr;
  return dr++, N(e, {
    id: s,
    children: [],
    animatables: n,
    animations: u,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var C = [], Or = function() {
  var r;
  function e() {
    !r && (!gr() || !y.suspendWhenDocumentHidden) && C.length > 0 && (r = requestAnimationFrame(t));
  }
  function t(n) {
    for (var u = C.length, o = 0; o < u; ) {
      var s = C[o];
      s.paused ? (C.splice(o, 1), u--) : (s.tick(n), o++);
    }
    r = o > 0 ? requestAnimationFrame(t) : void 0;
  }
  function a() {
    y.suspendWhenDocumentHidden && (gr() ? r = cancelAnimationFrame(r) : (C.forEach(
      function(n) {
        return n._onDocumentVisibility();
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
  var e = 0, t = 0, a = 0, n, u = 0, o = null;
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
    g !== "alternate" && (i.direction = g !== "normal" ? "normal" : "reverse"), i.reversed = !i.reversed, n.forEach(function(d) {
      return d.reversed = i.reversed;
    });
  }
  function f(g) {
    return i.reversed ? i.duration - g : g;
  }
  function l() {
    e = 0, t = f(i.currentTime) * (1 / y.speed);
  }
  function h(g, d) {
    d && d.seek(g - d.timelineOffset);
  }
  function T(g) {
    if (i.reversePlayback)
      for (var P = u; P--; )
        h(g, n[P]);
    else
      for (var d = 0; d < u; d++)
        h(g, n[d]);
  }
  function p(g) {
    for (var d = 0, P = i.animations, S = P.length; d < S; ) {
      var x = P[d], O = x.animatable, F = x.tweens, L = F.length - 1, w = F[L];
      L && (w = U(F, function(Br) {
        return g < Br.end;
      })[0] || w);
      for (var A = E(g - w.start - w.delay, 0, w.duration) / w.duration, H = isNaN(A) ? 1 : w.easing(A), I = w.to.strings, Z = w.round, $ = [], Ar = w.to.numbers.length, B = void 0, V = 0; V < Ar; V++) {
        var j = void 0, or = w.to.numbers[V], sr = w.from.numbers[V] || 0;
        w.isPath ? j = Jr(w.value, H * or, w.isPathTargetInsideSVG) : j = sr + H * (or - sr), Z && (w.isColor && V > 2 || (j = Math.round(j * Z) / Z)), $.push(j);
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
      Dr[x.type](O.target, x.property, B, O.transforms), x.currentValue = B, d++;
    }
  }
  function v(g) {
    i[g] && !i.passThrough && i[g](i);
  }
  function b() {
    i.remaining && i.remaining !== !0 && i.remaining--;
  }
  function M(g) {
    var d = i.duration, P = i.delay, S = d - i.endDelay, x = f(g);
    i.progress = E(x / d * 100, 0, 100), i.reversePlayback = x < i.currentTime, n && T(x), !i.began && i.currentTime > 0 && (i.began = !0, v("begin")), !i.loopBegan && i.currentTime > 0 && (i.loopBegan = !0, v("loopBegin")), x <= P && i.currentTime !== 0 && p(0), (x >= S && i.currentTime !== d || !d) && p(d), x > P && x < S ? (i.changeBegan || (i.changeBegan = !0, i.changeCompleted = !1, v("changeBegin")), v("change"), p(x)) : i.changeBegan && (i.changeCompleted = !0, i.changeBegan = !1, v("changeComplete")), i.currentTime = E(x, 0, d), i.began && v("update"), g >= d && (t = 0, b(), i.remaining ? (e = a, v("loopComplete"), i.loopBegan = !1, i.direction === "alternate" && m()) : (i.paused = !0, i.completed || (i.completed = !0, v("loopComplete"), v("complete"), !i.passThrough && "Promise" in window && (o(), s(i)))));
  }
  return i.reset = function() {
    var g = i.direction;
    i.passThrough = !1, i.currentTime = 0, i.progress = 0, i.paused = !0, i.began = !1, i.loopBegan = !1, i.changeBegan = !1, i.completed = !1, i.changeCompleted = !1, i.reversePlayback = !1, i.reversed = g === "reverse", i.remaining = i.loop, n = i.children, u = n.length;
    for (var d = u; d--; )
      i.children[d].reset();
    (i.reversed && i.loop !== !0 || g === "alternate" && i.loop === 1) && i.remaining++, p(i.reversed ? i.duration : 0);
  }, i._onDocumentVisibility = l, i.set = function(g, d) {
    return kr(g, d), i;
  }, i.tick = function(g) {
    a = g, e || (e = a), M((a + (t - e)) * y.speed);
  }, i.seek = function(g) {
    M(f(g));
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
  for (var t = e.length; t--; )
    X(r, e[t].animatable.target) && e.splice(t, 1);
}
function Lr(r, e) {
  var t = e.animations, a = e.children;
  hr(r, t);
  for (var n = a.length; n--; ) {
    var u = a[n], o = u.animations;
    hr(r, o), !o.length && !u.children.length && a.splice(n, 1);
  }
  !t.length && !a.length && e.pause();
}
function ue(r) {
  for (var e = ur(r), t = C.length; t--; ) {
    var a = C[t];
    Lr(e, a);
  }
}
function oe(r, e) {
  e === void 0 && (e = {});
  var t = e.direction || "normal", a = e.easing ? G(e.easing) : null, n = e.grid, u = e.axis, o = e.from || 0, s = o === "first", i = o === "center", m = o === "last", f = c.arr(r), l = parseFloat(f ? r[0] : r), h = f ? parseFloat(r[1]) : 0, T = k(f ? r[1] : r) || 0, p = e.start || 0 + (f ? l : 0), v = [], b = 0;
  return function(M, g, d) {
    if (s && (o = 0), i && (o = (d - 1) / 2), m && (o = d - 1), !v.length) {
      for (var P = 0; P < d; P++) {
        if (!n)
          v.push(Math.abs(o - P));
        else {
          var S = i ? (n[0] - 1) / 2 : o % n[0], x = i ? (n[1] - 1) / 2 : Math.floor(o / n[0]), O = P % n[0], F = Math.floor(P / n[0]), L = S - O, w = x - F, A = Math.sqrt(L * L + w * w);
          u === "x" && (A = -L), u === "y" && (A = -w), v.push(A);
        }
        b = Math.max.apply(Math, v);
      }
      a && (v = v.map(function(I) {
        return a(I / b) * b;
      })), t === "reverse" && (v = v.map(function(I) {
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
  return e.duration = 0, e.add = function(t, a) {
    var n = C.indexOf(e), u = e.children;
    n > -1 && C.splice(n, 1);
    function o(h) {
      h.passThrough = !0;
    }
    for (var s = 0; s < u.length; s++)
      o(u[s]);
    var i = N(t, _(J, r));
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
y.path = Yr;
y.setDashoffset = Kr;
y.stagger = oe;
y.timeline = se;
y.easing = G;
y.penner = br;
y.random = function(r, e) {
  return Math.floor(Math.random() * (e - r + 1)) + r;
};
(() => {
  const r = document.querySelectorAll(".header");
  r && r.forEach((e) => {
    const t = e.querySelector(".header-image img"), a = e.querySelector(".header-scroll-down");
    if (t) {
      const n = y({
        targets: t,
        scale: [2, 1],
        duration: 800,
        elasticity: 200,
        easing: "easeInOutSine",
        autoplay: !1
      }), u = () => {
        const o = (t.offsetTop - window.scrollY) / 3.49;
        n.seek(n.duration * (o / 100));
      };
      u(), window.addEventListener("scroll", u), window.addEventListener("resize", () => {
        n.restart(), u();
      });
    }
    a && a.addEventListener("click", () => {
      const n = e.parentElement.childNodes;
      n.forEach((u, o) => {
        if (u === e && n.length - 1 > o) {
          const s = n[o + 1];
          if (!s)
            return;
          s.scrollIntoView();
        }
      });
    });
  });
})();
