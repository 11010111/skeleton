var defaultInstanceSettings = {
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
}, defaultTweenSettings = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], cache = {
  CSS: {},
  springs: {}
};
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text) {
  return str.indexOf(text) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
var is = {
  arr: function(a) {
    return Array.isArray(a);
  },
  obj: function(a) {
    return stringContains(Object.prototype.toString.call(a), "Object");
  },
  pth: function(a) {
    return is.obj(a) && a.hasOwnProperty("totalLength");
  },
  svg: function(a) {
    return a instanceof SVGElement;
  },
  inp: function(a) {
    return a instanceof HTMLInputElement;
  },
  dom: function(a) {
    return a.nodeType || is.svg(a);
  },
  str: function(a) {
    return typeof a == "string";
  },
  fnc: function(a) {
    return typeof a == "function";
  },
  und: function(a) {
    return typeof a > "u";
  },
  nil: function(a) {
    return is.und(a) || a === null;
  },
  hex: function(a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function(a) {
    return /^rgb/.test(a);
  },
  hsl: function(a) {
    return /^hsl/.test(a);
  },
  col: function(a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function(a) {
    return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== "targets" && a !== "keyframes";
  }
};
function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map(function(p) {
    return parseFloat(p);
  }) : [];
}
function spring(string, duration) {
  var params = parseEasingParameters(string), mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100), stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100), damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100), velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100), w0 = Math.sqrt(stiffness / mass), zeta = damping / (2 * Math.sqrt(stiffness * mass)), wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0, a = 1, b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t) {
    var progress = duration ? duration * t / 1e3 : t;
    return zeta < 1 ? progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress)) : progress = (a + b * progress) * Math.exp(-progress * w0), t === 0 || t === 1 ? t : 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached)
      return cached;
    for (var frame = 1 / 6, elapsed = 0, rest = 0; ; )
      if (elapsed += frame, solver(elapsed) === 1) {
        if (rest++, rest >= 16)
          break;
      } else
        rest = 0;
    var duration2 = elapsed * frame * 1e3;
    return cache.springs[string] = duration2, duration2;
  }
  return duration ? solver : getDuration;
}
function steps(steps2) {
  return steps2 === void 0 && (steps2 = 10), function(t) {
    return Math.ceil(minMax(t, 1e-6, 1) * steps2) * (1 / steps2);
  };
}
var bezier = function() {
  var kSplineTableSize = 11, kSampleStepSize = 1 / (kSplineTableSize - 1);
  function A(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function C(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do
      currentT = aA + (aB - aA) / 2, currentX = calcBezier(currentT, mX1, mX2) - aX, currentX > 0 ? aB = currentT : aA = currentT;
    while (Math.abs(currentX) > 1e-7 && ++i < 10);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0)
        return aGuessT;
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier2(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1))
      return;
    var sampleValues = new Float32Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2)
      for (var i = 0; i < kSplineTableSize; ++i)
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    function getTForX(aX) {
      for (var intervalStart = 0, currentSample = 1, lastSample = kSplineTableSize - 1; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)
        intervalStart += kSampleStepSize;
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]), guessForT = intervalStart + dist * kSampleStepSize, initialSlope = getSlope(guessForT, mX1, mX2);
      return initialSlope >= 1e-3 ? newtonRaphsonIterate(aX, guessForT, mX1, mX2) : initialSlope === 0 ? guessForT : binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
    return function(x) {
      return mX1 === mY1 && mX2 === mY2 || x === 0 || x === 1 ? x : calcBezier(getTForX(x), mY1, mY2);
    };
  }
  return bezier2;
}(), penner = function() {
  var eases = { linear: function() {
    return function(t) {
      return t;
    };
  } }, functionEasings = {
    Sine: function() {
      return function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Expo: function() {
      return function(t) {
        return t ? Math.pow(2, 10 * t - 10) : 0;
      };
    },
    Circ: function() {
      return function(t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function() {
      return function(t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function() {
      return function(t) {
        for (var pow2, b = 4; t < ((pow2 = Math.pow(2, --b)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function(amplitude, period) {
      amplitude === void 0 && (amplitude = 1), period === void 0 && (period = 0.5);
      var a = minMax(amplitude, 1, 10), p = minMax(period, 0.1, 2);
      return function(t) {
        return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
      };
    }
  }, baseEasings = ["Quad", "Cubic", "Quart", "Quint"];
  return baseEasings.forEach(function(name, i) {
    functionEasings[name] = function() {
      return function(t) {
        return Math.pow(t, i + 2);
      };
    };
  }), Object.keys(functionEasings).forEach(function(name) {
    var easeIn = functionEasings[name];
    eases["easeIn" + name] = easeIn, eases["easeOut" + name] = function(a, b) {
      return function(t) {
        return 1 - easeIn(a, b)(1 - t);
      };
    }, eases["easeInOut" + name] = function(a, b) {
      return function(t) {
        return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    }, eases["easeOutIn" + name] = function(a, b) {
      return function(t) {
        return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  }), eases;
}();
function parseEasings(easing, duration) {
  if (is.fnc(easing))
    return easing;
  var name = easing.split("(")[0], ease = penner[name], args = parseEasingParameters(easing);
  switch (name) {
    case "spring":
      return spring(easing, duration);
    case "cubicBezier":
      return applyArguments(bezier, args);
    case "steps":
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch {
    return;
  }
}
function filterArray(arr, callback) {
  for (var len = arr.length, thisArg = arguments.length >= 2 ? arguments[1] : void 0, result = [], i = 0; i < len; i++)
    if (i in arr) {
      var val = arr[i];
      callback.call(thisArg, val, i, arr) && result.push(val);
    }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(is.arr(b) ? flattenArray(b) : b);
  }, []);
}
function toArray(o) {
  return is.arr(o) ? o : (is.str(o) && (o = selectString(o) || o), o instanceof NodeList || o instanceof HTMLCollection ? [].slice.call(o) : [o]);
}
function arrayContains(arr, val) {
  return arr.some(function(a) {
    return a === val;
  });
}
function cloneObject(o) {
  var clone = {};
  for (var p in o)
    clone[p] = o[p];
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1)
    o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
  return o;
}
function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2)
    o[p] = is.und(o1[p]) ? o2[p] : o1[p];
  return o;
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, hex = hexValue.replace(rgx, function(m, r2, g2, b2) {
    return r2 + r2 + g2 + g2 + b2 + b2;
  }), rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex), r = parseInt(rgb[1], 16), g = parseInt(rgb[2], 16), b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue), h = parseInt(hsl[1], 10) / 360, s = parseInt(hsl[2], 10) / 100, l = parseInt(hsl[3], 10) / 100, a = hsl[4] || 1;
  function hue2rgb(p2, q2, t) {
    return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? p2 + (q2 - p2) * 6 * t : t < 1 / 2 ? q2 : t < 2 / 3 ? p2 + (q2 - p2) * (2 / 3 - t) * 6 : p2;
  }
  var r, g, b;
  if (s == 0)
    r = g = b = l;
  else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3), g = hue2rgb(p, q, h), b = hue2rgb(p, q, h - 1 / 3);
  }
  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
function colorToRgb(val) {
  if (is.rgb(val))
    return rgbToRgba(val);
  if (is.hex(val))
    return hexToRgba(val);
  if (is.hsl(val))
    return hslToRgba(val);
}
function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split)
    return split[1];
}
function getTransformUnit(propName) {
  if (stringContains(propName, "translate") || propName === "perspective")
    return "px";
  if (stringContains(propName, "rotate") || stringContains(propName, "skew"))
    return "deg";
}
function getFunctionValue(val, animatable) {
  return is.fnc(val) ? val(animatable.target, animatable.id, animatable.total) : val;
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit))
    return value;
  var cached = cache.CSS[value + unit];
  if (!is.und(cached))
    return cached;
  var baseline = 100, tempEl = document.createElement(el.tagName), parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl), tempEl.style.position = "absolute", tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  return cache.CSS[value + unit] = convertedUnit, convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop]))
    return "attribute";
  if (is.dom(el) && arrayContains(validTransforms, prop))
    return "transform";
  if (is.dom(el) && prop !== "transform" && getCSSValue(el, prop))
    return "css";
  if (el[prop] != null)
    return "object";
}
function getElementTransforms(el) {
  if (is.dom(el)) {
    for (var str = el.style.transform || "", reg = /(\w+)\(([^)]*)\)/g, transforms = /* @__PURE__ */ new Map(), m; m = reg.exec(str); )
      transforms.set(m[1], m[2]);
    return transforms;
  }
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName), value = getElementTransforms(el).get(propName) || defaultVal;
  return animatable && (animatable.transforms.list.set(propName, value), animatable.transforms.last = propName), unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case "transform":
      return getTransformValue(target, propName, animatable, unit);
    case "css":
      return getCSSValue(target, propName, unit);
    case "attribute":
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator)
    return to;
  var u = getUnit(to) || 0, x = parseFloat(from), y = parseFloat(to.replace(operator[0], ""));
  switch (operator[0][0]) {
    case "+":
      return x + y + u;
    case "-":
      return x - y + u;
    case "*":
      return x * y + u;
  }
}
function validateValue(val, unit) {
  if (is.col(val))
    return colorToRgb(val);
  if (/\s/g.test(val))
    return val;
  var originalUnit = getUnit(val), unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  return unit ? unitLess + unit : unitLess;
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, "r");
}
function getRectLength(el) {
  return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
}
function getLineLength(el) {
  return getDistance(
    { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
    { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
  );
}
function getPolylineLength(el) {
  for (var points = el.points, totalLength = 0, previousPos, i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    i > 0 && (totalLength += getDistance(previousPos, currentPos)), previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
function getTotalLength(el) {
  if (el.getTotalLength)
    return el.getTotalLength();
  switch (el.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(el);
    case "rect":
      return getRectLength(el);
    case "line":
      return getLineLength(el);
    case "polyline":
      return getPolylineLength(el);
    case "polygon":
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  return el.setAttribute("stroke-dasharray", pathLength), pathLength;
}
function getParentSvgEl(el) {
  for (var parentEl = el.parentNode; is.svg(parentEl) && is.svg(parentEl.parentNode); )
    parentEl = parentEl.parentNode;
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {}, parentSvgEl = svg.el || getParentSvgEl(pathEl), rect = parentSvgEl.getBoundingClientRect(), viewBoxAttr = getAttribute(parentSvgEl, "viewBox"), width = rect.width, height = rect.height, viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path, p = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    offset === void 0 && (offset = 0);
    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg), p = point(), p0 = point(-1), p1 = point(1), scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW, scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case "x":
      return (p.x - svg.x) * scaleX;
    case "y":
      return (p.y - svg.y) * scaleY;
    case "angle":
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}
function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}
function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function(item, pos, self) {
    return self.indexOf(item) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function(t, i) {
    return { target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}
function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  if (/^spring/.test(settings.easing) && (settings.duration = spring(settings.easing)), is.arr(prop)) {
    var l = prop.length, isFromTo = l === 2 && !is.obj(prop[0]);
    isFromTo ? prop = { value: prop } : is.fnc(tweenSettings.duration) || (settings.duration = tweenSettings.duration / l);
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function(v, i) {
    var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
    return is.und(obj.delay) && (obj.delay = i ? 0 : tweenSettings.delay), is.und(obj.endDelay) && (obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0), obj;
  }).map(function(k) {
    return mergeObjects(k, settings);
  });
}
function flattenKeyframes(keyframes) {
  for (var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
    return Object.keys(key);
  })), function(p) {
    return is.key(p);
  }).reduce(function(a, b) {
    return a.indexOf(b) < 0 && a.push(b), a;
  }, []), properties = {}, loop = function(i2) {
    var propName = propertyNames[i2];
    properties[propName] = keyframes.map(function(key) {
      var newKey = {};
      for (var p in key)
        is.key(p) ? p == propName && (newKey.value = key[p]) : newKey[p] = key[p];
      return newKey;
    });
  }, i = 0; i < propertyNames.length; i++)
    loop(i);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [], keyframes = params.keyframes;
  keyframes && (params = mergeObjects(flattenKeyframes(keyframes), params));
  for (var p in params)
    is.key(p) && properties.push({
      name: p,
      tweens: normalizePropertyTweens(params[p], tweenSettings)
    });
  return properties;
}
function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    is.arr(value) && (value = value.map(function(v) {
      return getFunctionValue(v, animatable);
    }), value.length === 1 && (value = value[0])), t[p] = value;
  }
  return t.duration = parseFloat(t.duration), t.delay = parseFloat(t.delay), t;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function(t) {
    var tween = normalizeTweenValues(t, animatable), tweenValue = tween.value, to = is.arr(tweenValue) ? tweenValue[1] : tweenValue, toUnit = getUnit(to), originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable), previousValue = previousTween ? previousTween.to.original : originalValue, from = is.arr(tweenValue) ? tweenValue[0] : previousValue, fromUnit = getUnit(from) || getUnit(originalValue), unit = toUnit || fromUnit;
    return is.und(to) && (to = previousValue), tween.from = decomposeValue(from, unit), tween.to = decomposeValue(getRelativeValue(to, from), unit), tween.start = previousTween ? previousTween.end : 0, tween.end = tween.start + tween.delay + tween.duration + tween.endDelay, tween.easing = parseEasings(tween.easing, tween.duration), tween.isPath = is.pth(tweenValue), tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target), tween.isColor = is.col(tween.from.original), tween.isColor && (tween.round = 1), previousTween = tween, tween;
  });
}
var setProgressValue = {
  css: function(t, p, v) {
    return t.style[p] = v;
  },
  attribute: function(t, p, v) {
    return t.setAttribute(p, v);
  },
  object: function(t, p, v) {
    return t[p] = v;
  },
  transform: function(t, p, v, transforms, manual) {
    if (transforms.list.set(p, v), p === transforms.last || manual) {
      var str = "";
      transforms.list.forEach(function(value, prop) {
        str += prop + "(" + value + ") ";
      }), t.style.transform = str;
    }
  }
};
function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function(animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable), target = animatable.target, valueUnit = getUnit(value), originalValue = getOriginalTargetValue(target, property, valueUnit, animatable), unit = valueUnit || getUnit(originalValue), to = getRelativeValue(validateValue(value, unit), originalValue), animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, !0);
    }
  });
}
function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable), lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable,
      tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function(animatable) {
    return properties.map(function(prop) {
      return createAnimation(animatable, prop);
    });
  })), function(a) {
    return !is.und(a);
  });
}
function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length, getTlOffset = function(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  }, timings = {};
  return timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration, timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay, timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay, timings;
}
var instanceID = 0;
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params), tweenSettings = replaceObjectProps(defaultTweenSettings, params), properties = getProperties(tweenSettings, params), animatables = getAnimatables(params.targets), animations = getAnimations(animatables, properties), timings = getInstanceTimings(animations, tweenSettings), id = instanceID;
  return instanceID++, mergeObjects(instanceSettings, {
    id,
    children: [],
    animatables,
    animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
var activeInstances = [], engine = function() {
  var raf;
  function play() {
    !raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0 && (raf = requestAnimationFrame(step));
  }
  function step(t) {
    for (var activeInstancesLength = activeInstances.length, i = 0; i < activeInstancesLength; ) {
      var activeInstance = activeInstances[i];
      activeInstance.paused ? (activeInstances.splice(i, 1), activeInstancesLength--) : (activeInstance.tick(t), i++);
    }
    raf = i > 0 ? requestAnimationFrame(step) : void 0;
  }
  function handleVisibilityChange() {
    anime.suspendWhenDocumentHidden && (isDocumentHidden() ? raf = cancelAnimationFrame(raf) : (activeInstances.forEach(
      function(instance) {
        return instance._onDocumentVisibility();
      }
    ), engine()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", handleVisibilityChange), play;
}();
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(params) {
  params === void 0 && (params = {});
  var startTime = 0, lastTime = 0, now = 0, children, childrenLength = 0, resolve = null;
  function makePromise(instance2) {
    var promise = window.Promise && new Promise(function(_resolve) {
      return resolve = _resolve;
    });
    return instance2.finished = promise, promise;
  }
  var instance = createNewInstance(params);
  makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    direction !== "alternate" && (instance.direction = direction !== "normal" ? "normal" : "reverse"), instance.reversed = !instance.reversed, children.forEach(function(child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0, lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    child && child.seek(time - child.timelineOffset);
  }
  function syncInstanceChildren(time) {
    if (instance.reversePlayback)
      for (var i$1 = childrenLength; i$1--; )
        seekChild(time, children[i$1]);
    else
      for (var i = 0; i < childrenLength; i++)
        seekChild(time, children[i]);
  }
  function setAnimationsProgress(insTime) {
    for (var i = 0, animations = instance.animations, animationsLength = animations.length; i < animationsLength; ) {
      var anim = animations[i], animatable = anim.animatable, tweens = anim.tweens, tweenLength = tweens.length - 1, tween = tweens[tweenLength];
      tweenLength && (tween = filterArray(tweens, function(t) {
        return insTime < t.end;
      })[0] || tween);
      for (var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration, eased = isNaN(elapsed) ? 1 : tween.easing(elapsed), strings = tween.to.strings, round = tween.round, numbers = [], toNumbersLength = tween.to.numbers.length, progress = void 0, n = 0; n < toNumbersLength; n++) {
        var value = void 0, toNumber = tween.to.numbers[n], fromNumber = tween.from.numbers[n] || 0;
        tween.isPath ? value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG) : value = fromNumber + eased * (toNumber - fromNumber), round && (tween.isColor && n > 2 || (value = Math.round(value * round) / round)), numbers.push(value);
      }
      var stringsLength = strings.length;
      if (!stringsLength)
        progress = numbers[0];
      else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          strings[s];
          var b = strings[s + 1], n$1 = numbers[s];
          isNaN(n$1) || (b ? progress += n$1 + b : progress += n$1 + " ");
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms), anim.currentValue = progress, i++;
    }
  }
  function setCallback(cb) {
    instance[cb] && !instance.passThrough && instance[cb](instance);
  }
  function countIteration() {
    instance.remaining && instance.remaining !== !0 && instance.remaining--;
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration, insDelay = instance.delay, insEndDelay = insDuration - instance.endDelay, insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100), instance.reversePlayback = insTime < instance.currentTime, children && syncInstanceChildren(insTime), !instance.began && instance.currentTime > 0 && (instance.began = !0, setCallback("begin")), !instance.loopBegan && instance.currentTime > 0 && (instance.loopBegan = !0, setCallback("loopBegin")), insTime <= insDelay && instance.currentTime !== 0 && setAnimationsProgress(0), (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) && setAnimationsProgress(insDuration), insTime > insDelay && insTime < insEndDelay ? (instance.changeBegan || (instance.changeBegan = !0, instance.changeCompleted = !1, setCallback("changeBegin")), setCallback("change"), setAnimationsProgress(insTime)) : instance.changeBegan && (instance.changeCompleted = !0, instance.changeBegan = !1, setCallback("changeComplete")), instance.currentTime = minMax(insTime, 0, insDuration), instance.began && setCallback("update"), engineTime >= insDuration && (lastTime = 0, countIteration(), instance.remaining ? (startTime = now, setCallback("loopComplete"), instance.loopBegan = !1, instance.direction === "alternate" && toggleInstanceDirection()) : (instance.paused = !0, instance.completed || (instance.completed = !0, setCallback("loopComplete"), setCallback("complete"), !instance.passThrough && "Promise" in window && (resolve(), makePromise(instance)))));
  }
  return instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = !1, instance.currentTime = 0, instance.progress = 0, instance.paused = !0, instance.began = !1, instance.loopBegan = !1, instance.changeBegan = !1, instance.completed = !1, instance.changeCompleted = !1, instance.reversePlayback = !1, instance.reversed = direction === "reverse", instance.remaining = instance.loop, children = instance.children, childrenLength = children.length;
    for (var i = childrenLength; i--; )
      instance.children[i].reset();
    (instance.reversed && instance.loop !== !0 || direction === "alternate" && instance.loop === 1) && instance.remaining++, setAnimationsProgress(instance.reversed ? instance.duration : 0);
  }, instance._onDocumentVisibility = resetTime, instance.set = function(targets, properties) {
    return setTargetsValue(targets, properties), instance;
  }, instance.tick = function(t) {
    now = t, startTime || (startTime = now), setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  }, instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  }, instance.pause = function() {
    instance.paused = !0, resetTime();
  }, instance.play = function() {
    instance.paused && (instance.completed && instance.reset(), instance.paused = !1, activeInstances.push(instance), resetTime(), engine());
  }, instance.reverse = function() {
    toggleInstanceDirection(), instance.completed = !instance.reversed, resetTime();
  }, instance.restart = function() {
    instance.reset(), instance.play();
  }, instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  }, instance.reset(), instance.autoplay && instance.play(), instance;
}
function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--; )
    arrayContains(targetsArray, animations[a].animatable.target) && animations.splice(a, 1);
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations, children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c = children.length; c--; ) {
    var child = children[c], childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations), !childAnimations.length && !child.children.length && children.splice(c, 1);
  }
  !animations.length && !children.length && instance.pause();
}
function removeTargetsFromActiveInstances(targets) {
  for (var targetsArray = parseTargets(targets), i = activeInstances.length; i--; ) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}
function stagger(val, params) {
  params === void 0 && (params = {});
  var direction = params.direction || "normal", easing = params.easing ? parseEasings(params.easing) : null, grid = params.grid, axis = params.axis, fromIndex = params.from || 0, fromFirst = fromIndex === "first", fromCenter = fromIndex === "center", fromLast = fromIndex === "last", isRange = is.arr(val), val1 = parseFloat(isRange ? val[0] : val), val2 = isRange ? parseFloat(val[1]) : 0, unit = getUnit(isRange ? val[1] : val) || 0, start = params.start || 0 + (isRange ? val1 : 0), values = [], maxValue = 0;
  return function(el, i, t) {
    if (fromFirst && (fromIndex = 0), fromCenter && (fromIndex = (t - 1) / 2), fromLast && (fromIndex = t - 1), !values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid)
          values.push(Math.abs(fromIndex - index));
        else {
          var fromX = fromCenter ? (grid[0] - 1) / 2 : fromIndex % grid[0], fromY = fromCenter ? (grid[1] - 1) / 2 : Math.floor(fromIndex / grid[0]), toX = index % grid[0], toY = Math.floor(index / grid[0]), distanceX = fromX - toX, distanceY = fromY - toY, value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          axis === "x" && (value = -distanceX), axis === "y" && (value = -distanceY), values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      easing && (values = values.map(function(val3) {
        return easing(val3 / maxValue) * maxValue;
      })), direction === "reverse" && (values = values.map(function(val3) {
        return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
      }));
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
}
function timeline(params) {
  params === void 0 && (params = {});
  var tl = anime(params);
  return tl.duration = 0, tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl), children = tl.children;
    tlIndex > -1 && activeInstances.splice(tlIndex, 1);
    function passThrough(ins2) {
      ins2.passThrough = !0;
    }
    for (var i = 0; i < children.length; i++)
      passThrough(children[i]);
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = !1, insParams.direction = tl.direction, insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration), passThrough(tl), tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins), children.push(ins);
    var timings = getInstanceTimings(children, params);
    return tl.delay = timings.delay, tl.endDelay = timings.endDelay, tl.duration = timings.duration, tl.seek(0), tl.reset(), tl.autoplay && tl.play(), tl;
  }, tl;
}
anime.version = "3.2.1";
anime.speed = 1;
anime.suspendWhenDocumentHidden = !0;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const header = () => {
  const containers = document.querySelectorAll(".header");
  containers && containers.forEach((container) => {
    const imageWrapper = container.querySelector(".header-image img"), scrollDown = container.querySelector(".header-scroll-down");
    if (imageWrapper) {
      const animation = anime({
        targets: imageWrapper,
        scale: [1.5, 1],
        duration: 800,
        elasticity: 200,
        easing: "easeInOutSine",
        autoplay: !1
      }), seek = () => {
        if (window.scrollY < imageWrapper.offsetTop) {
          const imageY = (imageWrapper.offsetTop - window.scrollY) / 3.49;
          animation.seek(animation.duration * (imageY / 100));
        }
      };
      seek(), window.addEventListener("scroll", seek), window.addEventListener("resize", () => {
        animation.restart(), seek();
      });
    }
    scrollDown && scrollDown.addEventListener("click", () => {
      const children = container.parentElement.childNodes;
      children.forEach((child, index) => {
        if (child === container && children.length - 1 > index) {
          const nextNode = children[index + 1];
          if (!nextNode)
            return;
          nextNode.scrollIntoView();
        }
      });
    });
  });
};
header();
