{
  "title": "Blake",
  "description": "Agnostic site bakery",
  "template": "article.jade",
  "date": "2012-02-27",
  "path": "2012/02"
}

There's no shortage of static website generators these days. After years of storing every single bit in databases, we apparently came to the conclusion that, when it comes to personal sites and blogs, filesystems aren't that bad after all. Of course this is nothing new, initially the web consisted of static files, but in the first part of the last decade every tiny little blog ran a database.

I always found the static approach charming, I think it first caught my attention when I first learned Ruby and encountered [Hobix](http://hobix.github.com/hobix/) 8 years ago or so. Later I was fascinated by an [article](http://www.martinfowler.com/articles/rake.html) written by [Martin Fowler](http://www.martinfowler.com), in which he describes how he build his site with [Rake](http://rake.rubyforge.org/). Also I was aware that [ongoing](http://www.tbray.org/ongoing/) was a static site. 

I think the latest boom of static websites started with [Tom Preston-Werner's](http://tom.preston-werner.com/) [Blogging like a hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html) piece he wrote for his site. Another reason for this trend might be that writing a tool to generate your personal website is a nice little programming project and that's exactly the reason why I wrote one too.

Today static website generators come in all flavors.

-    [Jekyll](http://jekyllrb.com/)
-    [Octopress](http://octopress.org/)
-    [Mynt](http://mynt.mirroredwhite.com/)
-    [Middleman](http://awardwinningfjords.com/2009/10/22/middleman.html)
-    [Stasis](http://stasis.me/)
-    [Nesta](http://nestacms.com/)

Even [Marco](http://www.marco.org) wrote [one](http://www.marco.org/secondcrack).

#### Blake
To build this website I wrote Blake; a small Node.js module, that provides a simple infrastructure to generate static sites. Blake  leaves the actual transformation from input to output to you, which makes it rather flexible. Blake takes advantage of Node's non-blocking IO capabilities and runs its tasks in parallel. It makes minimal assumptions and doesn't limit your choices of markup language and template engine. To be honest, it doesn't do terribly much. Blake drives the generation process and stays out of the way. It can be used from the command-line or as library.

#### Install
	npm install -g blake

#### Command-line usage
	blake input output [input/file …]

#### How it works
...

#### Deployment
Of course you could build your site locally and upload it to your webserver manually, but obviously the recommended approach is to run Blake on your server and use [post-receive hooks](http://help.github.com/post-receive-hooks/) to automatically generate your site on the server everytime you're pushing to your input data repository.

