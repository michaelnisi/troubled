{
  "title": "Why Another Podcast App",
  "description": "The market for podcast apps might be saturated. Why make another one?",
  "template": "article.pug",
  "date": "2018-10-19",
  "path": "2018/10"
}

Promoting my new podcast app, available on the [App Store](https://itunes.apple.com/us/app/podest/id794983364), I’m reminded of just how many podcast apps there are now, there were less when I started the app. Searching the term “podcast” in the store, you are faced with a wall of podcast players. I came for glory, not for squeezing my hard work into this saturated space. Does this choir of apps, blaring their unique selling propositions, need another voice in its cacophony?

#### I love podcasts

Podcasts first clicked with me, when I discovered [StackOverflow](https://stackoverflow.blog/2008/04/17/podcast-1/), back in 2008. This weekly conversation between [Joel Spolsky](https://www.joelonsoftware.com) and [Jeff Atwood](https://blog.codinghorror.com) about the progress of building the [Stackoverflow](https://stackoverflow.com) site was eye opening. Listening to human voices at close range, over headphones of device speakers, can create an intimate bubble, a feeling of connectedness between listener and hosts. I have fond memories—strangely enough—of long wintery walks with the dog listening to [John Gruber](https://daringfireball.net) and [Dan Benjamin](http://danbenjamin.com) chatting about Apple stuff on [The Talk Show](http://5by5.tv/talkshow), of wiping the wooden floors of my St. Georg apartment to [The Book Review](https://www.nytimes.com/column/book-review-podcast), or listening to [Pavel Mayer explaining C++ on CRE](https://cre.fm/cre063-die-programmiersprache-c-plus-plus) in front of the fire place with my laptop on the floor.

Today, with everyone carrying a connected playback device in their pockets, audio is big—for input and output. Podcasts are in bloom, once again. [The Daily](https://www.nytimes.com/podcasts/the-daily) quickly became a household name during the 2016 election campaign. Pioneers like Radio Open Source, 99pi, This American Life, Radio Lab are still going strong. Podcast labels are thing now: Radiotopia, Wondery, Headgum, Gimlet, Pineapple, or the German Viertausendhertz. Print publications understand that podcasts bond their readers with their writers—Monocle, New York Times, [New Yorker](https://www.newyorker.com/podcast), New York Magazine. Digital natives like [Slate](http://www.slate.com/articles/podcasts.html), [Vox](https://www.vox.com/pages/podcasts), or [The Verge](https://www.theverge.com/podcasts) have it easy. After merely mirroring their signals into this space, following early adopters like NPR or WYNC, traditional broadcasters like the [BBC](https://www.bbc.co.uk/podcasts) are getting serious.

#### Apps are made of priorities and compromises

I forget how I listened first, on the Mac with iTunes, I guess. On the phone, I used [Podcasts](https://itunes.apple.com/us/app/podcasts/id525463029) and [Downcast](https://itunes.apple.com/us/app/downcast/id393858566), which is still around, as I have just admiringly noticed, frantically scrolling the App Store search results for the term 'Podcasts'—I’m one of those people now. After [Instacast](https://itunes.apple.com/us/app/instacast-core/id108386833), the one with the lifted name and problems with too many subscriptions, I returned to Apple Podcasts. For a second I tried [Overcast](https://overcast.fm), but fell back on Podcasts, which got worse with each update. Apps are made of priorities and compromises. Occassionally, I try one of the newer apps coming out, but I find them bloated and confusing. [Castro](https://itunes.apple.com/us/app/castro-podcasts/id1080840241), for example, a super well made app, but too much for me. After a decade of listening to podcasts, I have not found an app I like. Admittedly, I haven’t looked at Pocket, Deezer, and Spotify for too long. Writing this, I consider reviewing each, a post with one paragraph reviews of each podcast app would be a hit, I guess.

#### How do I listen

My way of consuming podcasts might be unfit for the available apps. How do I listen to podcasts? I don’t walk the streets with headphones and I don’t have a commute. I listen at home, walking around the house, doing chors, while shaving or in bed before sleep, without headphones, using the internal device speakers—another reason why I prefer larger devices. For pausing and resuming playback and skipping I use the watch, with the phone in my pocket or placed somewhere near. I never use AirPlay or listen over the stereo. Podcasts are near-field audio for me, they are personal. When another person enters the room, I stop playback. I quit listening on walks, prefering sounds of nature, the city, or company.

Constanly trying out new podcasts, my subscriptions level around one hundred podcasts. Three of my regulars, I love and have been listening to for years, are [Scriptnotes](http://scriptnotes.net), [Longform](https://longform.org/podcast), and the [New Yorker Fiction](https://www.newyorker.com/podcast/fiction) podcast.

I never tinker with playback speed. Podcasts are sound, editors put effort into that shit. At what speed do you listen to music?

Chapters? I don’t need those. That’s what episodes are for, skipping forward means next episode. Don’t @ me.

#### What do I want

Can I shift priorities and combine compromises in a way that lets me build a better podcasts app?

- Audio and Video Playback including streaming
- Being offline should be fine
- Clear user interface
- Good search for shows and episodes
- Powerful landscape mode
- Read about episodes before playing them
- Sync
- Solid skipping via Control Center and Watch

#### Inverted approach to building it

The user interface of a podcast app is challenging, it has to communicate two narratives, information and playback. You can look at one thing, while you are playing another thing. A browser and a player.

[![Podest](/img/podest.svg "Podest Logotype")](https://itunes.apple.com/us/app/podest/id794983364)

Once I had a somewhat working prototype, I quit using other apps. I deleted them from my phone to go about this fresh. This was great for motivation, when my app didn’t work, I wasn’t able to listen to podcasts. I’m the [first customer](https://github.com/joyent/eng/blob/master/docs/index.md#rule-1-fcs-quality-all-the-time), dogfooding daily builds.

Podest is a simple, yet powerful podcast app. Obviously, this late in the party I’m not trying to compete with the quantity of features, but with quality.

[![Podest](/img/podest_app_icon.svg "Podest App Icon")](https://itunes.apple.com/us/app/podest/id794983364)

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

Check the product page on the [App Store](https://itunes.apple.com/us/app/podest/id794983364) for details.

I’m in the process of open sourcing the app, all the Swift and JavaScript modules get published on [GitHub](https://github.com/michaelnisi/).

#### Download on the App Store

Back to the initial question. Does it make sense to build something that already exists? If you think you can improve something, of course, but even if not. If you can, you should build all the things. Diversity produces progress. Always reinvent the wheel! That’s how we learn.


**There were plenty podcast players, but no podcast browser. Try it and tell me what you think.**
[![App Store](/img/app_store.svg "App Store Badge")](https://itunes.apple.com/us/app/podest/id794983364)
