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

	var articles = $('#articles');
	
	if (articles && $(window).width() > 768) {
		articles.append('<ul id="secondArticlesColumn"></ul>');

		var items =  $('#articles ul li');
		var threshold = items.length / 2;
				
		items.each(function(index) {
			if (index >= threshold) {
				$(this).appendTo($('#secondArticlesColumn'));
			}
		});
	}
});
