{
  "title": "Why Another Podcast App",
  "description": "As if there weren’t yet enough, why I made a podcast app.",
  "template": "article.pug",
  "date": "2018-07-23",
  "path": "2018/07"
}

Busy releasing my new podcast app on the App Store, I’m reminded of just how many podcast apps exist. Why exactly did I write one myself? Does this choir of apps, being smug in the search results, ask for another contender, pleading for its use? Facing promotion and marketing to climb these ranks, doubts are creeping up on me. Why another podcast app?

## I 💜 Podcasts

I remember listening to podcasts on my computer, which sounds weird now, like eating soup with a fork. Among the first shows I’ve followed, come the iPhone, were [StackOverflow](https://stackoverflow.blog/2008/04/17/podcast-1/), [The Book Review Podcast](https://www.nytimes.com/column/book-review-podcast) by [The Times](https://www.nytimes.com), and, Chris Lydon’s, true founding father of podcasting, [Radio Open Source](http://radioopensource.org). I fondly remember immersing myself into [Chaos Radio Express](https://cre.fm) and—in those days absolutely fab—[Küchenradio](https://www.kuechenstud.io/kuechenradio/), pioneering German shows, back in 2010. Podcasts are a personal medium, indeed.

Today, podcasts are in bloom—again. [The Daily](https://www.nytimes.com/podcasts/the-daily) quickly became a household name, [The New Yorker Radio Hour](https://www.newyorker.com/podcast/the-new-yorker-radio-hour) is classic by now, and Britain’s [Monocle](https://monocle.com) has its own [radio station](https://monocle.com/radio/). Dedicated podcast labels flourish: [Radiotopia](https://www.radiotopia.fm), [Gimlet](https://www.gimletmedia.com), [Crooked Media](https://crooked.com) to name a few. For me, no week goes by without [Slate’s Culture Gabfest](http://www.slate.com/articles/podcasts/culturegabfest.html) and [Still Processing](https://www.nytimes.com/podcasts/still-processing), another fine [Pineapple](http://pineapple.fm) production.

#### Apps are made of priorities and compromises

I forget how I listened first, on the Mac with [iTunes](https://www.apple.com/lae/itunes/), I guess. On the phone, I used [Podcasts](https://itunes.apple.com/us/app/podcasts/id525463029) at first, then [Downcast](https://itunes.apple.com/us/app/downcast/id393858566), which is still around—I just admiringly noticed, while frantically scrolling App Store search results for the term 'Podcasts'. After [Instacast](https://itunes.apple.com/us/app/instacast-core/id108386833), the one with the lifted name and problems with too many subscriptions, I returned to *Podcasts*. For a moment I tried [Overcast](https://overcast.fm), but bounced back to *Podcasts*, which got worse with each update. Apps are made of priorities and compromises. Occassionally, I try one of the newer apps coming out, but I find them bloated and confusing. [Castro](https://itunes.apple.com/us/app/castro-podcasts/id1080840241), for example, a super well made app, but too much for me.

The long and short of it, I’ve never been happy with my podcast apps, at least in this decade, before that I was stoked carrying podcasts in my pocket in the first place. Did I just say decade? How do I listen to podcasts? What differentiates by podcast consumption habits from the average, successfully served by *Podcasts*, *Overcast*, and *Castro*, making those no good fits for me?

#### Netflix for Radio

Another trigger to think about podcast apps has been watching laymen, like my mother, long time podcast aficionado, use *Podcasts*. The concepts are confusing. What is the difference between podcast and episode? What is a subscription? Lists? Entering mainstream, these terms of olden times will be left at the wayside.

What are podcasts anyways? Podcasts are basically audio on demand—decentralized Netflix for radio.

#### What do I want?

But back to the app I’m thinking about. What do I want?

- Clear user interface
- Preloaded and streaming AV playback
- Search and browse while playing
- Sync ([no signup](https://medium.com/@skreutzb/ios-onboarding-without-signup-screens-cb7a76d01d6e))
- Useful landscape mode—I like larger screens
- [Offline First](http://offlinefirst.org)

The user interface of a podcast app is challenging, it has to communicate two narratives, information and playback. You can look at one thing, while another is playing. A browser and a player.

## 🙌🏻

[![Podest](/img/0x0ss.png "Podest App Icon")](https://itunes.apple.com/us/app/podest/id794983364)

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

Check the [App Store](https://itunes.apple.com/us/app/podest/id794983364) for details. 🤗🎉

## Open Source

Key modules of this app are open source and I plan to release more.

- Download Manager, [fileproxy](https://github.com/michaelnisi/fileproxy)
- Feed Cache, [manger](https://github.com/michaelnisi/manger)
- Feed Parser, [pickup](https://github.com/michaelnisi/pickup)
- HTML Parser, [hattr](https://github.com/michaelnisi/hattr)
- Reachability, [ola](https://github.com/michaelnisi/ola)
- Search Cache, [fanboy](https://github.com/michaelnisi/fanboy)

For image caching I use the excellent [Nuke](https://github.com/kean/Nuke) by [Alexander Grebenyuk](https://kean.github.io).

#### Was it easy? Hell no!

Back to the initial question. Does it make sense to build something that already exists? If you think you can improve something, of course, but even if not. If you can, you should build all the things. Diversity produces progress. Always reinvent the wheel! That’s how we learn.

**There were plenty podcast players, but no podcast browser. Try it and tell me what you think.**

[![App Store](/img/app_store.svg "App Store Badge")](https://itunes.apple.com/us/app/podest/id794983364)
