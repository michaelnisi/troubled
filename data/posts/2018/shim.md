{
  "title": "Shimmy Shimmy Ya",
  "description": "With Swift 4.2 the Package Manager introduces System Library Targets.",
  "template": "article.pug",
  "date": "2018-09-25",
  "path": "2018/09"
}

Being an iOS developer, I cannot fully use the [Package Manager](https://swift.org/package-manager/) yet, but I keep my frameworks compatible if possible, with the nice side effect of making them workable without Xcode.

A shining facet of Swift is its interoperabiltiy with C, but [importing a C library into Swift](https://oleb.net/blog/2017/12/importing-c-library-into-swift/) has been surprisingly cumbersome before [Swift 4.2](https://swift.org/blog/swift-4-2-released/).

With [system library targets](https://github.com/apple/swift-evolution/blob/master/proposals/0208-package-manager-system-library-targets.md), which move the current system-module packages feature from package to target level, describing a package dependency on a system library became much easier. Previously, we were tempted to create isolated repos for our system library shims, containing lonely and deserted [module maps](https://clang.llvm.org/docs/Modules.html)—like [so](https://github.com/michaelnisi/csqlite)—undermining the team’s original, remarkably naïve, intention of inherent standardization.

> Our original motivation in forcing system packages to be declared as standalone packages was to encourage the ecosystem to standardize on them, their names, their repository locations, and their owners. In practice, this effort did not work out and it only made the package manager harder to use.

Using the new system library target, we can ditch those extra repos, pulling the module maps into our packages, where we are now able to express system library dependencies, without exposing them.

```swift
let package = Package(
  name: "ZLib",
  products: [
    .library(name: "ZLib", targets: ["ZLib"]),
  ],
  targets: [
    .target(
      name: "ZLib",
      dependencies: ["CZLib"]),
    .systemLibrary(
      name: "CZLib")
  ]
)
```

Here, our `ZLib` package depends on `CZLib`, a C library, we are now able to make available inside our package.

Allow me to explain this with a concrete example. I’ve learned about this, when I was updating my Skull framework, the SQLite3 wrapper I like to use. This framework, of course, depends on `SQLite3`, which I had to express using a system-module package, living in its own little repo. With 4.2, this, not terribly elegant approach, has been deprecated.

Now, I can describe my package like this.

```swift
// swift-tools-version:4.2
import PackageDescription

let package = Package(
  name: "Skull",
  products: [
    .library(name: "Skull", targets: ["Skull"])
  ],
  targets: [
    .systemLibrary(name: "CSqlite3", path: "Libraries/CSqlite3"),
    .target(name: "Skull", dependencies: ["CSqlite3"], path: "Sources"),
    .testTarget(name: "SkullTests", dependencies: ["Skull"])
  ],
  swiftLanguageVersions: [.v4_2]
)
```

And provide the module map for the system library named `CSqlite3` within the package using the `path` parameter.

```
Libraries
└── CSqlite3
    ├── module.modulemap
    └── shim.h
```

It works if you, after cloning into Skull, can do:

```
swift test
```

Or trying the example, with:

```
cd example && swift run
```

Which resolves dependencies, compiles, and runs, which should result in something like this:

```
Fetching https://github.com/michaelnisi/skull
Completed resolution in 1.53s
Cloning https://github.com/michaelnisi/skull
Resolving https://github.com/michaelnisi/skull at 8.0.2
Compile Swift Module 'Skull' (1 sources)
Compile Swift Module 'example' (1 sources)
Linking ./.build/x86_64-apple-macosx10.10/debug/example
Earth
```

[Bon Voyage](https://www.youtube.com/watch?v=WQJ2_T24JqY) ✌️🕶
