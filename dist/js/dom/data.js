const e=(()=>{const e={};let t=1;return{set(s,d,y){void 0===s.bsKey&&(s.bsKey={key:d,id:t},t++),e[s.bsKey.id]=y},get(t,s){if(!t||void 0===t.bsKey)return null;const d=t.bsKey;return d.key===s?e[d.id]:null},delete(t,s){if(void 0===t.bsKey)return;const d=t.bsKey;d.key===s&&(delete e[d.id],delete t.bsKey)}}})(),t={setData(t,s,d){e.set(t,s,d)},getData:(t,s)=>e.get(t,s),removeData(t,s){e.delete(t,s)}};export default t;
