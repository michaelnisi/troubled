{
  "title": "WWDC19 Blow code. Write minds.",
  "description": "Remote impressions of the Apple Worldwide Developers Conference 2019.",
  "template": "article.pug",
  "date": "2019-06-05",
  "path": "2019/06"
}

This year’s [Dub Dub](https://developer.apple.com/wwdc19/) keynote was quite a bombshell and people are firing their hot takes. I quickly want to highlight three topics: developer experience, packages, and collections.

#### Developer experience

The term functional programming is used very broadly these days. Anything is buzzing with functional programming now. If you haven’t written any Haskell, you probably don’t know what you are talking about. Functional programming today commonly means less state and a declarative programming model, think [React Hooks](https://reactjs.org/docs/hooks-intro.html). Tagging React *functional* is a stretch, but you get the idea. It’s a trend, testable software wins.

Building apps in a declarative way is one pillar of this year’s Dub Dub. [RxSwift](https://github.com/ReactiveX/RxSwift) got a sibling. [Combine](https://developer.apple.com/documentation/combine), a declarative Swift API for processing values over time.

React developers will get interested when they see [SwiftUI](https://developer.apple.com/xcode/swiftui/), a declarative Swift UI framework with Xcode integration, including live previews. People are excited—some not so much—Apple hit a nerve. SwiftUI is a simple way to build user interfaces across all Apple platforms. It’s a stepping stone to a unified Apple developer experience. If you have been on the fence, now is a good time to start developing for Apple platforms.

![SwiftUI in Xcode](/img/wwdc19/swiftui@1x.jpg "Xcode 11")

These declarative Swift APIs are enabled by [Function Builders](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md), which allow you to create embedded domain-specific languages in Swift. Other parts of the puzzle are [Property Delegates](https://github.com/apple/swift-evolution/blob/master/proposals/0258-property-delegates.md) and the new custom view controller initializers.

Might be a good time read up on [Functional Swift](https://t.co/NkYwU3LE42) or watch some [videos](https://www.pointfree.co) if that’s your thing.

#### Packages

Xcode 11
Swift packages for all Apple platforms
Swift 5.1 module stability

#### Collections

Compositional Layouts + Data source diffing is here

#### Apple is on a roll

It’s great to see how Swift starts bearing fruit. Harvest time 🌽

> Less Code. Better Code. Everywhere.

I’ve not felt that inspired by Apple since the introduction of Swift. However, knowing the complexities of building *real* apps, I remain sceptical and can’t wait to explore what can be build with SwiftUI. It’s all in the details. There’s a reason why I have never considered [React Native](https://facebook.github.io/react-native/).

If SwiftUI is the new way of building apps for Apple platforms, UIKit and AppKit are on their way of becoming implementation details. Without *storyboards*, the way we use Interface Builder will change.

To end, here are select things from my notes.

#### iOS

- 2x faster app launch and smaller download size
- A lovely serif, [New York](https://developer.apple.com/fonts/)
- Dark Mode
- Hundreds of system icons with [SFSymbols](https://t.co/zLSBq14fzw?amp=1)
- Multiple UI Instances
- [Core Data Sync](https://developer.apple.com/documentation/coredata/mirroring_a_core_data_store_with_cloudkit/)

#### macOS

- Voice Control
- Z shell is default on macOS Catalina 😎
- iPad apps for Mac (Project Catalyst fka Marzipan)
- iTunes exploded into three apps: Apple Music, TV, and Podcasts

#### Watch

- Stand alone apps and App Store for watch

#### More tooling

- Bug reporting with the new Feedback Assistant app
- Xcode mini map (⌘ to see symbol names and jump right to them)
