/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
!function(e){"use strict";e(window.jQuery,window,document)}(function(e,t,s){"use strict";var i="tocify",n="tocify-focus",o="tocify-hover",a="tocify-hide",l="tocify-header",r="."+l,h="tocify-subheader",c="."+h,d="tocify-item",f="."+d,u="tocify-extend-page",p="."+u;e.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var s=this;s.extendPageScroll=!0,s.items=[],s._generateToc(),s.cachedHeights=[],s.cachedAnchors=[],s._addCSSClasses(),s.webkit=function(){for(var e in t)if(e&&-1!==e.toLowerCase().indexOf("webkit"))return!0;return!1}(),s._setEventHandlers(),e(t).load(function(){s._setActiveElement(!0),e("html, body").promise().done(function(){setTimeout(function(){s.extendPageScroll=!1},0)})})},_generateToc:function(){var t,s,n=this,o=n.options.ignoreSelector;return t=e(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),t.length?(n.element.addClass(i),void t.each(function(t){e(this).is(o)||(s=e("<ul/>",{id:l+t,"class":l}).append(n._nestElements(e(this),t)),n.element.append(s),e(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===e(this).find(n.options.selectors).length?e(this).filter(n.options.selectors).each(function(){e(this).is(o)||n._appendSubheaders.call(this,n,s)}):e(this).find(n.options.selectors).each(function(){e(this).is(o)||n._appendSubheaders.call(this,n,s)})}))})):void n.element.addClass(a)},_setActiveElement:function(e){var s=this,i=t.location.hash.substring(1),n=s.element.find("li[data-unique='"+i+"']");return i.length?(s.element.find("."+s.focusClass).removeClass(s.focusClass),n.addClass(s.focusClass),s.options.showAndHide&&n.click()):(s.element.find("."+s.focusClass).removeClass(s.focusClass),!i.length&&e&&s.options.highlightDefault&&s.element.find(f).first().addClass(s.focusClass)),s},_nestElements:function(t,s){var i,n,o;return i=e.grep(this.items,function(e){return e===t.text()}),this.items.push(i.length?t.text()+s:t.text()),o=this._generateHashValue(i,t,s),n=e("<li/>",{"class":d,"data-unique":o}).append(e("<a/>",{text:t.text()})),t.before(e("<div/>",{name:o,"data-unique":o})),n},_generateHashValue:function(e,t,s){var i="",n=this.options.hashGenerator;if("pretty"===n){for(i=t.text().toLowerCase().replace(/\s/g,"-"),i=i.replace(/[^\x00-\x7F]/g,"");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof n?n(t.text(),t):t.text().replace(/\s/g,"");return e.length&&(i+=""+s),i},_appendSubheaders:function(t,s){var i=e(this).index(t.options.selectors),n=e(t.options.selectors).eq(i-1),o=+e(this).prop("tagName").charAt(1),a=+n.prop("tagName").charAt(1);a>o?t.element.find(c+"[data-tag="+o+"]").last().append(t._nestElements(e(this),i)):o===a?s.find(f).last().after(t._nestElements(e(this),i)):s.find(f).last().after(e("<ul/>",{"class":h,"data-tag":o})).next(c).append(t._nestElements(e(this),i))},_setEventHandlers:function(){var i=this;this.element.on("click.tocify","li",function(){if(i.options.history&&(t.location.hash=e(this).attr("data-unique")),i.element.find("."+i.focusClass).removeClass(i.focusClass),e(this).addClass(i.focusClass),i.options.showAndHide){var s=e('li[data-unique="'+e(this).attr("data-unique")+'"]');i._triggerShow(s)}i._scrollTo(e(this))}),this.element.find("li").on({"mouseenter.tocify":function(){e(this).addClass(i.hoverClass),e(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==i.options.theme&&e(this).removeClass(i.hoverClass)}}),e(t).on("resize",function(){console.log("resizing"+i.cachedHeights),i.calculateHeights(),console.log("done"+i.cachedHeights)}),e(t).on("scroll.tocify",function(){e("html, body").promise().done(function(){var n,o,a,l,r=e(t).scrollTop(),h=e(t).height(),c=e(s).height(),d=e("body")[0].scrollHeight;if(i.options.extendPage&&(i.webkit&&r>=d-h-i.options.extendPageOffset||!i.webkit&&h+r>c-i.options.extendPageOffset)&&!e(p).length){if(o=e('div[data-unique="'+e(f).last().attr("data-unique")+'"]'),!o.length)return;a=o.offset().top,e(i.options.context).append(e("<div />",{"class":u,height:Math.abs(a-r)+"px","data-unique":u})),i.extendPageScroll&&(l=i.element.find("li.active"),i._scrollTo(e("div[data-unique="+l.attr("data-unique")+"]")))}setTimeout(function(){var o,a=null;0==i.cachedHeights.length&&i.calculateHeights(),i.cachedAnchors.each(function(s){return i.cachedHeights[s]-e(t).scrollTop()<0?void(a=s):!1}),o=e(i.cachedAnchors[a]).attr("data-unique"),n=e('li[data-unique="'+o+'"]'),i.options.highlightOnScroll&&n.length&&(i.element.find("."+i.focusClass).removeClass(i.focusClass),n.addClass(i.focusClass)),i.options.scrollHistory&&t.location.hash!=="#"+o&&(history.replaceState?history.replaceState({},"","#"+o):(scrollV=s.body.scrollTop,scrollH=s.body.scrollLeft,location.hash="#"+o,s.body.scrollTop=scrollV,s.body.scrollLeft=scrollH)),i.options.showAndHideOnScroll&&i.options.showAndHide&&i._triggerShow(n,!0)},0)})})},calculateHeights:function(){var t=this;t.cachedHeights=[],t.cachedAnchors=[];var s=e(t.options.context).find("div[data-unique]");s.each(function(s){var i=(e(this).next().length?e(this).next():e(this)).offset().top-t.options.highlightOffset;t.cachedHeights[s]=i}),t.cachedAnchors=s},show:function(t){var s=this;if(!t.is(":visible"))switch(t.find(c).length||t.parent().is(r)||t.parent().is(":visible")?t.children(c).length||t.parent().is(r)||(t=t.closest(c)):t=t.parents(c).add(t),s.options.showEffect){case"none":t.show();break;case"show":t.show(s.options.showEffectSpeed);break;case"slideDown":t.slideDown(s.options.showEffectSpeed);break;case"fadeIn":t.fadeIn(s.options.showEffectSpeed);break;default:t.show()}return s.hide(e(c).not(t.parent().is(r)?t:t.closest(r).find(c).not(t.siblings()))),s},hide:function(e){var t=this;switch(t.options.hideEffect){case"none":e.hide();break;case"hide":e.hide(t.options.hideEffectSpeed);break;case"slideUp":e.slideUp(t.options.hideEffectSpeed);break;case"fadeOut":e.fadeOut(t.options.hideEffectSpeed);break;default:e.hide()}return t},_triggerShow:function(e,t){var s=this;return e.parent().is(r)||e.next().is(c)?s.show(e.next(c),t):e.parent().is(c)&&s.show(e.parent(),t),s},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(r+","+c).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=n,this.hoverClass=o),this},setOption:function(){e.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(t){var s=this,i=s.options.smoothScroll||0,n=s.options.scrollTo;return e("html, body").promise().done(function(){e("html, body").animate({scrollTop:e('div[data-unique="'+t.attr("data-unique")+'"]').next().offset().top-(e.isFunction(n)?n.call():n)+"px"},{duration:i})}),s}})});