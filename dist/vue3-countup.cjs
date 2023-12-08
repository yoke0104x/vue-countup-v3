"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const h=require("vue");var d=function(){return d=Object.assign||function(e){for(var n,i=1,s=arguments.length;i<s;i++)for(var t in n=arguments[i])Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);return e},d.apply(this,arguments)},E=function(){function e(n,i,s){var t=this;this.endVal=i,this.options=s,this.version="2.8.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(a){t.startTime||(t.startTime=a);var o=a-t.startTime;t.remaining=t.duration-o,t.useEasing?t.countDown?t.frameVal=t.startVal-t.easingFn(o,0,t.startVal-t.endVal,t.duration):t.frameVal=t.easingFn(o,t.startVal,t.endVal-t.startVal,t.duration):t.frameVal=t.startVal+(t.endVal-t.startVal)*(o/t.duration);var r=t.countDown?t.frameVal<t.endVal:t.frameVal>t.endVal;t.frameVal=r?t.endVal:t.frameVal,t.frameVal=Number(t.frameVal.toFixed(t.options.decimalPlaces)),t.printValue(t.frameVal),o<t.duration?t.rAF=requestAnimationFrame(t.count):t.finalEndVal!==null?t.update(t.finalEndVal):t.options.onCompleteCallback&&t.options.onCompleteCallback()},this.formatNumber=function(a){var o,r,l,u,m=a<0?"-":"";o=Math.abs(a).toFixed(t.options.decimalPlaces);var p=(o+="").split(".");if(r=p[0],l=p.length>1?t.options.decimal+p[1]:"",t.options.useGrouping){u="";for(var g=3,f=0,c=0,w=r.length;c<w;++c)t.options.useIndianSeparators&&c===4&&(g=2,f=1),c!==0&&f%g==0&&(u=t.options.separator+u),f++,u=r[w-c-1]+u;r=u}return t.options.numerals&&t.options.numerals.length&&(r=r.replace(/[0-9]/g,function(V){return t.options.numerals[+V]}),l=l.replace(/[0-9]/g,function(V){return t.options.numerals[+V]})),m+t.options.prefix+r+l+t.options.suffix},this.easeOutExpo=function(a,o,r,l){return r*(1-Math.pow(2,-10*a/l))*1024/1023+o},this.options=d(d({},this.defaults),s),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,this.options.separator===""&&(this.options.useGrouping=!1),this.el=typeof n=="string"?document.getElementById(n):n,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",typeof window<"u"&&this.options.enableScrollSpy&&(this.error?console.error(this.error,n):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push(function(){return t.handleScroll(t)}),window.onscroll=function(){window.onScrollFns.forEach(function(a){return a()})},this.handleScroll(this)))}return e.prototype.handleScroll=function(n){if(n&&window&&!n.once){var i=window.innerHeight+window.scrollY,s=n.el.getBoundingClientRect(),t=s.top+window.pageYOffset,a=s.top+s.height+window.pageYOffset;a<i&&a>window.scrollY&&n.paused?(n.paused=!1,setTimeout(function(){return n.start()},n.options.scrollSpyDelay),n.options.scrollSpyOnce&&(n.once=!0)):(window.scrollY>a||t>i)&&!n.paused&&n.reset()}},e.prototype.determineDirectionAndSmartEasing=function(){var n=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>n;var i=n-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=n;var s=this.countDown?1:-1;this.endVal=n+s*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=n,this.finalEndVal=null;this.finalEndVal!==null?this.useEasing=!1:this.useEasing=this.options.useEasing},e.prototype.start=function(n){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),n&&(this.options.onCompleteCallback=n),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},e.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},e.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},e.prototype.update=function(n){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(n),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal==null&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},e.prototype.printValue=function(n){var i;if(this.el){var s=this.formattingFn(n);!((i=this.options.plugin)===null||i===void 0)&&i.render?this.options.plugin.render(this.el,s):this.el.tagName==="INPUT"?this.el.value=s:this.el.tagName==="text"||this.el.tagName==="tspan"?this.el.textContent=s:this.el.innerHTML=s}},e.prototype.ensureNumber=function(n){return typeof n=="number"&&!isNaN(n)},e.prototype.validateValue=function(n){var i=Number(n);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: ".concat(n),null)},e.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},e}();function F(e){var n,i;return((i=(n=e.toString().split("."))==null?void 0:n[1])==null?void 0:i.length)||0}const v=h.defineComponent({__name:"index",props:{endVal:{},options:{},isAutoDecimalPlaces:{type:Boolean,default:!1}},setup(e){const n=e,{endVal:i,isAutoDecimalPlaces:s}=n,t=h.ref(),a=h.ref(),o=h.reactive({endVal:0,startVal:0}),r=(l,u,m)=>{const p=s?F(l):0;a.value=new E(t.value,l,{...m,decimalPlaces:p,startVal:u}),a.value.start()};return h.onMounted(()=>{t.value&&(r(i,0,{}),o.endVal=i)}),h.watch(()=>n.endVal,(l,u)=>{r(l,u,{}),o.endVal=l,o.startVal=u}),h.watch(()=>n.options,l=>{r(o.endVal,o.startVal,l)}),(l,u)=>(h.openBlock(),h.createElementBlock("span",{ref_key:"countRef",ref:t},null,512))}}),y={install:e=>{e.component("VueCountUp",v)}};exports.VueCountUp=v;exports.default=y;