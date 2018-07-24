{
  "title": "Why Another Podcast App",
  "description": "As if there weren’t yet enough, why I made a podcast app.",
  "template": "article.pug",
  "date": "2018-07-23",
  "path": "2018/07"
}

While I’m busy releasing my new podcast app on the App Store, I’m reminded of just how many podcast apps exist. Why exactly did I write one in the first place? Does this choir of apps, offering themselves in the search results, ask for another contender, pleading for its use? Faced with marketing blurb fabrication pressure to climb these ranks, I doubt it. Isn’t it a waste of energy, when so many developers are pouring their energy and time into similar products?

## I 💜 Podcasts

I remember listening to my first podcasts on my computer, which sounds weird now, like eating soup with a fork. Among the first shows I’ve followed, come the iPhone, were [StackOverflow](https://stackoverflow.blog/2008/04/17/podcast-1/), [The Book Review Podcast](https://www.nytimes.com/column/book-review-podcast) by [The Times](https://www.nytimes.com), and, Chris Lydon’s, true founding father of podcasting, [Radio Open Source](http://radioopensource.org). I fondly remember immersing myself into [Chaos Radio Express](https://cre.fm) and my beloved [Küchenradio](https://www.kuechenstud.io/kuechenradio/), pioneering German shows, back in 2010. Podcasts are a personal medium, indeed.

Today, podcasts are in bloom—again. [The Daily](https://www.nytimes.com/podcasts/the-daily) quickly became a household name, [The New Yorker Radio Hour](https://www.newyorker.com/podcast/the-new-yorker-radio-hour) is a classic by now, and Britain’s [Monocle](https://monocle.com) has its own [radio station](https://monocle.com/radio/). Dedicated podcast labels flourish: [Radiotopia](https://www.radiotopia.fm), [Gimlet](https://www.gimletmedia.com), [Crooked Media](https://crooked.com) to name a few. For me, no week goes by without [Slate’s Culture Gabfest](http://www.slate.com/articles/podcasts/culturegabfest.html) and [Still Processing](https://www.nytimes.com/podcasts/still-processing), another fine [Pineapple](http://pineapple.fm) production.

#### Apps are made of priorities and compromises

I forget how I listened first, on the Mac, *iTunes*, I guess. On the phone, I used [Podcasts](https://itunes.apple.com/us/app/podcasts/id525463029) and [Downcast](https://itunes.apple.com/us/app/downcast/id393858566), which is still around, as I have just admiringly noticed, frantically scrolling the App Store search results for the term 'Podcasts'—I’m one of those people now. After [Instacast](https://itunes.apple.com/us/app/instacast-core/id108386833), the one with the lifted name and problems with too many subscriptions, I returned to *Podcasts*. For a moment I tried [Overcast](https://overcast.fm), but fell back on *Podcasts*, which got worse with each update. Apps are made of priorities and compromises. Occassionally, I try one of the newer apps coming out, but I find them bloated and confusing. [Castro](https://itunes.apple.com/us/app/castro-podcasts/id1080840241), for example, a super well made app, but too much for me.

The long and short of it, I never had a podcast app I liked, at least in this decade, before, I was stoked carrying podcasts in my pocket in the first place.

But why is that? How come all podcast apps feel off-center to me? Could I build something better?

#### What do I want?

- Audio and Video Playback including streaming
- Being offline should be fine
- Clear user interface
- Good search for shows and episodes
- Powerful landscape mode—I like larger screens
- Read about episodes before playing them
- Sync

The user interface of a podcast app is challenging, it has to communicate two narratives, information and playback. You can look at one thing, while you are playing another thing. A browser and a player.

#### And so I made

![alt text](/img/0x0ss.png "Podest App Icon")

## Podest

Here is a quick rundown of features in this first release.

- Audio and Video Playback
- Automatic Downloads
- Background Updates
- Energy Efficiency
- Episode Focused Browsing
- Landscape Mode
- Now Playing Controls
- Offline First
- Pragmatic Queue
- Search Shows and Episodes
- Synced Playback Resuming
- iCloud Sync of Queue and Subscriptions

Check the App Store for details. 🤗🎉

## Open Source

Much of this app is open source and I plan to release more.

- Download Manager: [fileproxy](https://github.com/michaelnisi/fileproxy)
- Feed Cache: [manger](https://github.com/michaelnisi/manger)
- Feed Parser: [pickup](https://github.com/michaelnisi/pickup)
- Reachability: [ola](https://github.com/michaelnisi/ola)
- Search Cache: [fanboy](https://github.com/michaelnisi/fanboy)

For image caching I use the excellent [Nuke](https://github.com/kean/Nuke) by [Alexander Grebenyuk](https://kean.github.io).

#### Was it easy? Hell no!

Back to the initial question. Does it make sense to build something that already exists? If you think you can improve something, of course, but even if not. If you can, you should build all the things. Diversity produces progress. Always reinvent the wheel! That’s how we learn.

**There were plenty podcast players, but no podcast browser. Try it and tell me what you think.**

![alt text](/img/app_store.svg "App Store Badge")
