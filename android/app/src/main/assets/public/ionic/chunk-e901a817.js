/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:n}=window.Ionic;function r(n,r,t){const e={};return t.split(" ").forEach(t=>(e[t]=!0,n&&(e[`${t}-${n}`]=!0,r&&(e[`${t}-${r}`]=!0,e[`${t}-${n}-${r}`]=!0)),e)),e}function t(n){const r={};for(let t=0;t<n.length;t++)r[n[t]]=!0;return r}function e(n,r){return n?{[n]:!0,[`${n}-${r}`]:!0}:{}}function o(n){const r={};return function(n){return n?Array.isArray(n)?n:n.split(" ").filter(n=>""!==n.trim()):[]}(n).forEach(n=>r[n]=!0),r}async function c(n,r,t,e="forward"){if(r&&"#"!==r[0]&&-1===r.indexOf("://")){const o=n.document.querySelector("ion-router");if(o)return t&&t.preventDefault(),await o.componentOnReady(),o.push(r,"back"===e?-1:1)}return Promise.resolve()}export{r as a,o as b,c,t as d,e};