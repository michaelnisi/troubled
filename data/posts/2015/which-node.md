{
  "title": "Which Node",
  "description": "How I picked a version in these revolving times of convergence in the Node project.",
  "template": "article.jade",
  "date": "2015-09-13",
  "path": "2015/09"
}

SOMETIMES IT CAN be instructive to start with a clean slate. When I recently decided to finally update my MacBook Air to Yosemite—timely for the upcoming [El Capitan](https://www.apple.com/osx/elcapitan-preview/) release—I opted for a clean install. A hassle I accept every third or so major release to verify my setup, which, as I learn time and time over, is still too multifarious.

After the basics—I wrote a better setup script for my [dotfiles](https://github.com/michaelnisi/dotfiles), which, among other things, conveniently compiles [Command-T](https://wincent.com/products/command-t), a Vim plugin I cannot pass on—had been set up, it was time to install [Node](https://nodejs.org).

But which version of Node should I use? My current project has been targeting >0.12, ignoring the newer [iojs](https://iojs.org/en/) versions, which I cannot enjoy quite yet, because a major motivation for me to use Node is V8 postmortem debugging with [mdb](http://www.joyent.com/developers/node/debug/mdb), which is still [converging](https://github.com/nodejs/node/issues/2517).

I cloned the new Node [repo](https://github.com/nodejs/node), freshly emerged from the [fork](http://hueniverse.com/2014/12/04/before-the-drama/), checked out the v0.12.7 tag, and after a successful build, to my surprise, found the tests failing. Well, no big deal, I thought. This is Node after all! Something has to be wrong with the fork. I went to download the official [tarball](https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz) from the [website](https://nodejs.org/en/), and built it, just to find that its tests were also failing.

Back on GitHub I filed an [issue](https://github.com/nodejs/node/issues/2759), and observed this, probably unrelated but not reassuring, [issue](https://github.com/nodejs/node/issues/2683). I decided to try 0.12.6 instead, which, as it turned out, has been just fine.

So, twelve six it is. To confirm my findings I checked the latest [SmartOS Node.js image](https://docs.joyent.com/public-cloud/instances/infrastructure/images/smartos/node-js) by Joyent, which should provide reasonable guidance on which Node version to use, and sure enough, the image from September 2nd ships with version 0.12.6.
