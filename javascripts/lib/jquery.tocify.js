/*! jQuery UI - v1.10.3 - 2013-09-16
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
!function(e,t){var i=0,n=Array.prototype.slice,s=e.cleanData;e.cleanData=function(t){for(var i,n=0;null!=(i=t[n]);n++)try{e(i).triggerHandler("remove")}catch(o){}s(t)},e.widget=function(i,n,s){var o,r,a,l,c={},h=i.split(".")[0];i=i.split(".")[1],o=h+"-"+i,s||(s=n,n=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[h]=e[h]||{},r=e[h][i],a=e[h][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new a(e,i)},e.extend(a,r,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),l=new n,l.options=e.widget.extend({},l.options),e.each(s,function(i,s){return e.isFunction(s)?(c[i]=function(){var e=function(){return n.prototype[i].apply(this,arguments)},t=function(e){return n.prototype[i].apply(this,e)};return function(){var i,n=this._super,o=this._superApply;return this._super=e,this._superApply=t,i=s.apply(this,arguments),this._super=n,this._superApply=o,i}}(),t):(c[i]=s,t)}),a.prototype=e.widget.extend(l,{widgetEventPrefix:r?l.widgetEventPrefix:i},c,{constructor:a,namespace:h,widgetName:i,widgetFullName:o}),r?(e.each(r._childConstructors,function(t,i){var n=i.prototype;e.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete r._childConstructors):n._childConstructors.push(a),e.widget.bridge(i,a)},e.widget.extend=function(i){for(var s,o,r=n.call(arguments,1),a=0,l=r.length;l>a;a++)for(s in r[a])o=r[a][s],r[a].hasOwnProperty(s)&&o!==t&&(i[s]=e.isPlainObject(o)?e.isPlainObject(i[s])?e.widget.extend({},i[s],o):e.widget.extend({},o):o);return i},e.widget.bridge=function(i,s){var o=s.prototype.widgetFullName||i;e.fn[i]=function(r){var a="string"==typeof r,l=n.call(arguments,1),c=this;return r=!a&&l.length?e.widget.extend.apply(null,[r].concat(l)):r,this.each(a?function(){var n,s=e.data(this,o);return s?e.isFunction(s[r])&&"_"!==r.charAt(0)?(n=s[r].apply(s,l),n!==s&&n!==t?(c=n&&n.jquery?c.pushStack(n.get()):n,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+r+"'")}:function(){var t=e.data(this,o);t?t.option(r||{})._init():e.data(this,o,new s(r,this))}),c}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,n){n=e(n||this.defaultElement||this)[0],this.element=e(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),n!==this&&(e.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===n&&this.destroy()}}),this.document=e(n.style?n.ownerDocument:n.document||n),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,n){var s,o,r,a=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(a={},s=i.split("."),i=s.shift(),s.length){for(o=a[i]=e.widget.extend({},this.options[i]),r=0;s.length-1>r;r++)o[s[r]]=o[s[r]]||{},o=o[s[r]];if(i=s.pop(),n===t)return o[i]===t?null:o[i];o[i]=n}else{if(n===t)return this.options[i]===t?null:this.options[i];a[i]=n}return this._setOptions(a),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,n,s){var o,r=this;"boolean"!=typeof i&&(s=n,n=i,i=!1),s?(n=o=e(n),this.bindings=this.bindings.add(n)):(s=n,n=this.element,o=this.widget()),e.each(s,function(s,a){function l(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof a?r[a]:a).apply(r,arguments):t}"string"!=typeof a&&(l.guid=a.guid=a.guid||l.guid||e.guid++);var c=s.match(/^(\w+)\s*(.*)$/),h=c[1]+r.eventNamespace,u=c[2];u?o.delegate(u,h,l):n.bind(h,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?n[e]:e).apply(n,arguments)}var n=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,n){var s,o,r=this.options[t];if(n=n||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(n,s,o){"string"==typeof s&&(s={effect:s});var r,a=s?s===!0||"number"==typeof s?i:s.effect||i:t;s=s||{},"number"==typeof s&&(s={duration:s}),r=!e.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),r&&e.effects&&e.effects.effect[a]?n[t](s):a!==t&&n[a]?n[a](s.duration,s.easing,o):n.queue(function(i){e(this)[t](),o&&o.call(n[0]),i()})}})}(jQuery),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(e){"use strict";e(window.jQuery,window,document)}(function(e,t,i,n){"use strict";var s="tocify",o="tocify-focus",r="tocify-hover",a="tocify-hide",l="tocify-header",c="."+l,h="tocify-subheader",u="."+h,d="tocify-item",f="."+d,p="tocify-extend-page",g="."+p;e.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var i=this;i.tocifyWrapper=e(".tocify-wrapper"),i.extendPageScroll=!0,i.items=[],i._generateToc(),i.cachedHeights=[],i.cachedAnchors=[],i._addCSSClasses(),i.webkit=function(){for(var e in t)if(e&&-1!==e.toLowerCase().indexOf("webkit"))return!0;return!1}(),i._setEventHandlers(),e(t).load(function(){i._setActiveElement(!0),e("html, body").promise().done(function(){setTimeout(function(){i.extendPageScroll=!1},0)})})},_generateToc:function(){var t,i,n=this,o=n.options.ignoreSelector;return t=e(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),t.length?(n.element.addClass(s),void t.each(function(t){e(this).is(o)||(i=e("<ul/>",{id:l+t,"class":l}).append(n._nestElements(e(this),t)),n.element.append(i),e(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===e(this).find(n.options.selectors).length?e(this).filter(n.options.selectors).each(function(){e(this).is(o)||n._appendSubheaders.call(this,n,i)}):e(this).find(n.options.selectors).each(function(){e(this).is(o)||n._appendSubheaders.call(this,n,i)})}))})):void n.element.addClass(a)},_setActiveElement:function(e){var i=this,n=t.location.hash.substring(1),s=i.element.find("li[data-unique='"+n+"']");return n.length?(i.element.find("."+i.focusClass).removeClass(i.focusClass),s.addClass(i.focusClass),i.options.showAndHide&&s.click()):(i.element.find("."+i.focusClass).removeClass(i.focusClass),!n.length&&e&&i.options.highlightDefault&&i.element.find(f).first().addClass(i.focusClass)),i},_nestElements:function(t,i){var n,s,o;return n=e.grep(this.items,function(e){return e===t.text()}),this.items.push(n.length?t.text()+i:t.text()),o=this._generateHashValue(n,t,i),s=e("<li/>",{"class":d,"data-unique":o}).append(e("<a/>",{text:t.text()})),t.before(e("<div/>",{name:o,"data-unique":o})),s},_generateHashValue:function(e,t,i){var n="",s=this.options.hashGenerator;if("pretty"===s){for(n=t.text().toLowerCase().replace(/\s/g,"-"),n=n.replace(/[^\x00-\x7F]/g,"");n.indexOf("--")>-1;)n=n.replace(/--/g,"-");for(;n.indexOf(":-")>-1;)n=n.replace(/:-/g,"-")}else n="function"==typeof s?s(t.text(),t):t.text().replace(/\s/g,"");return e.length&&(n+=""+i),n},_appendSubheaders:function(t,i){var n=e(this).index(t.options.selectors),s=e(t.options.selectors).eq(n-1),o=+e(this).prop("tagName").charAt(1),r=+s.prop("tagName").charAt(1);r>o?t.element.find(u+"[data-tag="+o+"]").last().append(t._nestElements(e(this),n)):o===r?i.find(f).last().after(t._nestElements(e(this),n)):i.find(f).last().after(e("<ul/>",{"class":h,"data-tag":o})).next(u).append(t._nestElements(e(this),n))},_setEventHandlers:function(){var s=this;this.element.on("click.tocify","li",function(){if(s.options.history&&(t.location.hash=e(this).attr("data-unique")),s.element.find("."+s.focusClass).removeClass(s.focusClass),e(this).addClass(s.focusClass),s.options.showAndHide){var i=e('li[data-unique="'+e(this).attr("data-unique")+'"]');s._triggerShow(i)}s._scrollTo(e(this))}),this.element.find("li").on({"mouseenter.tocify":function(){e(this).addClass(s.hoverClass),e(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==s.options.theme&&e(this).removeClass(s.hoverClass)}}),e(t).on("resize",function(){s.calculateHeights()}),e(t).on("scroll.tocify",function(){e("html, body").promise().done(function(){var o,r,a,l,c=e(t).scrollTop(),h=e(t).height(),u=e(i).height(),d=e("body")[0].scrollHeight;if(s.options.extendPage&&(s.webkit&&c>=d-h-s.options.extendPageOffset||!s.webkit&&h+c>u-s.options.extendPageOffset)&&!e(g).length){if(r=e('div[data-unique="'+e(f).last().attr("data-unique")+'"]'),!r.length)return;a=r.offset().top,e(s.options.context).append(e("<div />",{"class":p,height:Math.abs(a-c)+"px","data-unique":p})),s.extendPageScroll&&(l=s.element.find("li.active"),s._scrollTo(e("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var r,a=null;0==s.cachedHeights.length&&s.calculateHeights();var l=e(t).scrollTop();if(s.cachedAnchors.each(function(e){return s.cachedHeights[e]-l<0?void(a=e):!1}),r=e(s.cachedAnchors[a]).attr("data-unique"),o=e('li[data-unique="'+r+'"]'),s.options.highlightOnScroll&&o.length&&!o.hasClass(s.focusClass)){s.element.find("."+s.focusClass).removeClass(s.focusClass),o.addClass(s.focusClass);var c=s.tocifyWrapper,h=e(o).closest(".tocify-header"),u=h.offset().top,d=c.offset().top,f=u-d;if(f>=e(t).height()){var p=f+c.scrollTop();c.scrollTop(p)}else 0>f&&c.scrollTop(0)}s.options.scrollHistory&&t.location.hash!=="#"+r&&r!==n&&(history.replaceState?history.replaceState({},"","#"+r):(scrollV=i.body.scrollTop,scrollH=i.body.scrollLeft,location.hash="#"+r,i.body.scrollTop=scrollV,i.body.scrollLeft=scrollH)),s.options.showAndHideOnScroll&&s.options.showAndHide&&s._triggerShow(o,!0)},0)})})},calculateHeights:function(){var t=this;t.cachedHeights=[],t.cachedAnchors=[];var i=e(t.options.context).find("div[data-unique]");i.each(function(i){var n=(e(this).next().length?e(this).next():e(this)).offset().top-t.options.highlightOffset;t.cachedHeights[i]=n}),t.cachedAnchors=i},show:function(t){var i=this;if(!t.is(":visible"))switch(t.find(u).length||t.parent().is(c)||t.parent().is(":visible")?t.children(u).length||t.parent().is(c)||(t=t.closest(u)):t=t.parents(u).add(t),i.options.showEffect){case"none":t.show();break;case"show":t.show(i.options.showEffectSpeed);break;case"slideDown":t.slideDown(i.options.showEffectSpeed);break;case"fadeIn":t.fadeIn(i.options.showEffectSpeed);break;default:t.show()}return i.hide(e(u).not(t.parent().is(c)?t:t.closest(c).find(u).not(t.siblings()))),i},hide:function(e){var t=this;switch(t.options.hideEffect){case"none":e.hide();break;case"hide":e.hide(t.options.hideEffectSpeed);break;case"slideUp":e.slideUp(t.options.hideEffectSpeed);break;case"fadeOut":e.fadeOut(t.options.hideEffectSpeed);break;default:e.hide()}return t},_triggerShow:function(e,t){var i=this;return e.parent().is(c)||e.next().is(u)?i.show(e.next(u),t):e.parent().is(u)&&i.show(e.parent(),t),i},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(c+","+u).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=r),this},setOption:function(){e.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(t){var i=this,n=i.options.smoothScroll||0,s=i.options.scrollTo;return e("html, body").promise().done(function(){e("html, body").animate({scrollTop:e('div[data-unique="'+t.attr("data-unique")+'"]').next().offset().top-(e.isFunction(s)?s.call():s)+"px"},{duration:n})}),i}})});