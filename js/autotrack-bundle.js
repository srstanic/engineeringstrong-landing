!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports={VERSION:"1.0.0",DEV_ID:"i5iSjo",VERSION_PARAM:"&_av",USAGE_PARAM:"&_au",NULL_DIMENSION:"(not set)"}},{}],2:[function(a,b,c){function l(a,b){h.track(a,h.plugins.OUTBOUND_FORM_TRACKER),window.addEventListener&&(this.opts=d({formSelector:"form",shouldTrackOutboundForm:this.shouldTrackOutboundForm,fieldsObj:{},attributePrefix:"ga-",hitFilter:null},b),this.tracker=a,this.delegate=e(document,"submit","form",this.handleFormSubmits.bind(this),{deep:!0,useCapture:!0}))}var d=a("object-assign"),e=a("dom-utils/lib/delegate"),f=a("dom-utils/lib/parse-url"),g=a("../provide"),h=a("../usage"),i=a("../utilities").createFieldsObj,j=a("../utilities").getAttributeFields,k=a("../utilities").withTimeout;l.prototype.handleFormSubmits=function(a,b){var c=f(b.action).href,e={transport:"beacon",eventCategory:"Outbound Form",eventAction:"submit",eventLabel:c};if(this.opts.shouldTrackOutboundForm(b,f)){navigator.sendBeacon||(a.preventDefault(),e.hitCallback=k(function(){b.submit()}));var g=d({},this.opts.fieldsObj,j(b,this.opts.attributePrefix));this.tracker.send("event",i(e,g,this.tracker,this.opts.hitFilter,b))}},l.prototype.shouldTrackOutboundForm=function(a,b){var c=b(a.action);return c.hostname!=location.hostname&&"http"==c.protocol.slice(0,4)},l.prototype.remove=function(){this.delegate.destroy()},g("outboundFormTracker",l)},{"../provide":5,"../usage":6,"../utilities":7,"dom-utils/lib/delegate":9,"dom-utils/lib/parse-url":13,"object-assign":14}],3:[function(a,b,c){function k(a,b){h.track(a,h.plugins.OUTBOUND_LINK_TRACKER),window.addEventListener&&(this.opts=d({events:["click"],linkSelector:"a",shouldTrackOutboundLink:this.shouldTrackOutboundLink,fieldsObj:{},attributePrefix:"ga-",hitFilter:null},b),this.tracker=a,this.handleLinkInteractions=this.handleLinkInteractions.bind(this),this.delegates={},this.opts.events.forEach(function(a){this.delegates[a]=e(document,a,this.opts.linkSelector,this.handleLinkInteractions,{deep:!0,useCapture:!0})}.bind(this)))}var d=a("object-assign"),e=a("dom-utils/lib/delegate"),f=a("dom-utils/lib/parse-url"),g=a("../provide"),h=a("../usage"),i=a("../utilities").createFieldsObj,j=a("../utilities").getAttributeFields;k.prototype.handleLinkInteractions=function(a,b){if(this.opts.shouldTrackOutboundLink(b,f)){navigator.sendBeacon||(b.target="_blank");var c={transport:"beacon",eventCategory:"Outbound Link",eventAction:a.type,eventLabel:b.href},e=d({},this.opts.fieldsObj,j(b,this.opts.attributePrefix));this.tracker.send("event",i(c,e,this.tracker,this.opts.hitFilter,b))}},k.prototype.shouldTrackOutboundLink=function(a,b){var c=b(a.href);return c.hostname!=location.hostname&&"http"==c.protocol.slice(0,4)},k.prototype.remove=function(){Object.keys(this.delegates).forEach(function(a){this.delegates[a].destroy()}.bind(this))},g("outboundLinkTracker",k)},{"../provide":5,"../usage":6,"../utilities":7,"dom-utils/lib/delegate":9,"dom-utils/lib/parse-url":13,"object-assign":14}],4:[function(a,b,c){function h(a,b){f.track(a,f.plugins.SOCIAL_WIDGET_TRACKER),window.addEventListener&&(this.opts=d({fieldsObj:{},hitFilter:null},b),this.tracker=a,this.addWidgetListeners=this.addWidgetListeners.bind(this),this.addTwitterEventHandlers=this.addTwitterEventHandlers.bind(this),this.handleTweetEvents=this.handleTweetEvents.bind(this),this.handleFollowEvents=this.handleFollowEvents.bind(this),this.handleLikeEvents=this.handleLikeEvents.bind(this),this.handleUnlikeEvents=this.handleUnlikeEvents.bind(this),"complete"!=document.readyState?window.addEventListener("load",this.addWidgetListeners):this.addWidgetListeners())}var d=a("object-assign"),e=a("../provide"),f=a("../usage"),g=a("../utilities").createFieldsObj;h.prototype.addWidgetListeners=function(){window.FB&&this.addFacebookEventHandlers(),window.twttr&&this.addTwitterEventHandlers()},h.prototype.addTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.bind("tweet",this.handleTweetEvents),twttr.events.bind("follow",this.handleFollowEvents)}.bind(this))}catch(a){}},h.prototype.removeTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.unbind("tweet",this.handleTweetEvents),twttr.events.unbind("follow",this.handleFollowEvents)}.bind(this))}catch(a){}},h.prototype.addFacebookEventHandlers=function(){try{FB.Event.subscribe("edge.create",this.handleLikeEvents),FB.Event.subscribe("edge.remove",this.handleUnlikeEvents)}catch(a){}},h.prototype.removeFacebookEventHandlers=function(){try{FB.Event.unsubscribe("edge.create",this.handleLikeEvents),FB.Event.unsubscribe("edge.remove",this.handleUnlikeEvents)}catch(a){}},h.prototype.handleTweetEvents=function(a){if("tweet"==a.region){var b=a.data.url||a.target.getAttribute("data-url")||location.href,c={transport:"beacon",socialNetwork:"Twitter",socialAction:"tweet",socialTarget:b};this.tracker.send("social",g(c,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}},h.prototype.handleFollowEvents=function(a){if("follow"==a.region){var b=a.data.screen_name||a.target.getAttribute("data-screen-name"),c={transport:"beacon",socialNetwork:"Twitter",socialAction:"follow",socialTarget:b};this.tracker.send("social",g(c,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}},h.prototype.handleLikeEvents=function(a){var b={transport:"beacon",socialNetwork:"Facebook",socialAction:"like",socialTarget:a};this.tracker.send("social",g(b,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))},h.prototype.handleUnlikeEvents=function(a){var b={transport:"beacon",socialNetwork:"Facebook",socialAction:"unlike",socialTarget:a};this.tracker.send("social",g(b,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))},h.prototype.remove=function(){window.removeEventListener("load",this.addWidgetListeners),this.removeFacebookEventHandlers(),this.removeTwitterEventHandlers()},e("socialWidgetTracker",h)},{"../provide":5,"../usage":6,"../utilities":7,"object-assign":14}],5:[function(a,b,c){var d=a("./constants"),e=a("./utilities");(window.gaDevIds=window.gaDevIds||[]).push(d.DEV_ID),b.exports=function(b,c){var d=window.GoogleAnalyticsObject||"ga";window[d]=window[d]||function(){(window[d].q=window[d].q||[]).push(arguments)},window[d]("provide",b,c),window.gaplugins=window.gaplugins||{},window.gaplugins[e.capitalize(b)]=c}},{"./constants":1,"./utilities":7}],6:[function(a,b,c){function g(a){return parseInt(a||"0",16).toString(2)}function h(a){return parseInt(a||"0",2).toString(16)}function i(a,b){if(a.length<b)for(var c=b-a.length;c;)a="0"+a,c--;return a}function j(a,b){return a.substr(0,b)+1+a.substr(b+1)}function k(a,b){var c=a.get(d.USAGE_PARAM),e=i(g(c),f);e=j(e,f-b),a.set(d.USAGE_PARAM,h(e))}function l(a){a.set(d.VERSION_PARAM,d.VERSION)}var d=a("./constants"),e={CLEAN_URL_TRACKER:1,EVENT_TRACKER:2,IMPRESSION_TRACKER:3,MEDIA_QUERY_TRACKER:4,OUTBOUND_FORM_TRACKER:5,OUTBOUND_LINK_TRACKER:6,PAGE_VISIBILITY_TRACKER:7,SOCIAL_WIDGET_TRACKER:8,URL_CHANGE_TRACKER:9},f=9;b.exports={track:function(a,b){l(a),k(a,b)},plugins:e}},{"./constants":1}],7:[function(a,b,c){var d=a("object-assign"),e=a("dom-utils/lib/get-attributes"),f={createFieldsObj:function(a,b,c,e,f){if("function"==typeof e){var g=c.get("buildHitTask");return{buildHitTask:function(c){c.set(a,null,!0),c.set(b,null,!0),e(c,f),g(c)}}}return d({},a,b)},getAttributeFields:function(a,b){var c=e(a),d={};return Object.keys(c).forEach(function(a){if(0===a.indexOf(b)&&a!=b+"on"){var e=c[a];"true"==e&&(e=!0),"false"==e&&(e=!1);var g=f.camelCase(a.slice(b.length));d[g]=e}}),d},domReady:function(a){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",function b(){document.removeEventListener("DOMContentLoaded",b),a()}):a()},withTimeout:function(a,b){var c=!1;return setTimeout(a,b||2e3),function(){c||(c=!0,a())}},camelCase:function(a){return a.replace(/[\-\_]+(\w?)/g,function(a,b){return b.toUpperCase()})},capitalize:function(a){return a.charAt(0).toUpperCase()+a.slice(1)},isObject:function(a){return"object"==typeof a&&null!==a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},toArray:function(a){return f.isArray(a)?a:[a]}};b.exports=f},{"dom-utils/lib/get-attributes":10,"object-assign":14}],8:[function(a,b,c){var d=a("./matches"),e=a("./parents");b.exports=function(b,c,f){if(b&&1==b.nodeType&&c)for(var i,g=(f?[b]:[]).concat(e(b)),h=0;i=g[h];h++)if(d(i,c))return i}},{"./matches":11,"./parents":12}],9:[function(a,b,c){var d=a("./closest"),e=a("./matches");b.exports=function(b,c,f,g,h){h=h||{};var i=function(a){if(h.deep&&"function"==typeof a.deepPath)for(var i,b=a.deepPath(),c=0;i=b[c];c++)1==i.nodeType&&e(i,f)&&(j=i);else var j=d(a.target,f,!0);j&&g.call(j,a,j)};return b.addEventListener(c,i,h.useCapture),{destroy:function(){b.removeEventListener(c,i,h.useCapture)}}}},{"./closest":8,"./matches":11}],10:[function(a,b,c){b.exports=function(b){var c={};if(!b||1!=b.nodeType)return c;var d=b.attributes;if(0===d.length)return{};for(var f,e=0;f=d[e];e++)c[f.name]=f.value;return c}},{}],11:[function(a,b,c){function f(a,b){if("string"!=typeof b)return!1;if(e)return e.call(a,b);for(var f,c=a.parentNode.querySelectorAll(b),d=0;f=c[d];d++)if(f==a)return!0;return!1}var d=window.Element.prototype,e=d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector;b.exports=function(b,c){if(b&&1==b.nodeType&&c){if("string"==typeof c||1==c.nodeType)return b==c||f(b,c);if("length"in c)for(var e,d=0;e=c[d];d++)if(b==e||f(b,e))return!0}return!1}},{}],12:[function(a,b,c){b.exports=function(b){for(var c=[];b&&b.parentNode&&1==b.parentNode.nodeType;)c.push(b=b.parentNode);return c}},{}],13:[function(a,b,c){var d="80",e="443",f=RegExp(":("+d+"|"+e+")$"),g=document.createElement("a"),h={};b.exports=function a(b){if(b=b&&"."!=b?b:location.href,h[b])return h[b];if(g.href=b,"."==b.charAt(0))return a(g.href);var c=g.protocol&&":"!=g.protocol?g.protocol:location.protocol,i=g.port==d||g.port==e?"":g.port;i="0"==i?"":i;var j=""==g.host?location.host:g.host,k=""==g.hostname?location.hostname:g.hostname;j=j.replace(f,"");var l=g.origin?g.origin:c+"//"+j,m="/"==g.pathname.charAt(0)?g.pathname:"/"+g.pathname;return h[b]={hash:g.hash,host:j,hostname:k,href:g.href,origin:l,pathname:m,port:i,protocol:c,search:g.search,fragment:g.hash.slice(1),path:m+g.search,query:g.search.slice(1)}}},{}],14:[function(a,b,c){"use strict";function f(a){if(null===a||void 0===a)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function g(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de","5"===Object.getOwnPropertyNames(a)[0])return!1;for(var b={},c=0;c<10;c++)b["_"+String.fromCharCode(c)]=c;var d=Object.getOwnPropertyNames(b).map(function(a){return b[a]});if("0123456789"!==d.join(""))return!1;var e={};return"abcdefghijklmnopqrst".split("").forEach(function(a){e[a]=a}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},e)).join("")}catch(a){return!1}}var d=Object.prototype.hasOwnProperty,e=Object.prototype.propertyIsEnumerable;b.exports=g()?Object.assign:function(a,b){for(var c,h,g=f(a),i=1;i<arguments.length;i++){c=Object(arguments[i]);for(var j in c)d.call(c,j)&&(g[j]=c[j]);if(Object.getOwnPropertySymbols){h=Object.getOwnPropertySymbols(c);for(var k=0;k<h.length;k++)e.call(c,h[k])&&(g[h[k]]=c[h[k]])}}return g}},{}]},{},[2,3,4]);