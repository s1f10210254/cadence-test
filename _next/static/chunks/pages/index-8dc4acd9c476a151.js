(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(555)}])},555:function(e,t,r){"use strict";let n;r.r(t),r.d(t,{currentRPMAtom:function(){return M},default:function(){return T}});var l=r(5893);let i=0,o=e=>"init"in e,a=e=>!!e.write,s=new WeakMap,u=(e,t)=>{s.set(e,t),e.catch(()=>{}).finally(()=>s.delete(e))},d=(e,t)=>{let r=s.get(e);r&&(s.delete(e),r(t))},c=(e,t)=>{e.status="fulfilled",e.value=t},f=(e,t)=>{e.status="rejected",e.reason=t},v=e=>"function"==typeof(null==e?void 0:e.then),h=(e,t)=>"v"in e&&"v"in t&&Object.is(e.v,t.v),g=(e,t)=>"e"in e&&"e"in t&&Object.is(e.e,t.e),w=e=>"v"in e&&e.v instanceof Promise,_=(e,t)=>"v"in e&&"v"in t&&e.v.orig&&e.v.orig===t.v.orig,b=e=>{if("e"in e)throw e.e;return e.v},p=()=>{let e,t;let r=new WeakMap,n=new WeakMap,l=new Map;e=new Set,t=new Set;let i=e=>r.get(e),s=(e,t)=>{Object.freeze(t);let n=r.get(e);if(r.set(e,t),l.has(e)||l.set(e,n),n&&w(n)){let e="v"in t?t.v instanceof Promise?t.v:Promise.resolve(t.v):Promise.reject(t.e);d(n.v,e)}},p=(e,t,r)=>{let n=new Map,l=!1;r.forEach((r,i)=>{r||i!==e||(r=t),r?(n.set(i,r),t.d.get(i)!==r&&(l=!0)):console.warn("[Bug] atom state not found")}),(l||t.d.size!==n.size)&&(t.d=n)},E=(e,t,r)=>{let n=i(e),l={d:(null==n?void 0:n.d)||new Map,v:t};if(r&&p(e,l,r),n&&h(n,l)&&n.d===l.d)return n;if(n&&w(n)&&w(l)&&_(n,l)){if(n.d===l.d)return n;l.v=n.v}return s(e,l),l},m=(e,t,r,l)=>{if(v(t)){let o;let a=new Promise((l,s)=>{let u=!1;t.then(t=>{if(!u){u=!0;let o=i(e),s=E(e,a,r);c(a,t),l(t),n.has(e)&&(null==o?void 0:o.d)!==s.d&&A(e,s,null==o?void 0:o.d)}},t=>{if(!u){u=!0;let l=i(e),o=E(e,a,r);f(a,t),s(t),n.has(e)&&(null==l?void 0:l.d)!==o.d&&A(e,o,null==l?void 0:l.d)}}),o=e=>{u||(u=!0,e.then(e=>c(a,e),e=>f(a,e)),l(e))}});return a.orig=t,a.status="pending",u(a,e=>{e&&o(e),null==l||l()}),E(e,a,r)}return E(e,t,r)},y=(e,t,r)=>{let n=i(e),l={d:(null==n?void 0:n.d)||new Map,e:t};return(r&&p(e,l,r),n&&g(n,l)&&n.d===l.d)?n:(s(e,l),l)},S=(e,t)=>{let r,l;let s=i(e);if(!t&&s&&(n.has(e)||Array.from(s.d).every(([t,r])=>t===e||S(t)===r)))return s;let u=new Map,d=!0;try{let t=e.read(t=>{if(t===e){let e=i(t);if(e)return u.set(t,e),b(e);if(o(t))return u.set(t,void 0),t.init;throw Error("no atom init")}let r=S(t);return u.set(t,r),b(r)},{get signal(){return r||(r=new AbortController),r.signal},get setSelf(){return a(e)||console.warn("setSelf function cannot be used with read-only atom"),!l&&a(e)&&(l=(...t)=>{if(d&&console.warn("setSelf function cannot be called in sync"),!d)return C(e,...t)}),l}});return m(e,t,u,()=>null==r?void 0:r.abort())}catch(t){return y(e,t,u)}finally{d=!1}},j=e=>{let t=n.get(e);return t||(t=O(e)),t},N=(e,t)=>!t.l.size&&(!t.t.size||1===t.t.size&&t.t.has(e)),M=e=>{let t=n.get(e);t&&N(e,t)&&P(e)},T=e=>{let t=new Map,r=new WeakMap,o=e=>{var t;let r=new Set(null==(t=n.get(e))?void 0:t.t);return l.forEach((t,n)=>{var l;(null==(l=i(n))?void 0:l.d.has(e))&&r.add(n)}),r},a=e=>{o(e).forEach(n=>{n!==e&&(t.set(n,(t.get(n)||new Set).add(e)),r.set(n,(r.get(n)||0)+1),a(n))})};a(e);let s=e=>{o(e).forEach(n=>{var l;if(n!==e){let e=r.get(n);if(e&&r.set(n,--e),!e){let e=!!(null==(l=t.get(n))?void 0:l.size);if(e){let t=i(n),r=S(n,!0);e=!t||!h(t,r)}e||t.forEach(e=>e.delete(n))}s(n)}})};s(e)},x=(t,...r)=>{let n=!0,l=t.write(e=>b(S(e)),(r,...l)=>{let a;if(r===t){if(!o(r))throw Error("atom not writable");let e=i(r),t=m(r,l[0]);e&&h(e,t)||T(r)}else a=x(r,...l);if(!n){let t=k();e.forEach(e=>e({type:"async-write",flushed:t}))}return a},...r);return n=!1,l},C=(t,...r)=>{let n=x(t,...r),l=k();return e.forEach(e=>e({type:"write",flushed:l})),n},O=(e,r,l)=>{var o;let s=l||[];null==(o=i(e))||o.d.forEach((t,r)=>{let l=n.get(r);l?l.t.add(e):r!==e&&O(r,e,s)}),S(e);let u={t:new Set(r&&[r]),l:new Set};if(n.set(e,u),t.add(e),a(e)&&e.onMount){let{onMount:t}=e;s.push(()=>{let r=t((...t)=>C(e,...t));r&&(u.u=r)})}return l||s.forEach(e=>e()),u},P=e=>{var r;let l=null==(r=n.get(e))?void 0:r.u;l&&l(),n.delete(e),t.delete(e);let o=i(e);o?(w(o)&&d(o.v),o.d.forEach((t,r)=>{if(r!==e){let t=n.get(r);t&&(t.t.delete(e),N(r,t)&&P(r))}})):console.warn("[Bug] could not find atom state to unmount",e)},A=(e,t,r)=>{let l=new Set(t.d.keys());null==r||r.forEach((t,r)=>{if(l.has(r)){l.delete(r);return}let i=n.get(r);i&&(i.t.delete(e),N(r,i)&&P(r))}),l.forEach(t=>{let r=n.get(t);r?r.t.add(e):n.has(e)&&O(t,e)})},k=()=>{let e;for(e=new Set;l.size;){let t=Array.from(l);l.clear(),t.forEach(([t,r])=>{let l=i(t);if(l){let i=n.get(t);i&&l.d!==(null==r?void 0:r.d)&&A(t,l,null==r?void 0:r.d),i&&!(r&&!w(r)&&(h(r,l)||g(r,l)))&&(i.l.forEach(e=>e()),e.add(t))}else console.warn("[Bug] no atom state to flush")})}return e};return{get:e=>b(S(e)),set:C,sub:(t,r)=>{let n=j(t),l=k(),i=n.l;return i.add(r),e.forEach(e=>e({type:"sub",flushed:l})),()=>{i.delete(r),M(t),e.forEach(e=>e({type:"unsub"}))}},dev_subscribe_store:(t,r)=>{if(2!==r)throw Error("The current StoreListener revision is 2.");return e.add(t),()=>{e.delete(t)}},dev_get_mounted_atoms:()=>t.values(),dev_get_atom_state:e=>r.get(e),dev_get_mounted:e=>n.get(e),dev_restore_atoms:t=>{for(let[e,r]of t)o(e)&&(m(e,r),T(e));let r=k();e.forEach(e=>e({type:"restore",flushed:r}))}}};"number"==typeof globalThis.__NUMBER_OF_JOTAI_INSTANCES__?++globalThis.__NUMBER_OF_JOTAI_INSTANCES__:globalThis.__NUMBER_OF_JOTAI_INSTANCES__=1;let E=()=>(n||(1!==globalThis.__NUMBER_OF_JOTAI_INSTANCES__&&console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"),n=p()),n);var m=r(7294);let y=(0,m.createContext)(void 0),S=e=>{let t=(0,m.useContext)(y);return(null==e?void 0:e.store)||t||E()},j=e=>"function"==typeof(null==e?void 0:e.then),N=m.use||(e=>{if("pending"===e.status)throw e;if("fulfilled"===e.status)return e.value;if("rejected"===e.status)throw e.reason;throw e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e}),M=function(e,t){let r=`atom${++i}`,n={toString:()=>r};return"function"==typeof e?n.read=e:(n.init=e,n.read=e=>e(n),n.write=(e,t,r)=>t(n,"function"==typeof r?r(e(n)):r)),t&&(n.write=t),n}(0);var T=()=>{var e;let[t,r]=[function(e,t){let r=S(t),[[n,l,i],o]=(0,m.useReducer)(t=>{let n=r.get(e);return Object.is(t[0],n)&&t[1]===r&&t[2]===e?t:[n,r,e]},void 0,()=>[r.get(e),r,e]),a=n;(l!==r||i!==e)&&(o(),a=r.get(e));let s=null==t?void 0:t.delay;return(0,m.useEffect)(()=>{let t=r.sub(e,()=>{if("number"==typeof s){setTimeout(o,s);return}o()});return o(),t},[r,e,s]),(0,m.useDebugValue)(a),j(a)?N(a):a}(M,e),function(e,t){let r=S(t),n=(0,m.useCallback)((...t)=>{if(!("write"in e))throw Error("not writable atom");return r.set(e,...t)},[r,e]);return n}(M,e)],[n,i]=(0,m.useState)(null),o=null,a=null,s=e=>{let t=e.target.value,n=null==t?void 0:t.getUint16(1,!0);if(null==t){console.error("No value received from characteristic");return}if(void 0!==n){if(null===o){o=n;return}let e=n-o;a!==e&&(console.log("RPMの値:",n),r(n),a=n)}};async function u(){try{let e=await navigator.bluetooth.requestDevice({filters:[{services:["00001816-0000-1000-8000-00805f9b34fb"]}],optionalServices:["0000180f-0000-1000-8000-00805f9b34fb"]});console.log("1",e);let t=await e.gatt.connect();console.log("2",t);let r=await t.getPrimaryService("00001816-0000-1000-8000-00805f9b34fb");console.log("3",r);let n=await t.getPrimaryService("0000180f-0000-1000-8000-00805f9b34fb"),l=await n.getCharacteristic("00002a19-0000-1000-8000-00805f9b34fb"),o=await l.readValue(),a=o.getUint8(0);console.log("Battery Level:",a),i(a);let u=document.getElementById("batteryLevel");null!==u&&(u.textContent="バッテリー残量: ".concat(a,"%")),await new Promise(e=>setTimeout(e,1e3));let d=await r.getCharacteristic("00002a5b-0000-1000-8000-00805f9b34fb");console.log("4",d),d.addEventListener("characteristicvaluechanged",s),await d.startNotifications(),console.log("5",d)}catch(e){console.error("Error:",e)}}return(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"ケーデンスセンサーの読み取り"}),(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{children:" 1.センサーに接続ボタンをクリックするとデバイス検索が入る"}),(0,l.jsx)("p",{children:"2.ペア設定をクリックするとデバイスが読み取られる"}),(0,l.jsx)("p",{children:"3.回転するとデータが更新されていく"})]}),(0,l.jsx)("button",{onClick:u,children:"センサーに接続"}),null!==n?(0,l.jsxs)("span",{id:"batteryLevel",children:["バッテリー残量: ",n,"%"]}):(0,l.jsx)("span",{id:"batteryLevel",children:"バッテリー残量: ---%"}),(0,l.jsxs)("p",{children:["RPM:",t]})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);