document.documentElement.dir;const e=/[^.]*(?=\..*)\.|.*/,t=/\..*/,n=/::\d+$/,o={};let r=1;const u={mouseenter:"mouseover",mouseleave:"mouseout"},l=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function c(e,t){return t&&`${t}::${r++}`||e.uidEvent||r++}function i(e){const t=c(e);return e.uidEvent=t,o[t]=o[t]||{},o[t]}function s(e,t,n=null){const o=Object.keys(e);for(let r=0,u=o.length;r<u;r++){const u=e[o[r]];if(u.originalHandler===t&&u.delegationSelector===n)return u}return null}function a(e,n,o){const r="string"==typeof n,c=r?o:n;let i=e.replace(t,"");const s=u[i];return s&&(i=s),l.has(i)||(i=e),[r,c,i]}function f(t,n,o,r,u){if("string"!=typeof n||!t)return;o||(o=r,r=null);const[l,f,d]=a(n,o,r),g=i(t),v=g[d]||(g[d]={}),m=s(v,f,l?o:null);if(m)return void(m.oneOff=m.oneOff&&u);const y=c(f,n.replace(e,"")),h=l?function(e,t,n){return function o(r){const u=e.querySelectorAll(t);for(let{target:t}=r;t&&t!==this;t=t.parentNode)for(let l=u.length;l--;)if(u[l]===t)return r.delegateTarget=t,o.oneOff&&p.off(e,r.type,n),n.apply(t,[r]);return null}}(t,o,r):function(e,t){return function n(o){return o.delegateTarget=e,n.oneOff&&p.off(e,o.type,t),t.apply(e,[o])}}(t,o);h.delegationSelector=l?o:null,h.originalHandler=f,h.oneOff=u,h.uidEvent=y,v[y]=h,t.addEventListener(d,h,l)}function d(e,t,n,o,r){const u=s(t[n],o,r);u&&(e.removeEventListener(n,u,Boolean(r)),delete t[n][u.uidEvent])}const p={on(e,t,n,o){f(e,t,n,o,!1)},one(e,t,n,o){f(e,t,n,o,!0)},off(e,t,o,r){if("string"!=typeof t||!e)return;const[u,l,c]=a(t,o,r),s=c!==t,f=i(e),p=t.startsWith(".");if(void 0!==l){if(!f||!f[c])return;return void d(e,f,c,l,u?o:null)}p&&Object.keys(f).forEach(n=>{!function(e,t,n,o){const r=t[n]||{};Object.keys(r).forEach(u=>{if(u.includes(o)){const o=r[u];d(e,t,n,o.originalHandler,o.delegationSelector)}})}(e,f,n,t.slice(1))});const g=f[c]||{};Object.keys(g).forEach(o=>{const r=o.replace(n,"");if(!s||t.includes(r)){const t=g[o];d(e,f,c,t.originalHandler,t.delegationSelector)}})},trigger(e,n,o){if("string"!=typeof n||!e)return null;const r=(()=>{const{jQuery:e}=window;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null})(),u=n.replace(t,""),c=n!==u,i=l.has(u);let s,a=!0,f=!0,d=!1,p=null;return c&&r&&(s=r.Event(n,o),r(e).trigger(s),a=!s.isPropagationStopped(),f=!s.isImmediatePropagationStopped(),d=s.isDefaultPrevented()),i?(p=document.createEvent("HTMLEvents"),p.initEvent(u,a,!0)):p=new CustomEvent(n,{bubbles:a,cancelable:!0}),void 0!==o&&Object.keys(o).forEach(e=>{Object.defineProperty(p,e,{get:()=>o[e]})}),d&&p.preventDefault(),f&&e.dispatchEvent(p),p.defaultPrevented&&void 0!==s&&s.preventDefault(),p}};export default p;