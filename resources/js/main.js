/**
 * Displays latest tweets in loop.
 */

var tweetLoop = function(tweet) {
    var tweetIndex = 0;
    var tweets;
    var isRendered;
    var json = 'latest_tweets.json';

    function replaceLinks(text) {
        var p = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|])/gim;

        return text.replace(p, '<a href="$1">$1</a>');
    }

    function replaceUserNames(text) {
        var p = /@([A-Za-z0-9_]+)/gim;

        return text.replace(p, '<a href="http://twitter.com/$1">@$1</a>');
    }

    function replaceHashTags(text) {
        var p = /#([A-Za-z0-9_]+)/gim;

        return text.replace(p, '<a href="https://twitter.com/#!/search?q=%23$1">#$1</a>');
    }

    function formatTweet(text) {
        return (replaceUserNames(replaceHashTags(replaceLinks(text))));
    }

    function render() {
        if (tweetIndex === tweets.length) {
            tweetIndex = 0;
        }

        var text = tweets[tweetIndex++].text;

        if (isRendered) {
            tweet.fadeOut(600, function() {
                tweet.html(formatTweet(text));
                tweet.fadeIn(600);
            });
        } else {
            tweet.html(formatTweet(text));
        }

        isRendered = true;
    }

    function next() {
        if (!tweets) {
            $.getJSON(json, function(items) {
                tweets = items;
                render();
            });
        } else {
            render();
        }
    }

    function start() {
        next();
        setInterval(next, 11000);
    }

    start();
};

$(document).ready(function() {
    tweetLoop($('#tweetText'));
});
