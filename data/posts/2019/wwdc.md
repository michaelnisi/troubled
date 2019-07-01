{
  "title": "Swift Fruits",
  "description": "At the Apple Worldwide Developers Conference 2019 the fruit company presented its richest Swift induced harvest so far.",
  "template": "article.pug",
  "date": "2019-06-28",
  "path": "2019/06"
}

*Write code. Blow minds.* This year’s [Dub Dub](https://developer.apple.com/wwdc19/) did not fall short of its motto. Now, three weeks later, after the hot takes have cooled down, I quickly want to put the spotlight on the programming language that enabled these groundbreaking changes. En passant initiated by a research project that lead to [LLVM](https://llvm.org), after five years of community driven [evolution](https://apple.github.io/swift-evolution/), [Swift](https://swift.org) is real now.

Amazing, how some syntactic sugar and a type system on top of LLVM, as Chris Lattner jokingly put it on Sundell’s [show](https://www.swiftbysundell.com/podcast/50), has changed Apple’s software engineering.

#### Declarative user interface programming

The term functional programming is broadly used these days, a definite winner in buzzword bingo. We are catching the drift though, less state and a declarative programming model. *Functional* principles can help in all domains, UI programming is no exception, with plenty of state to manage, complex composites, and disparate sources of asynchronous events. Take [Elm](https://elm-lang.org) and, to some degree, [React Hooks](https://reactjs.org/docs/hooks-intro.html)… The trend is clear, testable software wins.

Building apps in a declarative way is one pillar of this year’s Dub Dub. [RxSwift](https://github.com/ReactiveX/RxSwift) got a sibling. [Combine](https://developer.apple.com/documentation/combine), a declarative Swift API for processing values over time.

React developers can relate to [SwiftUI](https://developer.apple.com/xcode/swiftui/), a declarative user interface framework with a new Swift [DSL](https://forums.swift.org/t/important-evolution-discussion-of-the-new-dsl-feature-behind-swiftui/25168) and deep Xcode integration, including live previews. Most developers are excited, [some](https://twitter.com/monkeydom/status/1144172782344986624) aren’t, Apple hit a nerve. SwiftUI is a simple way to build user interfaces across all Apple platforms. It’s a stepping stone to a unified Apple developer experience. If you have been on the fence, now is a good time to start developing for Apple platforms.

Anticipated for the longest time, a live-coding environment for Xcode—beyond *playgrounds*.

![SwiftUI in Xcode](/img/wwdc19/swiftui@1x.jpg "Xcode 11")

These declarative Swift APIs are enabled by [Function Builders](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md), which allow you to create embedded domain-specific languages in Swift. Other parts of the puzzle are [Property Delegates](https://github.com/apple/swift-evolution/blob/master/proposals/0258-property-delegates.md) and the new custom view controller initializers ([1](https://developer.apple.com/documentation/uikit/uistoryboard/3213989-instantiateviewcontroller), [2](https://developer.apple.com/documentation/uikit/uistoryboard/3213989-instantiateviewcontroller)) in [iOS 13](https://developer.apple.com/documentation/ios_ipados_release_notes/ios_ipados_13_beta_2_release_notes).

📚 Read up on [Functional Swift](https://t.co/NkYwU3LE42) or watch some [videos](https://www.pointfree.co) if that’s your thing.

I cannot wait to build something with SwiftUI. However, familiar with the subtleties of app making, I remain sceptical. It’s all in the details. There’s a reason why I have never considered [React Native](https://facebook.github.io/react-native/).

#### Organizing and sharing code

Since the Swift Runtime is part of the OS, not longer baked into apps, launch times get quicker, app sizes shrink, and further optimizations, like faster bridging between Swift and Objective-C, are possible. For example, transitioning from String to NSString has gotten 15% faster with Swift 5.1.

👉 Swift 5 switched string encoding from UTF-16 to [UTF-8](https://swift.org/blog/utf8-string/).

With [ABI stability](https://swift.org/blog/abi-stability-and-more/), reached with Swift 5, and [module stability](https://forums.swift.org/t/plan-for-module-stability/14551), added now with 5.1, distributing binary frameworks became feasible. Framework and program can be build with different compilers. Module stability added a textual interface that is available during development.

📦 We love packages. They are the foundation of modern code ecosystems. Where would JavaScript be without [npm](https://www.npmjs.com)? One of the first things Mozilla put into place for Rust were [crates](https://crates.io). For the longest time, the Cocoa community had to help itself with [CocoaPods](https://cocoapods.org), a dull surrogate. Open sourcing Swift, Apple introduced [Swift Package Manager](https://github.com/apple/swift-package-manager), but without Xcode integration it was not ready for prime time, some even went so far and doubted its future. Fortunately, they were wrong. [Xcode 11](https://developer.apple.com/documentation/xcode_release_notes/xcode_11_beta_2_release_notes) supports Swift packages for all Apple platforms. 🍾

Packages are platform independent, they build for whatever the client needs. For example, you can build an iOS app and a watchOS app using the same package. Xcode builds the package accordingly. If you have ever maintained a multi-platform library, I am sure you will appreciate the implications of this.

Many common package manager practices, like [semantic versioning](https://semver.org) and package locking, become a part of software development with Xcode. Of course, niceties like code completion and documentation for dependencies are available within the IDE.

Xcode 11 is great, it really makes it hard to return to the old version, once you have used the Beta. I 💜 the mini-map, written in [Metal](https://developer.apple.com/metal/), I hear.

💡 Keep `Package.resolved` under version control. Similar to `package-lock.json` in the JavaScript community, people seem to get confused by this. If you want to make sure, you are talking about the same thing when you are discussing your software with your team, check in this file. Without it, you cannot know which code the other person is running.

In the coming years we will see a flourishing open source ecosystem for Apple platforms. Teams will organize their code in smarter ways and be able to iterate much faster on their products.

> Less Code. Better Code. Everywhere.

It’s great to see Swift bearing fruit. 🍒 I have not felt that inspired by Apple since the introduction of Swift. If SwiftUI is the new way of building apps, UIKit and AppKit are on their way of becoming implementation details.

The back and forth between code and [Interface Builder](https://developer.apple.com/xcode/interface-builder/) has always felt brittle and produced very individual workflows, making it harder to collaborate. Merging *storyboard* files became a dreaded part of the process. Replacing *storyboards* with a declarative UI programming language is a game changer.

I’m fired up for creating apps using these new possibilities, but mind you, our beloved UIKit isn’t going anywhere. Did you see those UI collection updates ([220](https://developer.apple.com/videos/play/wwdc2019/220/), [215](https://developer.apple.com/videos/play/wwdc2019/215))? 😍
