/**
 * script.js
 *
 * @author Michael Nisi (mn@michaelnisi.com)
*/

$(document).ready(function() { 
	$('#likes').load('/likes.html');
	$('#tweet').load('/tweet.html');
	
	$('pre').next('p').css({ 'color':'#ccc', 'margin-top':'-.3em', 'font-size':'1.3em' });
	
	$('pre code').each(function(i, e) {
		hljs.highlightBlock(e, '    ');	
	});
	
	if ($('#container').height() + $('#page_footer').height() + 200 < $(window).height()) {
		$('#page_footer').css({ 'position':'fixed', 'left':'0', 'bottom':'0', 'height':'inherit' });
	} else {
		$('#page_footer').css({ 'position':'relative', 'height':'100%' });
	}
});

