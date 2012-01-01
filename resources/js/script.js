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
});
