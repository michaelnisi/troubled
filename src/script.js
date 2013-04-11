// Setup Google Analytics.
var _gaq = [['_setAccount','UA-1076490-1'], ['_trackPageview']];
(function(d, t) {
  var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  g.src = ('https:' == location.protocol?'//ssl':'//www') + '.google-analytics.com/ga.js';
  s.parentNode.insertBefore(g, s);
}(document, 'script'));

// Refine site.
var troubled = troubled || {};

troubled.moveFooter = function () {
  $('#container').css({ 'min-height':$(window).height() -  168 });
  $('#page_footer').show();
}

$(function () {
  $('#likes').load('/likes.html');
  $('#tweet').load('/tweet.html');

  $('pre code').each(function (i, e) {
    if (e.textContent.length > 80) {
      hljs.highlightBlock(e, '    ');
    }
  });

  troubled.moveFooter();
});

$(window).resize(function () {
  troubled.moveFooter();
});
