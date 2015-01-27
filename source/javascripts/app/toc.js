(function (global) {

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function(section) {
    var sectionSelector = '#toc-' + section,
        itemSelectors = $.map(['h1', 'h2'], function(item) {
          return '.content-' + section + '>' + item;
        }).join(', ');

    console.log(sectionSelector, itemSelectors);

    global.toc = $(sectionSelector).tocify({
      selectors: itemSelectors,
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate () {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  $(function() { makeToc('intro') });
  $(function() { makeToc('entities') });
  $(animate);

})(window);
