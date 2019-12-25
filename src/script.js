// script - place footer and load snippets

var troubled = troubled || {};
troubled.moveFooter = function () {
  $('#container').css({ 'min-height': $(window).height() -  138 });
  $('#page_footer').show();
}

$(function () {
  $('#likes').load('/likes.html');
  troubled.moveFooter();
});

$(window).resize(function () {
  troubled.moveFooter();
});
