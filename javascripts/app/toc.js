!function(t){function e(){setTimeout(function(){toc.setOption("showEffectSpeed",180)},50)}var i=function(){$(".tocify-wrapper").removeClass("open"),$("#nav-button").removeClass("open")},n=function(e){var n="#toc-"+e,s=$.map(["h1","h2"],function(t){return".content-"+e+">"+t}).join(", ");console.log(n,s),t.toc=$(n).tocify({selectors:s,extendPage:!1,theme:"none",smoothScroll:!1,showEffectSpeed:0,hideEffectSpeed:180,ignoreSelector:".toc-ignore",highlightOffset:100,scrollTo:-1,scrollHistory:!0,hashGenerator:function(t,e){return e.prop("id")}}).data("toc-tocify"),$("#nav-button").click(function(){return $(".tocify-wrapper").toggleClass("open"),$("#nav-button").toggleClass("open"),!1}),$(".page-wrapper").click(i),$(".tocify-item").click(i)};$(function(){n("section")}),$(e)}(window);