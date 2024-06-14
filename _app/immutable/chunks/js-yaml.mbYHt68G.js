/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */function _e(e){return typeof e>"u"||e===null}function pn(e){return typeof e=="object"&&e!==null}function tn(e){return Array.isArray(e)?e:_e(e)?[]:[e]}function hn(e,n){var i,l,r,u;if(n)for(u=Object.keys(n),i=0,l=u.length;i<l;i+=1)r=u[i],e[r]=n[r];return e}function dn(e,n){var i="",l;for(l=0;l<n;l+=1)i+=e;return i}function sn(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var mn=_e,xn=pn,gn=tn,An=dn,vn=sn,yn=hn,y={isNothing:mn,isObject:xn,toArray:gn,repeat:An,isNegativeZero:vn,extend:yn};function we(e,n){var i="",l=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(i+='in "'+e.mark.name+'" '),i+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(i+=`

`+e.mark.snippet),l+" "+i):l}function Y(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=we(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Y.prototype=Object.create(Error.prototype);Y.prototype.constructor=Y;Y.prototype.toString=function(n){return this.name+": "+we(this,n)};var w=Y;function $(e,n,i,l,r){var u="",o="",f=Math.floor(r/2)-1;return l-n>f&&(u=" ... ",n=l-f+u.length),i-l>f&&(o=" ...",i=l+f-o.length),{str:u+e.slice(n,i).replace(/\t/g,"→")+o,pos:l-n+u.length}}function Q(e,n){return y.repeat(" ",n-e.length)+e}function Cn(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var i=/\r?\n|\r|\0/g,l=[0],r=[],u,o=-1;u=i.exec(e.buffer);)r.push(u.index),l.push(u.index+u[0].length),e.position<=u.index&&o<0&&(o=l.length-2);o<0&&(o=l.length-1);var f="",c,a,t=Math.min(e.line+n.linesAfter,r.length).toString().length,p=n.maxLength-(n.indent+t+3);for(c=1;c<=n.linesBefore&&!(o-c<0);c++)a=$(e.buffer,l[o-c],r[o-c],e.position-(l[o]-l[o-c]),p),f=y.repeat(" ",n.indent)+Q((e.line-c+1).toString(),t)+" | "+a.str+`
`+f;for(a=$(e.buffer,l[o],r[o],e.position,p),f+=y.repeat(" ",n.indent)+Q((e.line+1).toString(),t)+" | "+a.str+`
`,f+=y.repeat("-",n.indent+t+3+a.pos)+`^
`,c=1;c<=n.linesAfter&&!(o+c>=r.length);c++)a=$(e.buffer,l[o+c],r[o+c],e.position-(l[o]-l[o+c]),p),f+=y.repeat(" ",n.indent)+Q((e.line+c+1).toString(),t)+" | "+a.str+`
`;return f.replace(/\n$/,"")}var _n=Cn,wn=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],En=["scalar","sequence","mapping"];function Sn(e){var n={};return e!==null&&Object.keys(e).forEach(function(i){e[i].forEach(function(l){n[String(l)]=i})}),n}function Fn(e,n){if(n=n||{},Object.keys(n).forEach(function(i){if(wn.indexOf(i)===-1)throw new w('Unknown option "'+i+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(i){return i},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=Sn(n.styleAliases||null),En.indexOf(this.kind)===-1)throw new w('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var C=Fn;function fe(e,n){var i=[];return e[n].forEach(function(l){var r=i.length;i.forEach(function(u,o){u.tag===l.tag&&u.kind===l.kind&&u.multi===l.multi&&(r=o)}),i[r]=l}),i}function bn(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,i;function l(r){r.multi?(e.multi[r.kind].push(r),e.multi.fallback.push(r)):e[r.kind][r.tag]=e.fallback[r.tag]=r}for(n=0,i=arguments.length;n<i;n+=1)arguments[n].forEach(l);return e}function X(e){return this.extend(e)}X.prototype.extend=function(n){var i=[],l=[];if(n instanceof C)l.push(n);else if(Array.isArray(n))l=l.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(i=i.concat(n.implicit)),n.explicit&&(l=l.concat(n.explicit));else throw new w("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");i.forEach(function(u){if(!(u instanceof C))throw new w("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(u.loadKind&&u.loadKind!=="scalar")throw new w("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(u.multi)throw new w("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(u){if(!(u instanceof C))throw new w("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var r=Object.create(X.prototype);return r.implicit=(this.implicit||[]).concat(i),r.explicit=(this.explicit||[]).concat(l),r.compiledImplicit=fe(r,"implicit"),r.compiledExplicit=fe(r,"explicit"),r.compiledTypeMap=bn(r.compiledImplicit,r.compiledExplicit),r};var Ee=X,Se=new C("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),Fe=new C("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),be=new C("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),Te=new Ee({explicit:[Se,Fe,be]});function Tn(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function On(){return null}function In(e){return e===null}var Oe=new C("tag:yaml.org,2002:null",{kind:"scalar",resolve:Tn,construct:On,predicate:In,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Ln(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function kn(e){return e==="true"||e==="True"||e==="TRUE"}function Nn(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var Ie=new C("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Ln,construct:kn,predicate:Nn,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Rn(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Dn(e){return 48<=e&&e<=55}function Mn(e){return 48<=e&&e<=57}function Yn(e){if(e===null)return!1;var n=e.length,i=0,l=!1,r;if(!n)return!1;if(r=e[i],(r==="-"||r==="+")&&(r=e[++i]),r==="0"){if(i+1===n)return!0;if(r=e[++i],r==="b"){for(i++;i<n;i++)if(r=e[i],r!=="_"){if(r!=="0"&&r!=="1")return!1;l=!0}return l&&r!=="_"}if(r==="x"){for(i++;i<n;i++)if(r=e[i],r!=="_"){if(!Rn(e.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}if(r==="o"){for(i++;i<n;i++)if(r=e[i],r!=="_"){if(!Dn(e.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}}if(r==="_")return!1;for(;i<n;i++)if(r=e[i],r!=="_"){if(!Mn(e.charCodeAt(i)))return!1;l=!0}return!(!l||r==="_")}function Bn(e){var n=e,i=1,l;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),l=n[0],(l==="-"||l==="+")&&(l==="-"&&(i=-1),n=n.slice(1),l=n[0]),n==="0")return 0;if(l==="0"){if(n[1]==="b")return i*parseInt(n.slice(2),2);if(n[1]==="x")return i*parseInt(n.slice(2),16);if(n[1]==="o")return i*parseInt(n.slice(2),8)}return i*parseInt(n,10)}function Pn(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!y.isNegativeZero(e)}var Le=new C("tag:yaml.org,2002:int",{kind:"scalar",resolve:Yn,construct:Bn,predicate:Pn,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Hn=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function jn(e){return!(e===null||!Hn.test(e)||e[e.length-1]==="_")}function Un(e){var n,i;return n=e.replace(/_/g,"").toLowerCase(),i=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:i*parseFloat(n,10)}var Kn=/^[-+]?[0-9]+e/;function qn(e,n){var i;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(y.isNegativeZero(e))return"-0.0";return i=e.toString(10),Kn.test(i)?i.replace("e",".e"):i}function Gn(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||y.isNegativeZero(e))}var ke=new C("tag:yaml.org,2002:float",{kind:"scalar",resolve:jn,construct:Un,predicate:Gn,represent:qn,defaultStyle:"lowercase"}),Ne=Te.extend({implicit:[Oe,Ie,Le,ke]}),Re=Ne,De=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Me=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Wn(e){return e===null?!1:De.exec(e)!==null||Me.exec(e)!==null}function $n(e){var n,i,l,r,u,o,f,c=0,a=null,t,p,d;if(n=De.exec(e),n===null&&(n=Me.exec(e)),n===null)throw new Error("Date resolve error");if(i=+n[1],l=+n[2]-1,r=+n[3],!n[4])return new Date(Date.UTC(i,l,r));if(u=+n[4],o=+n[5],f=+n[6],n[7]){for(c=n[7].slice(0,3);c.length<3;)c+="0";c=+c}return n[9]&&(t=+n[10],p=+(n[11]||0),a=(t*60+p)*6e4,n[9]==="-"&&(a=-a)),d=new Date(Date.UTC(i,l,r,u,o,f,c)),a&&d.setTime(d.getTime()-a),d}function Qn(e){return e.toISOString()}var Ye=new C("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Wn,construct:$n,instanceOf:Date,represent:Qn});function Vn(e){return e==="<<"||e===null}var Be=new C("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Vn}),ne=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function Xn(e){if(e===null)return!1;var n,i,l=0,r=e.length,u=ne;for(i=0;i<r;i++)if(n=u.indexOf(e.charAt(i)),!(n>64)){if(n<0)return!1;l+=6}return l%8===0}function Zn(e){var n,i,l=e.replace(/[\r\n=]/g,""),r=l.length,u=ne,o=0,f=[];for(n=0;n<r;n++)n%4===0&&n&&(f.push(o>>16&255),f.push(o>>8&255),f.push(o&255)),o=o<<6|u.indexOf(l.charAt(n));return i=r%4*6,i===0?(f.push(o>>16&255),f.push(o>>8&255),f.push(o&255)):i===18?(f.push(o>>10&255),f.push(o>>2&255)):i===12&&f.push(o>>4&255),new Uint8Array(f)}function zn(e){var n="",i=0,l,r,u=e.length,o=ne;for(l=0;l<u;l++)l%3===0&&l&&(n+=o[i>>18&63],n+=o[i>>12&63],n+=o[i>>6&63],n+=o[i&63]),i=(i<<8)+e[l];return r=u%3,r===0?(n+=o[i>>18&63],n+=o[i>>12&63],n+=o[i>>6&63],n+=o[i&63]):r===2?(n+=o[i>>10&63],n+=o[i>>4&63],n+=o[i<<2&63],n+=o[64]):r===1&&(n+=o[i>>2&63],n+=o[i<<4&63],n+=o[64],n+=o[64]),n}function Jn(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var Pe=new C("tag:yaml.org,2002:binary",{kind:"scalar",resolve:Xn,construct:Zn,predicate:Jn,represent:zn}),ei=Object.prototype.hasOwnProperty,ni=Object.prototype.toString;function ii(e){if(e===null)return!0;var n=[],i,l,r,u,o,f=e;for(i=0,l=f.length;i<l;i+=1){if(r=f[i],o=!1,ni.call(r)!=="[object Object]")return!1;for(u in r)if(ei.call(r,u))if(!o)o=!0;else return!1;if(!o)return!1;if(n.indexOf(u)===-1)n.push(u);else return!1}return!0}function ri(e){return e!==null?e:[]}var He=new C("tag:yaml.org,2002:omap",{kind:"sequence",resolve:ii,construct:ri}),li=Object.prototype.toString;function oi(e){if(e===null)return!0;var n,i,l,r,u,o=e;for(u=new Array(o.length),n=0,i=o.length;n<i;n+=1){if(l=o[n],li.call(l)!=="[object Object]"||(r=Object.keys(l),r.length!==1))return!1;u[n]=[r[0],l[r[0]]]}return!0}function ui(e){if(e===null)return[];var n,i,l,r,u,o=e;for(u=new Array(o.length),n=0,i=o.length;n<i;n+=1)l=o[n],r=Object.keys(l),u[n]=[r[0],l[r[0]]];return u}var je=new C("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:oi,construct:ui}),fi=Object.prototype.hasOwnProperty;function ci(e){if(e===null)return!0;var n,i=e;for(n in i)if(fi.call(i,n)&&i[n]!==null)return!1;return!0}function ai(e){return e!==null?e:{}}var Ue=new C("tag:yaml.org,2002:set",{kind:"mapping",resolve:ci,construct:ai}),ie=Re.extend({implicit:[Ye,Be],explicit:[Pe,He,je,Ue]}),O=Object.prototype.hasOwnProperty,j=1,Ke=2,qe=3,U=4,V=1,pi=2,ce=3,ti=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,hi=/[\x85\u2028\u2029]/,di=/[,\[\]\{\}]/,Ge=/^(?:!|!!|![a-z\-]+!)$/i,We=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function ae(e){return Object.prototype.toString.call(e)}function F(e){return e===10||e===13}function I(e){return e===9||e===32}function E(e){return e===9||e===32||e===10||e===13}function N(e){return e===44||e===91||e===93||e===123||e===125}function si(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function mi(e){return e===120?2:e===117?4:e===85?8:0}function xi(e){return 48<=e&&e<=57?e-48:-1}function pe(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function gi(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}var $e=new Array(256),Qe=new Array(256);for(var L=0;L<256;L++)$e[L]=pe(L)?1:0,Qe[L]=pe(L);function Ai(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||ie,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Ve(e,n){var i={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return i.snippet=_n(i),new w(n,i)}function h(e,n){throw Ve(e,n)}function K(e,n){e.onWarning&&e.onWarning.call(null,Ve(e,n))}var te={YAML:function(n,i,l){var r,u,o;n.version!==null&&h(n,"duplication of %YAML directive"),l.length!==1&&h(n,"YAML directive accepts exactly one argument"),r=/^([0-9]+)\.([0-9]+)$/.exec(l[0]),r===null&&h(n,"ill-formed argument of the YAML directive"),u=parseInt(r[1],10),o=parseInt(r[2],10),u!==1&&h(n,"unacceptable YAML version of the document"),n.version=l[0],n.checkLineBreaks=o<2,o!==1&&o!==2&&K(n,"unsupported YAML version of the document")},TAG:function(n,i,l){var r,u;l.length!==2&&h(n,"TAG directive accepts exactly two arguments"),r=l[0],u=l[1],Ge.test(r)||h(n,"ill-formed tag handle (first argument) of the TAG directive"),O.call(n.tagMap,r)&&h(n,'there is a previously declared suffix for "'+r+'" tag handle'),We.test(u)||h(n,"ill-formed tag prefix (second argument) of the TAG directive");try{u=decodeURIComponent(u)}catch{h(n,"tag prefix is malformed: "+u)}n.tagMap[r]=u}};function T(e,n,i,l){var r,u,o,f;if(n<i){if(f=e.input.slice(n,i),l)for(r=0,u=f.length;r<u;r+=1)o=f.charCodeAt(r),o===9||32<=o&&o<=1114111||h(e,"expected valid JSON character");else ti.test(f)&&h(e,"the stream contains non-printable characters");e.result+=f}}function he(e,n,i,l){var r,u,o,f;for(y.isObject(i)||h(e,"cannot merge mappings; the provided source object is unacceptable"),r=Object.keys(i),o=0,f=r.length;o<f;o+=1)u=r[o],O.call(n,u)||(n[u]=i[u],l[u]=!0)}function R(e,n,i,l,r,u,o,f,c){var a,t;if(Array.isArray(r))for(r=Array.prototype.slice.call(r),a=0,t=r.length;a<t;a+=1)Array.isArray(r[a])&&h(e,"nested arrays are not supported inside keys"),typeof r=="object"&&ae(r[a])==="[object Object]"&&(r[a]="[object Object]");if(typeof r=="object"&&ae(r)==="[object Object]"&&(r="[object Object]"),r=String(r),n===null&&(n={}),l==="tag:yaml.org,2002:merge")if(Array.isArray(u))for(a=0,t=u.length;a<t;a+=1)he(e,n,u[a],i);else he(e,n,u,i);else!e.json&&!O.call(i,r)&&O.call(n,r)&&(e.line=o||e.line,e.lineStart=f||e.lineStart,e.position=c||e.position,h(e,"duplicated mapping key")),r==="__proto__"?Object.defineProperty(n,r,{configurable:!0,enumerable:!0,writable:!0,value:u}):n[r]=u,delete i[r];return n}function re(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):h(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function v(e,n,i){for(var l=0,r=e.input.charCodeAt(e.position);r!==0;){for(;I(r);)r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(n&&r===35)do r=e.input.charCodeAt(++e.position);while(r!==10&&r!==13&&r!==0);if(F(r))for(re(e),r=e.input.charCodeAt(e.position),l++,e.lineIndent=0;r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position);else break}return i!==-1&&l!==0&&e.lineIndent<i&&K(e,"deficient indentation"),l}function W(e){var n=e.position,i;return i=e.input.charCodeAt(n),!!((i===45||i===46)&&i===e.input.charCodeAt(n+1)&&i===e.input.charCodeAt(n+2)&&(n+=3,i=e.input.charCodeAt(n),i===0||E(i)))}function le(e,n){n===1?e.result+=" ":n>1&&(e.result+=y.repeat(`
`,n-1))}function vi(e,n,i){var l,r,u,o,f,c,a,t,p=e.kind,d=e.result,s;if(s=e.input.charCodeAt(e.position),E(s)||N(s)||s===35||s===38||s===42||s===33||s===124||s===62||s===39||s===34||s===37||s===64||s===96||(s===63||s===45)&&(r=e.input.charCodeAt(e.position+1),E(r)||i&&N(r)))return!1;for(e.kind="scalar",e.result="",u=o=e.position,f=!1;s!==0;){if(s===58){if(r=e.input.charCodeAt(e.position+1),E(r)||i&&N(r))break}else if(s===35){if(l=e.input.charCodeAt(e.position-1),E(l))break}else{if(e.position===e.lineStart&&W(e)||i&&N(s))break;if(F(s))if(c=e.line,a=e.lineStart,t=e.lineIndent,v(e,!1,-1),e.lineIndent>=n){f=!0,s=e.input.charCodeAt(e.position);continue}else{e.position=o,e.line=c,e.lineStart=a,e.lineIndent=t;break}}f&&(T(e,u,o,!1),le(e,e.line-c),u=o=e.position,f=!1),I(s)||(o=e.position+1),s=e.input.charCodeAt(++e.position)}return T(e,u,o,!1),e.result?!0:(e.kind=p,e.result=d,!1)}function yi(e,n){var i,l,r;if(i=e.input.charCodeAt(e.position),i!==39)return!1;for(e.kind="scalar",e.result="",e.position++,l=r=e.position;(i=e.input.charCodeAt(e.position))!==0;)if(i===39)if(T(e,l,e.position,!0),i=e.input.charCodeAt(++e.position),i===39)l=e.position,e.position++,r=e.position;else return!0;else F(i)?(T(e,l,r,!0),le(e,v(e,!1,n)),l=r=e.position):e.position===e.lineStart&&W(e)?h(e,"unexpected end of the document within a single quoted scalar"):(e.position++,r=e.position);h(e,"unexpected end of the stream within a single quoted scalar")}function Ci(e,n){var i,l,r,u,o,f;if(f=e.input.charCodeAt(e.position),f!==34)return!1;for(e.kind="scalar",e.result="",e.position++,i=l=e.position;(f=e.input.charCodeAt(e.position))!==0;){if(f===34)return T(e,i,e.position,!0),e.position++,!0;if(f===92){if(T(e,i,e.position,!0),f=e.input.charCodeAt(++e.position),F(f))v(e,!1,n);else if(f<256&&$e[f])e.result+=Qe[f],e.position++;else if((o=mi(f))>0){for(r=o,u=0;r>0;r--)f=e.input.charCodeAt(++e.position),(o=si(f))>=0?u=(u<<4)+o:h(e,"expected hexadecimal character");e.result+=gi(u),e.position++}else h(e,"unknown escape sequence");i=l=e.position}else F(f)?(T(e,i,l,!0),le(e,v(e,!1,n)),i=l=e.position):e.position===e.lineStart&&W(e)?h(e,"unexpected end of the document within a double quoted scalar"):(e.position++,l=e.position)}h(e,"unexpected end of the stream within a double quoted scalar")}function _i(e,n){var i=!0,l,r,u,o=e.tag,f,c=e.anchor,a,t,p,d,s,m=Object.create(null),g,A,S,x;if(x=e.input.charCodeAt(e.position),x===91)t=93,s=!1,f=[];else if(x===123)t=125,s=!0,f={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=f),x=e.input.charCodeAt(++e.position);x!==0;){if(v(e,!0,n),x=e.input.charCodeAt(e.position),x===t)return e.position++,e.tag=o,e.anchor=c,e.kind=s?"mapping":"sequence",e.result=f,!0;i?x===44&&h(e,"expected the node content, but found ','"):h(e,"missed comma between flow collection entries"),A=g=S=null,p=d=!1,x===63&&(a=e.input.charCodeAt(e.position+1),E(a)&&(p=d=!0,e.position++,v(e,!0,n))),l=e.line,r=e.lineStart,u=e.position,D(e,n,j,!1,!0),A=e.tag,g=e.result,v(e,!0,n),x=e.input.charCodeAt(e.position),(d||e.line===l)&&x===58&&(p=!0,x=e.input.charCodeAt(++e.position),v(e,!0,n),D(e,n,j,!1,!0),S=e.result),s?R(e,f,m,A,g,S,l,r,u):p?f.push(R(e,null,m,A,g,S,l,r,u)):f.push(g),v(e,!0,n),x=e.input.charCodeAt(e.position),x===44?(i=!0,x=e.input.charCodeAt(++e.position)):i=!1}h(e,"unexpected end of the stream within a flow collection")}function wi(e,n){var i,l,r=V,u=!1,o=!1,f=n,c=0,a=!1,t,p;if(p=e.input.charCodeAt(e.position),p===124)l=!1;else if(p===62)l=!0;else return!1;for(e.kind="scalar",e.result="";p!==0;)if(p=e.input.charCodeAt(++e.position),p===43||p===45)V===r?r=p===43?ce:pi:h(e,"repeat of a chomping mode identifier");else if((t=xi(p))>=0)t===0?h(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):o?h(e,"repeat of an indentation width identifier"):(f=n+t-1,o=!0);else break;if(I(p)){do p=e.input.charCodeAt(++e.position);while(I(p));if(p===35)do p=e.input.charCodeAt(++e.position);while(!F(p)&&p!==0)}for(;p!==0;){for(re(e),e.lineIndent=0,p=e.input.charCodeAt(e.position);(!o||e.lineIndent<f)&&p===32;)e.lineIndent++,p=e.input.charCodeAt(++e.position);if(!o&&e.lineIndent>f&&(f=e.lineIndent),F(p)){c++;continue}if(e.lineIndent<f){r===ce?e.result+=y.repeat(`
`,u?1+c:c):r===V&&u&&(e.result+=`
`);break}for(l?I(p)?(a=!0,e.result+=y.repeat(`
`,u?1+c:c)):a?(a=!1,e.result+=y.repeat(`
`,c+1)):c===0?u&&(e.result+=" "):e.result+=y.repeat(`
`,c):e.result+=y.repeat(`
`,u?1+c:c),u=!0,o=!0,c=0,i=e.position;!F(p)&&p!==0;)p=e.input.charCodeAt(++e.position);T(e,i,e.position,!1)}return!0}function de(e,n){var i,l=e.tag,r=e.anchor,u=[],o,f=!1,c;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=u),c=e.input.charCodeAt(e.position);c!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,h(e,"tab characters must not be used in indentation")),!(c!==45||(o=e.input.charCodeAt(e.position+1),!E(o))));){if(f=!0,e.position++,v(e,!0,-1)&&e.lineIndent<=n){u.push(null),c=e.input.charCodeAt(e.position);continue}if(i=e.line,D(e,n,qe,!1,!0),u.push(e.result),v(e,!0,-1),c=e.input.charCodeAt(e.position),(e.line===i||e.lineIndent>n)&&c!==0)h(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return f?(e.tag=l,e.anchor=r,e.kind="sequence",e.result=u,!0):!1}function Ei(e,n,i){var l,r,u,o,f,c,a=e.tag,t=e.anchor,p={},d=Object.create(null),s=null,m=null,g=null,A=!1,S=!1,x;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=p),x=e.input.charCodeAt(e.position);x!==0;){if(!A&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,h(e,"tab characters must not be used in indentation")),l=e.input.charCodeAt(e.position+1),u=e.line,(x===63||x===58)&&E(l))x===63?(A&&(R(e,p,d,s,m,null,o,f,c),s=m=g=null),S=!0,A=!0,r=!0):A?(A=!1,r=!0):h(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,x=l;else{if(o=e.line,f=e.lineStart,c=e.position,!D(e,i,Ke,!1,!0))break;if(e.line===u){for(x=e.input.charCodeAt(e.position);I(x);)x=e.input.charCodeAt(++e.position);if(x===58)x=e.input.charCodeAt(++e.position),E(x)||h(e,"a whitespace character is expected after the key-value separator within a block mapping"),A&&(R(e,p,d,s,m,null,o,f,c),s=m=g=null),S=!0,A=!1,r=!1,s=e.tag,m=e.result;else if(S)h(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=a,e.anchor=t,!0}else if(S)h(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=a,e.anchor=t,!0}if((e.line===u||e.lineIndent>n)&&(A&&(o=e.line,f=e.lineStart,c=e.position),D(e,n,U,!0,r)&&(A?m=e.result:g=e.result),A||(R(e,p,d,s,m,g,o,f,c),s=m=g=null),v(e,!0,-1),x=e.input.charCodeAt(e.position)),(e.line===u||e.lineIndent>n)&&x!==0)h(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return A&&R(e,p,d,s,m,null,o,f,c),S&&(e.tag=a,e.anchor=t,e.kind="mapping",e.result=p),S}function Si(e){var n,i=!1,l=!1,r,u,o;if(o=e.input.charCodeAt(e.position),o!==33)return!1;if(e.tag!==null&&h(e,"duplication of a tag property"),o=e.input.charCodeAt(++e.position),o===60?(i=!0,o=e.input.charCodeAt(++e.position)):o===33?(l=!0,r="!!",o=e.input.charCodeAt(++e.position)):r="!",n=e.position,i){do o=e.input.charCodeAt(++e.position);while(o!==0&&o!==62);e.position<e.length?(u=e.input.slice(n,e.position),o=e.input.charCodeAt(++e.position)):h(e,"unexpected end of the stream within a verbatim tag")}else{for(;o!==0&&!E(o);)o===33&&(l?h(e,"tag suffix cannot contain exclamation marks"):(r=e.input.slice(n-1,e.position+1),Ge.test(r)||h(e,"named tag handle cannot contain such characters"),l=!0,n=e.position+1)),o=e.input.charCodeAt(++e.position);u=e.input.slice(n,e.position),di.test(u)&&h(e,"tag suffix cannot contain flow indicator characters")}u&&!We.test(u)&&h(e,"tag name cannot contain such characters: "+u);try{u=decodeURIComponent(u)}catch{h(e,"tag name is malformed: "+u)}return i?e.tag=u:O.call(e.tagMap,r)?e.tag=e.tagMap[r]+u:r==="!"?e.tag="!"+u:r==="!!"?e.tag="tag:yaml.org,2002:"+u:h(e,'undeclared tag handle "'+r+'"'),!0}function Fi(e){var n,i;if(i=e.input.charCodeAt(e.position),i!==38)return!1;for(e.anchor!==null&&h(e,"duplication of an anchor property"),i=e.input.charCodeAt(++e.position),n=e.position;i!==0&&!E(i)&&!N(i);)i=e.input.charCodeAt(++e.position);return e.position===n&&h(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function bi(e){var n,i,l;if(l=e.input.charCodeAt(e.position),l!==42)return!1;for(l=e.input.charCodeAt(++e.position),n=e.position;l!==0&&!E(l)&&!N(l);)l=e.input.charCodeAt(++e.position);return e.position===n&&h(e,"name of an alias node must contain at least one character"),i=e.input.slice(n,e.position),O.call(e.anchorMap,i)||h(e,'unidentified alias "'+i+'"'),e.result=e.anchorMap[i],v(e,!0,-1),!0}function D(e,n,i,l,r){var u,o,f,c=1,a=!1,t=!1,p,d,s,m,g,A;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,u=o=f=U===i||qe===i,l&&v(e,!0,-1)&&(a=!0,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)),c===1)for(;Si(e)||Fi(e);)v(e,!0,-1)?(a=!0,f=u,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)):f=!1;if(f&&(f=a||r),(c===1||U===i)&&(j===i||Ke===i?g=n:g=n+1,A=e.position-e.lineStart,c===1?f&&(de(e,A)||Ei(e,A,g))||_i(e,g)?t=!0:(o&&wi(e,g)||yi(e,g)||Ci(e,g)?t=!0:bi(e)?(t=!0,(e.tag!==null||e.anchor!==null)&&h(e,"alias node should not have any properties")):vi(e,g,j===i)&&(t=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):c===0&&(t=f&&de(e,A))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&h(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),p=0,d=e.implicitTypes.length;p<d;p+=1)if(m=e.implicitTypes[p],m.resolve(e.result)){e.result=m.construct(e.result),e.tag=m.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(O.call(e.typeMap[e.kind||"fallback"],e.tag))m=e.typeMap[e.kind||"fallback"][e.tag];else for(m=null,s=e.typeMap.multi[e.kind||"fallback"],p=0,d=s.length;p<d;p+=1)if(e.tag.slice(0,s[p].tag.length)===s[p].tag){m=s[p];break}m||h(e,"unknown tag !<"+e.tag+">"),e.result!==null&&m.kind!==e.kind&&h(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+m.kind+'", not "'+e.kind+'"'),m.resolve(e.result,e.tag)?(e.result=m.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):h(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||t}function Ti(e){var n=e.position,i,l,r,u=!1,o;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(o=e.input.charCodeAt(e.position))!==0&&(v(e,!0,-1),o=e.input.charCodeAt(e.position),!(e.lineIndent>0||o!==37));){for(u=!0,o=e.input.charCodeAt(++e.position),i=e.position;o!==0&&!E(o);)o=e.input.charCodeAt(++e.position);for(l=e.input.slice(i,e.position),r=[],l.length<1&&h(e,"directive name must not be less than one character in length");o!==0;){for(;I(o);)o=e.input.charCodeAt(++e.position);if(o===35){do o=e.input.charCodeAt(++e.position);while(o!==0&&!F(o));break}if(F(o))break;for(i=e.position;o!==0&&!E(o);)o=e.input.charCodeAt(++e.position);r.push(e.input.slice(i,e.position))}o!==0&&re(e),O.call(te,l)?te[l](e,l,r):K(e,'unknown document directive "'+l+'"')}if(v(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,v(e,!0,-1)):u&&h(e,"directives end mark is expected"),D(e,e.lineIndent-1,U,!1,!0),v(e,!0,-1),e.checkLineBreaks&&hi.test(e.input.slice(n,e.position))&&K(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&W(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,v(e,!0,-1));return}if(e.position<e.length-1)h(e,"end of the stream or a document separator is expected");else return}function Xe(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var i=new Ai(e,n),l=e.indexOf("\0");for(l!==-1&&(i.position=l,h(i,"null byte is not allowed in input")),i.input+="\0";i.input.charCodeAt(i.position)===32;)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Ti(i);return i.documents}function Oi(e,n,i){n!==null&&typeof n=="object"&&typeof i>"u"&&(i=n,n=null);var l=Xe(e,i);if(typeof n!="function")return l;for(var r=0,u=l.length;r<u;r+=1)n(l[r])}function Ii(e,n){var i=Xe(e,n);if(i.length!==0){if(i.length===1)return i[0];throw new w("expected a single document in the stream, but found more")}}var Li=Oi,ki=Ii,Ze={loadAll:Li,load:ki},ze=Object.prototype.toString,Je=Object.prototype.hasOwnProperty,oe=65279,Ni=9,B=10,Ri=13,Di=32,Mi=33,Yi=34,Z=35,Bi=37,Pi=38,Hi=39,ji=42,en=44,Ui=45,q=58,Ki=61,qi=62,Gi=63,Wi=64,nn=91,rn=93,$i=96,ln=123,Qi=124,on=125,_={};_[0]="\\0";_[7]="\\a";_[8]="\\b";_[9]="\\t";_[10]="\\n";_[11]="\\v";_[12]="\\f";_[13]="\\r";_[27]="\\e";_[34]='\\"';_[92]="\\\\";_[133]="\\N";_[160]="\\_";_[8232]="\\L";_[8233]="\\P";var Vi=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Xi=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Zi(e,n){var i,l,r,u,o,f,c;if(n===null)return{};for(i={},l=Object.keys(n),r=0,u=l.length;r<u;r+=1)o=l[r],f=String(n[o]),o.slice(0,2)==="!!"&&(o="tag:yaml.org,2002:"+o.slice(2)),c=e.compiledTypeMap.fallback[o],c&&Je.call(c.styleAliases,f)&&(f=c.styleAliases[f]),i[o]=f;return i}function zi(e){var n,i,l;if(n=e.toString(16).toUpperCase(),e<=255)i="x",l=2;else if(e<=65535)i="u",l=4;else if(e<=4294967295)i="U",l=8;else throw new w("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+i+y.repeat("0",l-n.length)+n}var Ji=1,P=2;function er(e){this.schema=e.schema||ie,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=y.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=Zi(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?P:Ji,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function se(e,n){for(var i=y.repeat(" ",n),l=0,r=-1,u="",o,f=e.length;l<f;)r=e.indexOf(`
`,l),r===-1?(o=e.slice(l),l=f):(o=e.slice(l,r+1),l=r+1),o.length&&o!==`
`&&(u+=i),u+=o;return u}function z(e,n){return`
`+y.repeat(" ",e.indent*n)}function nr(e,n){var i,l,r;for(i=0,l=e.implicitTypes.length;i<l;i+=1)if(r=e.implicitTypes[i],r.resolve(n))return!0;return!1}function G(e){return e===Di||e===Ni}function H(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==oe||65536<=e&&e<=1114111}function me(e){return H(e)&&e!==oe&&e!==Ri&&e!==B}function xe(e,n,i){var l=me(e),r=l&&!G(e);return(i?l:l&&e!==en&&e!==nn&&e!==rn&&e!==ln&&e!==on)&&e!==Z&&!(n===q&&!r)||me(n)&&!G(n)&&e===Z||n===q&&r}function ir(e){return H(e)&&e!==oe&&!G(e)&&e!==Ui&&e!==Gi&&e!==q&&e!==en&&e!==nn&&e!==rn&&e!==ln&&e!==on&&e!==Z&&e!==Pi&&e!==ji&&e!==Mi&&e!==Qi&&e!==Ki&&e!==qi&&e!==Hi&&e!==Yi&&e!==Bi&&e!==Wi&&e!==$i}function rr(e){return!G(e)&&e!==q}function M(e,n){var i=e.charCodeAt(n),l;return i>=55296&&i<=56319&&n+1<e.length&&(l=e.charCodeAt(n+1),l>=56320&&l<=57343)?(i-55296)*1024+l-56320+65536:i}function un(e){var n=/^\n* /;return n.test(e)}var fn=1,J=2,cn=3,an=4,k=5;function lr(e,n,i,l,r,u,o,f){var c,a=0,t=null,p=!1,d=!1,s=l!==-1,m=-1,g=ir(M(e,0))&&rr(M(e,e.length-1));if(n||o)for(c=0;c<e.length;a>=65536?c+=2:c++){if(a=M(e,c),!H(a))return k;g=g&&xe(a,t,f),t=a}else{for(c=0;c<e.length;a>=65536?c+=2:c++){if(a=M(e,c),a===B)p=!0,s&&(d=d||c-m-1>l&&e[m+1]!==" ",m=c);else if(!H(a))return k;g=g&&xe(a,t,f),t=a}d=d||s&&c-m-1>l&&e[m+1]!==" "}return!p&&!d?g&&!o&&!r(e)?fn:u===P?k:J:i>9&&un(e)?k:o?u===P?k:J:d?an:cn}function or(e,n,i,l,r){e.dump=function(){if(n.length===0)return e.quotingType===P?'""':"''";if(!e.noCompatMode&&(Vi.indexOf(n)!==-1||Xi.test(n)))return e.quotingType===P?'"'+n+'"':"'"+n+"'";var u=e.indent*Math.max(1,i),o=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-u),f=l||e.flowLevel>-1&&i>=e.flowLevel;function c(a){return nr(e,a)}switch(lr(n,f,e.indent,o,c,e.quotingType,e.forceQuotes&&!l,r)){case fn:return n;case J:return"'"+n.replace(/'/g,"''")+"'";case cn:return"|"+ge(n,e.indent)+Ae(se(n,u));case an:return">"+ge(n,e.indent)+Ae(se(ur(n,o),u));case k:return'"'+fr(n)+'"';default:throw new w("impossible error: invalid scalar style")}}()}function ge(e,n){var i=un(e)?String(n):"",l=e[e.length-1]===`
`,r=l&&(e[e.length-2]===`
`||e===`
`),u=r?"+":l?"":"-";return i+u+`
`}function Ae(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function ur(e,n){for(var i=/(\n+)([^\n]*)/g,l=function(){var a=e.indexOf(`
`);return a=a!==-1?a:e.length,i.lastIndex=a,ve(e.slice(0,a),n)}(),r=e[0]===`
`||e[0]===" ",u,o;o=i.exec(e);){var f=o[1],c=o[2];u=c[0]===" ",l+=f+(!r&&!u&&c!==""?`
`:"")+ve(c,n),r=u}return l}function ve(e,n){if(e===""||e[0]===" ")return e;for(var i=/ [^ ]/g,l,r=0,u,o=0,f=0,c="";l=i.exec(e);)f=l.index,f-r>n&&(u=o>r?o:f,c+=`
`+e.slice(r,u),r=u+1),o=f;return c+=`
`,e.length-r>n&&o>r?c+=e.slice(r,o)+`
`+e.slice(o+1):c+=e.slice(r),c.slice(1)}function fr(e){for(var n="",i=0,l,r=0;r<e.length;i>=65536?r+=2:r++)i=M(e,r),l=_[i],!l&&H(i)?(n+=e[r],i>=65536&&(n+=e[r+1])):n+=l||zi(i);return n}function cr(e,n,i){var l="",r=e.tag,u,o,f;for(u=0,o=i.length;u<o;u+=1)f=i[u],e.replacer&&(f=e.replacer.call(i,String(u),f)),(b(e,n,f,!1,!1)||typeof f>"u"&&b(e,n,null,!1,!1))&&(l!==""&&(l+=","+(e.condenseFlow?"":" ")),l+=e.dump);e.tag=r,e.dump="["+l+"]"}function ye(e,n,i,l){var r="",u=e.tag,o,f,c;for(o=0,f=i.length;o<f;o+=1)c=i[o],e.replacer&&(c=e.replacer.call(i,String(o),c)),(b(e,n+1,c,!0,!0,!1,!0)||typeof c>"u"&&b(e,n+1,null,!0,!0,!1,!0))&&((!l||r!=="")&&(r+=z(e,n)),e.dump&&B===e.dump.charCodeAt(0)?r+="-":r+="- ",r+=e.dump);e.tag=u,e.dump=r||"[]"}function ar(e,n,i){var l="",r=e.tag,u=Object.keys(i),o,f,c,a,t;for(o=0,f=u.length;o<f;o+=1)t="",l!==""&&(t+=", "),e.condenseFlow&&(t+='"'),c=u[o],a=i[c],e.replacer&&(a=e.replacer.call(i,c,a)),b(e,n,c,!1,!1)&&(e.dump.length>1024&&(t+="? "),t+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),b(e,n,a,!1,!1)&&(t+=e.dump,l+=t));e.tag=r,e.dump="{"+l+"}"}function pr(e,n,i,l){var r="",u=e.tag,o=Object.keys(i),f,c,a,t,p,d;if(e.sortKeys===!0)o.sort();else if(typeof e.sortKeys=="function")o.sort(e.sortKeys);else if(e.sortKeys)throw new w("sortKeys must be a boolean or a function");for(f=0,c=o.length;f<c;f+=1)d="",(!l||r!=="")&&(d+=z(e,n)),a=o[f],t=i[a],e.replacer&&(t=e.replacer.call(i,a,t)),b(e,n+1,a,!0,!0,!0)&&(p=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,p&&(e.dump&&B===e.dump.charCodeAt(0)?d+="?":d+="? "),d+=e.dump,p&&(d+=z(e,n)),b(e,n+1,t,!0,p)&&(e.dump&&B===e.dump.charCodeAt(0)?d+=":":d+=": ",d+=e.dump,r+=d));e.tag=u,e.dump=r||"{}"}function Ce(e,n,i){var l,r,u,o,f,c;for(r=i?e.explicitTypes:e.implicitTypes,u=0,o=r.length;u<o;u+=1)if(f=r[u],(f.instanceOf||f.predicate)&&(!f.instanceOf||typeof n=="object"&&n instanceof f.instanceOf)&&(!f.predicate||f.predicate(n))){if(i?f.multi&&f.representName?e.tag=f.representName(n):e.tag=f.tag:e.tag="?",f.represent){if(c=e.styleMap[f.tag]||f.defaultStyle,ze.call(f.represent)==="[object Function]")l=f.represent(n,c);else if(Je.call(f.represent,c))l=f.represent[c](n,c);else throw new w("!<"+f.tag+'> tag resolver accepts not "'+c+'" style');e.dump=l}return!0}return!1}function b(e,n,i,l,r,u,o){e.tag=null,e.dump=i,Ce(e,i,!1)||Ce(e,i,!0);var f=ze.call(e.dump),c=l,a;l&&(l=e.flowLevel<0||e.flowLevel>n);var t=f==="[object Object]"||f==="[object Array]",p,d;if(t&&(p=e.duplicates.indexOf(i),d=p!==-1),(e.tag!==null&&e.tag!=="?"||d||e.indent!==2&&n>0)&&(r=!1),d&&e.usedDuplicates[p])e.dump="*ref_"+p;else{if(t&&d&&!e.usedDuplicates[p]&&(e.usedDuplicates[p]=!0),f==="[object Object]")l&&Object.keys(e.dump).length!==0?(pr(e,n,e.dump,r),d&&(e.dump="&ref_"+p+e.dump)):(ar(e,n,e.dump),d&&(e.dump="&ref_"+p+" "+e.dump));else if(f==="[object Array]")l&&e.dump.length!==0?(e.noArrayIndent&&!o&&n>0?ye(e,n-1,e.dump,r):ye(e,n,e.dump,r),d&&(e.dump="&ref_"+p+e.dump)):(cr(e,n,e.dump),d&&(e.dump="&ref_"+p+" "+e.dump));else if(f==="[object String]")e.tag!=="?"&&or(e,e.dump,n,u,c);else{if(f==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new w("unacceptable kind of an object to dump "+f)}e.tag!==null&&e.tag!=="?"&&(a=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?a="!"+a:a.slice(0,18)==="tag:yaml.org,2002:"?a="!!"+a.slice(18):a="!<"+a+">",e.dump=a+" "+e.dump)}return!0}function tr(e,n){var i=[],l=[],r,u;for(ee(e,i,l),r=0,u=l.length;r<u;r+=1)n.duplicates.push(i[l[r]]);n.usedDuplicates=new Array(u)}function ee(e,n,i){var l,r,u;if(e!==null&&typeof e=="object")if(r=n.indexOf(e),r!==-1)i.indexOf(r)===-1&&i.push(r);else if(n.push(e),Array.isArray(e))for(r=0,u=e.length;r<u;r+=1)ee(e[r],n,i);else for(l=Object.keys(e),r=0,u=l.length;r<u;r+=1)ee(e[l[r]],n,i)}function hr(e,n){n=n||{};var i=new er(n);i.noRefs||tr(e,i);var l=e;return i.replacer&&(l=i.replacer.call({"":l},"",l)),b(i,0,l,!0,!0)?i.dump+`
`:""}var dr=hr,sr={dump:dr};function ue(e,n){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}var mr=C,xr=Ee,gr=Te,Ar=Ne,vr=Re,yr=ie,Cr=Ze.load,_r=Ze.loadAll,wr=sr.dump,Er=w,Sr={binary:Pe,float:ke,map:be,null:Oe,pairs:je,set:Ue,timestamp:Ye,bool:Ie,int:Le,merge:Be,omap:He,seq:Fe,str:Se},Fr=ue("safeLoad","load"),br=ue("safeLoadAll","loadAll"),Tr=ue("safeDump","dump"),Or={Type:mr,Schema:xr,FAILSAFE_SCHEMA:gr,JSON_SCHEMA:Ar,CORE_SCHEMA:vr,DEFAULT_SCHEMA:yr,load:Cr,loadAll:_r,dump:wr,YAMLException:Er,types:Sr,safeLoad:Fr,safeLoadAll:br,safeDump:Tr};export{Or as j};
