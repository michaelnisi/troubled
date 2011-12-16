/**
 * script.js
 *
 * @author Michael Nisi (mn@michaelnisi.com)
 */

$(document).ready(function() { 
	$('#likes').load('/likes.html');
	$('#tweet').load('/tweet.html');
	$('pre code').each(function(i, e) {
		hljs.highlightBlock(e, '    ')
	});
});
