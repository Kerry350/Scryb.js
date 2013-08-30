 // Pibble. A content editing plugin. Transform elements in to content editable sections. 

(function(window, $) {
  /* Third party libraries:
     - reMarked.js for converting HTML in to Markdown
   */

  /*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2012, Tim Down
 Licensed under the MIT license.
 Version: 1.2.3
 Build date: 26 February 2012
*/
window.rangy=function(){function l(p,u){var w=typeof p[u];return w=="function"||!!(w=="object"&&p[u])||w=="unknown"}function K(p,u){return!!(typeof p[u]=="object"&&p[u])}function H(p,u){return typeof p[u]!="undefined"}function I(p){return function(u,w){for(var B=w.length;B--;)if(!p(u,w[B]))return false;return true}}function z(p){return p&&A(p,x)&&v(p,t)}function C(p){window.alert("Rangy not supported in your browser. Reason: "+p);c.initialized=true;c.supported=false}function N(){if(!c.initialized){var p,
u=false,w=false;if(l(document,"createRange")){p=document.createRange();if(A(p,n)&&v(p,i))u=true;p.detach()}if((p=K(document,"body")?document.body:document.getElementsByTagName("body")[0])&&l(p,"createTextRange")){p=p.createTextRange();if(z(p))w=true}!u&&!w&&C("Neither Range nor TextRange are implemented");c.initialized=true;c.features={implementsDomRange:u,implementsTextRange:w};u=k.concat(f);w=0;for(p=u.length;w<p;++w)try{u[w](c)}catch(B){K(window,"console")&&l(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
B)}}}function O(p){this.name=p;this.supported=this.initialized=false}var i=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],n=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
t=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],x=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint","getBoundingClientRect"],A=I(l),q=I(K),v=I(H),c={version:"1.2.3",initialized:false,supported:true,util:{isHostMethod:l,isHostObject:K,isHostProperty:H,areHostMethods:A,areHostObjects:q,areHostProperties:v,isTextRange:z},features:{},modules:{},config:{alertOnWarn:false,preferTextRange:false}};
c.fail=C;c.warn=function(p){p="Rangy warning: "+p;if(c.config.alertOnWarn)window.alert(p);else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(p)};if({}.hasOwnProperty)c.util.extend=function(p,u){for(var w in u)if(u.hasOwnProperty(w))p[w]=u[w]};else C("hasOwnProperty not supported");var f=[],k=[];c.init=N;c.addInitListener=function(p){c.initialized?p(c):f.push(p)};var r=[];c.addCreateMissingNativeApiListener=function(p){r.push(p)};c.createMissingNativeApi=
function(p){p=p||window;N();for(var u=0,w=r.length;u<w;++u)r[u](p)};O.prototype.fail=function(p){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+p);};O.prototype.warn=function(p){c.warn("Module "+this.name+": "+p)};O.prototype.createError=function(p){return Error("Error in Rangy "+this.name+" module: "+p)};c.createModule=function(p,u){var w=new O(p);c.modules[p]=w;k.push(function(B){u(B,w);w.initialized=true;w.supported=true})};c.requireModules=function(p){for(var u=
0,w=p.length,B,V;u<w;++u){V=p[u];B=c.modules[V];if(!B||!(B instanceof O))throw Error("Module '"+V+"' not found");if(!B.supported)throw Error("Module '"+V+"' not supported");}};var L=false;q=function(){if(!L){L=true;c.initialized||N()}};if(typeof window=="undefined")C("No window found");else if(typeof document=="undefined")C("No document found");else{l(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",q,false);if(l(window,"addEventListener"))window.addEventListener("load",
q,false);else l(window,"attachEvent")?window.attachEvent("onload",q):C("Window does not have required addEventListener or attachEvent method");return c}}();
rangy.createModule("DomUtil",function(l,K){function H(c){for(var f=0;c=c.previousSibling;)f++;return f}function I(c,f){var k=[],r;for(r=c;r;r=r.parentNode)k.push(r);for(r=f;r;r=r.parentNode)if(v(k,r))return r;return null}function z(c,f,k){for(k=k?c:c.parentNode;k;){c=k.parentNode;if(c===f)return k;k=c}return null}function C(c){c=c.nodeType;return c==3||c==4||c==8}function N(c,f){var k=f.nextSibling,r=f.parentNode;k?r.insertBefore(c,k):r.appendChild(c);return c}function O(c){if(c.nodeType==9)return c;
else if(typeof c.ownerDocument!="undefined")return c.ownerDocument;else if(typeof c.document!="undefined")return c.document;else if(c.parentNode)return O(c.parentNode);else throw Error("getDocument: no document found for node");}function i(c){if(!c)return"[No node]";return C(c)?'"'+c.data+'"':c.nodeType==1?"<"+c.nodeName+(c.id?' id="'+c.id+'"':"")+">["+c.childNodes.length+"]":c.nodeName}function n(c){this._next=this.root=c}function t(c,f){this.node=c;this.offset=f}function x(c){this.code=this[c];
this.codeName=c;this.message="DOMException: "+this.codeName}var A=l.util;A.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||K.fail("document missing a Node creation method");A.isHostMethod(document,"getElementsByTagName")||K.fail("document missing getElementsByTagName method");var q=document.createElement("div");A.areHostMethods(q,["insertBefore","appendChild","cloneNode"])||K.fail("Incomplete Element implementation");A.isHostProperty(q,"innerHTML")||K.fail("Element is missing innerHTML property");
q=document.createTextNode("test");A.areHostMethods(q,["splitText","deleteData","insertData","appendData","cloneNode"])||K.fail("Incomplete Text Node implementation");var v=function(c,f){for(var k=c.length;k--;)if(c[k]===f)return true;return false};n.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var c=this._current=this._next,f;if(this._current)if(f=c.firstChild)this._next=f;else{for(f=null;c!==this.root&&!(f=c.nextSibling);)c=c.parentNode;this._next=f}return this._current},
detach:function(){this._current=this._next=this.root=null}};t.prototype={equals:function(c){return this.node===c.node&this.offset==c.offset},inspect:function(){return"[DomPosition("+i(this.node)+":"+this.offset+")]"}};x.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};x.prototype.toString=function(){return this.message};l.dom={arrayContains:v,isHtmlNamespace:function(c){var f;return typeof c.namespaceURI==
"undefined"||(f=c.namespaceURI)===null||f=="http://www.w3.org/1999/xhtml"},parentElement:function(c){c=c.parentNode;return c.nodeType==1?c:null},getNodeIndex:H,getNodeLength:function(c){var f;return C(c)?c.length:(f=c.childNodes)?f.length:0},getCommonAncestor:I,isAncestorOf:function(c,f,k){for(f=k?f:f.parentNode;f;)if(f===c)return true;else f=f.parentNode;return false},getClosestAncestorIn:z,isCharacterDataNode:C,insertAfter:N,splitDataNode:function(c,f){var k=c.cloneNode(false);k.deleteData(0,f);
c.deleteData(f,c.length-f);N(k,c);return k},getDocument:O,getWindow:function(c){c=O(c);if(typeof c.defaultView!="undefined")return c.defaultView;else if(typeof c.parentWindow!="undefined")return c.parentWindow;else throw Error("Cannot get a window object for node");},getIframeWindow:function(c){if(typeof c.contentWindow!="undefined")return c.contentWindow;else if(typeof c.contentDocument!="undefined")return c.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");
},getIframeDocument:function(c){if(typeof c.contentDocument!="undefined")return c.contentDocument;else if(typeof c.contentWindow!="undefined")return c.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(c){return A.isHostObject(c,"body")?c.body:c.getElementsByTagName("body")[0]},getRootContainer:function(c){for(var f;f=c.parentNode;)c=f;return c},comparePoints:function(c,f,k,r){var L;if(c==k)return f===r?0:f<r?-1:1;else if(L=z(k,
c,true))return f<=H(L)?-1:1;else if(L=z(c,k,true))return H(L)<r?-1:1;else{f=I(c,k);c=c===f?f:z(c,f,true);k=k===f?f:z(k,f,true);if(c===k)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===c)return-1;else if(f===k)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:i,fragmentFromNodeChildren:function(c){for(var f=O(c).createDocumentFragment(),k;k=c.firstChild;)f.appendChild(k);return f},createIterator:function(c){return new n(c)},
DomPosition:t};l.DOMException=x});
rangy.createModule("DomRange",function(l){function K(a,e){return a.nodeType!=3&&(g.isAncestorOf(a,e.startContainer,true)||g.isAncestorOf(a,e.endContainer,true))}function H(a){return g.getDocument(a.startContainer)}function I(a,e,j){if(e=a._listeners[e])for(var o=0,E=e.length;o<E;++o)e[o].call(a,{target:a,args:j})}function z(a){return new Z(a.parentNode,g.getNodeIndex(a))}function C(a){return new Z(a.parentNode,g.getNodeIndex(a)+1)}function N(a,e,j){var o=a.nodeType==11?a.firstChild:a;if(g.isCharacterDataNode(e))j==
e.length?g.insertAfter(a,e):e.parentNode.insertBefore(a,j==0?e:g.splitDataNode(e,j));else j>=e.childNodes.length?e.appendChild(a):e.insertBefore(a,e.childNodes[j]);return o}function O(a){for(var e,j,o=H(a.range).createDocumentFragment();j=a.next();){e=a.isPartiallySelectedSubtree();j=j.cloneNode(!e);if(e){e=a.getSubtreeIterator();j.appendChild(O(e));e.detach(true)}if(j.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");o.appendChild(j)}return o}function i(a,e,j){var o,E;for(j=j||{stop:false};o=a.next();)if(a.isPartiallySelectedSubtree())if(e(o)===
false){j.stop=true;return}else{o=a.getSubtreeIterator();i(o,e,j);o.detach(true);if(j.stop)return}else for(o=g.createIterator(o);E=o.next();)if(e(E)===false){j.stop=true;return}}function n(a){for(var e;a.next();)if(a.isPartiallySelectedSubtree()){e=a.getSubtreeIterator();n(e);e.detach(true)}else a.remove()}function t(a){for(var e,j=H(a.range).createDocumentFragment(),o;e=a.next();){if(a.isPartiallySelectedSubtree()){e=e.cloneNode(false);o=a.getSubtreeIterator();e.appendChild(t(o));o.detach(true)}else a.remove();
if(e.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");j.appendChild(e)}return j}function x(a,e,j){var o=!!(e&&e.length),E,T=!!j;if(o)E=RegExp("^("+e.join("|")+")$");var m=[];i(new q(a,false),function(s){if((!o||E.test(s.nodeType))&&(!T||j(s)))m.push(s)});return m}function A(a){return"["+(typeof a.getName=="undefined"?"Range":a.getName())+"("+g.inspectNode(a.startContainer)+":"+a.startOffset+", "+g.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function q(a,e){this.range=a;this.clonePartiallySelectedTextNodes=
e;if(!a.collapsed){this.sc=a.startContainer;this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var j=a.commonAncestorContainer;if(this.sc===this.ec&&g.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===j&&!g.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:g.getClosestAncestorIn(this.sc,j,true);this._last=this.ec===j&&!g.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:g.getClosestAncestorIn(this.ec,
j,true)}}}function v(a){this.code=this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function c(a,e,j){this.nodes=x(a,e,j);this._next=this.nodes[0];this._position=0}function f(a){return function(e,j){for(var o,E=j?e:e.parentNode;E;){o=E.nodeType;if(g.arrayContains(a,o))return E;E=E.parentNode}return null}}function k(a,e){if(G(a,e))throw new v("INVALID_NODE_TYPE_ERR");}function r(a){if(!a.startContainer)throw new S("INVALID_STATE_ERR");}function L(a,e){if(!g.arrayContains(e,a.nodeType))throw new v("INVALID_NODE_TYPE_ERR");
}function p(a,e){if(e<0||e>(g.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new S("INDEX_SIZE_ERR");}function u(a,e){if(h(a,true)!==h(e,true))throw new S("WRONG_DOCUMENT_ERR");}function w(a){if(D(a,true))throw new S("NO_MODIFICATION_ALLOWED_ERR");}function B(a,e){if(!a)throw new S(e);}function V(a){return!!a.startContainer&&!!a.endContainer&&!(!g.arrayContains(ba,a.startContainer.nodeType)&&!h(a.startContainer,true))&&!(!g.arrayContains(ba,a.endContainer.nodeType)&&!h(a.endContainer,
true))&&a.startOffset<=(g.isCharacterDataNode(a.startContainer)?a.startContainer.length:a.startContainer.childNodes.length)&&a.endOffset<=(g.isCharacterDataNode(a.endContainer)?a.endContainer.length:a.endContainer.childNodes.length)}function J(a){r(a);if(!V(a))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")");}function ca(){}function Y(a){a.START_TO_START=ia;a.START_TO_END=la;a.END_TO_END=ra;a.END_TO_START=ma;a.NODE_BEFORE=na;a.NODE_AFTER=oa;a.NODE_BEFORE_AND_AFTER=
pa;a.NODE_INSIDE=ja}function W(a){Y(a);Y(a.prototype)}function da(a,e){return function(){J(this);var j=this.startContainer,o=this.startOffset,E=this.commonAncestorContainer,T=new q(this,true);if(j!==E){j=g.getClosestAncestorIn(j,E,true);o=C(j);j=o.node;o=o.offset}i(T,w);T.reset();E=a(T);T.detach();e(this,j,o,j,o);return E}}function fa(a,e,j){function o(m,s){return function(y){r(this);L(y,$);L(d(y),ba);y=(m?z:C)(y);(s?E:T)(this,y.node,y.offset)}}function E(m,s,y){var F=m.endContainer,Q=m.endOffset;
if(s!==m.startContainer||y!==m.startOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==1){F=s;Q=y}e(m,s,y,F,Q)}}function T(m,s,y){var F=m.startContainer,Q=m.startOffset;if(s!==m.endContainer||y!==m.endOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==-1){F=s;Q=y}e(m,F,Q,s,y)}}a.prototype=new ca;l.util.extend(a.prototype,{setStart:function(m,s){r(this);k(m,true);p(m,s);E(this,m,s)},setEnd:function(m,s){r(this);k(m,true);p(m,s);T(this,m,s)},setStartBefore:o(true,true),setStartAfter:o(false,true),setEndBefore:o(true,
false),setEndAfter:o(false,false),collapse:function(m){J(this);m?e(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):e(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(m){r(this);k(m,true);e(this,m,0,m,g.getNodeLength(m))},selectNode:function(m){r(this);k(m,false);L(m,$);var s=z(m);m=C(m);e(this,s.node,s.offset,m.node,m.offset)},extractContents:da(t,e),deleteContents:da(n,e),canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var m=new q(this,true),s=m._first&&K(m._first,this)||m._last&&K(m._last,this);m.detach();return!s},detach:function(){j(this)},splitBoundaries:function(){J(this);var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=m===y;g.isCharacterDataNode(y)&&F>0&&F<y.length&&g.splitDataNode(y,F);if(g.isCharacterDataNode(m)&&s>0&&s<m.length){m=g.splitDataNode(m,s);if(Q){F-=s;y=m}else y==m.parentNode&&F>=g.getNodeIndex(m)&&F++;s=0}e(this,m,s,y,F)},normalizeBoundaries:function(){J(this);
var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=function(U){var R=U.nextSibling;if(R&&R.nodeType==U.nodeType){y=U;F=U.length;U.appendData(R.data);R.parentNode.removeChild(R)}},qa=function(U){var R=U.previousSibling;if(R&&R.nodeType==U.nodeType){m=U;var sa=U.length;s=R.length;U.insertData(0,R.data);R.parentNode.removeChild(R);if(m==y){F+=s;y=m}else if(y==U.parentNode){R=g.getNodeIndex(U);if(F==R){y=U;F=sa}else F>R&&F--}}},ga=true;if(g.isCharacterDataNode(y))y.length==
F&&Q(y);else{if(F>0)(ga=y.childNodes[F-1])&&g.isCharacterDataNode(ga)&&Q(ga);ga=!this.collapsed}if(ga)if(g.isCharacterDataNode(m))s==0&&qa(m);else{if(s<m.childNodes.length)(Q=m.childNodes[s])&&g.isCharacterDataNode(Q)&&qa(Q)}else{m=y;s=F}e(this,m,s,y,F)},collapseToPoint:function(m,s){r(this);k(m,true);p(m,s);if(m!==this.startContainer||s!==this.startOffset||m!==this.endContainer||s!==this.endOffset)e(this,m,s,m,s)}});W(a)}function ea(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===
a.endOffset;a.commonAncestorContainer=a.collapsed?a.startContainer:g.getCommonAncestor(a.startContainer,a.endContainer)}function ha(a,e,j,o,E){var T=a.startContainer!==e||a.startOffset!==j,m=a.endContainer!==o||a.endOffset!==E;a.startContainer=e;a.startOffset=j;a.endContainer=o;a.endOffset=E;ea(a);I(a,"boundarychange",{startMoved:T,endMoved:m})}function M(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};ea(this)}l.requireModules(["DomUtil"]);
var g=l.dom,Z=g.DomPosition,S=l.DOMException;q.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;if(a){this._next=a!==this._last?a.nextSibling:null;if(g.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes){if(a===this.ec)(a=a.cloneNode(true)).deleteData(this.eo,a.length-this.eo);if(this._current===this.sc)(a=
a.cloneNode(true)).deleteData(0,this.so)}}return a},remove:function(){var a=this._current,e,j;if(g.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)){e=a===this.sc?this.so:0;j=a===this.ec?this.eo:a.length;e!=j&&a.deleteData(e,j-e)}else a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return K(this._current,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode){a=this.range.cloneRange();a.collapse()}else{a=new M(H(this.range));var e=this._current,
j=e,o=0,E=e,T=g.getNodeLength(e);if(g.isAncestorOf(e,this.sc,true)){j=this.sc;o=this.so}if(g.isAncestorOf(e,this.ec,true)){E=this.ec;T=this.eo}ha(a,j,o,E,T)}return new q(a,this.clonePartiallySelectedTextNodes)},detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};v.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};v.prototype.toString=function(){return this.message};c.prototype={_current:null,hasNext:function(){return!!this._next},
next:function(){this._current=this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var $=[1,3,4,5,7,8,10],ba=[2,9,11],aa=[1,3,4,5,7,8,10,11],b=[1,3,4,5,7,8],d=g.getRootContainer,h=f([9,11]),D=f([5,6,10,12]),G=f([6,10,12]),P=document.createElement("style"),X=false;try{P.innerHTML="<b>x</b>";X=P.firstChild.nodeType==3}catch(ta){}l.features.htmlParsingConforms=X;var ka=["startContainer","startOffset","endContainer","endOffset",
"collapsed","commonAncestorContainer"],ia=0,la=1,ra=2,ma=3,na=0,oa=1,pa=2,ja=3;ca.prototype={attachListener:function(a,e){this._listeners[a].push(e)},compareBoundaryPoints:function(a,e){J(this);u(this.startContainer,e.startContainer);var j=a==ma||a==ia?"start":"end",o=a==la||a==ia?"start":"end";return g.comparePoints(this[j+"Container"],this[j+"Offset"],e[o+"Container"],e[o+"Offset"])},insertNode:function(a){J(this);L(a,aa);w(this.startContainer);if(g.isAncestorOf(a,this.startContainer,true))throw new S("HIERARCHY_REQUEST_ERR");
this.setStartBefore(N(a,this.startContainer,this.startOffset))},cloneContents:function(){J(this);var a,e;if(this.collapsed)return H(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&g.isCharacterDataNode(this.startContainer)){a=this.startContainer.cloneNode(true);a.data=a.data.slice(this.startOffset,this.endOffset);e=H(this).createDocumentFragment();e.appendChild(a);return e}else{e=new q(this,true);a=O(e);e.detach()}return a}},canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var a=new q(this,true),e=a._first&&K(a._first,this)||a._last&&K(a._last,this);a.detach();return!e},surroundContents:function(a){L(a,b);if(!this.canSurroundContents())throw new v("BAD_BOUNDARYPOINTS_ERR");var e=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);N(a,this.startContainer,this.startOffset);a.appendChild(e);this.selectNode(a)},cloneRange:function(){J(this);for(var a=new M(H(this)),e=ka.length,j;e--;){j=ka[e];a[j]=this[j]}return a},
toString:function(){J(this);var a=this.startContainer;if(a===this.endContainer&&g.isCharacterDataNode(a))return a.nodeType==3||a.nodeType==4?a.data.slice(this.startOffset,this.endOffset):"";else{var e=[];a=new q(this,true);i(a,function(j){if(j.nodeType==3||j.nodeType==4)e.push(j.data)});a.detach();return e.join("")}},compareNode:function(a){J(this);var e=a.parentNode,j=g.getNodeIndex(a);if(!e)throw new S("NOT_FOUND_ERR");a=this.comparePoint(e,j);e=this.comparePoint(e,j+1);return a<0?e>0?pa:na:e>0?
oa:ja},comparePoint:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);if(g.comparePoints(a,e,this.startContainer,this.startOffset)<0)return-1;else if(g.comparePoints(a,e,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:X?function(a){var e=this.startContainer,j=g.getDocument(e);if(!e)throw new S("INVALID_STATE_ERR");var o=null;if(e.nodeType==1)o=e;else if(g.isCharacterDataNode(e))o=g.parentElement(e);o=o===null||o.nodeName=="HTML"&&g.isHtmlNamespace(g.getDocument(o).documentElement)&&
g.isHtmlNamespace(o)?j.createElement("body"):o.cloneNode(false);o.innerHTML=a;return g.fragmentFromNodeChildren(o)}:function(a){r(this);var e=H(this).createElement("body");e.innerHTML=a;return g.fragmentFromNodeChildren(e)},toHtml:function(){J(this);var a=H(this).createElement("div");a.appendChild(this.cloneContents());return a.innerHTML},intersectsNode:function(a,e){J(this);B(a,"NOT_FOUND_ERR");if(g.getDocument(a)!==H(this))return false;var j=a.parentNode,o=g.getNodeIndex(a);B(j,"NOT_FOUND_ERR");
var E=g.comparePoints(j,o,this.endContainer,this.endOffset);j=g.comparePoints(j,o+1,this.startContainer,this.startOffset);return e?E<=0&&j>=0:E<0&&j>0},isPointInRange:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);return g.comparePoints(a,e,this.startContainer,this.startOffset)>=0&&g.comparePoints(a,e,this.endContainer,this.endOffset)<=0},intersectsRange:function(a,e){J(this);if(H(a)!=H(this))throw new S("WRONG_DOCUMENT_ERR");var j=g.comparePoints(this.startContainer,
this.startOffset,a.endContainer,a.endOffset),o=g.comparePoints(this.endContainer,this.endOffset,a.startContainer,a.startOffset);return e?j<=0&&o>=0:j<0&&o>0},intersection:function(a){if(this.intersectsRange(a)){var e=g.comparePoints(this.startContainer,this.startOffset,a.startContainer,a.startOffset),j=g.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),o=this.cloneRange();e==-1&&o.setStart(a.startContainer,a.startOffset);j==1&&o.setEnd(a.endContainer,a.endOffset);return o}return null},
union:function(a){if(this.intersectsRange(a,true)){var e=this.cloneRange();g.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)==-1&&e.setStart(a.startContainer,a.startOffset);g.comparePoints(a.endContainer,a.endOffset,this.endContainer,this.endOffset)==1&&e.setEnd(a.endContainer,a.endOffset);return e}else throw new v("Ranges do not intersect");},containsNode:function(a,e){return e?this.intersectsNode(a,false):this.compareNode(a)==ja},containsNodeContents:function(a){return this.comparePoint(a,
0)>=0&&this.comparePoint(a,g.getNodeLength(a))<=0},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var e=this.cloneRange();e.selectNode(a);var j=e.getNodes([3]);if(j.length>0){e.setStart(j[0],0);a=j.pop();e.setEnd(a,a.length);a=this.containsRange(e);e.detach();return a}else return this.containsNodeContents(a)},createNodeIterator:function(a,e){J(this);return new c(this,a,e)},getNodes:function(a,e){J(this);return x(this,a,e)},getDocument:function(){return H(this)},
collapseBefore:function(a){r(this);this.setEndBefore(a);this.collapse(false)},collapseAfter:function(a){r(this);this.setStartAfter(a);this.collapse(true)},getName:function(){return"DomRange"},equals:function(a){return M.rangesEqual(this,a)},isValid:function(){return V(this)},inspect:function(){return A(this)}};fa(M,ha,function(a){r(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;I(a,"detach",null);a._listeners=null});l.rangePrototype=ca.prototype;
M.rangeProperties=ka;M.RangeIterator=q;M.copyComparisonConstants=W;M.createPrototypeRange=fa;M.inspect=A;M.getRangeDocument=H;M.rangesEqual=function(a,e){return a.startContainer===e.startContainer&&a.startOffset===e.startOffset&&a.endContainer===e.endContainer&&a.endOffset===e.endOffset};l.DomRange=M;l.RangeException=v});
rangy.createModule("WrappedRange",function(l){function K(i,n,t,x){var A=i.duplicate();A.collapse(t);var q=A.parentElement();z.isAncestorOf(n,q,true)||(q=n);if(!q.canHaveHTML)return new C(q.parentNode,z.getNodeIndex(q));n=z.getDocument(q).createElement("span");var v,c=t?"StartToStart":"StartToEnd";do{q.insertBefore(n,n.previousSibling);A.moveToElementText(n)}while((v=A.compareEndPoints(c,i))>0&&n.previousSibling);c=n.nextSibling;if(v==-1&&c&&z.isCharacterDataNode(c)){A.setEndPoint(t?"EndToStart":"EndToEnd",
i);if(/[\r\n]/.test(c.data)){q=A.duplicate();t=q.text.replace(/\r\n/g,"\r").length;for(t=q.moveStart("character",t);q.compareEndPoints("StartToEnd",q)==-1;){t++;q.moveStart("character",1)}}else t=A.text.length;q=new C(c,t)}else{c=(x||!t)&&n.previousSibling;q=(t=(x||t)&&n.nextSibling)&&z.isCharacterDataNode(t)?new C(t,0):c&&z.isCharacterDataNode(c)?new C(c,c.length):new C(q,z.getNodeIndex(n))}n.parentNode.removeChild(n);return q}function H(i,n){var t,x,A=i.offset,q=z.getDocument(i.node),v=q.body.createTextRange(),
c=z.isCharacterDataNode(i.node);if(c){t=i.node;x=t.parentNode}else{t=i.node.childNodes;t=A<t.length?t[A]:null;x=i.node}q=q.createElement("span");q.innerHTML="&#feff;";t?x.insertBefore(q,t):x.appendChild(q);v.moveToElementText(q);v.collapse(!n);x.removeChild(q);if(c)v[n?"moveStart":"moveEnd"]("character",A);return v}l.requireModules(["DomUtil","DomRange"]);var I,z=l.dom,C=z.DomPosition,N=l.DomRange;if(l.features.implementsDomRange&&(!l.features.implementsTextRange||!l.config.preferTextRange)){(function(){function i(f){for(var k=
t.length,r;k--;){r=t[k];f[r]=f.nativeRange[r]}}var n,t=N.rangeProperties,x,A;I=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;i(this)};N.createPrototypeRange(I,function(f,k,r,L,p){var u=f.endContainer!==L||f.endOffset!=p;if(f.startContainer!==k||f.startOffset!=r||u){f.setEnd(L,p);f.setStart(k,r)}},function(f){f.nativeRange.detach();f.detached=true;for(var k=t.length,r;k--;){r=t[k];f[r]=null}});n=I.prototype;n.selectNode=function(f){this.nativeRange.selectNode(f);i(this)};
n.deleteContents=function(){this.nativeRange.deleteContents();i(this)};n.extractContents=function(){var f=this.nativeRange.extractContents();i(this);return f};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(f){this.nativeRange.surroundContents(f);i(this)};n.collapse=function(f){this.nativeRange.collapse(f);i(this)};n.cloneRange=function(){return new I(this.nativeRange.cloneRange())};n.refresh=function(){i(this)};n.toString=function(){return this.nativeRange.toString()};
var q=document.createTextNode("test");z.getBody(document).appendChild(q);var v=document.createRange();v.setStart(q,0);v.setEnd(q,0);try{v.setStart(q,1);x=true;n.setStart=function(f,k){this.nativeRange.setStart(f,k);i(this)};n.setEnd=function(f,k){this.nativeRange.setEnd(f,k);i(this)};A=function(f){return function(k){this.nativeRange[f](k);i(this)}}}catch(c){x=false;n.setStart=function(f,k){try{this.nativeRange.setStart(f,k)}catch(r){this.nativeRange.setEnd(f,k);this.nativeRange.setStart(f,k)}i(this)};
n.setEnd=function(f,k){try{this.nativeRange.setEnd(f,k)}catch(r){this.nativeRange.setStart(f,k);this.nativeRange.setEnd(f,k)}i(this)};A=function(f,k){return function(r){try{this.nativeRange[f](r)}catch(L){this.nativeRange[k](r);this.nativeRange[f](r)}i(this)}}}n.setStartBefore=A("setStartBefore","setEndBefore");n.setStartAfter=A("setStartAfter","setEndAfter");n.setEndBefore=A("setEndBefore","setStartBefore");n.setEndAfter=A("setEndAfter","setStartAfter");v.selectNodeContents(q);n.selectNodeContents=
v.startContainer==q&&v.endContainer==q&&v.startOffset==0&&v.endOffset==q.length?function(f){this.nativeRange.selectNodeContents(f);i(this)}:function(f){this.setStart(f,0);this.setEnd(f,N.getEndOffset(f))};v.selectNodeContents(q);v.setEnd(q,3);x=document.createRange();x.selectNodeContents(q);x.setEnd(q,4);x.setStart(q,2);n.compareBoundaryPoints=v.compareBoundaryPoints(v.START_TO_END,x)==-1&v.compareBoundaryPoints(v.END_TO_START,x)==1?function(f,k){k=k.nativeRange||k;if(f==k.START_TO_END)f=k.END_TO_START;
else if(f==k.END_TO_START)f=k.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,k)}:function(f,k){return this.nativeRange.compareBoundaryPoints(f,k.nativeRange||k)};if(l.util.isHostMethod(v,"createContextualFragment"))n.createContextualFragment=function(f){return this.nativeRange.createContextualFragment(f)};z.getBody(document).removeChild(q);v.detach();x.detach()})();l.createNativeRange=function(i){i=i||document;return i.createRange()}}else if(l.features.implementsTextRange){I=function(i){this.textRange=
i;this.refresh()};I.prototype=new N(document);I.prototype.refresh=function(){var i,n,t=this.textRange;i=t.parentElement();var x=t.duplicate();x.collapse(true);n=x.parentElement();x=t.duplicate();x.collapse(false);t=x.parentElement();n=n==t?n:z.getCommonAncestor(n,t);n=n==i?n:z.getCommonAncestor(i,n);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==0)n=i=K(this.textRange,n,true,true);else{i=K(this.textRange,n,true,false);n=K(this.textRange,n,false,false)}this.setStart(i.node,i.offset);
this.setEnd(n.node,n.offset)};N.copyComparisonConstants(I);var O=function(){return this}();if(typeof O.Range=="undefined")O.Range=I;l.createNativeRange=function(i){i=i||document;return i.body.createTextRange()}}if(l.features.implementsTextRange)I.rangeToTextRange=function(i){if(i.collapsed)return H(new C(i.startContainer,i.startOffset),true);else{var n=H(new C(i.startContainer,i.startOffset),true),t=H(new C(i.endContainer,i.endOffset),false);i=z.getDocument(i.startContainer).body.createTextRange();
i.setEndPoint("StartToStart",n);i.setEndPoint("EndToEnd",t);return i}};I.prototype.getName=function(){return"WrappedRange"};l.WrappedRange=I;l.createRange=function(i){i=i||document;return new I(l.createNativeRange(i))};l.createRangyRange=function(i){i=i||document;return new N(i)};l.createIframeRange=function(i){return l.createRange(z.getIframeDocument(i))};l.createIframeRangyRange=function(i){return l.createRangyRange(z.getIframeDocument(i))};l.addCreateMissingNativeApiListener(function(i){i=i.document;
if(typeof i.createRange=="undefined")i.createRange=function(){return l.createRange(this)};i=i=null})});
rangy.createModule("WrappedSelection",function(l,K){function H(b){return(b||window).getSelection()}function I(b){return(b||window).document.selection}function z(b,d,h){var D=h?"end":"start";h=h?"start":"end";b.anchorNode=d[D+"Container"];b.anchorOffset=d[D+"Offset"];b.focusNode=d[h+"Container"];b.focusOffset=d[h+"Offset"]}function C(b){b.anchorNode=b.focusNode=null;b.anchorOffset=b.focusOffset=0;b.rangeCount=0;b.isCollapsed=true;b._ranges.length=0}function N(b){var d;if(b instanceof k){d=b._selectionNativeRange;
if(!d){d=l.createNativeRange(c.getDocument(b.startContainer));d.setEnd(b.endContainer,b.endOffset);d.setStart(b.startContainer,b.startOffset);b._selectionNativeRange=d;b.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(b instanceof r)d=b.nativeRange;else if(l.features.implementsDomRange&&b instanceof c.getWindow(b.startContainer).Range)d=b;return d}function O(b){var d=b.getNodes(),h;a:if(!d.length||d[0].nodeType!=1)h=false;else{h=1;for(var D=d.length;h<D;++h)if(!c.isAncestorOf(d[0],
d[h])){h=false;break a}h=true}if(!h)throw Error("getSingleElementFromRange: range "+b.inspect()+" did not consist of a single element");return d[0]}function i(b,d){var h=new r(d);b._ranges=[h];z(b,h,false);b.rangeCount=1;b.isCollapsed=h.collapsed}function n(b){b._ranges.length=0;if(b.docSelection.type=="None")C(b);else{var d=b.docSelection.createRange();if(d&&typeof d.text!="undefined")i(b,d);else{b.rangeCount=d.length;for(var h,D=c.getDocument(d.item(0)),G=0;G<b.rangeCount;++G){h=l.createRange(D);
h.selectNode(d.item(G));b._ranges.push(h)}b.isCollapsed=b.rangeCount==1&&b._ranges[0].collapsed;z(b,b._ranges[b.rangeCount-1],false)}}}function t(b,d){var h=b.docSelection.createRange(),D=O(d),G=c.getDocument(h.item(0));G=c.getBody(G).createControlRange();for(var P=0,X=h.length;P<X;++P)G.add(h.item(P));try{G.add(D)}catch(ta){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}G.select();n(b)}function x(b,d,h){this.nativeSelection=
b;this.docSelection=d;this._ranges=[];this.win=h;this.refresh()}function A(b,d){var h=c.getDocument(d[0].startContainer);h=c.getBody(h).createControlRange();for(var D=0,G;D<rangeCount;++D){G=O(d[D]);try{h.add(G)}catch(P){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}h.select();n(b)}function q(b,d){if(b.anchorNode&&c.getDocument(b.anchorNode)!==c.getDocument(d))throw new L("WRONG_DOCUMENT_ERR");}function v(b){var d=
[],h=new p(b.anchorNode,b.anchorOffset),D=new p(b.focusNode,b.focusOffset),G=typeof b.getName=="function"?b.getName():"Selection";if(typeof b.rangeCount!="undefined")for(var P=0,X=b.rangeCount;P<X;++P)d[P]=k.inspect(b.getRangeAt(P));return"["+G+"(Ranges: "+d.join(", ")+")(anchor: "+h.inspect()+", focus: "+D.inspect()+"]"}l.requireModules(["DomUtil","DomRange","WrappedRange"]);l.config.checkSelectionRanges=true;var c=l.dom,f=l.util,k=l.DomRange,r=l.WrappedRange,L=l.DOMException,p=c.DomPosition,u,w,
B=l.util.isHostMethod(window,"getSelection"),V=l.util.isHostObject(document,"selection"),J=V&&(!B||l.config.preferTextRange);if(J){u=I;l.isSelectionValid=function(b){b=(b||window).document;var d=b.selection;return d.type!="None"||c.getDocument(d.createRange().parentElement())==b}}else if(B){u=H;l.isSelectionValid=function(){return true}}else K.fail("Neither document.selection or window.getSelection() detected.");l.getNativeSelection=u;B=u();var ca=l.createNativeRange(document),Y=c.getBody(document),
W=f.areHostObjects(B,f.areHostProperties(B,["anchorOffset","focusOffset"]));l.features.selectionHasAnchorAndFocus=W;var da=f.isHostMethod(B,"extend");l.features.selectionHasExtend=da;var fa=typeof B.rangeCount=="number";l.features.selectionHasRangeCount=fa;var ea=false,ha=true;f.areHostMethods(B,["addRange","getRangeAt","removeAllRanges"])&&typeof B.rangeCount=="number"&&l.features.implementsDomRange&&function(){var b=document.createElement("iframe");b.frameBorder=0;b.style.position="absolute";b.style.left=
"-10000px";Y.appendChild(b);var d=c.getIframeDocument(b);d.open();d.write("<html><head></head><body>12</body></html>");d.close();var h=c.getIframeWindow(b).getSelection(),D=d.documentElement.lastChild.firstChild;d=d.createRange();d.setStart(D,1);d.collapse(true);h.addRange(d);ha=h.rangeCount==1;h.removeAllRanges();var G=d.cloneRange();d.setStart(D,0);G.setEnd(D,2);h.addRange(d);h.addRange(G);ea=h.rangeCount==2;d.detach();G.detach();Y.removeChild(b)}();l.features.selectionSupportsMultipleRanges=ea;
l.features.collapsedNonEditableSelectionsSupported=ha;var M=false,g;if(Y&&f.isHostMethod(Y,"createControlRange")){g=Y.createControlRange();if(f.areHostProperties(g,["item","add"]))M=true}l.features.implementsControlRange=M;w=W?function(b){return b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset}:function(b){return b.rangeCount?b.getRangeAt(b.rangeCount-1).collapsed:false};var Z;if(f.isHostMethod(B,"getRangeAt"))Z=function(b,d){try{return b.getRangeAt(d)}catch(h){return null}};else if(W)Z=
function(b){var d=c.getDocument(b.anchorNode);d=l.createRange(d);d.setStart(b.anchorNode,b.anchorOffset);d.setEnd(b.focusNode,b.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(b.focusNode,b.focusOffset);d.setEnd(b.anchorNode,b.anchorOffset)}return d};l.getSelection=function(b){b=b||window;var d=b._rangySelection,h=u(b),D=V?I(b):null;if(d){d.nativeSelection=h;d.docSelection=D;d.refresh(b)}else{d=new x(h,D,b);b._rangySelection=d}return d};l.getIframeSelection=function(b){return l.getSelection(c.getIframeWindow(b))};
g=x.prototype;if(!J&&W&&f.areHostMethods(B,["removeAllRanges","addRange"])){g.removeAllRanges=function(){this.nativeSelection.removeAllRanges();C(this)};var S=function(b,d){var h=k.getRangeDocument(d);h=l.createRange(h);h.collapseToPoint(d.endContainer,d.endOffset);b.nativeSelection.addRange(N(h));b.nativeSelection.extend(d.startContainer,d.startOffset);b.refresh()};g.addRange=fa?function(b,d){if(M&&V&&this.docSelection.type=="Control")t(this,b);else if(d&&da)S(this,b);else{var h;if(ea)h=this.rangeCount;
else{this.removeAllRanges();h=0}this.nativeSelection.addRange(N(b));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==h+1){if(l.config.checkSelectionRanges)if((h=Z(this.nativeSelection,this.rangeCount-1))&&!k.rangesEqual(h,b))b=new r(h);this._ranges[this.rangeCount-1]=b;z(this,b,aa(this.nativeSelection));this.isCollapsed=w(this)}else this.refresh()}}:function(b,d){if(d&&da)S(this,b);else{this.nativeSelection.addRange(N(b));this.refresh()}};g.setRanges=function(b){if(M&&b.length>
1)A(this,b);else{this.removeAllRanges();for(var d=0,h=b.length;d<h;++d)this.addRange(b[d])}}}else if(f.isHostMethod(B,"empty")&&f.isHostMethod(ca,"select")&&M&&J){g.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var b;if(this.anchorNode)b=c.getDocument(this.anchorNode);else if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();if(d.length)b=c.getDocument(d.item(0)).body.createTextRange()}if(b){b.body.createTextRange().select();this.docSelection.empty()}}}catch(h){}C(this)};
g.addRange=function(b){if(this.docSelection.type=="Control")t(this,b);else{r.rangeToTextRange(b).select();this._ranges[0]=b;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;z(this,b,false)}};g.setRanges=function(b){this.removeAllRanges();var d=b.length;if(d>1)A(this,b);else d&&this.addRange(b[0])}}else{K.fail("No means of selecting a Range or TextRange was found");return false}g.getRangeAt=function(b){if(b<0||b>=this.rangeCount)throw new L("INDEX_SIZE_ERR");else return this._ranges[b]};
var $;if(J)$=function(b){var d;if(l.isSelectionValid(b.win))d=b.docSelection.createRange();else{d=c.getBody(b.win.document).createTextRange();d.collapse(true)}if(b.docSelection.type=="Control")n(b);else d&&typeof d.text!="undefined"?i(b,d):C(b)};else if(f.isHostMethod(B,"getRangeAt")&&typeof B.rangeCount=="number")$=function(b){if(M&&V&&b.docSelection.type=="Control")n(b);else{b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount;if(b.rangeCount){for(var d=0,h=b.rangeCount;d<h;++d)b._ranges[d]=
new l.WrappedRange(b.nativeSelection.getRangeAt(d));z(b,b._ranges[b.rangeCount-1],aa(b.nativeSelection));b.isCollapsed=w(b)}else C(b)}};else if(W&&typeof B.isCollapsed=="boolean"&&typeof ca.collapsed=="boolean"&&l.features.implementsDomRange)$=function(b){var d;d=b.nativeSelection;if(d.anchorNode){d=Z(d,0);b._ranges=[d];b.rangeCount=1;d=b.nativeSelection;b.anchorNode=d.anchorNode;b.anchorOffset=d.anchorOffset;b.focusNode=d.focusNode;b.focusOffset=d.focusOffset;b.isCollapsed=w(b)}else C(b)};else{K.fail("No means of obtaining a Range or TextRange from the user's selection was found");
return false}g.refresh=function(b){var d=b?this._ranges.slice(0):null;$(this);if(b){b=d.length;if(b!=this._ranges.length)return false;for(;b--;)if(!k.rangesEqual(d[b],this._ranges[b]))return false;return true}};var ba=function(b,d){var h=b.getAllRanges(),D=false;b.removeAllRanges();for(var G=0,P=h.length;G<P;++G)if(D||d!==h[G])b.addRange(h[G]);else D=true;b.rangeCount||C(b)};g.removeRange=M?function(b){if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();b=O(b);var h=c.getDocument(d.item(0));
h=c.getBody(h).createControlRange();for(var D,G=false,P=0,X=d.length;P<X;++P){D=d.item(P);if(D!==b||G)h.add(d.item(P));else G=true}h.select();n(this)}else ba(this,b)}:function(b){ba(this,b)};var aa;if(!J&&W&&l.features.implementsDomRange){aa=function(b){var d=false;if(b.anchorNode)d=c.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset)==1;return d};g.isBackwards=function(){return aa(this)}}else aa=g.isBackwards=function(){return false};g.toString=function(){for(var b=[],d=0,h=this.rangeCount;d<
h;++d)b[d]=""+this._ranges[d];return b.join("")};g.collapse=function(b,d){q(this,b);var h=l.createRange(c.getDocument(b));h.collapseToPoint(b,d);this.removeAllRanges();this.addRange(h);this.isCollapsed=true};g.collapseToStart=function(){if(this.rangeCount){var b=this._ranges[0];this.collapse(b.startContainer,b.startOffset)}else throw new L("INVALID_STATE_ERR");};g.collapseToEnd=function(){if(this.rangeCount){var b=this._ranges[this.rangeCount-1];this.collapse(b.endContainer,b.endOffset)}else throw new L("INVALID_STATE_ERR");
};g.selectAllChildren=function(b){q(this,b);var d=l.createRange(c.getDocument(b));d.selectNodeContents(b);this.removeAllRanges();this.addRange(d)};g.deleteFromDocument=function(){if(M&&V&&this.docSelection.type=="Control"){for(var b=this.docSelection.createRange(),d;b.length;){d=b.item(0);b.remove(d);d.parentNode.removeChild(d)}this.refresh()}else if(this.rangeCount){b=this.getAllRanges();this.removeAllRanges();d=0;for(var h=b.length;d<h;++d)b[d].deleteContents();this.addRange(b[h-1])}};g.getAllRanges=
function(){return this._ranges.slice(0)};g.setSingleRange=function(b){this.setRanges([b])};g.containsNode=function(b,d){for(var h=0,D=this._ranges.length;h<D;++h)if(this._ranges[h].containsNode(b,d))return true;return false};g.toHtml=function(){var b="";if(this.rangeCount){b=k.getRangeDocument(this._ranges[0]).createElement("div");for(var d=0,h=this._ranges.length;d<h;++d)b.appendChild(this._ranges[d].cloneContents());b=b.innerHTML}return b};g.getName=function(){return"WrappedSelection"};g.inspect=
function(){return v(this)};g.detach=function(){this.win=this.anchorNode=this.focusNode=this.win._rangySelection=null};x.inspect=v;l.Selection=x;l.selectionPrototype=g;l.addCreateMissingNativeApiListener(function(b){if(typeof b.getSelection=="undefined")b.getSelection=function(){return l.getSelection(this)};b=null})});

  /**
  * Copyright (c) 2012, Leon Sorokin
  * All rights reserved. (MIT Licensed)
  *
  * reMarked.js - DOM > markdown
  */
  var reMarked=function(e){function r(e,t){if(!t)return e;for(var n in e){if(typeof t[n]!=="undefined")e[n]=t[n]}}function i(e,t){var n="";while(t-->0)n+=e;return n}function s(e){var e=e.replace(/^\s\s*/,""),t=/\s/,n=e.length;while(t.test(e.charAt(--n)));return e.slice(0,n+1)}function o(e,t,n){return i(t,n-e.length)+e}function u(e,t,n){return e+i(t,n-e.length)}function a(e){if(!e)return"";return"<"+e+">"}function f(e){if(!e)return"";return"</"+e+">"}function l(e,t){return e.replace(/^/gm,t)}function c(e){return(e.nodeName=="#text"?"txt":e.nodeName).toLowerCase()}function h(e,t){var n,r;if(t instanceof Array){n=t[0];r=t[1]}else n=r=t;n=n instanceof Function?n.call(this,e):n;r=r instanceof Function?r.call(this,e):r;return n+e+r}var t=[];var n={link_list:false,h1_setext:true,h2_setext:true,h_atx_suf:false,gfm_code:false,li_bullet:"*-+"[0],hr_char:"-_*"[0],indnt_str:["    ","  ","  "][0],bold_char:"*_"[0],emph_char:"*_"[1],gfm_del:true,gfm_tbls:true,tbl_edges:false,hash_lnks:false,br_only:false};r(n,e);this.render=function(e){if(typeof e=="string"){var r=e;e=document.createElement("div");e.innerHTML=r}var s=new p.tag(e,null,0);var o=s.rend().replace(/^[\t ]+\n/gm,"\n");if(n.link_list){o+="\n\n";var u=0;for(var a in t){if(!t[a].e.title)continue;var f=t[a].e.href.length;if(f&&f>u)u=f}for(var l in t){var c=t[l].e.title?i(" ",u+2-t[l].e.href.length)+'"'+t[l].e.title+'"':"";o+="  ["+(+l+1)+"]: "+t[l].e.href+c+"\n"}}return o.replace(/^[\t ]+\n/gm,"\n")};var p={};p.tag=klass({wrap:"",lnPfx:"",lnInd:0,init:function(e,t,n){this.e=e;this.p=t;this.i=n;this.c=[];this.tag=c(e);this.initK()},initK:function(){var e;if(this.e.hasChildNodes()){var n=/^(?:a|strong|code|em|sub|sup|del|i|u|b|big|center)$/,r,i;for(e in this.e.childNodes){if(!/\d+/.test(e))continue;r=this.e.childNodes[e];i=c(r);if(/style|script|canvas|video|audio/.test(i))continue;if(i=="txt"&&/^\s+$/.test(r.textContent)){if(e==0||e==this.e.childNodes.length-1)continue;var s=this.e.childNodes[e-1],o=this.e.childNodes[e+1];if(s&&!c(s).match(n)||o&&!c(o).match(n))continue}if(!p[i])i="tag";var u=new p[i](r,this,this.c.length);if(u instanceof p.a&&r.href||u instanceof p.img){u.lnkid=t.length;t.push(u)}this.c.push(u)}}},rend:function(){return this.rendK().replace(/\n{3,}/gm,"\n\n")},rendK:function(){var e,t="";for(var n in this.c){e=this.c[n];t+=(e.bef||"")+e.rend()+(e.aft||"")}return t.replace(/^\n+|\n+$/,"")}});p.blk=p.tag.extend({wrap:["\n\n",""],wrapK:null,tagr:false,lnInd:null,init:function(e,t,n){this.supr(e,t,n);if(this.lnInd===null){if(this.p&&this.tagr&&this.c[0]instanceof p.blk)this.lnInd=4;else this.lnInd=0}if(this.wrapK===null){if(this.tagr&&this.c[0]instanceof p.blk)this.wrapK="\n";else this.wrapK=""}},rend:function(){return h.call(this,(this.tagr?a(this.tag):"")+h.call(this,l(l(this.rendK(),this.lnPfx),i(" ",this.lnInd)),this.wrapK)+(this.tagr?f(this.tag):""),this.wrap)},rendK:function(){var e=this.supr();if(this.p instanceof p.li){var t=null,n=e.match(/^[\t ]+/gm);if(!n)return e;for(var r in n){if(t===null||n[r][0].length<t.length)t=n[r][0]}return e.replace(new RegExp("^"+t),"")}return e}});p.tblk=p.blk.extend({tagr:true});p.cblk=p.blk.extend({wrap:["\n",""]});p.ctblk=p.cblk.extend({tagr:true});p.inl=p.tag.extend({rend:function(){return h.call(this,this.rendK(),this.wrap)}});p.tinl=p.inl.extend({tagr:true,rend:function(){return a(this.tag)+h.call(this,this.rendK(),this.wrap)+f(this.tag)}});p.p=p.blk.extend({rendK:function(){return this.supr().replace(/^\s+/gm,"")}});p.div=p.p.extend();p.span=p.inl.extend();p.list=p.blk.extend({expn:false,wrap:[function(){return this.p instanceof p.li?"\n":"\n\n"},""]});p.ul=p.list.extend({});p.ol=p.list.extend({});p.li=p.cblk.extend({wrap:["\n",function(e){return this.p.expn||e.match(/\n{2}/gm)?"\n":""}],wrapK:[function(){return this.p.tag=="ul"?n.li_bullet+" ":this.i+1+".  "},""],rendK:function(){return this.supr().replace(/\n([^\n])/gm,"\n"+n.indnt_str+"$1")}});p.hr=p.blk.extend({wrap:["\n\n",i(n.hr_char,3)]});p.h=p.blk.extend({});p.h_setext=p.h.extend({});n.h1_setext&&(p.h1=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("=",e.length)}]}));n.h2_setext&&(p.h2=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("-",e.length)}]}));p.h_atx=p.h.extend({wrapK:[function(e){return i("#",this.tag[1])+" "},function(e){return n.h_atx_suf?" "+i("#",this.tag[1]):""}]});!n.h1_setext&&(p.h1=p.h_atx.extend({}));!n.h2_setext&&(p.h2=p.h_atx.extend({}));p.h3=p.h_atx.extend({});p.h4=p.h_atx.extend({});p.h5=p.h_atx.extend({});p.h6=p.h_atx.extend({});p.a=p.inl.extend({lnkid:null,rend:function(){var e=this.rendK(),t=this.e.getAttribute("href"),r=this.e.title?' "'+this.e.title+'"':"";if(!t||t==e||t[0]=="#"&&!n.hash_lnks)return e;if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";return"["+e+"]("+t+r+")"}});p.img=p.inl.extend({lnkid:null,rend:function(){var e=this.e.alt,t=this.e.getAttribute("src");if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";var r=this.e.title?' "'+this.e.title+'"':"";return"!["+e+"]("+t+r+")"}});p.em=p.inl.extend({wrap:n.emph_char});p.i=p.em.extend();p.del=n.gfm_del?p.inl.extend({wrap:"~~"}):p.tinl.extend();p.br=p.inl.extend({wrap:["",function(){var e=n.br_only?"<br>":"  ";return this.p instanceof p.h?"<br>":e+"\n"}]});p.strong=p.inl.extend({wrap:i(n.bold_char,2)});p.b=p.strong.extend();p.dl=p.tblk.extend({lnInd:2});p.dt=p.ctblk.extend();p.dd=p.ctblk.extend();p.sub=p.tinl.extend();p.sup=p.tinl.extend();p.blockquote=p.blk.extend({lnPfx:"> ",rend:function(){return this.supr().replace(/>[ \t]$/gm,">")}});p.pre=p.blk.extend({tagr:true,wrapK:"\n",lnInd:0});p.code=p.blk.extend({tagr:false,wrap:"",wrapK:function(e){return e.indexOf("`")!==-1?"``":"`"},lnInd:0,init:function(e,t,r){this.supr(e,t,r);if(this.p instanceof p.pre){this.p.tagr=false;if(n.gfm_code){var i=this.e.getAttribute("class");i=(i||"").split(" ")[0];if(i.indexOf("lang-")===0)i=i.substr(5);this.wrapK=["```"+i+"\n","\n```"]}else{this.wrapK="";this.p.lnInd=4}}}});p.table=n.gfm_tbls?p.blk.extend({cols:[],init:function(e,t,n){this.supr(e,t,n);this.cols=[]},rend:function(){for(var e in this.c)for(var t in this.c[e].c)for(var n in this.c[e].c[t].c)this.c[e].c[t].c[n].prep();return this.supr()}}):p.tblk.extend();p.thead=n.gfm_tbls?p.cblk.extend({wrap:["\n",function(e){var t="";for(var r in this.p.cols){var o=this.p.cols[r],u=o.a[0]=="c"?":":" ",a=o.a[0]=="r"||o.a[0]=="c"?":":" ";t+=(r==0&&n.tbl_edges?"|":"")+u+i("-",o.w)+a+(r<this.p.cols.length-1||n.tbl_edges?"|":"")}return"\n"+s(t)}]}):p.ctblk.extend();p.tbody=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tfoot=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tr=n.gfm_tbls?p.cblk.extend({wrapK:[n.tbl_edges?"| ":"",n.tbl_edges?" |":""]}):p.ctblk.extend();p.th=n.gfm_tbls?p.inl.extend({guts:null,wrap:[function(){var e=this.p.p.p.cols[this.i],t=this.i==0?"":" ",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n=i(" ",r);break;case"c":n=i(" ",Math.floor(r/2));break;default:n=""}return t+n},function(){var e=this.p.p.p.cols[this.i],t=this.i==this.p.c.length-1?"":" |",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n="";break;case"c":n=i(" ",Math.ceil(r/2));break;default:n=i(" ",r)}return n+t}],prep:function(){this.guts=this.rendK();this.rendK=function(){return this.guts};var e=this.p.p.p.cols;if(!e[this.i])e[this.i]={w:null,a:""};var t=e[this.i];t.w=Math.max(t.w||0,this.guts.length);if(this.e.align)t.a=this.e.align}}):p.ctblk.extend();p.td=p.th.extend();p.txt=p.inl.extend({initK:function(){this.c=this.e.textContent.split(/^/gm)},rendK:function(){var e=this.c.join("").replace(/\r/gm,"");if(!(this.p instanceof p.code||this.p instanceof p.pre)){e=e.replace(/^\s*#/gm,"\\#").replace(/\*/gm,"\\*")}if(this.i==0)e=e.replace(/^\n+/,"");if(this.i==this.p.c.length-1)e=e.replace(/\n+$/,"");return e}})};!function(e,t){typeof define=="function"?define(t):typeof module!="undefined"?module.exports=t():this[e]=t()}("klass",function(){function e(e){return i.call(t(e)?e:function(){},e,1)}function t(e){return typeof e===u}function n(e,t,n){return function(){var r=this.supr;this.supr=n[f][e];var i=t.apply(this,arguments);return this.supr=r,i}}function r(e,r,i){for(var s in r)r.hasOwnProperty(s)&&(e[s]=t(r[s])&&t(i[f][s])&&a.test(r[s])?n(s,r[s],i):r[s])}function i(e,n){function i(){}function s(){this.init?this.init.apply(this,arguments):(n||a&&o.apply(this,arguments),l.apply(this,arguments))}i[f]=this[f];var o=this,u=new i,a=t(e),l=a?e:this,c=a?{}:e;return s.methods=function(e){return r(u,e,o),s[f]=u,this},s.methods.call(s,c).prototype.constructor=s,s.extend=arguments.callee,s[f].implement=s.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,r(this,e,o),this},s}var s=this,o=s.klass,u="function",a=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,f="prototype";return e.noConflict=function(){return s.klass=o,this},s.klass=e,e})

  var id = 0;

  function getToolbarHTML(formattingOptions, className) {
    var html;
    
    var outerDiv = $('<div />');
    outerDiv.addClass(className + '-toolbar pibble-toolbar');
    
    var ul = $('<ul />');

    for (var key in formattingOptions) {
      if (formattingOptions[key].enabled) {
        var el = $('<li />').addClass(formattingOptions[key].className).data('format-option', formattingOptions[key].name);
        ul.append(el); 
      }
    }

    outerDiv.append(ul);

    return outerDiv;
  }

  // Utility DOM functions
  DOM = {};

  DOM.insertAfter = function(el, target) {
    var parent = target.parentNode;

    if (parent.lastchild === target) {
      parent.appendChild(el);
    } 

    else {
      parent.insertBefore(el, target.nextSibling);
    }
  }

  DOM.createNode = function(tag) {

  }

  var Pibble = function(el, options) {
    this.options = options;
    this.id = id++;
    this.element = $(el);
    this.setInitialProperties();
    this.init();

    return this;
  };

  Pibble.prototype = {
    init: function() {
      this.element.addClass(this.baseClass);
      this.element.addClass('pibble');
      this.addEventListeners();
      this.setBaseAttributes();
      this.setUpToolbar();
      this.emptyCheck();
      return this;
    },

    setInitialProperties: function() {
      this.baseClass = 'pibble-' + this.id;
      this.menuSelectionInProgress = false;
    },

    setUpToolbar: function() {
      var toolbar = getToolbarHTML(this.options.formattingOptions, this.baseClass).hide();
      $('body').append(toolbar);
      this.toolbar = toolbar;
    },

    setBaseAttributes: function() {
      this.element.attr('contentEditable', true);
    },

    handleFormattingSelection: function(e) {
      var self = this;
      var formatting = $(e.currentTarget).data('format-option');
      var sel = window.getSelection();
      var range = sel.getRangeAt(0);
      this.restoreSelection(sel, range, function() {
        self.applyFormatting(formatting);
      });
    },

    restoreSelection: function(sel, range, cb) {
      var self = this;

      /* Bit of a 'hack', we need to wait for the content editable element to perform it's 
         clearing of the text due to loss of focus (from clicking the toolbar), before we can then
         re-insert the text range. Whilst the element has technically lost focus, we're working with 
         the toolbar and therefore the text is still active and should be selected as such. */
      setTimeout(function() {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        cb();       
      }, 0);
    },

    applyFormatting: function(formatting) {
      this.formatting[formatting].call(this);
      this.setActiveFormats();
    },

    getCurrentSelection: function() {
      var sel = window.getSelection();
      return sel;
    },

    getCurrentRange: function() {
      return this.getCurrentSelection().getRangeAt(0);
    },

    getSelectionsNode: function() {

    },

    // Basically the same as commonAncestorContainer
    // but it ignores text nodes
    getCommonParent: function() {
      var ancestor = this.getCurrentRange().commonAncestorContainer;
      
      if (ancestor.nodeType === 1) {
        return ancestor;
      }

      else if (ancestor.nodeType === 3) {
        return ancestor.parentNode;
      }
    },

    formatting: {
      bold: function() {
        document.execCommand('bold');
      },

      italic: function() {
        document.execCommand('italic');
      },

      link: function() {

      },

      insertunorderedlist: function() {
        document.execCommand('insertunorderedlist');
      },
      
      insertorderedlist: function() {
        document.execCommand('insertorderedlist');
      },

      undo: function() {
        document.execCommand('undo');
      },

      redo: function() {
        document.execCommand('redo');
      },

      heading: function() {
        if (this.selectionIsWithinEl('h2')) {
          document.execCommand('formatBlock', false, '<p>');
        }

        else {
          document.execCommand('formatBlock', false, '<h2>');
        }
      },

      subheading: function() {
        if (this.selectionIsWithinEl('h3')) {
          document.execCommand('formatBlock', false, '<p>');
        }

        else {
          document.execCommand('formatBlock', false, '<h3>');
        }
      },

      introText: function() {
        if (this.selectionIsWithinEl('h4')) {
          document.execCommand('formatBlock', false, '<p>');
        }

        else {
          document.execCommand('formatBlock', false, '<h4>');
        }
      },

      blockquote: function() {
        //   With FF we'll be dealing with something like this:
        //   <blockquote />
        //     <p />
        //       Text
        //     <p />
        //       Text
           
        //    Chrome / Safari will look like this:
        //    <blockquote />
        //       Text
        //       <br /> (inserted with shift + enter)
        //       Text
        //       <br />
        //       Text
        var self = this;
        var nodes = rangy.getSelection().getRangeAt(0).getNodes();
        var naughtyNodes = this.getNaughtyNodes(nodes);

        // todo: check for block level becaus of brs etc
        var elNodes = Array.prototype.filter.call(nodes, function(node) {
          return node.nodeType === 1 && node.nodeName.toLowerCase() !== 'ul' && node.nodeName.toLowerCase() !== 'ol' && node.nodeName.toLowerCase() !== 'li';
        });

        var contentsMap = [];
        var contentsMapParents = [];

        var contents = $(elNodes).contents();
        contents.each(function(content) {
          contentsMap.push(this);
          contentsMapParents.push(this.parentNode.nodeName.toLowerCase());
        })

        contents.unwrap().wrap(function() {
          var contentIndex = contentsMap.indexOf(this);
          var parentNode = contentsMapParents[contentIndex];
          return parentNode !== 'blockquote' ? '<blockquote />' : '<p />';
        });
      }
    },

    isEl: function(node, els) {
      return (els.indexOf(node.nodeName.toLowerCase()) !== -1) ? true : false;
    },

    hasParent: function(node, parents) {
      return (parents.indexOf(node.parentNode.nodeName.toLowerCase()) !== -1) ? true : false;
    },

    getUniques: function(arr) {
      var uniques = [];

      for (var i = 0, len = arr.length; i < len; i++) {
          if (uniques.indexOf(arr[i]) === -1) {
            uniques.push(arr[i])
          }
      }
      return uniques;
    },

    getNaughtyNodes: function(nodes) {
      var self = this;
      var els = ['ul', 'div', 'p'];
      var parents = ['div', 'p'];
      var badNodes = [];

      Array.prototype.forEach.call(nodes, function(node) {
        if (self.isEl(node, els) && self.hasParent(node, parents) && self.parentNode !== self.element[0]) {
          badNodes.push(node.parentNode);
        }
      });

      return this.getUniques(badNodes);
    },

    qualifiesForBlockFormatting: function(node) {
      var excluded = ['ul', 'ol'];
      return (excluded.indexOf(node.nodeName.toLowerCase()) === -1) ? true : false;
    },

    selectionIsWithinEl: function(el) {
      var sel = window.getSelection();
      var containerNode;
      
      if (sel.rangeCount > 0) {
        containerNode = sel.getRangeAt(0).commonAncestorContainer;
      }
      
      while (containerNode) {
        if (containerNode === this.element[0].parentNode) {
          return false;
        }

        if (containerNode.nodeType == 1 && containerNode.tagName.toLowerCase() == el) {
          return true;
        }

        containerNode = containerNode.parentNode;
      }
      
      return false;
    },

    addEventListeners: function() {
      var self = this;
      
      this.element[0].addEventListener('paste', this.handlePaste);
      
      $(document).on('keyup.' + this.baseClass, this.element, function(e) {
        self.handleKeyup(e);
      });

      $(document).on('keydown.' + this.baseClass, this.element, function(e) {
        self.handleKeydown(e);      
      });
      
      $(document).on('mouseup.' + this.baseClass, '.' + this.baseClass, function(e) {
        self.handleMouseUp(e);
      });

      $(document).on('mouseup.' + this.baseClass, '.' + this.baseClass + '-toolbar li', function(e) {
        e.stopPropagation(); // Mouseup on our toolbar buttons shouldn't propagate to the main element
      }); 


      $(document).on('mousedown.' + this.baseClass, '.' + this.baseClass + '-toolbar li', function(e) {
        self.menuSelectionInProgress = true;
        self.handleFormattingSelection(e);
      }); 

      $(document).on('blur.' + this.baseClass, '.' + this.baseClass, function(e) {
        if (!self.menuSelectionInProgress) {
          self.handleBlur(e);          
        }

        // Blur skipped, set selection in progress back to false
        self.menuSelectionInProgress = false;
      });          
    },

    handlePaste: function(e) {
      if (e.clipboardData) {
        if (e.clipboardData.types) {
          var plainText = e.clipboardData.getData('text/plain');
          var html = e.clipboardData.getData('text/html');
        } 

        else {
          // Types array seems to be implemented everywhere (apart from IEs case below),
          // but I'll leave this here for now.
          // var text = e.clipboardData.getData('text/plain');
          // var url = e.clipboardData.getData('text/uri-list');
          // var html = e.clipboardData.getData('text/html');
        }
      }

      else {
        // IE
        if (window.clipboardData) {
          var plainText = window.clipboardData.getData('Text');
          var url = window.clipboardData.getData('URL');
        }
      }
    },

    getSelection: function(cb) {
      var selection = window.getSelection();

      // Check if a selection exists within the element
      if ($(selection.anchorNode).parents('.' + this.baseClass).length > 0) {
        // Check the selection contains text, rather than just the cursor
        // Mouseup fires too quickly, hence the timeout
        window.setTimeout(function() {
          if ((selection.type && selection.type !== 'Caret') || (!selection.isCollapsed)) {
            cb(selection);
          }

          else {
            cb(false);
          }
        }, 0);
      }

      else {
        cb(false);
      }
    },

    handleMouseUp: function(e) {
      var self = this;

      function handle(result) {
        var x = e.pageX;
        var y = e.pageY;
        self.positionToolbar(x, y);
        self.showToolbar();
      }

      this.getSelection(function(result) {
        if (result) {
          handle(result);
        }

        else {
          self.hideToolbar();
        }
      });
    },

    handleBlur: function() {
      this.hideToolbar();
    },

    positionToolbar: function(x, y) {
      this.toolbar.css({
        position: 'absolute',
        top: y + 15,
        left: x
      });
    },

    setActiveFormats: function() {
      var self = this;
      
      var formats = this.options.formattingOptions;

      for (var key in formats) {
        var applied;

        if (formats[key].isActive) {
          applied = formats[key].isActive.call(this);
        }

        else {
          applied = document.queryCommandState(formats[key].name);
        }

        self.toolbar.find('.' + formats[key].className).toggleClass('active', applied);
      };
    },

    showToolbar: function() {
      this.setActiveFormats();
      this.toolbar.show();
    }, 

    hideToolbar: function() {
      this.toolbar.hide();
    },

    cleanContent: function() {
      this.element.find('div').contents().unwrap().wrap('<p/>');  
    },

    handleKeydown: function(e) {
      if ((e.keyCode === 13) && (this.options.mode === 'inline')) {
        e.preventDefault();
      }
    },

    handleKeyup: function(e) {
     this.emptyCheck(e);
    },

    elementIsEmpty: function(e) {
      var self = this;
      var html = this.element[0].innerHTML.trim();
      
      html = html.replace(/<br>/i, '');

      var alt = html.replace(/<(?:.|\n)*?>/gm, '');

      if (html === '' || alt === '') {
        
        if (e) {
          e.preventDefault();
        }

        return true;
      }
      
      else {
        return false;
      }
    },

    emptyCheck: function(e) {      
      // Element is empty, so insert a placeholder <p> element
      if (this.elementIsEmpty(e)) {
        var p = document.createElement('p');
        p.innerHTML = '&#8203;';
        this.element.html(p);
        this.refocus(p);
      }
    },

    // Focuses the element in Chrome and Safari (.focus() alone won't insert cursor)
    refocus: function(el, index) {
      var sel = window.getSelection();
      var range = document.createRange();
      range.setStart(el, (index || 0));
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      // IE, Opera and Firefox will obey this
      this.element.focus();
    },

    getContent: function(contentType) {
      return this['get' + contentType]();
    },

    getMarkdown: function() {  
      return new reMarked().render(this.getHTML());
    },

    getHTML: function() {
      return this.sanitiseContent(this.element[0].innerHTML);
    },

    sanitiseContent: function(content) {
      // Straight up remove all &nbsp;
      content = content.replace(/&nbsp;/gi,'');
      var donour = document.createElement('div');
      donour.innerHTML = content;

      // When we have structures like this:
          
      //     <p>Text</p>
      //     <p>
      //       "Text"
      //       <br>
      //       <ul>
      //         <li>Text</li>
      //         <li>Text</li>
      //       </ul>
      //       <div>Text</div>
      //     </p>
      //     <p>Text</p>

      // promoteElements will make sure things like <ul> or <p> elements aren't within 
      // elements they shouldn't be. The overall structure should be fairly sound after this.
      this.promoteElements(donour, ['ul', 'div', 'p'], ['div', 'p']);

      // Get rid of top-level <br /> elements 
      this.removeEls(donour, 'br', true);

      // Wrap top-level text nodes with a <p> element
      this.wrapTextNodes(donour);

      // Get rid of empty <div> and <p> elements
      this.removeEmptyElements(donour, 'div');
      this.removeEmptyElements(donour, 'p');

      // Replace <div> with <p> 
      this.swapElements(donour, 'div', 'p');

      return donour.innerHTML;
    },

    swapElements: function(el, old, newElem) {
      var elems = el.querySelectorAll(old);
      
      Array.prototype.forEach.call(elems, function(elem) {
        var replacement = document.createElement(newElem);
        replacement.innerHTML = elem.innerHTML;
        elem.parentNode.replaceChild(replacement, elem);
      });
    },

    promoteElements: function(el, els, parents) {
      var self = this;

      var isEl = function(node) {
        return (els.indexOf(node.nodeName.toLowerCase()) !== -1) ? true : false;
      }

      var hasParent = function(node) {
        return (parents.indexOf(node.parentNode.nodeName.toLowerCase()) !== -1) ? true : false;
      } 

      this.walkTheDOM(el, function(node) {
        if ((node.parentNode !== el) && (node !== el) && isEl(node) && hasParent(node)) {
          $(node).unwrap();
        } 
      });
    },

    removeEmptyElements: function(el, tag) {
      var els = el.querySelectorAll(tag);
      for (var i = 0; i < els.length; i++) {
        if (els[i].nodeName.toLowerCase() === tag && els[i].innerHTML.trim() === '') {
          els[i].parentNode.removeChild(els[i]);
        } 
      }
    },

    walkTheDOM: function(node, func) {
      func(node);
      node = node.firstChild;
      while (node) {
        this.walkTheDOM(node, func);
        node = node.nextSibling;
      }
    },

    removeEls: function(content, tag, parentOnly) {      
      var els = content.querySelectorAll(tag);
      for (var i = 0; i < els.length; i++) {
        if (!parentOnly) {
          els[i].parentNode.removeChild(els[i]);  
        }

        else if (parentOnly && (els[i].parentNode === content)) {
          els[i].parentNode.removeChild(els[i]);          
        }
      }
    },

    wrapTextNodes: function(content) {
      for (var i = 0; i < content.childNodes.length; i++) {
        if (content.childNodes[i].nodeType === 3) {
          var p = document.createElement('p');
          p.textContent = content.childNodes[i].textContent;
          content.childNodes[i].parentNode.replaceChild(p, content.childNodes[i]);
        }
      }
    },

    markdown: function() {
      return this.getContent('Markdown');
    },

    HTML: function() {
      return this.getContent('HTML');
    },

    destroy: function() {
      // Set content editable attr back to inherit
      this.element.attr('contentEditable', 'inherit');

      // Remove event listeners with the ID suffix of the instance
      $(document).off('mouseup.' + this.baseClass);
      $(document).off('mouseup.' + this.baseClass);
      $(document).off('mousedown.' + this.baseClass); 
      $(document).off('blur.' + this.baseClass);          
      
      // Remove the toolbar element
      this.toolbar.remove();
    }
  };

  // Export the jQuery plugin definition
  $.fn.Pibble = function(options) {
    var opts = $.extend(true, {}, $.fn.Pibble.defaults, options);

    return this.each(function() {
      var $this = $(this);
      var instance = $this.data('Pibble');

      if (!instance) {
        $this.data('Pibble', (instance = new Pibble(this, opts)));
      }

      // Called with a method
      if (typeof options === 'string') {
        instance[options]()
      }
    });
  }

  // Plugin defaults
  $.fn.Pibble.defaults = {
    returnFormat: 'Markdown',
    mode: 'regular',
    placeholderText: 'Insert content',
    formattingOptions: {
      bold: {
        name: 'bold',
        className: 'icon-bold',
        enabled: true
      },

      italic: {
        name: 'italic',
        className: 'icon-italic',
        enabled: true
      },

      insertunorderedlist: {
        name: 'insertunorderedlist',
        className: 'icon-list-ul',
        enabled: true
      },

      insertorderedlist: {
        name: 'insertorderedlist',
        className: 'icon-list-ol',
        enabled: true
      },

      undo: {
        name: 'undo',
        className: 'icon-undo',
        enabled: true
      },

      redo: {
        name: 'redo',
        className: 'icon-rotate-right',
        enabled: true
      },

      heading: {
        name: 'heading',
        className: 'icon-heading',
        enabled: true,
        isActive: function() {
          return this.selectionIsWithinEl('h2') ? true : false;
        }
      },

      subheading: {
        name: 'subheading',
        className: 'icon-subheading',
        enabled: true,
        isActive: function() {
          return this.selectionIsWithinEl('h3') ? true : false;
        }
      },

      introText: {
        name: 'introText',
        className: 'icon-intro-text',
        enabled: true,
        isActive: function() {
          return this.selectionIsWithinEl('h4') ? true : false;
        }
      },

      blockquote: {
        name: 'blockquote',
        className: 'icon-blockquote',
        enabled: true,
        isActive: function() {
          return this.selectionIsWithinEl('blockquote') ? true : false;
        }
      }
    }
  };

  $.fn.Pibble.Constructor = Pibble;

})(this, jQuery);