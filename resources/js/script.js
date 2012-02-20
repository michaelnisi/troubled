// script.js 

var troubled = troubled || {};

troubled.moveFooter = function () {
	// TODO: Remove concrete pixel value
	$('#container').css({ 'min-height':$(window).height() -  168 });
  $('#page_footer').show();
}

$(document).ready(function () { 
	$('#likes').load('/likes.html');
	$('#tweet').load('/tweet.html');

	$('pre').next('p').css({ 'color':'#ccc', 'margin-top':'-.3em', 'font-size':'1.3em' });

	$('pre code').each(function (i, e) {
		hljs.highlightBlock(e, '    ');	
	});

	troubled.moveFooter();
});

$(window).resize(function () {
	troubled.moveFooter();
});
