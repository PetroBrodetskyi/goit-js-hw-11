var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},e.parcelRequired7c6=n);var i=n("iQIUW");const o=document.getElementById("search-form"),l=document.getElementById("search-input");o.addEventListener("submit",(e=>{e.preventDefault();""!==l.value.trim()?(l.value="",l.setAttribute("placeholder","Search images...")):i.Notify.info("Please enter a search term",{position:"center-bottom",timeout:3e3,width:"320px",fontSize:"18px"})})),l.addEventListener("click",(()=>{l.removeAttribute("placeholder")})),l.addEventListener("blur",(()=>{""===l.value&&l.setAttribute("placeholder","Search images...")}));
//# sourceMappingURL=index.0e1adef8.js.map
