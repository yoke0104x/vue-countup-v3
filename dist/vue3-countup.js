import { defineComponent as v, ref as w, reactive as F, onMounted as y, watch as E, openBlock as S, createElementBlock as A } from "vue";
var c = function() {
  return c = Object.assign || function(s) {
    for (var n, i = 1, a = arguments.length; i < a; i++)
      for (var t in n = arguments[i])
        Object.prototype.hasOwnProperty.call(n, t) && (s[t] = n[t]);
    return s;
  }, c.apply(this, arguments);
}, b = function() {
  function s(n, i, a) {
    var t = this;
    this.endVal = i, this.options = a, this.version = "2.8.0", this.defaults = { startVal: 0, decimalPlaces: 0, duration: 2, useEasing: !0, useGrouping: !0, useIndianSeparators: !1, smartEasingThreshold: 999, smartEasingAmount: 333, separator: ",", decimal: ".", prefix: "", suffix: "", enableScrollSpy: !1, scrollSpyDelay: 200, scrollSpyOnce: !1 }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.once = !1, this.count = function(e) {
      t.startTime || (t.startTime = e);
      var o = e - t.startTime;
      t.remaining = t.duration - o, t.useEasing ? t.countDown ? t.frameVal = t.startVal - t.easingFn(o, 0, t.startVal - t.endVal, t.duration) : t.frameVal = t.easingFn(o, t.startVal, t.endVal - t.startVal, t.duration) : t.frameVal = t.startVal + (t.endVal - t.startVal) * (o / t.duration);
      var r = t.countDown ? t.frameVal < t.endVal : t.frameVal > t.endVal;
      t.frameVal = r ? t.endVal : t.frameVal, t.frameVal = Number(t.frameVal.toFixed(t.options.decimalPlaces)), t.printValue(t.frameVal), o < t.duration ? t.rAF = requestAnimationFrame(t.count) : t.finalEndVal !== null ? t.update(t.finalEndVal) : t.options.onCompleteCallback && t.options.onCompleteCallback();
    }, this.formatNumber = function(e) {
      var o, r, l, u, d = e < 0 ? "-" : "";
      o = Math.abs(e).toFixed(t.options.decimalPlaces);
      var h = (o += "").split(".");
      if (r = h[0], l = h.length > 1 ? t.options.decimal + h[1] : "", t.options.useGrouping) {
        u = "";
        for (var V = 3, m = 0, p = 0, g = r.length; p < g; ++p)
          t.options.useIndianSeparators && p === 4 && (V = 2, m = 1), p !== 0 && m % V == 0 && (u = t.options.separator + u), m++, u = r[g - p - 1] + u;
        r = u;
      }
      return t.options.numerals && t.options.numerals.length && (r = r.replace(/[0-9]/g, function(f) {
        return t.options.numerals[+f];
      }), l = l.replace(/[0-9]/g, function(f) {
        return t.options.numerals[+f];
      })), d + t.options.prefix + r + l + t.options.suffix;
    }, this.easeOutExpo = function(e, o, r, l) {
      return r * (1 - Math.pow(2, -10 * e / l)) * 1024 / 1023 + o;
    }, this.options = c(c({}, this.defaults), a), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, this.options.separator === "" && (this.options.useGrouping = !1), this.el = typeof n == "string" ? document.getElementById(n) : n, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", typeof window < "u" && this.options.enableScrollSpy && (this.error ? console.error(this.error, n) : (window.onScrollFns = window.onScrollFns || [], window.onScrollFns.push(function() {
      return t.handleScroll(t);
    }), window.onscroll = function() {
      window.onScrollFns.forEach(function(e) {
        return e();
      });
    }, this.handleScroll(this)));
  }
  return s.prototype.handleScroll = function(n) {
    if (n && window && !n.once) {
      var i = window.innerHeight + window.scrollY, a = n.el.getBoundingClientRect(), t = a.top + window.pageYOffset, e = a.top + a.height + window.pageYOffset;
      e < i && e > window.scrollY && n.paused ? (n.paused = !1, setTimeout(function() {
        return n.start();
      }, n.options.scrollSpyDelay), n.options.scrollSpyOnce && (n.once = !0)) : (window.scrollY > e || t > i) && !n.paused && n.reset();
    }
  }, s.prototype.determineDirectionAndSmartEasing = function() {
    var n = this.finalEndVal ? this.finalEndVal : this.endVal;
    this.countDown = this.startVal > n;
    var i = n - this.startVal;
    if (Math.abs(i) > this.options.smartEasingThreshold && this.options.useEasing) {
      this.finalEndVal = n;
      var a = this.countDown ? 1 : -1;
      this.endVal = n + a * this.options.smartEasingAmount, this.duration = this.duration / 2;
    } else
      this.endVal = n, this.finalEndVal = null;
    this.finalEndVal !== null ? this.useEasing = !1 : this.useEasing = this.options.useEasing;
  }, s.prototype.start = function(n) {
    this.error || (this.options.onStartCallback && this.options.onStartCallback(), n && (this.options.onCompleteCallback = n), this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
  }, s.prototype.pauseResume = function() {
    this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
  }, s.prototype.reset = function() {
    cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
  }, s.prototype.update = function(n) {
    cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(n), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal == null && this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
  }, s.prototype.printValue = function(n) {
    var i;
    if (this.el) {
      var a = this.formattingFn(n);
      !((i = this.options.plugin) === null || i === void 0) && i.render ? this.options.plugin.render(this.el, a) : this.el.tagName === "INPUT" ? this.el.value = a : this.el.tagName === "text" || this.el.tagName === "tspan" ? this.el.textContent = a : this.el.innerHTML = a;
    }
  }, s.prototype.ensureNumber = function(n) {
    return typeof n == "number" && !isNaN(n);
  }, s.prototype.validateValue = function(n) {
    var i = Number(n);
    return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: ".concat(n), null);
  }, s.prototype.resetDuration = function() {
    this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
  }, s;
}();
function D(s) {
  var n, i;
  return ((i = (n = s.toString().split(".")) == null ? void 0 : n[1]) == null ? void 0 : i.length) || 0;
}
const C = /* @__PURE__ */ v({
  __name: "index",
  props: {
    endVal: {},
    options: {},
    isAutoDecimalPlaces: { type: Boolean, default: !1 }
  },
  setup(s) {
    const n = s, { endVal: i, isAutoDecimalPlaces: a } = n, t = w(), e = w(), o = F({
      endVal: 0,
      startVal: 0
    }), r = (l, u, d) => {
      const h = a ? D(l) : 0;
      e.value = new b(t.value, l, { ...d, decimalPlaces: h, startVal: u }), e.value.start();
    };
    return y(() => {
      t.value && (r(i, 0, {}), o.endVal = i);
    }), E(
      () => n.endVal,
      (l, u) => {
        r(l, u, {}), o.endVal = l, o.startVal = u;
      }
    ), E(
      () => n.options,
      (l) => {
        r(o.endVal, o.startVal, l);
      }
    ), (l, u) => (S(), A("span", {
      ref_key: "countRef",
      ref: t
    }, null, 512));
  }
}), N = {
  install: (s) => {
    s.component("VueCountUp", C);
  }
};
export {
  C as VueCountUp,
  N as default
};
