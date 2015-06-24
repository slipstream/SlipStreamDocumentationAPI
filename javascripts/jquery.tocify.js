/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
!function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,i){"use strict";var n="tocify",o="tocify-focus",s="tocify-hover",r="tocify-hide",a="tocify-header",l="."+a,c="tocify-subheader",h="."+c,u="tocify-item",d="."+u,f="tocify-extend-page",p="."+f;t.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var i=this;i.extendPageScroll=!0,i.items=[],i._generateToc(),i.cachedHeights=[],i.cachedAnchors=[],i._addCSSClasses(),i.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),i._setEventHandlers(),t(e).load(function(){i._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){i.extendPageScroll=!1},0)})})},_generateToc:function(){var e,i,o=this,s=o.options.ignoreSelector;return e=t(this.options.context).find(-1!==this.options.selectors.indexOf(",")?this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(",")):this.options.selectors.replace(/ /g,"")),e.length?(o.element.addClass(n),void e.each(function(e){t(this).is(s)||(i=t("<ul/>",{id:a+e,"class":a}).append(o._nestElements(t(this),e)),o.element.append(i),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(o.options.selectors).length?t(this).filter(o.options.selectors).each(function(){t(this).is(s)||o._appendSubheaders.call(this,o,i)}):t(this).find(o.options.selectors).each(function(){t(this).is(s)||o._appendSubheaders.call(this,o,i)})}))})):void o.element.addClass(r)},_setActiveElement:function(t){var i=this,n=e.location.hash.substring(1),o=i.element.find("li[data-unique='"+n+"']");return n.length?(i.element.find("."+i.focusClass).removeClass(i.focusClass),o.addClass(i.focusClass),i.options.showAndHide&&o.click()):(i.element.find("."+i.focusClass).removeClass(i.focusClass),!n.length&&t&&i.options.highlightDefault&&i.element.find(d).first().addClass(i.focusClass)),i},_nestElements:function(e,i){var n,o,s;return n=t.grep(this.items,function(t){return t===e.text()}),this.items.push(n.length?e.text()+i:e.text()),s=this._generateHashValue(n,e,i),o=t("<li/>",{"class":u,"data-unique":s}).append(t("<a/>",{text:e.text()})),e.before(t("<div/>",{name:s,"data-unique":s})),o},_generateHashValue:function(t,e,i){var n="",o=this.options.hashGenerator;if("pretty"===o){for(n=e.text().toLowerCase().replace(/\s/g,"-"),n=n.replace(/[^\x00-\x7F]/g,"");n.indexOf("--")>-1;)n=n.replace(/--/g,"-");for(;n.indexOf(":-")>-1;)n=n.replace(/:-/g,"-")}else n="function"==typeof o?o(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(n+=""+i),n},_appendSubheaders:function(e,i){var n=t(this).index(e.options.selectors),o=t(e.options.selectors).eq(n-1),s=+t(this).prop("tagName").charAt(1),r=+o.prop("tagName").charAt(1);r>s?e.element.find(h+"[data-tag="+s+"]").last().append(e._nestElements(t(this),n)):s===r?i.find(d).last().after(e._nestElements(t(this),n)):i.find(d).last().after(t("<ul/>",{"class":c,"data-tag":s})).next(h).append(e._nestElements(t(this),n))},_setEventHandlers:function(){var n=this;this.element.on("click.tocify","li",function(){if(n.options.history&&(e.location.hash=t(this).attr("data-unique")),n.element.find("."+n.focusClass).removeClass(n.focusClass),t(this).addClass(n.focusClass),n.options.showAndHide){var i=t('li[data-unique="'+t(this).attr("data-unique")+'"]');n._triggerShow(i)}n._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(n.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==n.options.theme&&t(this).removeClass(n.hoverClass)}}),t(e).on("resize",function(){console.log("resizing"+n.cachedHeights),n.calculateHeights(),console.log("done"+n.cachedHeights)}),t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var o,s,r,a,l=t(e).scrollTop(),c=t(e).height(),h=t(i).height(),u=t("body")[0].scrollHeight;if(n.options.extendPage&&(n.webkit&&l>=u-c-n.options.extendPageOffset||!n.webkit&&c+l>h-n.options.extendPageOffset)&&!t(p).length){if(s=t('div[data-unique="'+t(d).last().attr("data-unique")+'"]'),!s.length)return;r=s.offset().top,t(n.options.context).append(t("<div />",{"class":f,height:Math.abs(r-l)+"px","data-unique":f})),n.extendPageScroll&&(a=n.element.find("li.active"),n._scrollTo(t("div[data-unique="+a.attr("data-unique")+"]")))}setTimeout(function(){var s,r=null;0==n.cachedHeights.length&&n.calculateHeights(),n.cachedAnchors.each(function(i){return n.cachedHeights[i]-t(e).scrollTop()<0?void(r=i):!1}),s=t(n.cachedAnchors[r]).attr("data-unique"),o=t('li[data-unique="'+s+'"]'),n.options.highlightOnScroll&&o.length&&(n.element.find("."+n.focusClass).removeClass(n.focusClass),o.addClass(n.focusClass)),n.options.scrollHistory&&e.location.hash!=="#"+s&&(history.replaceState?history.replaceState({},"","#"+s):(scrollV=i.body.scrollTop,scrollH=i.body.scrollLeft,location.hash="#"+s,i.body.scrollTop=scrollV,i.body.scrollLeft=scrollH)),n.options.showAndHideOnScroll&&n.options.showAndHide&&n._triggerShow(o,!0)},0)})})},calculateHeights:function(){var e=this;e.cachedHeights=[],e.cachedAnchors=[];var i=t(e.options.context).find("div[data-unique]");i.each(function(i){var n=(t(this).next().length?t(this).next():t(this)).offset().top-e.options.highlightOffset;e.cachedHeights[i]=n}),e.cachedAnchors=i},show:function(e){var i=this;if(!e.is(":visible"))switch(e.find(h).length||e.parent().is(l)||e.parent().is(":visible")?e.children(h).length||e.parent().is(l)||(e=e.closest(h)):e=e.parents(h).add(e),i.options.showEffect){case"none":e.show();break;case"show":e.show(i.options.showEffectSpeed);break;case"slideDown":e.slideDown(i.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(i.options.showEffectSpeed);break;default:e.show()}return i.hide(t(h).not(e.parent().is(l)?e:e.closest(l).find(h).not(e.siblings()))),i},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var i=this;return t.parent().is(l)||t.next().is(h)?i.show(t.next(h),e):t.parent().is(h)&&i.show(t.parent(),e),i},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(l+","+h).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=s),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var i=this,n=i.options.smoothScroll||0,o=i.options.scrollTo;return t("html, body").promise().done(function(){t("html, body").animate({scrollTop:t('div[data-unique="'+e.attr("data-unique")+'"]').next().offset().top-(t.isFunction(o)?o.call():o)+"px"},{duration:n})}),i}})});