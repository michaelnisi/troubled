
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
