var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o(((e,t)=>{t.exports={}})),u=c(o(((e,t)=>{var n=void 0,r=function(e){return n||(n=new Promise(function(n,r){var i=e===void 0?{}:e,a=i.onAbort;i.onAbort=function(e){r(Error(e)),a&&a(e)},i.postRun=i.postRun||[],i.postRun.push(function(){n(i)}),t=void 0;var o;o||=i===void 0?{}:i;var s=typeof window==`object`,c=typeof WorkerGlobalScope<`u`,u=typeof process==`object`&&typeof process.versions==`object`&&typeof process.versions.node==`string`&&process.type!=`renderer`;o.onRuntimeInitialized=function(){function e(e,t){switch(typeof t){case`boolean`:ve(e,t?1:0);break;case`number`:he(e,t);break;case`string`:D(e,t,-1,-1);break;case`object`:if(t===null)ge(e);else if(t.length!=null){var n=jt(t,At);_e(e,n,t.length,-1),It(n)}else be(e,`Wrong API use : tried to return a value of an unknown type (`+t+`).`,-1);break;default:ge(e)}}function t(e,t){for(var n=[],r=0;r<e;r+=1){var i=O(t+4*r,`i32`),a=ue(i);if(a===1||a===2)i=me(i);else if(a===3)i=fe(i);else if(a===4){a=i,i=de(a),a=pe(a);for(var o=new Uint8Array(i),s=0;s<i;s+=1)o[s]=g[a+s];i=o}else i=null;n.push(i)}return n}function n(e,t){this.Qa=e,this.db=t,this.Oa=1,this.lb=[]}function r(e,t){if(this.db=t,t=M(e)+1,this.eb=Ft(t),this.eb===null)throw Error(`Unable to allocate memory for the SQL string`);N(e,_,this.eb,t),this.kb=this.eb,this.Za=this.pb=null}function i(e){if(this.filename=`dbfile_`+(4294967295*Math.random()>>>0),e!=null){var t=this.filename,n=`/`,r=t;if(n&&(n=typeof n==`string`?n:Ue(n),r=t?Se(n+`/`+t):n),t=Pe(!0,!0),r=tt(r,t),e){if(typeof e==`string`){n=Array(e.length);for(var i=0,o=e.length;i<o;++i)n[i]=e.charCodeAt(i);e=n}q(r,t|146),n=lt(r,577),pt(n,e,0,e.length,0),ut(n),q(r,t)}}this.handleError(c(this.filename,a)),this.db=O(a,`i32`),Ce(this.db),this.fb={},this.Sa={}}var a=Bt(4),s=o.cwrap,c=s(`sqlite3_open`,`number`,[`string`,`number`]),l=s(`sqlite3_close_v2`,`number`,[`number`]),u=s(`sqlite3_exec`,`number`,[`number`,`string`,`number`,`number`,`number`]),d=s(`sqlite3_changes`,`number`,[`number`]),ee=s(`sqlite3_prepare_v2`,`number`,[`number`,`string`,`number`,`number`,`number`]),te=s(`sqlite3_sql`,`string`,[`number`]),f=s(`sqlite3_normalized_sql`,`string`,[`number`]),p=s(`sqlite3_prepare_v2`,`number`,[`number`,`number`,`number`,`number`,`number`]),ne=s(`sqlite3_bind_text`,`number`,[`number`,`number`,`number`,`number`,`number`]),re=s(`sqlite3_bind_blob`,`number`,[`number`,`number`,`number`,`number`,`number`]),ie=s(`sqlite3_bind_double`,`number`,[`number`,`number`,`number`]),m=s(`sqlite3_bind_int`,`number`,[`number`,`number`,`number`]),ae=s(`sqlite3_bind_parameter_index`,`number`,[`number`,`string`]),oe=s(`sqlite3_step`,`number`,[`number`]),h=s(`sqlite3_errmsg`,`string`,[`number`]),se=s(`sqlite3_column_count`,`number`,[`number`]),v=s(`sqlite3_data_count`,`number`,[`number`]),y=s(`sqlite3_column_double`,`number`,[`number`,`number`]),b=s(`sqlite3_column_text`,`string`,[`number`,`number`]),x=s(`sqlite3_column_blob`,`number`,[`number`,`number`]),S=s(`sqlite3_column_bytes`,`number`,[`number`,`number`]),C=s(`sqlite3_column_type`,`number`,[`number`,`number`]),w=s(`sqlite3_column_name`,`string`,[`number`,`number`]),ce=s(`sqlite3_reset`,`number`,[`number`]),T=s(`sqlite3_clear_bindings`,`number`,[`number`]),le=s(`sqlite3_finalize`,`number`,[`number`]),E=s(`sqlite3_create_function_v2`,`number`,`number string number number number number number number number`.split(` `)),ue=s(`sqlite3_value_type`,`number`,[`number`]),de=s(`sqlite3_value_bytes`,`number`,[`number`]),fe=s(`sqlite3_value_text`,`string`,[`number`]),pe=s(`sqlite3_value_blob`,`number`,[`number`]),me=s(`sqlite3_value_double`,`number`,[`number`]),he=s(`sqlite3_result_double`,``,[`number`,`number`]),ge=s(`sqlite3_result_null`,``,[`number`]),D=s(`sqlite3_result_text`,``,[`number`,`string`,`number`,`number`]),_e=s(`sqlite3_result_blob`,``,[`number`,`number`,`number`,`number`]),ve=s(`sqlite3_result_int`,``,[`number`,`number`]),be=s(`sqlite3_result_error`,``,[`number`,`string`,`number`]),A=s(`sqlite3_aggregate_context`,`number`,[`number`,`number`]),Ce=s(`RegisterExtensionFunctions`,`number`,[`number`]),j=s(`sqlite3_update_hook`,`number`,[`number`,`number`,`number`]);n.prototype.bind=function(e){if(!this.Qa)throw`Statement closed`;return this.reset(),Array.isArray(e)?this.Cb(e):typeof e==`object`&&e?this.Db(e):!0},n.prototype.step=function(){if(!this.Qa)throw`Statement closed`;this.Oa=1;var e=oe(this.Qa);switch(e){case 100:return!0;case 101:return!1;default:throw this.db.handleError(e)}},n.prototype.wb=function(e){return e??(e=this.Oa,this.Oa+=1),y(this.Qa,e)},n.prototype.Gb=function(e){if(e??(e=this.Oa,this.Oa+=1),e=b(this.Qa,e),typeof BigInt!=`function`)throw Error(`BigInt is not supported`);return BigInt(e)},n.prototype.Hb=function(e){return e??(e=this.Oa,this.Oa+=1),b(this.Qa,e)},n.prototype.getBlob=function(e){e??(e=this.Oa,this.Oa+=1);var t=S(this.Qa,e);e=x(this.Qa,e);for(var n=new Uint8Array(t),r=0;r<t;r+=1)n[r]=g[e+r];return n},n.prototype.get=function(e,t){t||={},e!=null&&this.bind(e)&&this.step(),e=[];for(var n=v(this.Qa),r=0;r<n;r+=1)switch(C(this.Qa,r)){case 1:var i=t.useBigInt?this.Gb(r):this.wb(r);e.push(i);break;case 2:e.push(this.wb(r));break;case 3:e.push(this.Hb(r));break;case 4:e.push(this.getBlob(r));break;default:e.push(null)}return e},n.prototype.getColumnNames=function(){for(var e=[],t=se(this.Qa),n=0;n<t;n+=1)e.push(w(this.Qa,n));return e},n.prototype.getAsObject=function(e,t){e=this.get(e,t),t=this.getColumnNames();for(var n={},r=0;r<t.length;r+=1)n[t[r]]=e[r];return n},n.prototype.getSQL=function(){return te(this.Qa)},n.prototype.getNormalizedSQL=function(){return f(this.Qa)},n.prototype.run=function(e){return e!=null&&this.bind(e),this.step(),this.reset()},n.prototype.sb=function(e,t){t??(t=this.Oa,this.Oa+=1),e=Oe(e);var n=jt(e,At);this.lb.push(n),this.db.handleError(ne(this.Qa,t,n,e.length-1,0))},n.prototype.Bb=function(e,t){t??(t=this.Oa,this.Oa+=1);var n=jt(e,At);this.lb.push(n),this.db.handleError(re(this.Qa,t,n,e.length,0))},n.prototype.rb=function(e,t){t??(t=this.Oa,this.Oa+=1),this.db.handleError((e===(e|0)?m:ie)(this.Qa,t,e))},n.prototype.Eb=function(e){e??(e=this.Oa,this.Oa+=1),re(this.Qa,e,0,0,0)},n.prototype.tb=function(e,t){switch(t??(t=this.Oa,this.Oa+=1),typeof e){case`string`:this.sb(e,t);return;case`number`:this.rb(e,t);return;case`bigint`:this.sb(e.toString(),t);return;case`boolean`:this.rb(e+0,t);return;case`object`:if(e===null){this.Eb(t);return}if(e.length!=null){this.Bb(e,t);return}}throw`Wrong API use : tried to bind a value of an unknown type (`+e+`).`},n.prototype.Db=function(e){var t=this;return Object.keys(e).forEach(function(n){var r=ae(t.Qa,n);r!==0&&t.tb(e[n],r)}),!0},n.prototype.Cb=function(e){for(var t=0;t<e.length;t+=1)this.tb(e[t],t+1);return!0},n.prototype.reset=function(){return this.freemem(),T(this.Qa)===0&&ce(this.Qa)===0},n.prototype.freemem=function(){for(var e;(e=this.lb.pop())!==void 0;)It(e)},n.prototype.free=function(){this.freemem();var e=le(this.Qa)===0;return delete this.db.fb[this.Qa],this.Qa=0,e},r.prototype.next=function(){if(this.eb===null)return{done:!0};if(this.Za!==null&&(this.Za.free(),this.Za=null),!this.db.db)throw this.mb(),Error(`Database closed`);var e=Vt(),t=Bt(4);ye(a),ye(t);try{this.db.handleError(p(this.db.db,this.kb,-1,a,t)),this.kb=O(t,`i32`);var r=O(a,`i32`);return r===0?(this.mb(),{done:!0}):(this.Za=new n(r,this.db),this.db.fb[r]=this.Za,{value:this.Za,done:!1})}catch(e){throw this.pb=xe(this.kb),this.mb(),e}finally{zt(e)}},r.prototype.mb=function(){It(this.eb),this.eb=null},r.prototype.getRemainingSQL=function(){return this.pb===null?xe(this.kb):this.pb},typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`&&(r.prototype[Symbol.iterator]=function(){return this}),i.prototype.run=function(e,t){if(!this.db)throw`Database closed`;if(t){e=this.prepare(e,t);try{e.step()}finally{e.free()}}else this.handleError(u(this.db,e,0,0,a));return this},i.prototype.exec=function(e,t,r){if(!this.db)throw`Database closed`;var i=Vt(),o=null;try{var s=Ot(e),c=Bt(4);for(e=[];O(s,`i8`)!==0;){ye(a),ye(c),this.handleError(p(this.db,s,-1,a,c));var l=O(a,`i32`);if(s=O(c,`i32`),l!==0){var u=null;for(o=new n(l,this),t!=null&&o.bind(t);o.step();)u===null&&(u={columns:o.getColumnNames(),values:[]},e.push(u)),u.values.push(o.get(null,r));o.free()}}return e}catch(e){throw o&&o.free(),e}finally{zt(i)}},i.prototype.each=function(e,t,n,r,i){typeof t==`function`&&(r=n,n=t,t=void 0),e=this.prepare(e,t);try{for(;e.step();)n(e.getAsObject(null,i))}finally{e.free()}if(typeof r==`function`)return r()},i.prototype.prepare=function(e,t){if(ye(a),this.handleError(ee(this.db,e,-1,a,0)),e=O(a,`i32`),e===0)throw`Nothing to prepare`;var r=new n(e,this);return t!=null&&r.bind(t),this.fb[e]=r},i.prototype.iterateStatements=function(e){return new r(e,this)},i.prototype.export=function(){Object.values(this.fb).forEach(function(e){e.free()}),Object.values(this.Sa).forEach(Z),this.Sa={},this.handleError(l(this.db));var e=mt(this.filename);return this.handleError(c(this.filename,a)),this.db=O(a,`i32`),Ce(this.db),e},i.prototype.close=function(){this.db!==null&&(Object.values(this.fb).forEach(function(e){e.free()}),Object.values(this.Sa).forEach(Z),this.Sa={},this.Ya&&=(Z(this.Ya),void 0),this.handleError(l(this.db)),at(`/`+this.filename),this.db=null)},i.prototype.handleError=function(e){if(e===0)return null;throw e=h(this.db),Error(e)},i.prototype.getRowsModified=function(){return d(this.db)},i.prototype.create_function=function(n,r){Object.prototype.hasOwnProperty.call(this.Sa,n)&&(Z(this.Sa[n]),delete this.Sa[n]);var i=Q(function(n,i,a){i=t(i,a);try{var o=r.apply(null,i)}catch(e){be(n,e,-1);return}e(n,o)},`viii`);return this.Sa[n]=i,this.handleError(E(this.db,n,r.length,1,0,i,0,0,0)),this},i.prototype.create_aggregate=function(n,r){var i=r.init||function(){return null},a=r.finalize||function(e){return e},o=r.step;if(!o)throw`An aggregate function must have a step function in `+n;var s={};Object.hasOwnProperty.call(this.Sa,n)&&(Z(this.Sa[n]),delete this.Sa[n]),r=n+`__finalize`,Object.hasOwnProperty.call(this.Sa,r)&&(Z(this.Sa[r]),delete this.Sa[r]);var c=Q(function(e,n,r){var a=A(e,1);Object.hasOwnProperty.call(s,a)||(s[a]=i()),n=t(n,r),n=[s[a]].concat(n);try{s[a]=o.apply(null,n)}catch(t){delete s[a],be(e,t,-1)}},`viii`),l=Q(function(t){var n=A(t,1);try{var r=a(s[n])}catch(e){delete s[n],be(t,e,-1);return}e(t,r),delete s[n]},`vi`);return this.Sa[n]=c,this.Sa[r]=l,this.handleError(E(this.db,n,o.length-1,1,0,0,c,l,0)),this},i.prototype.updateHook=function(e){this.Ya&&=(j(this.db,0,0),Z(this.Ya),void 0),e&&(this.Ya=Q(function(t,n,r,i,a){switch(n){case 18:t=`insert`;break;case 23:t=`update`;break;case 9:t=`delete`;break;default:throw`unknown operationCode in updateHook callback: `+n}if(r=r?k(_,r):``,i=i?k(_,i):``,a>2**53-1)throw`rowId too big to fit inside a Number`;e(t,r,i,Number(a))},`viiiij`),j(this.db,this.Ya,0))},o.Database=i};var d={...o},ee=`./this.program`,te=(e,t)=>{throw t},f=``,p,ne;if(u){var re=l();l(),f=__dirname+`/`,ne=e=>(e=w(e)?new URL(e):e,re.readFileSync(e)),p=async e=>(e=w(e)?new URL(e):e,re.readFileSync(e,void 0)),!o.thisProgram&&1<process.argv.length&&(ee=process.argv[1].replace(/\\/g,`/`)),process.argv.slice(2),t!==void 0&&(t.exports=o),te=(e,t)=>{throw process.exitCode=e,t}}else (s||c)&&(c?f=self.location.href:typeof document<`u`&&document.currentScript&&(f=document.currentScript.src),f=f.startsWith(`blob:`)?``:f.slice(0,f.replace(/[?#].*/,``).lastIndexOf(`/`)+1),c&&(ne=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),p=async e=>{if(w(e))return new Promise((t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{r.status==200||r.status==0&&r.response?t(r.response):n(r.status)},r.onerror=n,r.send(null)});var t=await fetch(e,{credentials:`same-origin`});if(t.ok)return t.arrayBuffer();throw Error(t.status+` : `+t.url)});var ie=o.print||console.log.bind(console),m=o.printErr||console.error.bind(console);Object.assign(o,d),d=null,o.thisProgram&&(ee=o.thisProgram);var ae=o.wasmBinary,oe,h=!1,se,g,_,v,y,b,x,S,C,w=e=>e.startsWith(`file://`);function ce(){var e=oe.buffer;o.HEAP8=g=new Int8Array(e),o.HEAP16=v=new Int16Array(e),o.HEAPU8=_=new Uint8Array(e),o.HEAPU16=new Uint16Array(e),o.HEAP32=y=new Int32Array(e),o.HEAPU32=b=new Uint32Array(e),o.HEAPF32=x=new Float32Array(e),o.HEAPF64=C=new Float64Array(e),o.HEAP64=S=new BigInt64Array(e),o.HEAPU64=new BigUint64Array(e)}var T=0,le=null;function E(e){throw o.onAbort?.(e),e=`Aborted(`+e+`)`,m(e),h=!0,new WebAssembly.RuntimeError(e+`. Build with -sASSERTIONS for more info.`)}var ue;async function de(e){if(!ae)try{var t=await p(e);return new Uint8Array(t)}catch{}if(e==ue&&ae)e=new Uint8Array(ae);else if(ne)e=ne(e);else throw`both async and sync fetching of the wasm failed`;return e}async function fe(e,t){try{var n=await de(e);return await WebAssembly.instantiate(n,t)}catch(e){m(`failed to asynchronously prepare wasm: ${e}`),E(e)}}async function pe(e){var t=ue;if(!ae&&typeof WebAssembly.instantiateStreaming==`function`&&!w(t)&&!u)try{var n=fetch(t,{credentials:`same-origin`});return await WebAssembly.instantiateStreaming(n,e)}catch(e){m(`wasm streaming compile failed: ${e}`),m(`falling back to ArrayBuffer instantiation`)}return fe(t,e)}class me{name=`ExitStatus`;constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var he=e=>{for(;0<e.length;)e.shift()(o)},ge=[],D=[],_e=()=>{var e=o.preRun.shift();D.unshift(e)};function O(e,t=`i8`){switch(t.endsWith(`*`)&&(t=`*`),t){case`i1`:return g[e];case`i8`:return g[e];case`i16`:return v[e>>1];case`i32`:return y[e>>2];case`i64`:return S[e>>3];case`float`:return x[e>>2];case`double`:return C[e>>3];case`*`:return b[e>>2];default:E(`invalid type for getValue: ${t}`)}}var ve=o.noExitRuntime||!0;function ye(e){var t=`i32`;switch(t.endsWith(`*`)&&(t=`*`),t){case`i1`:g[e]=0;break;case`i8`:g[e]=0;break;case`i16`:v[e>>1]=0;break;case`i32`:y[e>>2]=0;break;case`i64`:S[e>>3]=BigInt(0);break;case`float`:x[e>>2]=0;break;case`double`:C[e>>3]=0;break;case`*`:b[e>>2]=0;break;default:E(`invalid type for setValue: ${t}`)}}var be=typeof TextDecoder<`u`?new TextDecoder:void 0,k=(e,t=0,n=NaN)=>{var r=t+n;for(n=t;e[n]&&!(n>=r);)++n;if(16<n-t&&e.buffer&&be)return be.decode(e.subarray(t,n));for(r=``;t<n;){var i=e[t++];if(i&128){var a=e[t++]&63;if((i&224)==192)r+=String.fromCharCode((i&31)<<6|a);else{var o=e[t++]&63;i=(i&240)==224?(i&15)<<12|a<<6|o:(i&7)<<18|a<<12|o<<6|e[t++]&63,65536>i?r+=String.fromCharCode(i):(i-=65536,r+=String.fromCharCode(55296|i>>10,56320|i&1023))}}else r+=String.fromCharCode(i)}return r},xe=(e,t)=>e?k(_,e,t):``,A=(e,t)=>{for(var n=0,r=e.length-1;0<=r;r--){var i=e[r];i===`.`?e.splice(r,1):i===`..`?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n;n--)e.unshift(`..`);return e},Se=e=>{var t=e.charAt(0)===`/`,n=e.slice(-1)===`/`;return(e=A(e.split(`/`).filter(e=>!!e),!t).join(`/`))||t||(e=`.`),e&&n&&(e+=`/`),(t?`/`:``)+e},Ce=e=>{var t=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=t[0],t=t[1],!e&&!t?`.`:(t&&=t.slice(0,-1),e+t)},j=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],we=()=>{if(u){var e=l();return t=>e.randomFillSync(t)}return e=>crypto.getRandomValues(e)},Te=e=>{(Te=we())(e)},Ee=(...e)=>{for(var t=``,n=!1,r=e.length-1;-1<=r&&!n;r--){if(n=0<=r?e[r]:`/`,typeof n!=`string`)throw TypeError(`Arguments to path.resolve must be strings`);if(!n)return``;t=n+`/`+t,n=n.charAt(0)===`/`}return t=A(t.split(`/`).filter(e=>!!e),!n).join(`/`),(n?`/`:``)+t||`.`},De=[],M=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t},N=(e,t,n,r)=>{if(!(0<r))return 0;var i=n;r=n+r-1;for(var a=0;a<e.length;++a){var o=e.charCodeAt(a);if(55296<=o&&57343>=o){var s=e.charCodeAt(++a);o=65536+((o&1023)<<10)|s&1023}if(127>=o){if(n>=r)break;t[n++]=o}else{if(2047>=o){if(n+1>=r)break;t[n++]=192|o>>6}else{if(65535>=o){if(n+2>=r)break;t[n++]=224|o>>12}else{if(n+3>=r)break;t[n++]=240|o>>18,t[n++]=128|o>>12&63}t[n++]=128|o>>6&63}t[n++]=128|o&63}}return t[n]=0,n-i},Oe=(e,t)=>{var n=Array(M(e)+1);return e=N(e,n,0,n.length),t&&(n.length=e),n},ke=[];function Ae(e,t){ke[e]={input:[],output:[],cb:t},Qe(e,je)}var je={open(e){var t=ke[e.node.rdev];if(!t)throw new I(43);e.tty=t,e.seekable=!1},close(e){e.tty.cb.fsync(e.tty)},fsync(e){e.tty.cb.fsync(e.tty)},read(e,t,n,r){if(!e.tty||!e.tty.cb.xb)throw new I(60);for(var i=0,a=0;a<r;a++){try{var o=e.tty.cb.xb(e.tty)}catch{throw new I(29)}if(o===void 0&&i===0)throw new I(6);if(o==null)break;i++,t[n+a]=o}return i&&(e.node.atime=Date.now()),i},write(e,t,n,r){if(!e.tty||!e.tty.cb.qb)throw new I(60);try{for(var i=0;i<r;i++)e.tty.cb.qb(e.tty,t[n+i])}catch{throw new I(29)}return r&&(e.node.mtime=e.node.ctime=Date.now()),i}},Me={xb(){a:{if(!De.length){var e=null;if(u){var t=Buffer.alloc(256),n=0,r=process.stdin.fd;try{n=re.readSync(r,t,0,256)}catch(e){if(e.toString().includes(`EOF`))n=0;else throw e}0<n&&(e=t.slice(0,n).toString(`utf-8`))}else typeof window<`u`&&typeof window.prompt==`function`&&(e=window.prompt(`Input: `),e!==null&&(e+=`
`));if(!e){e=null;break a}De=Oe(e,!0)}e=De.shift()}return e},qb(e,t){t===null||t===10?(ie(k(e.output)),e.output=[]):t!=0&&e.output.push(t)},fsync(e){0<e.output?.length&&(ie(k(e.output)),e.output=[])},Tb(){return{Ob:25856,Qb:5,Nb:191,Pb:35387,Mb:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ub(){return 0},Vb(){return[24,80]}},Ne={qb(e,t){t===null||t===10?(m(k(e.output)),e.output=[]):t!=0&&e.output.push(t)},fsync(e){0<e.output?.length&&(m(k(e.output)),e.output=[])}},P={Wa:null,Xa(){return P.createNode(null,`/`,16895,0)},createNode(e,t,n,r){if((n&61440)==24576||(n&61440)==4096)throw new I(63);return P.Wa||={dir:{node:{Ta:P.La.Ta,Ua:P.La.Ua,lookup:P.La.lookup,hb:P.La.hb,rename:P.La.rename,unlink:P.La.unlink,rmdir:P.La.rmdir,readdir:P.La.readdir,symlink:P.La.symlink},stream:{Va:P.Ma.Va}},file:{node:{Ta:P.La.Ta,Ua:P.La.Ua},stream:{Va:P.Ma.Va,read:P.Ma.read,write:P.Ma.write,ib:P.Ma.ib,jb:P.Ma.jb}},link:{node:{Ta:P.La.Ta,Ua:P.La.Ua,readlink:P.La.readlink},stream:{}},ub:{node:{Ta:P.La.Ta,Ua:P.La.Ua},stream:Ze}},n=Ke(e,t,n,r),B(n.mode)?(n.La=P.Wa.dir.node,n.Ma=P.Wa.dir.stream,n.Na={}):(n.mode&61440)==32768?(n.La=P.Wa.file.node,n.Ma=P.Wa.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)==40960?(n.La=P.Wa.link.node,n.Ma=P.Wa.link.stream):(n.mode&61440)==8192&&(n.La=P.Wa.ub.node,n.Ma=P.Wa.ub.stream),n.atime=n.mtime=n.ctime=Date.now(),e&&(e.Na[t]=n,e.atime=e.mtime=e.ctime=n.atime),n},Sb(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array},La:{Ta(e){var t={};return t.dev=(e.mode&61440)==8192?e.id:1,t.ino=e.id,t.mode=e.mode,t.nlink=1,t.uid=0,t.gid=0,t.rdev=e.rdev,B(e.mode)?t.size=4096:(e.mode&61440)==32768?t.size=e.Ra:(e.mode&61440)==40960?t.size=e.link.length:t.size=0,t.atime=new Date(e.atime),t.mtime=new Date(e.mtime),t.ctime=new Date(e.ctime),t.blksize=4096,t.blocks=Math.ceil(t.size/t.blksize),t},Ua(e,t){for(var n of[`mode`,`atime`,`mtime`,`ctime`])t[n]!=null&&(e[n]=t[n]);t.size!==void 0&&(t=t.size,e.Ra!=t&&(t==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(t),n&&e.Na.set(n.subarray(0,Math.min(t,e.Ra))),e.Ra=t)))},lookup(){throw P.vb},hb(e,t,n,r){return P.createNode(e,t,n,r)},rename(e,t,n){try{var r=Ge(t,n)}catch{}if(r){if(B(e.mode))for(var i in r.Na)throw new I(55);We(r)}delete e.parent.Na[e.name],t.Na[n]=e,e.name=n,t.ctime=t.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,t){delete e.Na[t],e.ctime=e.mtime=Date.now()},rmdir(e,t){var n=Ge(e,t),r;for(r in n.Na)throw new I(55);delete e.Na[t],e.ctime=e.mtime=Date.now()},readdir(e){return[`.`,`..`,...Object.keys(e.Na)]},symlink(e,t,n){return e=P.createNode(e,t,41471,0),e.link=n,e},readlink(e){if((e.mode&61440)!=40960)throw new I(28);return e.link}},Ma:{read(e,t,n,r,i){var a=e.node.Na;if(i>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-i,r),8<e&&a.subarray)t.set(a.subarray(i,i+e),n);else for(r=0;r<e;r++)t[n+r]=a[i+r];return e},write(e,t,n,r,i,a){if(t.buffer===g.buffer&&(a=!1),!r)return 0;if(e=e.node,e.mtime=e.ctime=Date.now(),t.subarray&&(!e.Na||e.Na.subarray)){if(a)return e.Na=t.subarray(n,n+r),e.Ra=r;if(e.Ra===0&&i===0)return e.Na=t.slice(n,n+r),e.Ra=r;if(i+r<=e.Ra)return e.Na.set(t.subarray(n,n+r),i),r}a=i+r;var o=e.Na?e.Na.length:0;if(o>=a||(a=Math.max(a,o*(1048576>o?2:1.125)>>>0),o!=0&&(a=Math.max(a,256)),o=e.Na,e.Na=new Uint8Array(a),0<e.Ra&&e.Na.set(o.subarray(0,e.Ra),0)),e.Na.subarray&&t.subarray)e.Na.set(t.subarray(n,n+r),i);else for(a=0;a<r;a++)e.Na[i+a]=t[n+a];return e.Ra=Math.max(e.Ra,i+r),r},Va(e,t,n){if(n===1?t+=e.position:n===2&&(e.node.mode&61440)==32768&&(t+=e.node.Ra),0>t)throw new I(28);return t},ib(e,t,n,r,i){if((e.node.mode&61440)!=32768)throw new I(43);if(e=e.node.Na,i&2||!e||e.buffer!==g.buffer){i=!0,r=65536*Math.ceil(t/65536);var a=Lt(65536,r);if(a&&_.fill(0,a,a+r),r=a,!r)throw new I(48);e&&((0<n||n+t<e.length)&&(e=e.subarray?e.subarray(n,n+t):Array.prototype.slice.call(e,n,n+t)),g.set(e,r))}else i=!1,r=e.byteOffset;return{Kb:r,Ab:i}},jb(e,t,n,r){return P.Ma.write(e,t,0,r,n,!1),0}}},Pe=(e,t)=>{var n=0;return e&&(n|=365),t&&(n|=146),n},Fe=null,Ie={},Le=[],Re=1,F=null,ze=!1,Be=!0,Ve={},I=class{name=`ErrnoError`;constructor(e){this.Pa=e}},L=class{gb={};node=null;get flags(){return this.gb.flags}set flags(e){this.gb.flags=e}get position(){return this.gb.position}set position(e){this.gb.position=e}},He=class{La={};Ma={};ab=null;constructor(e,t,n,r){e||=this,this.parent=e,this.Xa=e.Xa,this.id=Re++,this.name=t,this.mode=n,this.rdev=r,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&365)==365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)==146}set write(e){e?this.mode|=146:this.mode&=-147}};function R(e,t={}){if(!e)throw new I(44);t.nb??=!0,e.charAt(0)===`/`||(e=`//`+e);var n=0;a:for(;40>n;n++){e=e.split(`/`).filter(e=>!!e);for(var r=Fe,i=`/`,a=0;a<e.length;a++){var o=a===e.length-1;if(o&&t.parent)break;if(e[a]!==`.`)if(e[a]===`..`)i=Ce(i),r=r.parent;else{i=Se(i+`/`+e[a]);try{r=Ge(r,e[a])}catch(e){if(e?.Pa===44&&o&&t.Jb)return{path:i};throw e}if(!r.ab||o&&!t.nb||(r=r.ab.root),(r.mode&61440)==40960&&(!o||t.$a)){if(!r.La.readlink)throw new I(52);r=r.La.readlink(r),r.charAt(0)===`/`||(r=Ce(i)+`/`+r),e=r+`/`+e.slice(a+1).join(`/`);continue a}}}return{path:i,node:r}}throw new I(32)}function Ue(e){for(var t;;){if(e===e.parent)return e=e.Xa.zb,t?e[e.length-1]===`/`?e+t:`${e}/${t}`:e;t=t?`${e.name}/${t}`:e.name,e=e.parent}}function z(e,t){for(var n=0,r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r)|0;return(e+n>>>0)%F.length}function We(e){var t=z(e.parent.id,e.name);if(F[t]===e)F[t]=e.bb;else for(t=F[t];t;){if(t.bb===e){t.bb=e.bb;break}t=t.bb}}function Ge(e,t){var n=B(e.mode)?(n=V(e,`x`))?n:e.La.lookup?0:2:54;if(n)throw new I(n);for(n=F[z(e.id,t)];n;n=n.bb){var r=n.name;if(n.parent.id===e.id&&r===t)return n}return e.La.lookup(e,t)}function Ke(e,t,n,r){return e=new He(e,t,n,r),t=z(e.parent.id,e.name),e.bb=F[t],F[t]=e}function B(e){return(e&61440)==16384}function qe(e){var t=[`r`,`w`,`rw`][e&3];return e&512&&(t+=`w`),t}function V(e,t){if(Be)return 0;if(!t.includes(`r`)||e.mode&292){if(t.includes(`w`)&&!(e.mode&146)||t.includes(`x`)&&!(e.mode&73))return 2}else return 2;return 0}function H(e,t){if(!B(e.mode))return 54;try{return Ge(e,t),20}catch{}return V(e,`wx`)}function Je(e,t,n){try{var r=Ge(e,t)}catch(e){return e.Pa}if(e=V(e,`wx`))return e;if(n){if(!B(r.mode))return 54;if(r===r.parent||Ue(r)===`/`)return 10}else if(B(r.mode))return 31;return 0}function Ye(e){if(!e)throw new I(63);return e}function U(e){if(e=Le[e],!e)throw new I(8);return e}function W(e,t=-1){if(e=Object.assign(new L,e),t==-1)a:{for(t=0;4096>=t;t++)if(!Le[t])break a;throw new I(33)}return e.fd=t,Le[t]=e}function Xe(e,t=-1){return e=W(e,t),e.Ma?.Rb?.(e),e}function G(e,t,n){var r=e?.Ma.Ua;e=r?e:t,r??=t.La.Ua,Ye(r),r(e,n)}var Ze={open(e){e.Ma=Ie[e.node.rdev].Ma,e.Ma.open?.(e)},Va(){throw new I(70)}};function Qe(e,t){Ie[e]={Ma:t}}function $e(e,t){var n=t===`/`;if(n&&Fe)throw new I(10);if(!n&&t){var r=R(t,{nb:!1});if(t=r.path,r=r.node,r.ab)throw new I(10);if(!B(r.mode))throw new I(54)}t={type:e,Wb:{},zb:t,Ib:[]},e=e.Xa(t),e.Xa=t,t.root=e,n?Fe=e:r&&(r.ab=t,r.Xa&&r.Xa.Ib.push(t))}function et(e,t,n){var r=R(e,{parent:!0}).node;if(e=j(e),!e)throw new I(28);if(e===`.`||e===`..`)throw new I(20);var i=H(r,e);if(i)throw new I(i);if(!r.La.hb)throw new I(63);return r.La.hb(r,e,t,n)}function tt(e,t=438){return et(e,t&4095|32768,0)}function K(e,t=511){return et(e,t&1023|16384,0)}function nt(e,t,n){n===void 0&&(n=t,t=438),et(e,t|8192,n)}function rt(e,t){if(!Ee(e))throw new I(44);var n=R(t,{parent:!0}).node;if(!n)throw new I(44);t=j(t);var r=H(n,t);if(r)throw new I(r);if(!n.La.symlink)throw new I(63);n.La.symlink(n,t,e)}function it(e){var t=R(e,{parent:!0}).node;e=j(e);var n=Ge(t,e),r=Je(t,e,!0);if(r)throw new I(r);if(!t.La.rmdir)throw new I(63);if(n.ab)throw new I(10);t.La.rmdir(t,e),We(n)}function at(e){var t=R(e,{parent:!0}).node;if(!t)throw new I(44);e=j(e);var n=Ge(t,e),r=Je(t,e,!1);if(r)throw new I(r);if(!t.La.unlink)throw new I(63);if(n.ab)throw new I(10);t.La.unlink(t,e),We(n)}function ot(e,t){return e=R(e,{$a:!t}).node,Ye(e.La.Ta)(e)}function st(e,t,n,r){G(e,t,{mode:n&4095|t.mode&-4096,ctime:Date.now(),Fb:r})}function q(e,t){e=typeof e==`string`?R(e,{$a:!0}).node:e,st(null,e,t)}function ct(e,t,n){if(B(t.mode))throw new I(31);if((t.mode&61440)!=32768)throw new I(28);var r=V(t,`w`);if(r)throw new I(r);G(e,t,{size:n,timestamp:Date.now()})}function lt(e,t,n=438){if(e===``)throw new I(44);if(typeof t==`string`){var r={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[t];if(r===void 0)throw Error(`Unknown file open mode: ${t}`);t=r}if(n=t&64?n&4095|32768:0,typeof e==`object`)r=e;else{var i=e.endsWith(`/`);e=R(e,{$a:!(t&131072),Jb:!0}),r=e.node,e=e.path}var a=!1;if(t&64)if(r){if(t&128)throw new I(20)}else{if(i)throw new I(31);r=et(e,n|511,0),a=!0}if(!r)throw new I(44);if((r.mode&61440)==8192&&(t&=-513),t&65536&&!B(r.mode))throw new I(54);if(!a&&(i=r?(r.mode&61440)==40960?32:B(r.mode)&&(qe(t)!==`r`||t&576)?31:V(r,qe(t)):44))throw new I(i);return t&512&&!a&&(i=r,i=typeof i==`string`?R(i,{$a:!0}).node:i,ct(null,i,0)),t&=-131713,i=W({node:r,path:Ue(r),flags:t,seekable:!0,position:0,Ma:r.Ma,Lb:[],error:!1}),i.Ma.open&&i.Ma.open(i),a&&q(r,n&511),!o.logReadFiles||t&1||e in Ve||(Ve[e]=1),i}function ut(e){if(e.fd===null)throw new I(8);e.ob&&=null;try{e.Ma.close&&e.Ma.close(e)}catch(e){throw e}finally{Le[e.fd]=null}e.fd=null}function dt(e,t,n){if(e.fd===null)throw new I(8);if(!e.seekable||!e.Ma.Va)throw new I(70);if(n!=0&&n!=1&&n!=2)throw new I(28);e.position=e.Ma.Va(e,t,n),e.Lb=[]}function ft(e,t,n,r,i){if(0>r||0>i)throw new I(28);if(e.fd===null||(e.flags&2097155)==1)throw new I(8);if(B(e.node.mode))throw new I(31);if(!e.Ma.read)throw new I(28);var a=i!==void 0;if(!a)i=e.position;else if(!e.seekable)throw new I(70);return t=e.Ma.read(e,t,n,r,i),a||(e.position+=t),t}function pt(e,t,n,r,i){if(0>r||0>i)throw new I(28);if(e.fd===null||!(e.flags&2097155))throw new I(8);if(B(e.node.mode))throw new I(31);if(!e.Ma.write)throw new I(28);e.seekable&&e.flags&1024&&dt(e,0,2);var a=i!==void 0;if(!a)i=e.position;else if(!e.seekable)throw new I(70);return t=e.Ma.write(e,t,n,r,i,void 0),a||(e.position+=t),t}function mt(e){var t=`binary`;if(t!==`utf8`&&t!==`binary`)throw Error(`Invalid encoding type "${t}"`);var n,r=lt(e,r||0);e=ot(e).size;var i=new Uint8Array(e);return ft(r,i,0,e,0),t===`utf8`?n=k(i):t===`binary`&&(n=i),ut(r),n}function ht(e,t,n){e=Se(`/dev/`+e);var r=Pe(!!t,!!n);ht.yb??=64;var i=ht.yb++<<8|0;Qe(i,{open(e){e.seekable=!1},close(){n?.buffer?.length&&n(10)},read(e,n,r,i){for(var a=0,o=0;o<i;o++){try{var s=t()}catch{throw new I(29)}if(s===void 0&&a===0)throw new I(6);if(s==null)break;a++,n[r+o]=s}return a&&(e.node.atime=Date.now()),a},write(e,t,r,i){for(var a=0;a<i;a++)try{n(t[r+a])}catch{throw new I(29)}return i&&(e.node.mtime=e.node.ctime=Date.now()),a}}),nt(e,r,i)}var J={};function Y(e,t,n){if(t.charAt(0)===`/`)return t;if(e=e===-100?`/`:U(e).path,t.length==0){if(!n)throw new I(44);return e}return e+`/`+t}function gt(e,t){y[e>>2]=t.dev,y[e+4>>2]=t.mode,b[e+8>>2]=t.nlink,y[e+12>>2]=t.uid,y[e+16>>2]=t.gid,y[e+20>>2]=t.rdev,S[e+24>>3]=BigInt(t.size),y[e+32>>2]=4096,y[e+36>>2]=t.blocks;var n=t.atime.getTime(),r=t.mtime.getTime(),i=t.ctime.getTime();return S[e+40>>3]=BigInt(Math.floor(n/1e3)),b[e+48>>2]=n%1e3*1e6,S[e+56>>3]=BigInt(Math.floor(r/1e3)),b[e+64>>2]=r%1e3*1e6,S[e+72>>3]=BigInt(Math.floor(i/1e3)),b[e+80>>2]=i%1e3*1e6,S[e+88>>3]=BigInt(t.ino),0}var _t=void 0,vt=()=>{var e=y[_t>>2];return _t+=4,e},yt=0,bt=[0,31,60,91,121,152,182,213,244,274,305,335],xt=[0,31,59,90,120,151,181,212,243,273,304,334],St={},Ct=e=>{se=e,ve||0<yt||(o.onExit?.(e),h=!0),te(e,new me(e))},wt=e=>{if(!h)try{if(e(),!(ve||0<yt))try{se=e=se,Ct(e)}catch(e){e instanceof me||e==`unwind`||te(1,e)}}catch(e){e instanceof me||e==`unwind`||te(1,e)}},Tt={},Et=()=>{if(!Dt){var e={USER:`web_user`,LOGNAME:`web_user`,PATH:`/`,PWD:`/`,HOME:`/home/web_user`,LANG:(typeof navigator==`object`&&navigator.languages&&navigator.languages[0]||`C`).replace(`-`,`_`)+`.UTF-8`,_:ee||`./this.program`},t;for(t in Tt)Tt[t]===void 0?delete e[t]:e[t]=Tt[t];var n=[];for(t in e)n.push(`${t}=${e[t]}`);Dt=n}return Dt},Dt,Ot=e=>{var t=M(e)+1,n=Bt(t);return N(e,_,n,t),n},kt=(e,t,n,r)=>{var i={string:e=>{var t=0;return e!=null&&e!==0&&(t=Ot(e)),t},array:e=>{var t=Bt(e.length);return g.set(e,t),t}};e=o[`_`+e];var a=[],s=0;if(r)for(var c=0;c<r.length;c++){var l=i[n[c]];l?(s===0&&(s=Vt()),a[c]=l(r[c])):a[c]=r[c]}return n=e(...a),n=function(e){return s!==0&&zt(s),t===`string`?e?k(_,e):``:t===`boolean`?!!e:e}(n)},At=0,jt=(e,t)=>(t=t==1?Bt(e.length):Ft(e.length),e.subarray||e.slice||(e=new Uint8Array(e)),_.set(e,t),t),Mt,Nt=[],X,Z=e=>{Mt.delete(X.get(e)),X.set(e,null),Nt.push(e)},Q=(e,t)=>{if(!Mt){Mt=new WeakMap;var n=X.length;if(Mt)for(var r=0;r<0+n;r++){var i=X.get(r);i&&Mt.set(i,r)}}if(n=Mt.get(e)||0)return n;if(Nt.length)n=Nt.pop();else{try{X.grow(1)}catch(e){throw e instanceof RangeError?`Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.`:e}n=X.length-1}try{X.set(n,e)}catch(c){if(!(c instanceof TypeError))throw c;if(typeof WebAssembly.Function==`function`){var a=WebAssembly.Function;r={i:`i32`,j:`i64`,f:`f32`,d:`f64`,e:`externref`,p:`i32`},i={parameters:[],results:t[0]==`v`?[]:[r[t[0]]]};for(var o=1;o<t.length;++o)i.parameters.push(r[t[o]]);t=new a(i,e)}else{r=[1],i=t.slice(0,1),t=t.slice(1),o={i:127,p:127,j:126,f:125,d:124,e:111},r.push(96);var s=t.length;128>s?r.push(s):r.push(s%128|128,s>>7);for(a of t)r.push(o[a]);i==`v`?r.push(0):r.push(1,o[i]),t=[0,97,115,109,1,0,0,0,1],a=r.length,128>a?t.push(a):t.push(a%128|128,a>>7),t.push(...r),t.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),t=new WebAssembly.Module(new Uint8Array(t)),t=new WebAssembly.Instance(t,{e:{f:e}}).exports.f}X.set(n,t)}return Mt.set(e,n),n};F=Array(4096),$e(P,`/`),K(`/tmp`),K(`/home`),K(`/home/web_user`),(function(){K(`/dev`),Qe(259,{read:()=>0,write:(e,t,n,r)=>r,Va:()=>0}),nt(`/dev/null`,259),Ae(1280,Me),Ae(1536,Ne),nt(`/dev/tty`,1280),nt(`/dev/tty1`,1536);var e=new Uint8Array(1024),t=0,n=()=>(t===0&&(Te(e),t=e.byteLength),e[--t]);ht(`random`,n),ht(`urandom`,n),K(`/dev/shm`),K(`/dev/shm/tmp`)})(),(function(){K(`/proc`);var e=K(`/proc/self`);K(`/proc/self/fd`),$e({Xa(){var t=Ke(e,`fd`,16895,73);return t.Ma={Va:P.Ma.Va},t.La={lookup(e,t){e=+t;var n=U(e);return e={parent:null,Xa:{zb:`fake`},La:{readlink:()=>n.path},id:e+1},e.parent=e},readdir(){return Array.from(Le.entries()).filter(([,e])=>e).map(([e])=>e.toString())}},t}},`/proc/self/fd`)})(),P.vb=new I(44),P.vb.stack=`<generic error, no stack>`;var Pt={a:(e,t,n,r)=>E(`Assertion failed: ${e?k(_,e):``}, at: `+[t?t?k(_,t):``:`unknown filename`,n,r?r?k(_,r):``:`unknown function`]),i:function(e,t){try{return e=e?k(_,e):``,q(e,t),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},L:function(e,t,n){try{if(t=t?k(_,t):``,t=Y(e,t),n&-8)return-28;var r=R(t,{$a:!0}).node;return r?(e=``,n&4&&(e+=`r`),n&2&&(e+=`w`),n&1&&(e+=`x`),e&&V(r,e)?-2:0):-44}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},j:function(e,t){try{var n=U(e);return st(n,n.node,t,!1),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},h:function(e){try{var t=U(e);return G(t,t.node,{timestamp:Date.now(),Fb:!1}),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},b:function(e,t,n){_t=n;try{var r=U(e);switch(t){case 0:var i=vt();if(0>i)break;for(;Le[i];)i++;return Xe(r,i).fd;case 1:case 2:return 0;case 3:return r.flags;case 4:return i=vt(),r.flags|=i,0;case 12:return i=vt(),v[i+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},g:function(e,t){try{var n=U(e),r=n.node,i=n.Ma.Ta;return e=i?n:r,i??=r.La.Ta,Ye(i),gt(t,i(e))}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},H:function(e,t){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return 61;var n=U(e);if(0>t||!(n.flags&2097155))throw new I(28);return ct(n,n.node,t),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},G:function(e,t){try{if(t===0)return-28;var n=M(`/`)+1;return t<n?-68:(N(`/`,_,e,t),n)}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},K:function(e,t){try{return e=e?k(_,e):``,gt(t,ot(e,!0))}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},C:function(e,t,n){try{return t=t?k(_,t):``,t=Y(e,t),K(t,n),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},J:function(e,t,n,r){try{t=t?k(_,t):``;var i=r&256;return t=Y(e,t,r&4096),gt(n,i?ot(t,!0):ot(t))}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},x:function(e,t,n,r){_t=r;try{t=t?k(_,t):``,t=Y(e,t);var i=r?vt():0;return lt(t,n,i).fd}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},v:function(e,t,n,r){try{if(t=t?k(_,t):``,t=Y(e,t),0>=r)return-28;var i=R(t).node;if(!i)throw new I(44);if(!i.La.readlink)throw new I(28);var a=i.La.readlink(i),o=Math.min(r,M(a)),s=g[n+o];return N(a,_,n,r+1),g[n+o]=s,o}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},u:function(e){try{return e=e?k(_,e):``,it(e),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},f:function(e,t){try{return e=e?k(_,e):``,gt(t,ot(e))}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},r:function(e,t,n){try{return t=t?k(_,t):``,t=Y(e,t),n===0?at(t):n===512?it(t):E(`Invalid flags passed to unlinkat`),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},q:function(e,t,n){try{t=t?k(_,t):``,t=Y(e,t,!0);var r=Date.now(),i,a;if(n){var o=b[n>>2]+4294967296*y[n+4>>2],s=y[n+8>>2];i=s==1073741823?r:s==1073741822?null:1e3*o+s/1e6,n+=16,o=b[n>>2]+4294967296*y[n+4>>2],s=y[n+8>>2],a=s==1073741823?r:s==1073741822?null:1e3*o+s/1e6}else a=i=r;if((a??i)!==null){e=i;var c=R(t,{$a:!0}).node;Ye(c.La.Ua)(c,{atime:e,mtime:a})}return 0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},m:()=>E(``),l:()=>{ve=!1,yt=0},A:function(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),y[t>>2]=e.getSeconds(),y[t+4>>2]=e.getMinutes(),y[t+8>>2]=e.getHours(),y[t+12>>2]=e.getDate(),y[t+16>>2]=e.getMonth(),y[t+20>>2]=e.getFullYear()-1900,y[t+24>>2]=e.getDay();var n=e.getFullYear();y[t+28>>2]=(n%4!=0||n%100==0&&n%400!=0?xt:bt)[e.getMonth()]+e.getDate()-1|0,y[t+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();y[t+32>>2]=(n!=r&&e.getTimezoneOffset()==Math.min(r,n))|0},y:function(e,t,n,r,i,a,o){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i);try{if(isNaN(i))return 61;var s=U(r);if(t&2&&!(n&2)&&(s.flags&2097155)!=2||(s.flags&2097155)==1)throw new I(2);if(!s.Ma.ib)throw new I(43);if(!e)throw new I(28);var c=s.Ma.ib(s,e,i,t,n),l=c.Kb;return y[a>>2]=c.Ab,b[o>>2]=l,0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},z:function(e,t,n,r,i,a){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a);try{var o=U(i);if(n&2){if(n=a,(o.node.mode&61440)!=32768)throw new I(43);if(!(r&2)){var s=_.slice(e,e+t);o.Ma.jb&&o.Ma.jb(o,s,n,t,r)}}}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return-e.Pa}},n:(e,t)=>(St[e]&&(clearTimeout(St[e].id),delete St[e]),t&&(St[e]={id:setTimeout(()=>{delete St[e],wt(()=>Rt(e,performance.now()))},t),Xb:t}),0),B:(e,t,n,r)=>{var i=new Date().getFullYear(),a=new Date(i,0,1).getTimezoneOffset();i=new Date(i,6,1).getTimezoneOffset(),b[e>>2]=60*Math.max(a,i),y[t>>2]=Number(a!=i),t=e=>{var t=Math.abs(e);return`UTC${0<=e?`-`:`+`}${String(Math.floor(t/60)).padStart(2,`0`)}${String(t%60).padStart(2,`0`)}`},e=t(a),t=t(i),i<a?(N(e,_,n,17),N(t,_,r,17)):(N(e,_,r,17),N(t,_,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var t=_.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);a:{r=(Math.min(2147483648,65536*Math.ceil(Math.max(e,r)/65536))-oe.buffer.byteLength+65535)/65536|0;try{oe.grow(r),ce();var i=1;break a}catch{}i=void 0}if(i)return!0}return!1},E:(e,t)=>{var n=0;return Et().forEach((r,i)=>{var a=t+n;for(i=b[e+4*i>>2]=a,a=0;a<r.length;++a)g[i++]=r.charCodeAt(a);g[i]=0,n+=r.length+1}),0},F:(e,t)=>{var n=Et();b[e>>2]=n.length;var r=0;return n.forEach(e=>r+=e.length+1),b[t>>2]=r,0},e:function(e){try{return ut(U(e)),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},p:function(e,t){try{var n=U(e);return g[t]=n.tty?2:B(n.mode)?3:(n.mode&61440)==40960?7:4,v[t+2>>1]=0,S[t+8>>3]=BigInt(0),S[t+16>>3]=BigInt(0),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},w:function(e,t,n,r){try{a:{var i=U(e);e=t;for(var a,o=t=0;o<n;o++){var s=b[e>>2],c=b[e+4>>2];e+=8;var l=ft(i,g,s,c,a);if(0>l){var u=-1;break a}if(t+=l,l<c)break;a!==void 0&&(a+=l)}u=t}return b[r>>2]=u,0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},D:function(e,t,n,r){t=-9007199254740992>t||9007199254740992<t?NaN:Number(t);try{if(isNaN(t))return 61;var i=U(e);return dt(i,t,n),S[r>>3]=BigInt(i.position),i.ob&&t===0&&n===0&&(i.ob=null),0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},I:function(e){try{var t=U(e);return t.Ma?.fsync?t.Ma.fsync(t):0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},t:function(e,t,n,r){try{a:{var i=U(e);e=t;for(var a,o=t=0;o<n;o++){var s=b[e>>2],c=b[e+4>>2];e+=8;var l=pt(i,g,s,c,a);if(0>l){var u=-1;break a}if(t+=l,l<c)break;a!==void 0&&(a+=l)}u=t}return b[r>>2]=u,0}catch(e){if(J===void 0||e.name!==`ErrnoError`)throw e;return e.Pa}},k:Ct},$;(async function(){function e(e){return $=e.exports,oe=$.M,ce(),X=$.O,T--,o.monitorRunDependencies?.(T),T==0&&le&&(e=le,le=null,e()),$}T++,o.monitorRunDependencies?.(T);var t={a:Pt};return o.instantiateWasm?new Promise(n=>{o.instantiateWasm(t,(t,r)=>{e(t,r),n(t.exports)})}):(ue??=o.locateFile?o.locateFile(`sql-wasm.wasm`,f):f+`sql-wasm.wasm`,e((await pe(t)).instance))})(),o._sqlite3_free=e=>(o._sqlite3_free=$.P)(e),o._sqlite3_value_text=e=>(o._sqlite3_value_text=$.Q)(e),o._sqlite3_prepare_v2=(e,t,n,r,i)=>(o._sqlite3_prepare_v2=$.R)(e,t,n,r,i),o._sqlite3_step=e=>(o._sqlite3_step=$.S)(e),o._sqlite3_reset=e=>(o._sqlite3_reset=$.T)(e),o._sqlite3_exec=(e,t,n,r,i)=>(o._sqlite3_exec=$.U)(e,t,n,r,i),o._sqlite3_finalize=e=>(o._sqlite3_finalize=$.V)(e),o._sqlite3_column_name=(e,t)=>(o._sqlite3_column_name=$.W)(e,t),o._sqlite3_column_text=(e,t)=>(o._sqlite3_column_text=$.X)(e,t),o._sqlite3_column_type=(e,t)=>(o._sqlite3_column_type=$.Y)(e,t),o._sqlite3_errmsg=e=>(o._sqlite3_errmsg=$.Z)(e),o._sqlite3_clear_bindings=e=>(o._sqlite3_clear_bindings=$._)(e),o._sqlite3_value_blob=e=>(o._sqlite3_value_blob=$.$)(e),o._sqlite3_value_bytes=e=>(o._sqlite3_value_bytes=$.aa)(e),o._sqlite3_value_double=e=>(o._sqlite3_value_double=$.ba)(e),o._sqlite3_value_int=e=>(o._sqlite3_value_int=$.ca)(e),o._sqlite3_value_type=e=>(o._sqlite3_value_type=$.da)(e),o._sqlite3_result_blob=(e,t,n,r)=>(o._sqlite3_result_blob=$.ea)(e,t,n,r),o._sqlite3_result_double=(e,t)=>(o._sqlite3_result_double=$.fa)(e,t),o._sqlite3_result_error=(e,t,n)=>(o._sqlite3_result_error=$.ga)(e,t,n),o._sqlite3_result_int=(e,t)=>(o._sqlite3_result_int=$.ha)(e,t),o._sqlite3_result_int64=(e,t)=>(o._sqlite3_result_int64=$.ia)(e,t),o._sqlite3_result_null=e=>(o._sqlite3_result_null=$.ja)(e),o._sqlite3_result_text=(e,t,n,r)=>(o._sqlite3_result_text=$.ka)(e,t,n,r),o._sqlite3_aggregate_context=(e,t)=>(o._sqlite3_aggregate_context=$.la)(e,t),o._sqlite3_column_count=e=>(o._sqlite3_column_count=$.ma)(e),o._sqlite3_data_count=e=>(o._sqlite3_data_count=$.na)(e),o._sqlite3_column_blob=(e,t)=>(o._sqlite3_column_blob=$.oa)(e,t),o._sqlite3_column_bytes=(e,t)=>(o._sqlite3_column_bytes=$.pa)(e,t),o._sqlite3_column_double=(e,t)=>(o._sqlite3_column_double=$.qa)(e,t),o._sqlite3_bind_blob=(e,t,n,r,i)=>(o._sqlite3_bind_blob=$.ra)(e,t,n,r,i),o._sqlite3_bind_double=(e,t,n)=>(o._sqlite3_bind_double=$.sa)(e,t,n),o._sqlite3_bind_int=(e,t,n)=>(o._sqlite3_bind_int=$.ta)(e,t,n),o._sqlite3_bind_text=(e,t,n,r,i)=>(o._sqlite3_bind_text=$.ua)(e,t,n,r,i),o._sqlite3_bind_parameter_index=(e,t)=>(o._sqlite3_bind_parameter_index=$.va)(e,t),o._sqlite3_sql=e=>(o._sqlite3_sql=$.wa)(e),o._sqlite3_normalized_sql=e=>(o._sqlite3_normalized_sql=$.xa)(e),o._sqlite3_changes=e=>(o._sqlite3_changes=$.ya)(e),o._sqlite3_close_v2=e=>(o._sqlite3_close_v2=$.za)(e),o._sqlite3_create_function_v2=(e,t,n,r,i,a,s,c,l)=>(o._sqlite3_create_function_v2=$.Aa)(e,t,n,r,i,a,s,c,l),o._sqlite3_update_hook=(e,t,n)=>(o._sqlite3_update_hook=$.Ba)(e,t,n),o._sqlite3_open=(e,t)=>(o._sqlite3_open=$.Ca)(e,t);var Ft=o._malloc=e=>(Ft=o._malloc=$.Da)(e),It=o._free=e=>(It=o._free=$.Ea)(e);o._RegisterExtensionFunctions=e=>(o._RegisterExtensionFunctions=$.Fa)(e);var Lt=(e,t)=>(Lt=$.Ga)(e,t),Rt=(e,t)=>(Rt=$.Ha)(e,t),zt=e=>(zt=$.Ia)(e),Bt=e=>(Bt=$.Ja)(e),Vt=()=>(Vt=$.Ka)();o.stackSave=()=>Vt(),o.stackRestore=e=>zt(e),o.stackAlloc=e=>Bt(e),o.cwrap=(e,t,n,r)=>{var i=!n||n.every(e=>e===`number`||e===`boolean`);return t!==`string`&&i&&!r?o[`_`+e]:(...r)=>kt(e,t,n,r)},o.addFunction=Q,o.removeFunction=Z,o.UTF8ToString=xe,o.ALLOC_NORMAL=At,o.allocate=jt,o.allocateUTF8OnStack=Ot;function Ht(){function e(){if(o.calledRun=!0,!h){if(!o.noFSInit&&!ze){var e,t;ze=!0,n??=o.stdin,e??=o.stdout,t??=o.stderr,n?ht(`stdin`,n):rt(`/dev/tty`,`/dev/stdin`),e?ht(`stdout`,null,e):rt(`/dev/tty`,`/dev/stdout`),t?ht(`stderr`,null,t):rt(`/dev/tty1`,`/dev/stderr`),lt(`/dev/stdin`,0),lt(`/dev/stdout`,1),lt(`/dev/stderr`,1)}if($.N(),Be=!1,o.onRuntimeInitialized?.(),o.postRun)for(typeof o.postRun==`function`&&(o.postRun=[o.postRun]);o.postRun.length;){var n=o.postRun.shift();ge.unshift(n)}he(ge)}}if(0<T)le=Ht;else{if(o.preRun)for(typeof o.preRun==`function`&&(o.preRun=[o.preRun]);o.preRun.length;)_e();he(D),0<T?le=Ht:o.setStatus?(o.setStatus(`Running...`),setTimeout(()=>{setTimeout(()=>o.setStatus(``),1),e()},1)):e()}}if(o.preInit)for(typeof o.preInit==`function`&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.pop()();return Ht(),i}),n)};typeof e==`object`&&typeof t==`object`?(t.exports=r,t.exports.default=r):typeof define==`function`&&define.amd?define([],function(){return r}):typeof e==`object`&&(e.Module=r)}))(),1),d=`/SQL-Critter-Quest/assets/sql-wasm-C1U8OeUW.wasm`;const ee=`
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS campaign_touches;
DROP TABLE IF EXISTS ad_spend_daily;
DROP TABLE IF EXISTS campaigns;

DROP TABLE IF EXISTS refunds;
DROP TABLE IF EXISTS payments;

DROP TABLE IF EXISTS pageviews;
DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS subscription_events;
DROP TABLE IF EXISTS subscriptions;

DROP TABLE IF EXISTS ticket_comments;
DROP TABLE IF EXISTS support_tickets;

DROP TABLE IF EXISTS customer_success_assignments;
DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS fx_rates_daily;
DROP TABLE IF EXISTS geo_countries;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  region TEXT NOT NULL,
  country_code TEXT NOT NULL,
  signup_date TEXT NOT NULL,
  company_size INTEGER NOT NULL,
  industry TEXT NOT NULL,
  acquisition_channel TEXT NOT NULL
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_usd REAL NOT NULL,
  is_recurring INTEGER NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL,
  discount_pct REAL NOT NULL DEFAULT 0.0,
  currency TEXT NOT NULL DEFAULT 'USD',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE geo_countries (
  country_code TEXT PRIMARY KEY,
  country_name TEXT NOT NULL,
  region TEXT NOT NULL,
  currency TEXT NOT NULL
);

CREATE TABLE fx_rates_daily (
  rate_date TEXT NOT NULL,
  currency TEXT NOT NULL,
  usd_rate REAL NOT NULL,
  PRIMARY KEY (rate_date, currency)
);

CREATE TABLE subscriptions (
  subscription_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  status TEXT NOT NULL,
  billing_period TEXT NOT NULL,
  mrr_usd REAL NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE subscription_events (
  event_id INTEGER PRIMARY KEY,
  subscription_id INTEGER NOT NULL,
  event_date TEXT NOT NULL,
  event_type TEXT NOT NULL,
  old_mrr_usd REAL,
  new_mrr_usd REAL,
  note TEXT,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id)
);

CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  payment_date TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE refunds (
  refund_id INTEGER PRIMARY KEY,
  payment_id INTEGER NOT NULL,
  refund_date TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  reason TEXT NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

CREATE TABLE sessions (
  session_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  session_start TEXT NOT NULL,
  source TEXT NOT NULL,
  device_type TEXT NOT NULL,
  country_code TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE pageviews (
  pageview_id INTEGER PRIMARY KEY,
  session_id INTEGER NOT NULL,
  view_time TEXT NOT NULL,
  page TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);

CREATE TABLE support_tickets (
  ticket_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  closed_at TEXT,
  priority TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  satisfaction_score INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE ticket_comments (
  comment_id INTEGER PRIMARY KEY,
  ticket_id INTEGER NOT NULL,
  comment_time TEXT NOT NULL,
  author_type TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(ticket_id)
);

CREATE TABLE campaigns (
  campaign_id INTEGER PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT
);

CREATE TABLE ad_spend_daily (
  spend_date TEXT NOT NULL,
  campaign_id INTEGER NOT NULL,
  spend_usd REAL NOT NULL,
  clicks INTEGER NOT NULL,
  impressions INTEGER NOT NULL,
  PRIMARY KEY (spend_date, campaign_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

CREATE TABLE campaign_touches (
  touch_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  campaign_id INTEGER NOT NULL,
  touch_time TEXT NOT NULL,
  touch_type TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  manager_id INTEGER,
  region TEXT NOT NULL,
  hired_date TEXT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

CREATE TABLE customer_success_assignments (
  assignment_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  employee_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

/* ---- Seed data ---- */
INSERT INTO geo_countries(country_code,country_name,region,currency) VALUES
('US','United States','NA','USD'),
('CA','Canada','NA','CAD'),
('GB','United Kingdom','EU','GBP'),
('DE','Germany','EU','EUR'),
('FR','France','EU','EUR'),
('IN','India','APAC','INR'),
('JP','Japan','APAC','JPY'),
('AU','Australia','APAC','AUD'),
('BR','Brazil','LATAM','BRL');

INSERT INTO fx_rates_daily(rate_date,currency,usd_rate) VALUES
('2025-03-01','USD',1.000),
('2025-03-01','EUR',1.09),
('2025-03-01','GBP',1.27),
('2025-03-01','JPY',0.0067),
('2025-03-01','INR',0.012),
('2025-03-01','AUD',0.66),
('2025-03-01','BRL',0.20),
('2025-03-01','CAD',0.74);

INSERT INTO customers (customer_id, name, email, region, country_code, signup_date, company_size, industry, acquisition_channel) VALUES
(1,'Alice','alice@acme.com','NA','US','2025-01-05',52,'SaaS','Organic'),
(2,'Bob','bob@northwind.co','EU','GB','2025-01-10',18,'Retail','Paid Search'),
(3,'Charlie','charlie@finpro.io','NA','CA','2025-02-01',240,'Finance','Partner'),
(4,'Diana','diana@medico.org','APAC','IN','2025-02-12',120,'Health','Paid Social'),
(5,'Ethan','ethan@eduplus.edu','EU','DE','2025-02-18',80,'Edu','Referral'),
(6,'Fatima','fatima@logix.ai','NA','US','2025-03-02',36,'Logistics','Organic'),
(7,'Gwen','gwen@playworld.gg','APAC','JP','2025-03-10',14,'Gaming','Paid Social'),
(8,'Hiro','hiro@zenops.com','APAC','AU','2025-03-22',410,'SaaS','Event');

INSERT INTO products (product_id, product_name, category, price_usd, is_recurring) VALUES
(1,'Starter Plan','Subscription',29.00,1),
(2,'Pro Plan','Subscription',79.00,1),
(3,'Enterprise Plan','Subscription',199.00,1),
(4,'Analytics Add-on','Add-on',25.00,1),
(5,'Automation Add-on','Add-on',35.00,1),
(6,'Onboarding Service','Service',300.00,0);

INSERT INTO orders (order_id, customer_id, product_id, order_date, quantity, status, discount_pct, currency) VALUES
(101,1,2,'2025-03-01',1,'paid',0,'USD'),
(102,1,4,'2025-03-03',1,'paid',10,'USD'),
(103,2,1,'2025-03-04',1,'paid',0,'GBP'),
(104,2,5,'2025-03-10',2,'paid',0,'GBP'),
(105,3,2,'2025-03-12',1,'refunded',0,'USD'),
(106,3,4,'2025-03-14',1,'paid',0,'USD'),
(107,4,3,'2025-03-15',1,'paid',15,'INR'),
(108,4,6,'2025-03-16',1,'paid',0,'INR'),
(109,5,2,'2025-03-18',1,'paid',0,'EUR'),
(110,6,1,'2025-03-20',3,'paid',0,'USD'),
(111,6,4,'2025-03-22',1,'paid',0,'USD'),
(112,7,2,'2025-03-25',1,'paid',0,'JPY'),
(113,8,1,'2025-03-26',1,'paid',0,'AUD'),
(114,8,5,'2025-03-27',1,'failed',0,'AUD');

CREATE INDEX IF NOT EXISTS idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
`;var te=document.getElementById(`run`),f=document.getElementById(`check`),p=document.getElementById(`next`),ne=document.getElementById(`reset`),re=document.getElementById(`hintBtn`),ie=document.getElementById(`startScreen`),m=document.getElementById(`gameScreen`),ae=document.getElementById(`startGame`),oe=document.getElementById(`restartGame`),h=document.getElementById(`playerName`),se=document.getElementById(`savePlayer`),g=document.getElementById(`nameStatus`),_=document.getElementById(`openLeaderboard`),v=document.getElementById(`leaderboardPopup`),y=document.getElementById(`leaderboardBody`),b=document.getElementById(`leaderboardClose`),x=document.getElementById(`leaderboardClear`),S=document.getElementById(`clearHistory`),C=document.getElementById(`sql`),w=document.getElementById(`output`),ce=document.getElementById(`history`),T=document.getElementById(`levelNum`),le=document.getElementById(`score`),E=document.getElementById(`streak`),ue=document.getElementById(`historyCount`),de=document.getElementById(`levelsProgress`),fe=document.getElementById(`levelTitle`),pe=document.getElementById(`levelPrompt`),me=document.getElementById(`difficulty`),he=document.getElementById(`status`),ge=document.getElementById(`hintText`),D=document.getElementById(`winPopup`),_e=document.getElementById(`winTitle`),O=document.getElementById(`winMsg`),ve=document.getElementById(`winQuote`),ye=document.getElementById(`winClose`),be=document.getElementById(`dataBtn`),k=document.getElementById(`dataPopup`),xe=document.getElementById(`dataClose`),A=document.getElementById(`tableList`),Se=document.getElementById(`tableTitle`),Ce=document.getElementById(`schemaBox`),j=document.getElementById(`previewBox`),we=document.getElementById(`tabSchema`),Te=document.getElementById(`tabPreview`),Ee=document.getElementById(`levelsList`),De=null,M=null,N={levelIndex:0,progressIndex:0,levelSQL:{},score:0,streak:0,hintShown:!1,history:[],playerName:``,attempts:0,levelStartMs:0},Oe=`sql_game_state_v3`,ke=`sql_game_player_name_v2`,Ae=`sql_game_leaderboard_v2`,je=`0429`,Me=!1,Ne={wrongAttemptPenalty:12,hintPenalty:18,firstTryBonus:25,streakBonusPerLevel:10,maxTimeBonus:20,timeBonusWindowSec:90};function P(){return N.levelStartMs?Math.floor((Date.now()-N.levelStartMs)/1e3):0}function Pe(e){let t=Math.max(0,N.attempts-1),n=0,r=P();if(r>0&&r<=Ne.timeBonusWindowSec){let e=1-r/Ne.timeBonusWindowSec;n=Math.round(Ne.maxTimeBonus*e)}let i=N.hintShown?Ne.hintPenalty:0,a=t*Ne.wrongAttemptPenalty,o=N.attempts===1,s=0;o&&(s+=Ne.firstTryBonus,s+=N.streak*Ne.streakBonusPerLevel);let c=e+s+n-i-a;return c=Math.max(0,c),{earned:c,breakdown:{basePoints:e,bonus:s,timeBonus:n,hintPenalty:i,wrongPenalty:a,firstTry:o}}}var Fe=[`customers`,`products`,`orders`,`geo_countries`,`fx_rates_daily`,`subscriptions`,`subscription_events`,`payments`,`refunds`,`sessions`,`pageviews`,`support_tickets`,`ticket_comments`,`campaigns`,`ad_spend_daily`,`campaign_touches`,`employees`,`customer_success_assignments`],Ie=[`tmp_`,`user_`];function Le(e){let t=[],n=``,r=!1,i=!1;for(let a=0;a<e.length;a++){let o=e[a],s=e[a-1];o===`'`&&s!==`\\`&&!i&&(r=!r),o===`"`&&s!==`\\`&&!r&&(i=!i),o===`;`&&!r&&!i?(n.trim()&&t.push(n.trim()),n=``):n+=o}return n.trim()&&t.push(n.trim()),t}function Re(e){return e.replace(/--.*$/gm,``).replace(/\/\*[\s\S]*?\*\//g,``).replace(/\s+/g,` `).trim().toLowerCase()}function F(e){return Ie.some(t=>e.toLowerCase().startsWith(t))}function ze(e){let t=Re(e);return/^(create|insert|update|delete|drop|alter|replace)\b/.test(t)}function Be(e){let t=Re(e),n=t.match(/\bcreate\s+(table|view|trigger)\s+([a-z_][a-z0-9_]*)/);return n?n[2]:(n=t.match(/\binsert\s+into\s+([a-z_][a-z0-9_]*)/),n||(n=t.match(/\bupdate\s+([a-z_][a-z0-9_]*)/),n)||(n=t.match(/\bdelete\s+from\s+([a-z_][a-z0-9_]*)/),n)?n[1]:(n=t.match(/\b(drop|alter)\s+table\s+([a-z_][a-z0-9_]*)/),n?n[2]:null))}function Ve(e,{allowCoreWrites:t=!1}={}){let n=Le(e);for(let e of n){let n=Re(e);if(!n||!ze(n))continue;let r=Be(n);if(!r)throw Error(`Blocked: Write statement not recognized. Use tmp_ or user_ table names.`);if(!t&&Fe.includes(r))throw Error(`Blocked: Core table "${r}" is read-only. Use tmp_ or user_ tables.`);if(!F(r)&&!Fe.includes(r))throw Error(`Blocked: You can only write to names starting with tmp_ or user_. (Target: "${r}")`)}}function I(e){let t=M.exec(e);return!t||!t[0]?{columns:[],values:[]}:t[0]}function L(e){return(I(`SELECT 1 FROM sqlite_master WHERE type='table' AND name='${e}' LIMIT 1;`).values?.length??0)>0}function He(e){return e&&e.replace(/\bcreate\s+table\s+(?!if\s+not\s+exists)/gi,`CREATE TABLE IF NOT EXISTS `)}function R(e){try{let t=I(`SELECT COUNT(*) AS c FROM ${e};`);return Number(t.values?.[0]?.[0]??0)}catch{return 0}}function Ue(){R(`subscriptions`)===0&&M.exec(`
      INSERT INTO subscriptions(subscription_id, customer_id, product_id, start_date, end_date, status, billing_period, mrr_usd) VALUES
      (201,1,2,'2025-03-01',NULL,'active','monthly',79.00),
      (202,2,1,'2025-03-05',NULL,'active','monthly',29.00),
      (203,3,2,'2025-03-10','2025-03-20','canceled','monthly',79.00),
      (204,4,3,'2025-03-15',NULL,'active','monthly',199.00),
      (205,8,1,'2025-03-26',NULL,'active','monthly',29.00);
    `),R(`subscription_events`)===0&&M.exec(`
      INSERT INTO subscription_events(event_id, subscription_id, event_date, event_type, old_mrr_usd, new_mrr_usd, note) VALUES
      (301,201,'2025-03-01','created',NULL,79.00,'start'),
      (302,201,'2025-03-20','upgrade',79.00,104.00,'addon'),
      (303,202,'2025-03-05','created',NULL,29.00,'start'),
      (304,203,'2025-03-10','created',NULL,79.00,'start'),
      (305,203,'2025-03-20','canceled',79.00,0.00,'end'),
      (306,204,'2025-03-15','created',NULL,199.00,'start'),
      (307,205,'2025-03-26','created',NULL,29.00,'start'),
      (308,201,'2025-03-20','note',104.00,104.00,'same-day note');
    `),R(`payments`)===0&&M.exec(`
      INSERT INTO payments(payment_id, order_id, customer_id, payment_date, amount_usd, payment_method, status) VALUES
      (401,101,1,'2025-03-01',79.00,'card','succeeded'),
      (402,102,1,'2025-03-03',22.50,'card','succeeded'),
      (403,103,2,'2025-03-04',29.00,'card','succeeded'),
      (404,114,8,'2025-03-27',70.00,'card','failed');
    `),R(`refunds`)===0&&M.exec(`
      INSERT INTO refunds(refund_id, payment_id, refund_date, amount_usd, reason) VALUES
      (501,401,'2025-03-12',79.00,'customer_request');
    `),R(`sessions`)===0&&M.exec(`
      INSERT INTO sessions(session_id, customer_id, session_start, source, device_type, country_code) VALUES
      (601,1,'2025-03-01 09:00','Organic','desktop','US'),
      (602,2,'2025-03-04 10:30','Paid Search','mobile','GB'),
      (603,4,'2025-03-16 14:10','Paid Social','mobile','IN'),
      (604,NULL,'2025-03-18 08:20','Organic','desktop','US');
    `),R(`pageviews`)===0&&M.exec(`
      INSERT INTO pageviews(pageview_id, session_id, view_time, page, duration_sec) VALUES
      (701,601,'2025-03-01 09:01','/pricing',35),
      (702,601,'2025-03-01 09:02','/checkout',48),
      (703,602,'2025-03-04 10:31','/pricing',22),
      (704,603,'2025-03-16 14:11','/home',12),
      (705,604,'2025-03-18 08:21','/home',9);
    `),R(`support_tickets`)===0&&M.exec(`
      INSERT INTO support_tickets(ticket_id, customer_id, created_at, closed_at, priority, category, status, satisfaction_score) VALUES
      (801,1,'2025-03-02 10:00','2025-03-02 12:00','high','Billing','closed',5),
      (802,2,'2025-03-06 09:00',NULL,'medium','Product','open',NULL),
      (803,4,'2025-03-17 15:00','2025-03-18 09:00','low','Onboarding','closed',4);
    `),R(`ticket_comments`)===0&&M.exec(`
      INSERT INTO ticket_comments(comment_id, ticket_id, comment_time, author_type, body) VALUES
      (901,801,'2025-03-02 10:10','customer','Need invoice copy'),
      (902,801,'2025-03-02 10:30','agent','Sent invoice'),
      (903,802,'2025-03-06 09:10','customer','Feature request'),
      (904,803,'2025-03-17 15:20','agent','Welcome!');
    `),R(`campaigns`)===0&&M.exec(`
      INSERT INTO campaigns(campaign_id, campaign_name, channel, start_date, end_date) VALUES
      (1001,'Spring Search','Paid Search','2025-03-01',NULL),
      (1002,'Social Boost','Paid Social','2025-03-10',NULL),
      (1003,'Partner Push','Partner','2025-03-05','2025-03-25');
    `),R(`ad_spend_daily`)===0&&M.exec(`
      INSERT INTO ad_spend_daily(spend_date, campaign_id, spend_usd, clicks, impressions) VALUES
      ('2025-03-01',1001,60.00,30,900),
      ('2025-03-10',1002,120.00,55,2000),
      ('2025-03-11',1002,80.00,40,1500),
      ('2025-03-12',1002,90.00,45,1600);
    `),R(`campaign_touches`)===0&&M.exec(`
      INSERT INTO campaign_touches(touch_id, customer_id, campaign_id, touch_time, touch_type) VALUES
      (1101,2,1001,'2025-03-02 10:00','click'),
      (1102,4,1002,'2025-03-12 14:00','impression'),
      (1103,7,1002,'2025-03-20 11:00','click'),
      (1104,3,1003,'2025-03-08 09:00','click');
    `),R(`employees`)===0&&M.exec(`
      INSERT INTO employees(employee_id, name, role, manager_id, region, hired_date) VALUES
      (1201,'Maya','Director CS',NULL,'NA','2024-06-01'),
      (1202,'Noah','CSM',1201,'NA','2024-08-15'),
      (1203,'Isha','CSM',1201,'EU','2024-09-01');
    `),R(`customer_success_assignments`)===0&&M.exec(`
      INSERT INTO customer_success_assignments(assignment_id, customer_id, employee_id, start_date, end_date) VALUES
      (1301,1,1202,'2025-03-01',NULL),
      (1302,2,1203,'2025-03-02',NULL),
      (1303,3,1202,'2025-03-10','2025-03-20');
    `)}var z=[{topic:`Chapter 1 — SELECT Basics`,difficulty:`Easy`,prompt:`Retrieve all customers (all columns) from customers, sorted by customer_id.`,starter:`-- Table: customers
-- Return all columns, sorted by customer_id
`,hint:`SELECT * FROM customers ORDER BY customer_id;`,expected:{sql:`SELECT * FROM customers ORDER BY customer_id;`,normalize:{sortBy:[0]}},points:80},{topic:`Chapter 1 — WHERE Filters`,difficulty:`Easy`,prompt:`Show EU customers: customer_id, name, country_code, acquisition_channel sorted by customer_id.`,starter:`-- Table: customers
-- Filter EU customers
`,hint:`WHERE region='EU'`,expected:{sql:`SELECT customer_id, name, country_code, acquisition_channel FROM customers WHERE region='EU' ORDER BY customer_id;`,normalize:{sortBy:[0]}},points:90},{topic:`Chapter 2 — ORDER BY + LIMIT`,difficulty:`Easy`,prompt:`Show the 3 newest signups: name, signup_date ordered newest → oldest.`,starter:`-- Table: customers
-- Newest signups first
`,hint:`ORDER BY signup_date DESC LIMIT 3`,expected:{sql:`SELECT name, signup_date FROM customers ORDER BY signup_date DESC LIMIT 3;`,normalize:{}},points:100},{topic:`Chapter 3 — Aggregation`,difficulty:`Easy`,prompt:`Count customers per region (region, customer_count).`,starter:`-- Table: customers
-- GROUP BY region
`,hint:`SELECT region, COUNT(*) ... GROUP BY region`,expected:{sql:`SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;`,normalize:{sortBy:[0]}},points:110},{topic:`Chapter 3 — Aggregation + ROUND`,difficulty:`Easy`,prompt:`Show acquisition_channel and average company_size rounded to 1 decimal.`,starter:`-- Table: customers
-- AVG + ROUND
`,hint:`ROUND(AVG(company_size), 1)`,expected:{sql:`SELECT acquisition_channel, ROUND(AVG(company_size), 1) AS average_company_size FROM customers GROUP BY acquisition_channel;`,normalize:{sortBy:[0]}},points:120},{topic:`Chapter 4 — JOINs`,difficulty:`Medium`,prompt:`Show order_id, customer name, product_name, order_date, status for all orders.`,starter:`-- Tables: orders, customers, products
-- Join orders -> customers -> products
`,hint:`JOIN customers on customer_id and products on product_id`,expected:{sql:`
        SELECT o.order_id, c.name, p.product_name, o.order_date, o.status
        FROM orders o
        JOIN customers c ON c.customer_id = o.customer_id
        JOIN products p ON p.product_id = o.product_id
        ORDER BY o.order_id;`,normalize:{sortBy:[0]}},points:140},{topic:`Chapter 4 — Revenue (discounts)`,difficulty:`Medium`,prompt:`Compute total USD list revenue from PAID orders for EU customers.`,starter:`-- Tables: orders, customers, products
-- Paid EU revenue (USD list price), include discount_pct
`,hint:`SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0))`,expected:{sql:`
        SELECT ROUND(SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0)), 2) AS total_usd
        FROM orders o
        JOIN customers c ON c.customer_id = o.customer_id
        JOIN products p ON p.product_id = o.product_id
        WHERE c.region='EU' AND o.status='paid';`,normalize:{numericCols:[0]}},points:160},{topic:`Chapter 5 — CASE`,difficulty:`Medium`,prompt:`Return name and size_bucket: Small (<50), Mid (50-199), Large (200+).`,starter:`-- Table: customers
-- Use CASE to bucket customers
`,hint:`CASE WHEN company_size < 50 THEN 'Small' ... END`,expected:{sql:`
        SELECT name,
               CASE
                 WHEN company_size < 50 THEN 'Small'
                 WHEN company_size BETWEEN 50 AND 199 THEN 'Mid'
                 ELSE 'Large'
               END AS size_bucket
        FROM customers
        ORDER BY name;`,normalize:{sortBy:[0]}},points:150},{topic:`Chapter 6 — Subquery`,difficulty:`Hard`,prompt:`List subscription_id, customer_id, mrr_usd where mrr_usd > average mrr.`,starter:`-- Table: subscriptions
-- Subquery with AVG(mrr_usd)
`,hint:`WHERE mrr_usd > (SELECT AVG(mrr_usd) FROM subscriptions)`,expected:{sql:`
        SELECT subscription_id, customer_id, mrr_usd
        FROM subscriptions
        WHERE mrr_usd > (SELECT AVG(mrr_usd) FROM subscriptions)
        ORDER BY subscription_id;`,normalize:{sortBy:[0],numericCols:[2]}},points:200},{topic:`Chapter 6 — IN`,difficulty:`Medium`,prompt:`List distinct customer_id and name for customers with any order status = 'failed'.`,starter:`-- Tables: customers, orders
-- Use IN (subquery) or JOIN
`,hint:`customer_id IN (SELECT customer_id FROM orders WHERE status='failed')`,expected:{sql:`
        SELECT customer_id, name
        FROM customers
        WHERE customer_id IN (SELECT customer_id FROM orders WHERE status='failed')
        ORDER BY customer_id;`,normalize:{sortBy:[0]}},points:160},{topic:`Chapter 7 — CTE`,difficulty:`Medium`,prompt:`Using a CTE, show order_id and net_usd for paid orders (after discount).`,starter:`-- Tables: orders, products
-- WITH lines AS (...) SELECT ...
`,hint:`WITH lines AS (...) SELECT order_id, net_usd FROM lines`,expected:{sql:`
        WITH lines AS (
          SELECT o.order_id,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd
          FROM orders o
          JOIN products p ON p.product_id = o.product_id
          WHERE o.status='paid'
        )
        SELECT order_id, ROUND(net_usd,2) AS net_usd
        FROM lines
        ORDER BY order_id;`,normalize:{sortBy:[0],numericCols:[1]}},points:170},{topic:`Chapter 7 — CTE + GROUP BY`,difficulty:`Hard`,prompt:`Using a CTE, show customer name and total_paid_usd for paid orders.`,starter:`-- Tables: orders, products, customers
-- paid_lines CTE then aggregate
`,hint:`CTE then SUM(net_usd) GROUP BY customer`,expected:{sql:`
        WITH paid_lines AS (
          SELECT o.customer_id,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd
          FROM orders o
          JOIN products p ON p.product_id = o.product_id
          WHERE o.status='paid'
        )
        SELECT c.name, ROUND(SUM(pl.net_usd),2) AS total_paid_usd
        FROM paid_lines pl
        JOIN customers c ON c.customer_id = pl.customer_id
        GROUP BY c.name
        ORDER BY c.name;`,normalize:{sortBy:[0],numericCols:[1]}},points:210},{topic:`Chapter 8 — Date Filtering`,difficulty:`Easy`,prompt:`List order_id, order_date for orders in March 2025.`,starter:`-- Table: orders
-- March 2025 window
`,hint:`order_date >= '2025-03-01' AND order_date < '2025-04-01'`,expected:{sql:`
        SELECT order_id, order_date
        FROM orders
        WHERE order_date >= '2025-03-01' AND order_date < '2025-04-01'
        ORDER BY order_id;`,normalize:{sortBy:[0]}},points:110},{topic:`Chapter 9 — LEFT JOIN (Orphans)`,difficulty:`Medium`,prompt:`List customers (customer_id, name) who have zero orders.`,starter:`-- Tables: customers, orders
-- LEFT JOIN orders and filter NULL
`,hint:`LEFT JOIN ... WHERE o.order_id IS NULL`,expected:{sql:`
        SELECT c.customer_id, c.name
        FROM customers c
        LEFT JOIN orders o ON o.customer_id = c.customer_id
        WHERE o.order_id IS NULL
        ORDER BY c.customer_id;`,normalize:{sortBy:[0]}},points:170},{topic:`Chapter 10 — FX Rates Join`,difficulty:`Medium`,prompt:`For orders on '2025-03-01', show order_id, currency, usd_rate using fx_rates_daily.`,starter:`-- Tables: orders, fx_rates_daily
-- Join fx_rates_daily on rate_date + currency
`,hint:`ON fx.rate_date='2025-03-01' AND fx.currency=o.currency`,expected:{sql:`
        SELECT o.order_id, o.currency, fx.usd_rate
        FROM orders o
        JOIN fx_rates_daily fx
          ON fx.rate_date='2025-03-01' AND fx.currency=o.currency
        WHERE o.order_date='2025-03-01'
        ORDER BY o.order_id;`,normalize:{sortBy:[0],numericCols:[2]}},points:180},{topic:`Chapter 10 — FX Revenue`,difficulty:`Hard`,prompt:`Compute total USD revenue for paid orders where currency != 'USD' using March 1 fx rates.`,starter:`-- Tables: orders, products, fx_rates_daily
-- CTE for paid, then join fx and sum
`,hint:`SUM(net_usd_list * fx.usd_rate) WHERE currency <> 'USD'`,expected:{sql:`
        WITH paid AS (
          SELECT o.order_id, o.currency,
                 (p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS net_usd_list
          FROM orders o
          JOIN products p ON p.product_id=o.product_id
          WHERE o.status='paid'
        )
        SELECT ROUND(SUM(paid.net_usd_list * fx.usd_rate), 2) AS total_usd
        FROM paid
        JOIN fx_rates_daily fx
          ON fx.rate_date='2025-03-01' AND fx.currency=paid.currency
        WHERE paid.currency <> 'USD';`,normalize:{numericCols:[0]}},points:260},{topic:`Chapter 11 — Window Rank`,difficulty:`Hard`,prompt:`Rank customers by total paid revenue. Return name, total_paid_usd, rev_rank.`,starter:`-- Tables: orders, products, customers
-- Aggregate then window RANK()
`,hint:`RANK() OVER (ORDER BY total_paid_usd DESC)`,expected:{sql:`
        WITH paid_rev AS (
          SELECT o.customer_id,
                 SUM(p.price_usd * o.quantity * (1 - o.discount_pct/100.0)) AS total_paid_usd
          FROM orders o
          JOIN products p ON p.product_id=o.product_id
          WHERE o.status='paid'
          GROUP BY o.customer_id
        )
        SELECT c.name,
               ROUND(pr.total_paid_usd,2) AS total_paid_usd,
               RANK() OVER (ORDER BY pr.total_paid_usd DESC) AS rev_rank
        FROM paid_rev pr
        JOIN customers c ON c.customer_id=pr.customer_id
        ORDER BY rev_rank, c.name;`,normalize:{sortBy:[2,0],numericCols:[1]}},points:280},{topic:`Chapter 11 — Running Total`,difficulty:`Hard`,prompt:`For each campaign_id, show spend_date, spend_usd, and running_spend by date.`,starter:`-- Table: ad_spend_daily
-- Window SUM() OVER (PARTITION BY campaign_id ORDER BY spend_date)
`,hint:`SUM(spend_usd) OVER (PARTITION BY campaign_id ORDER BY spend_date)`,expected:{sql:`
        SELECT campaign_id, spend_date, spend_usd,
               SUM(spend_usd) OVER (
                 PARTITION BY campaign_id
                 ORDER BY spend_date
                 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
               ) AS running_spend
        FROM ad_spend_daily
        ORDER BY campaign_id, spend_date;`,normalize:{sortBy:[0,1],numericCols:[2,3]}},points:300},{topic:`Chapter 12 — Web Analytics`,difficulty:`Easy`,prompt:`Count sessions per source (source, sessions).`,starter:`-- Table: sessions
-- GROUP BY source
`,hint:`SELECT source, COUNT(*) FROM sessions GROUP BY source`,expected:{sql:`SELECT source, COUNT(*) AS sessions FROM sessions GROUP BY source ORDER BY source;`,normalize:{sortBy:[0]}},points:120},{topic:`Chapter 12 — Pageviews`,difficulty:`Easy`,prompt:`Show page and average duration_sec rounded to 1 decimal.`,starter:`-- Table: pageviews
-- AVG(duration_sec) GROUP BY page
`,hint:`ROUND(AVG(duration_sec), 1)`,expected:{sql:`SELECT page, ROUND(AVG(duration_sec),1) AS avg_duration FROM pageviews GROUP BY page ORDER BY page;`,normalize:{sortBy:[0],numericCols:[1]}},points:130},{topic:`Chapter 13 — Support`,difficulty:`Easy`,prompt:`Count support tickets per status (status, ticket_count).`,starter:`-- Table: support_tickets
-- GROUP BY status
`,hint:`SELECT status, COUNT(*) FROM support_tickets GROUP BY status`,expected:{sql:`SELECT status, COUNT(*) AS ticket_count FROM support_tickets GROUP BY status ORDER BY status;`,normalize:{sortBy:[0]}},points:130},{topic:`Chapter 13 — Support Satisfaction`,difficulty:`Medium`,prompt:`Show category and average satisfaction_score rounded to 2 decimals.`,starter:`-- Table: support_tickets
-- AVG ignores NULL in SQLite
`,hint:`ROUND(AVG(satisfaction_score), 2)`,expected:{sql:`SELECT category, ROUND(AVG(satisfaction_score),2) AS avg_satisfaction FROM support_tickets GROUP BY category ORDER BY category;`,normalize:{sortBy:[0],numericCols:[1]}},points:170},{topic:`Chapter 14 — Marketing`,difficulty:`Easy`,prompt:`Touches per customer: customer_id, touches (count).`,starter:`-- Table: campaign_touches
-- COUNT(*) GROUP BY customer_id
`,hint:`SELECT customer_id, COUNT(*) AS touches FROM campaign_touches GROUP BY customer_id`,expected:{sql:`SELECT customer_id, COUNT(*) AS touches FROM campaign_touches GROUP BY customer_id ORDER BY customer_id;`,normalize:{sortBy:[0]}},points:140},{topic:`Chapter 14 — Attribution`,difficulty:`Medium`,prompt:`List distinct customer names who had a touch from a campaign with channel='Paid Social'.`,starter:`-- Tables: campaign_touches, campaigns, customers
-- campaign_touches -> campaigns -> customers
`,hint:`JOIN campaigns and filter channel='Paid Social'`,expected:{sql:`
        SELECT DISTINCT c.name
        FROM campaign_touches t
        JOIN campaigns cam ON cam.campaign_id=t.campaign_id
        JOIN customers c ON c.customer_id=t.customer_id
        WHERE cam.channel='Paid Social'
        ORDER BY c.name;`,normalize:{sortBy:[0]}},points:180},{topic:`Chapter 15 — People (Self-Join)`,difficulty:`Medium`,prompt:`Show employee name and manager name (NULL if none).`,starter:`-- Table: employees
-- employees self join
`,hint:`LEFT JOIN employees m ON e.manager_id=m.employee_id`,expected:{sql:`
        SELECT e.name AS employee, m.name AS manager
        FROM employees e
        LEFT JOIN employees m ON m.employee_id=e.manager_id
        ORDER BY e.employee_id;`,normalize:{sortBy:[0]}},points:180},{topic:`Chapter 16 — Customer Success`,difficulty:`Medium`,prompt:`List customer name and CS owner where assignment end_date IS NULL.`,starter:`-- Tables: customer_success_assignments, customers, employees
-- assignments JOIN customers JOIN employees
`,hint:`WHERE a.end_date IS NULL`,expected:{sql:`
        SELECT c.name AS customer, e.name AS cs_owner
        FROM customer_success_assignments a
        JOIN customers c ON c.customer_id=a.customer_id
        JOIN employees e ON e.employee_id=a.employee_id
        WHERE a.end_date IS NULL
        ORDER BY c.name;`,normalize:{sortBy:[0]}},points:200},{topic:`Chapter 17 — DDL (CREATE TABLE)`,difficulty:`Medium`,prompt:`Create a table feature_flags with: flag_key TEXT PRIMARY KEY, enabled INTEGER NOT NULL. (Use tmp_ or user_ prefix.)`,starter:`-- Example:
-- CREATE TABLE user_feature_flags(flag_key TEXT PRIMARY KEY, enabled INTEGER NOT NULL);
`,hint:`Use user_feature_flags or tmp_feature_flags.`,validate(){return L(`user_feature_flags`)||L(`tmp_feature_flags`)?{ok:!0}:{ok:!1,msg:`Create user_feature_flags or tmp_feature_flags.`}},points:210},{topic:`Chapter 18 — DML (INSERT)`,difficulty:`Medium`,prompt:`Insert two rows into your feature flags table: ('new_checkout',1) and ('beta_reports',0). Then SELECT * ordered by flag_key.`,starter:`-- Use the same table you created in previous level
-- INSERT INTO ...
-- SELECT * FROM ... ORDER BY flag_key;
`,hint:`INSERT INTO ... VALUES ('new_checkout',1),('beta_reports',0);`,validate(){let e=L(`user_feature_flags`)?`user_feature_flags`:L(`tmp_feature_flags`)?`tmp_feature_flags`:null;if(!e)return{ok:!1,msg:`Feature flags table not found. Create it first.`};let t=I(`SELECT flag_key, enabled FROM ${e} ORDER BY flag_key;`).values||[],n=t.some(e=>e[0]===`new_checkout`&&Number(e[1])===1),r=t.some(e=>e[0]===`beta_reports`&&Number(e[1])===0);return!n||!r?{ok:!1,msg:`Expected flags in ${e}: ('beta_reports',0) and ('new_checkout',1).`}:{ok:!0}},points:230},{topic:`Chapter 19 — Final Boss (Window + CTE)`,difficulty:`Hard`,prompt:`For each subscription_id, find the latest event and return subscription_id, event_type, new_mrr_usd.`,starter:`-- Table: subscription_events
-- Use ROW_NUMBER() OVER (PARTITION BY subscription_id ORDER BY event_date DESC, event_id DESC)
-- then filter rn=1
`,hint:`ROW_NUMBER() OVER (PARTITION BY subscription_id ORDER BY event_date DESC, event_id DESC)`,expected:{sql:`
        WITH ranked AS (
          SELECT subscription_id, event_type, new_mrr_usd,
                 ROW_NUMBER() OVER (
                   PARTITION BY subscription_id
                   ORDER BY event_date DESC, event_id DESC
                 ) AS rn
          FROM subscription_events
        )
        SELECT subscription_id, event_type, new_mrr_usd
        FROM ranked
        WHERE rn=1
        ORDER BY subscription_id;`,normalize:{sortBy:[0],numericCols:[2]}},points:320},{topic:`Chapter 20 — Payments Status`,difficulty:`Easy`,prompt:`Show payment_id, amount_usd for failed payments ordered by payment_id.`,starter:`-- Table: payments
`,hint:`WHERE status='failed'`,expected:{sql:`SELECT payment_id, amount_usd FROM payments WHERE status='failed' ORDER BY payment_id;`,normalize:{sortBy:[0],numericCols:[1]}},points:120},{topic:`Chapter 21 — Refund Join`,difficulty:`Medium`,prompt:`Show refund_id, payment_id, amount_usd, reason ordered by refund_id.`,starter:`-- Table: refunds
`,hint:`SELECT refund_id, payment_id, amount_usd, reason FROM refunds`,expected:{sql:`SELECT refund_id, payment_id, amount_usd, reason FROM refunds ORDER BY refund_id;`,normalize:{sortBy:[0],numericCols:[2]}},points:160},{topic:`Chapter 22 — Sessions + Pageviews`,difficulty:`Medium`,prompt:`Show session_id and number of pageviews for each session, ordered by session_id.`,starter:`-- Tables: sessions, pageviews
`,hint:`LEFT JOIN pageviews then COUNT(pageview_id) GROUP BY session_id`,expected:{sql:`
        SELECT s.session_id, COUNT(p.pageview_id) AS pageviews
        FROM sessions s
        LEFT JOIN pageviews p ON p.session_id = s.session_id
        GROUP BY s.session_id
        ORDER BY s.session_id;`,normalize:{sortBy:[0]}},points:180},{topic:`Chapter 23 — Tickets With Comments`,difficulty:`Medium`,prompt:`Show ticket_id and number of comments per ticket ordered by ticket_id.`,starter:`-- Tables: support_tickets, ticket_comments
`,hint:`LEFT JOIN ticket_comments and COUNT(comment_id)`,expected:{sql:`
        SELECT t.ticket_id, COUNT(c.comment_id) AS comments
        FROM support_tickets t
        LEFT JOIN ticket_comments c ON c.ticket_id = t.ticket_id
        GROUP BY t.ticket_id
        ORDER BY t.ticket_id;`,normalize:{sortBy:[0]}},points:190},{topic:`Chapter 24 — Campaign Spend Summary`,difficulty:`Hard`,prompt:`For each campaign_id, show total_spend_usd and total_clicks ordered by campaign_id.`,starter:`-- Table: ad_spend_daily
`,hint:`SUM(spend_usd), SUM(clicks) GROUP BY campaign_id`,expected:{sql:`
        SELECT campaign_id,
               ROUND(SUM(spend_usd),2) AS total_spend_usd,
               SUM(clicks) AS total_clicks
        FROM ad_spend_daily
        GROUP BY campaign_id
        ORDER BY campaign_id;`,normalize:{sortBy:[0],numericCols:[1]}},points:240},{topic:`Chapter 25 — Window Avg Spend`,difficulty:`Hard`,prompt:`For each campaign_id, show spend_date, spend_usd, and avg_spend_for_campaign (window AVG).`,starter:`-- Table: ad_spend_daily
`,hint:`AVG(spend_usd) OVER (PARTITION BY campaign_id)`,expected:{sql:`
        SELECT campaign_id, spend_date, spend_usd,
               ROUND(AVG(spend_usd) OVER (PARTITION BY campaign_id), 2) AS avg_spend_for_campaign
        FROM ad_spend_daily
        ORDER BY campaign_id, spend_date;`,normalize:{sortBy:[0,1],numericCols:[2,3]}},points:280},{topic:`Chapter 26 — Create tmp table`,difficulty:`Medium`,prompt:`Create tmp_notes(note_id INTEGER PRIMARY KEY, body TEXT NOT NULL).`,starter:`-- Must start with tmp_ or user_
`,hint:`CREATE TABLE tmp_notes(...)`,validate(){return L(`tmp_notes`)||L(`user_notes`)?{ok:!0}:{ok:!1,msg:`Create tmp_notes or user_notes.`}},points:200},{topic:`Chapter 27 — Insert into tmp table`,difficulty:`Medium`,prompt:`Insert one row into your tmp_notes/user_notes table. Then SELECT *.`,starter:`-- INSERT INTO tmp_notes(body) VALUES ('hello');
-- SELECT * FROM tmp_notes;
`,hint:`INSERT then SELECT`,validate(){let e=L(`tmp_notes`)?`tmp_notes`:L(`user_notes`)?`user_notes`:null;if(!e)return{ok:!1,msg:`Notes table not found. Create it first.`};let t=I(`SELECT COUNT(*) FROM ${e};`);return Number(t.values?.[0]?.[0]??0)>0?{ok:!0}:{ok:!1,msg:`Insert at least one row.`}},points:220},{topic:`Chapter 28 — Update tmp row`,difficulty:`Hard`,prompt:`Update your notes row to change body text, then SELECT *.`,starter:`-- UPDATE tmp_notes SET body='updated' WHERE note_id=1;
-- SELECT * FROM tmp_notes;
`,hint:`UPDATE then SELECT`,validate(){let e=L(`tmp_notes`)?`tmp_notes`:L(`user_notes`)?`user_notes`:null;if(!e)return{ok:!1,msg:`Notes table not found.`};let t=I(`SELECT body FROM ${e} LIMIT 1;`),n=String(t.values?.[0]?.[0]??``);return n&&n.toLowerCase()!==`hello`?{ok:!0}:{ok:!1,msg:`Update the body text to a new value.`}},points:260},{topic:`Chapter 29 — Finish`,difficulty:`Hard`,prompt:`Final check: SELECT the total number of customers.`,starter:`-- Table: customers
`,hint:`SELECT COUNT(*) FROM customers;`,expected:{sql:`SELECT COUNT(*) AS customer_count FROM customers;`,normalize:{numericCols:[0]}},points:300}];z.length!==29&&console.warn(`Expected 29 levels, got ${z.length}.`);var We=`Nice work. Your query matched the expected result.(Correct. Keep going — your SQL is improving fast.(Great job. That logic is solid.(Correct. Clean and precise.(Well done. You’re thinking like an analyst.(Correct. That’s the right result set.(Good job. Your filters and sorting are on point.(Correct. You’re building strong SQL instincts.(Nice. You’re reading the data correctly.(Correct. Keep the momentum.(Well done. Joins are starting to feel natural.(Correct. Strong aggregation work.(Nice work. Your query is consistent and accurate.(Correct. This is exactly what the mission asked for.(Great job. You’re becoming faster and cleaner.(Correct. Smooth execution.(Well done. Window functions are powerful — you used them well.(Correct. That solution is reliable.(Nice. You’re thinking in sets, not rows.(Correct. Keep leveling up.(Great work. Your SQL is disciplined.(Correct. You handled edge cases well.(Nice job. That’s a clean approach.(Correct. Good structure and readability.(Well done. You’re close to pro-level thinking.(Correct. Strong finish.(Nice work. You’re building real skill.(Correct. Keep practicing — you’re on track.(Correct. Final challenge cleared.`.split(`(`);function Ge(e,t){if(e.length<=1)return e[0];let n=e[Math.floor(Math.random()*e.length)],r=0;for(;n===t&&r<10;)n=e[Math.floor(Math.random()*e.length)],r++;return n}var Ke=null;function B(){let e=!!D&&!D.classList.contains(`hidden`),t=!!v&&!v.classList.contains(`hidden`),n=!!k&&!k.classList.contains(`hidden`);e||t||n?document.body.classList.add(`modal-open`):document.body.classList.remove(`modal-open`)}function qe({earned:e,breakdown:t}={}){if(!D)return;let n=Ge(We,Ke);if(Ke=n,_e&&(_e.textContent=`Correct!`),O)if(typeof e==`number`&&t){let n=[];n.push(`base ${t.basePoints}`),t.bonus&&n.push(`bonus +${t.bonus}`),t.timeBonus&&n.push(`time +${t.timeBonus}`),t.hintPenalty&&n.push(`hint -${t.hintPenalty}`),t.wrongPenalty&&n.push(`attempts -${t.wrongPenalty}`),O.textContent=`Correct (+${e} points). [${n.join(`, `)}]`}else typeof e==`number`?O.textContent=`Correct (+${e} points).`:O.textContent=`Correct.`;ve&&(ve.textContent=`“${n}”`),D.classList.remove(`hidden`),B(),setTimeout(()=>ye?.focus?.(),0)}function V(){D&&(D.classList.add(`hidden`),B())}function H(e,t=`muted`){he&&(he.classList.remove(`ok`,`bad`,`muted`),t===`ok`?he.classList.add(`ok`):t===`bad`?he.classList.add(`bad`):he.classList.add(`muted`),he.textContent=e)}function Je(e){g&&(g.textContent=e??``)}function Ye(){return new Date().toLocaleString()}function U(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function W(){let e={levelIndex:N.levelIndex,progressIndex:N.progressIndex,levelSQL:N.levelSQL??{},score:N.score,streak:N.streak,history:N.history.slice(0,20)};localStorage.setItem(Oe,JSON.stringify(e))}function Xe(){try{let e=localStorage.getItem(Oe);if(!e)return;let t=JSON.parse(e),n=Number(t.levelIndex??0);N.levelIndex=Number.isFinite(n)?Math.max(0,Math.min(z.length-1,n)):0;let r=Number(t.progressIndex??t.levelIndex??0);N.progressIndex=Number.isFinite(r)?Math.max(0,Math.min(z.length,r)):0,N.levelIndex>N.progressIndex&&(N.levelIndex=Math.min(N.levelIndex,N.progressIndex)),N.levelSQL=t.levelSQL&&typeof t.levelSQL==`object`?t.levelSQL:{},N.score=t.score??0,N.streak=t.streak??0,N.history=Array.isArray(t.history)?t.history:[]}catch{}}function G(){T&&(T.textContent=String(N.levelIndex+1)),le&&(le.textContent=String(N.score)),E&&(E.textContent=String(N.streak)),p&&(p.textContent=N.levelIndex>=z.length-1?`Finish`:`Next Level →`),de&&(de.textContent=`${Math.max(0,Math.min(z.length,N.progressIndex))}/${z.length}`)}function Ze(){let e=localStorage.getItem(ke)||``;N.playerName=e,h&&(h.value=e),Je(e?`Saved as: ${e}`:`No name saved yet.`)}function Qe(){let e=(h?.value??``).trim();if(!e){H(`Please enter your name (for leaderboard tracking).`,`bad`),Je(`Enter a name, then click Save.`);return}N.playerName=e,localStorage.setItem(ke,e),H(`Saved player name: ${e}`,`ok`),Je(`Saved as: ${e}`)}function $e(){try{let e=localStorage.getItem(Ae),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function et(e){localStorage.setItem(Ae,JSON.stringify(e))}function tt(e){return e.completed?`Completed`:`Level ${e.levelStopped}`}function K({completed:e=!1}={}){let t=(N.playerName??``).trim();if(!t)return;let n=$e(),r=e?z.length:Math.max(1,N.progressIndex),i=Date.now(),a=n.findIndex(e=>(e.name??``).toLowerCase()===t.toLowerCase()),o={name:t,score:N.score,levelStopped:r,completed:e,updatedAt:i};if(a>=0){let e=n[a],t=!!e.completed;n[a]=o.score>(e.score??0)||o.score===(e.score??0)&&o.levelStopped>(e.levelStopped??0)||!t&&o.completed?o:e}else n.push(o);et(n)}function nt(){if(!y)return;let e=$e().slice().sort((e,t)=>(t.score??0)===(e.score??0)?!!t.completed==!!e.completed?(t.levelStopped??0)===(e.levelStopped??0)?(e.updatedAt??0)-(t.updatedAt??0):(t.levelStopped??0)-(e.levelStopped??0):t.completed?1:-1:(t.score??0)-(e.score??0));if(!e.length){y.innerHTML=`<tr><td colspan="4" class="muted">No scores yet.</td></tr>`;return}y.innerHTML=e.map((e,t)=>{let n=tt(e);return`
        <tr>
          <td>${t+1}</td>
          <td>${U(e.name??``)}</td>
          <td>${Number(e.score??0)}</td>
          <td>${U(n)}</td>
        </tr>
      `}).join(``)}function rt(){v&&(nt(),v.classList.remove(`hidden`),B(),b?.focus?.())}function it(){v&&(v.classList.add(`hidden`),B())}function at(){Me=!1,x?.classList.add(`hidden`),x?.setAttribute(`aria-hidden`,`true`)}function ot(){if(prompt(`Admin PIN:`)!==je){alert(`Wrong PIN.`);return}Me=!0,x?.classList.remove(`hidden`),x?.removeAttribute(`aria-hidden`),alert(`Admin mode unlocked`)}function st(){if(!Me){alert(`Admin mode locked (Use Alt + Shift + M to unlock)`);return}confirm(`Clear ALL leaderboard entries?`)&&(localStorage.removeItem(Ae),nt(),alert(`Leaderboard cleared.`))}function q(){if(!(!ce||!ue)){if(ue.textContent=String(N.history.length),!N.history.length){ce.innerHTML=`<p class="muted">No queries yet. Run something!</p>`;return}ce.innerHTML=N.history.slice().reverse().map(e=>`
      <div class="history-item">
        <div class="meta">
          <span>${U(e.time)}</span>
          <span>${U(e.type)}</span>
        </div>
        <pre>${U(e.sql)}</pre>
      </div>
    `).join(``)}}function ct(e,t=`run`){let n=(e??``).trim();n&&(N.history.push({time:Ye(),sql:n,type:t}),N.history.length>20&&N.history.shift(),q(),W())}function lt(e,t){if(!e||e.length===0)return{columns:[],values:[]};let n=e[e.length-1],r=n.columns||[],i=(n.values||[]).map(e=>e.map(e=>e??``));if(t?.numericCols?.length){let e=t.numericCols;i=i.map(t=>{let n=[...t];for(let t of e){let e=Number(n[t]);n[t]=Number.isFinite(e)?Math.round(e*100)/100:n[t]}return n})}if(t?.sortBy?.length){let e=t.sortBy;i.sort((t,n)=>{for(let r of e){if(t[r]<n[r])return-1;if(t[r]>n[r])return 1}return 0})}return{columns:r,values:i}}function ut(e,t){if(e.columns.length!==t.columns.length)return!1;for(let n=0;n<e.columns.length;n++)if(String(e.columns[n]).toLowerCase()!==String(t.columns[n]).toLowerCase())return!1;if(e.values.length!==t.values.length)return!1;for(let n=0;n<e.values.length;n++){if(e.values[n].length!==t.values[n].length)return!1;for(let r=0;r<e.values[n].length;r++)if(String(e.values[n][r])!==String(t.values[n][r]))return!1}return!0}function dt(e){if(!w)return;if(!e||e.length===0){w.innerHTML=`<p class='muted'>No results</p>`;return}let{columns:t,values:n}=e[e.length-1],r=`<table><thead><tr>`;t.forEach(e=>r+=`<th>${U(e)}</th>`),r+=`</tr></thead><tbody>`,n.forEach(e=>{r+=`<tr>`,e.forEach(e=>r+=`<td>${U(e??``)}</td>`),r+=`</tr>`}),r+=`</tbody></table>`,w.innerHTML=r}function ft(){if(De){try{M?.close?.()}catch{}M=new De.Database,M.run(ee),Ue()}}function pt(){ie?.classList.remove(`hidden`),m?.classList.add(`hidden`)}function mt(){ie?.classList.add(`hidden`),m?.classList.remove(`hidden`)}function ht(e){return(e.starter??``).trimEnd()+(e.starter?`
`:``)}function J(e){return String(e??``).replace(/^chapter\s*\d+\s*[—-]\s*/i,``).trim()}function Y(e){let t=new Set,n=[];for(let r of e){let e=String(r).toLowerCase();t.has(e)||(t.add(e),n.push(String(r)))}return n}function gt(e){let t=String(e?.starter??``),n=t.match(/^\s*--\s*Tables?\s*:\s*(.+)$/im);if(n&&n[1]){let e=n[1].split(`,`).map(e=>e.trim()).filter(Boolean);if(e.length)return Y(e)}let r=String(e?.prompt??``)+`
`+String(e?.expected?.sql??``)+`
`+t,i=Fe.filter(e=>RegExp(`\\b${e}\\b`,`i`).test(r));return i.length?Y(i):[`(not specified)`]}function _t(){if(!C)return;let e=N.levelIndex;N.levelSQL[e]=C.value??``,W()}function vt(e){let t=N.levelSQL?.[e];return typeof t==`string`&&t.trim().length?t:null}function yt(e){let t=Math.max(0,Math.min(z.length,e));N.progressIndex=Math.max(N.progressIndex,t)}function bt(){let e=z[N.levelIndex];N.hintShown=!1,N.attempts=0,N.levelStartMs=Date.now(),ge&&(ge.textContent=``);let t=J(e.topic??e.title??``);fe&&(fe.textContent=`Level ${N.levelIndex+1}: ${t}`);let n=`Retrieve from: ${gt(e).join(`, `)}`;pe&&(pe.textContent=`${e.prompt}\n${n}`),me&&(me.textContent=e.difficulty??`—`);let r=vt(N.levelIndex);C&&(C.value=r??ht(e)),p&&(p.disabled=!(N.levelIndex<N.progressIndex)),w&&(w.innerHTML=`<p class="muted">Write a query and click <b>Run Query</b>.</p>`),Q(),H(`Write your query, click Run Query, then Check Answer.`,`muted`),G(),W()}function xt(){let e=(N.playerName??``).trim();e||=(h?.value??``).trim(),e||=`Player`,N.playerName=e,localStorage.setItem(ke,e),Je(`Saved as: ${e}`),N.levelIndex=0,N.progressIndex=0,N.levelSQL={},N.score=0,N.streak=0,N.hintShown=!1,N.history=[],N.attempts=0,N.levelStartMs=0,ft(),W(),q(),G(),Q(),mt(),bt(),H(`Write your query, click Run Query, then Check Answer.`,`muted`)}function St(){confirm(`Restart the game from Level 1? (Leaderboard stays)`)&&(N.levelIndex=0,N.progressIndex=0,N.levelSQL={},N.score=0,N.streak=0,N.hintShown=!1,N.history=[],N.attempts=0,N.levelStartMs=0,W(),q(),G(),Q(),Ze(),pt(),H(`Welcome back! Enter your name and click Save.`,`muted`))}function Ct(){if(!N.history.length){H(`History is already empty.`,`muted`);return}confirm(`Clear all query history?`)&&(N.history=[],q(),W(),H(`Query history cleared.`,`muted`))}function wt(){if(!M){w&&(w.innerHTML=`<p class="error">Database is still loading...</p>`);return}try{let e=C?.value.trim()??``;if(!e){w&&(w.innerHTML=`<p class="error">Type a SQL query first.</p>`),H(`Type a SQL query first.`,`bad`);return}_t(),Ve(e),ct(e,`run`),dt(M.exec(e)),H(`Query executed. Now click Check Answer to validate.`,`muted`)}catch(e){w&&(w.innerHTML=`<p class="error">${U(e.message)}</p>`),H(e.message||`Your query was blocked.`,`bad`)}}function Tt(){if(!M)return;let e=z[N.levelIndex];try{let t=C?.value.trim()??``;if(!t){H(`Type a SQL query before checking.`,`bad`);return}if(_t(),Ve(t),ct(t,`check`),N.attempts+=1,typeof e.validate==`function`){let n=He(t);M.exec(n);let r=e.validate(M);if(r?.ok){let{earned:t,breakdown:n}=Pe(e.points??0);N.score+=t,n.firstTry?N.streak+=1:N.streak=0,yt(N.levelIndex+1),H(`Correct! +${t} points`,`ok`),p&&(p.disabled=!1),G(),W(),K({completed:!1}),qe({earned:t,breakdown:n}),Q();return}N.streak=0,G(),W(),H(`Not quite. ${r?.msg??`Try again.`}`,`bad`),Q();return}let n=M.exec(t),r=M.exec(e.expected.sql),i=lt(n,e.expected.normalize),a=lt(r,e.expected.normalize);if(i.columns.length!==a.columns.length){N.streak=0,G(),W(),H(`Column mismatch. Expected: ${a.columns.join(`, `)} | You returned: ${i.columns.join(`, `)}`,`bad`),Q();return}if(ut(i,a)){let{earned:t,breakdown:n}=Pe(e.points??0);N.score+=t,n.firstTry?N.streak+=1:N.streak=0,yt(N.levelIndex+1),H(`Correct! +${t} points`,`ok`),p&&(p.disabled=!1),G(),W(),K({completed:!1}),qe({earned:t,breakdown:n}),Q();return}N.streak=0,G(),W(),H(`Not quite. Try again (Hint available).`,`bad`),Q()}catch(e){H(`Error while checking: ${e.message}`,`bad`),Q()}}function Et(){if(V(),N.progressIndex>=z.length&&N.levelIndex>=z.length-1){H(`You finished all levels! (Marked as Completed)`,`ok`),K({completed:!0}),p&&(p.disabled=!0),G(),Q();return}if(N.levelIndex>=z.length-1){H(`This is the final level.`,`muted`),p&&(p.disabled=!0),G(),Q();return}N.levelIndex+=1,N.levelIndex>N.progressIndex&&(N.levelIndex=N.progressIndex),W(),bt()}function Dt(){M&&(ft(),N.streak=0,N.attempts=0,N.levelStartMs=Date.now(),w&&(w.innerHTML=`<p class="muted">DB reset. Write a query and click <b>Run Query</b>.</p>`),H(`DB reset complete. You can retry the level from scratch.`,`muted`),G(),W(),Q())}function Ot(){let e=z[N.levelIndex];N.hintShown=!0,ge&&(ge.textContent=e.hint??``),H(`Hint shown (hint penalty will apply).`,`muted`),W()}function kt({columns:e,values:t}){return e.length?`<div style="overflow:auto;"><table>${`<thead><tr>${e.map(e=>`<th>${U(e)}</th>`).join(``)}</tr></thead>`}${`<tbody>${t.map(e=>`<tr>${e.map(e=>`<td>${U(e??``)}</td>`).join(``)}</tr>`).join(``)}</tbody>`}</table></div>`:`<p class="muted">No data.</p>`}function At(e){if(!Ce||!j||!we||!Te)return;let t=e===`schema`;we.classList.toggle(`active`,t),Te.classList.toggle(`active`,!t),Ce.classList.toggle(`hidden`,!t),j.classList.toggle(`hidden`,t)}function jt(e,t){A&&[...A.querySelectorAll(`button`)].forEach(e=>e.classList.remove(`active`)),t?.classList.add(`active`),Se&&(Se.textContent=e),At(`schema`);let n=I(`PRAGMA table_info(${e});`);Ce&&(Ce.innerHTML=kt(n));let r=I(`SELECT * FROM ${e} LIMIT 10;`);j&&(j.innerHTML=kt(r))}function Mt(){if(!M||!A)return;let{values:e}=I(`
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name;
  `);if(A.innerHTML=``,!e.length){A.innerHTML=`<p class="muted">No tables found.</p>`;return}e.forEach(([e],t)=>{let n=document.createElement(`button`);n.type=`button`,n.textContent=e,n.className=`data-table-btn`,n.addEventListener(`click`,()=>jt(e,n)),A.appendChild(n),t===0&&jt(e,n)})}function Nt(){k&&(Mt(),k.classList.remove(`hidden`),B(),setTimeout(()=>xe?.focus?.(),0))}function X(){k&&(k.classList.add(`hidden`),B())}function Z(){return Math.max(0,Math.min(z.length,N.progressIndex))}function Q(){if(!Ee)return;let e=Z();de&&(de.textContent=`${Math.max(0,Math.min(z.length,N.progressIndex))}/${z.length}`),Ee.innerHTML=z.map((t,n)=>{let r=n<=e,i=n===N.levelIndex,a=i?`⭐`:n<e?`✅`:r?`🔓`:`🔒`,o=J(t.topic??`Level ${n+1}`),s=t.difficulty??``;return`
        <button
          type="button"
          class="level-item ${i?`current`:``} ${r?``:`locked`}"
          data-level="${n}"
          ${r?``:`disabled aria-disabled="true"`}
          title="${r?`Open level`:`Locked`}"
        >
          <div class="li-top">
            <div class="li-num">Level ${n+1}</div>
            <div class="li-badge">${a}</div>
          </div>
          <div class="li-title">${U(o)}</div>
          <div class="li-sub">${U(s)}</div>
        </button>
      `}).join(``),[...Ee.querySelectorAll(`button.level-item`)].forEach(e=>{let t=Number(e.getAttribute(`data-level`));Number.isFinite(t)&&(e.disabled||e.addEventListener(`click`,()=>{N.levelIndex=t,N.levelIndex>N.progressIndex&&(N.levelIndex=N.progressIndex),W(),V(),bt()}))})}function Pt(){document.addEventListener(`keydown`,e=>{let t=navigator.platform.toUpperCase().includes(`MAC`)?e.metaKey:e.ctrlKey;if(e.key===`Escape`){D&&!D.classList.contains(`hidden`)&&V(),v&&!v.classList.contains(`hidden`)&&it(),k&&!k.classList.contains(`hidden`)&&X();return}if(t&&e.key===`Enter`){e.preventDefault(),e.stopPropagation(),wt();return}if(e.altKey&&e.key===`Enter`){e.preventDefault(),e.stopPropagation(),Tt();return}if(t&&e.shiftKey&&(e.code===`KeyB`||e.key.toLowerCase()===`b`)){e.preventDefault(),e.stopPropagation(),v&&!v.classList.contains(`hidden`)?it():rt();return}if(e.altKey&&e.shiftKey&&(e.code===`KeyM`||e.key.toLowerCase()===`m`)){e.preventDefault(),e.stopPropagation(),ot();return}},!0)}localStorage.removeItem(ke);async function $(){try{De=await(0,u.default)({locateFile:e=>e.endsWith(`.wasm`)?d:e}),M=new De.Database,M.run(ee),Ue(),Ze(),Xe(),q(),G(),at(),pt(),H(`Welcome! Enter your name, save, then Start Game.`,`muted`),Pt(),Q()}catch(e){w&&(w.innerHTML=`<p class="error">Failed to initialize DB: ${U(e.message)}</p>`),H(`DB failed to initialize. Check console.`,`bad`),console.error(e)}}te?.addEventListener(`click`,wt),f?.addEventListener(`click`,Tt),p?.addEventListener(`click`,Et),ne?.addEventListener(`click`,Dt),re?.addEventListener(`click`,Ot),S?.addEventListener(`click`,Ct),ae?.addEventListener(`click`,xt),oe?.addEventListener(`click`,St),se?.addEventListener(`click`,Qe),h?.addEventListener(`keydown`,e=>{e.key===`Enter`&&Qe()}),_?.addEventListener(`click`,rt),b?.addEventListener(`click`,it),x?.addEventListener(`click`,st),v&&v.addEventListener(`click`,e=>{e.target===v&&it()}),ye&&ye.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),Et()}),D&&D.addEventListener(`click`,e=>{e.target===D&&V()}),be?.addEventListener(`click`,Nt),xe?.addEventListener(`click`,X),we?.addEventListener(`click`,()=>At(`schema`)),Te?.addEventListener(`click`,()=>At(`preview`)),k&&k.addEventListener(`click`,e=>{e.target===k&&X()}),C?.addEventListener(`input`,()=>{_t()}),$();