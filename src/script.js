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
  $('#container').css({ 'min-height':$(window).height() -  138 });
  $('#page_footer').show();
}

$(function () {
  $('#likes').load('/likes.html');
  $('#tweet').load('/tweet.html');
  troubled.moveFooter();
});

$(window).resize(function () {
  troubled.moveFooter();
});

hljs.initHighlightingOnLoad();
