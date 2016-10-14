{
  "title": "Static Websites",
  "description": "Static websites are easy to maintain, fast, and search engine friendly; harnessing GitHub, they can provide a sufficiently pleasant publishing experience.",
  "template": "article.pug",
  "date": "2012-05-17",
  "path": "2012/05"
}

THERE IS NO SHORTAGE of static website generators these days. After years of storing every single bit in databases, we evidently came to the conclusion that—when it comes to personal sites and blogs—filesystems aren’t that bad after all. Nothing new of course, initially the web consisted of static files, but in the first part of the last decade every tiny little blog ran a database. Now, in the midst of the transition to a [real-time web](http://en.wikipedia.org/wiki/Real-time_web), we see a renaissance of static sites.

I always found the static approach charming, it first caught my attention when I was learning Ruby and encountered [Hobix](http://hobix.github.com/hobix/). Later I was fascinated by an [article](http://www.martinfowler.com/articles/rake.html) from [Martin Fowler](http://www.martinfowler.com), in which he describes how he builds his site with [Rake](http://rake.rubyforge.org/). I’ve also been aware that [ongoing](http://www.tbray.org/ongoing/) has been a static site. A more recent example is Marco Arment’s [blog](http://www.marco.org), generated with his own thing: [Second Crack](http://www.marco.org/secondcrack).

An significant catalyst for the current boom of static websites has been the [Blogging like a hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html) piece by [Tom Preston-Werner](http://tom.preston-werner.com/):

> First, all my writing would be stored in a Git repository. This would ensure that I could try out different ideas and explore a variety of posts all from the comfort of my preferred editor and the command line. I’d be able to publish a post via a simple deploy script or post-commit hook. Complexity would be kept to an absolute minimum, so a static site would be preferable to a dynamic site that required ongoing maintenance. My blog would need to be easily customizable; coming from a graphic design background means I’ll always be tweaking the site’s appearance and layout.

Another reason for this trend might be that writing a little tool to generate your personal site is a nice programming exercise—at least that’s why I wrote **[blake](https://github.com/michaelnisi/blake)**—to kick the tires with [Node.js](http://nodejs.org/) and to drive this site. The objective has been to build a blog aware infrastructure that implements IO and template routing; without restricting input data formats, selection of template languages, and view implementations. **blake** is meant to run on a server generating the site, triggered by a post-receive hook, which is called when we push changes to a git repository that controls the data of the site. This approach provides version control for content and lets us write in our editor of choice.

#### Other flavors

[Octopress](http://octopress.org/) is the all-inclusive package for [Jekyll](http://jekyllrb.com/), the original tool by Tom Preston-Werner.

[Nesta](http://nestacms.com/) is a lightweight Content Management System, written in Ruby using the Sinatra web framework. Nesta has the simplicity of a static site generator, but (being a fully fledged Rack application) allows you to serve dynamic content on demand.

More: [Mynt](http://mynt.mirroredwhite.com/), [Middleman](http://awardwinningfjords.com/2009/10/22/middleman.html), [Stasis](http://stasis.me/), etc.
