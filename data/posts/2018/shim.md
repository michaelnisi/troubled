{
  "title": "Shimmy Shimmy Ya",
  "description": "With Swift 4.2 the Package Manager introduces System Library Targets.",
  "template": "article.pug",
  "date": "2018-09-25",
  "path": "2018/09"
}

A shining facet of Swift is its interoperabiltiy with C, but [importing a C library into Swift](https://oleb.net/blog/2017/12/importing-c-library-into-swift/) has been surprisingly cumbersome before [Swift 4.2](https://swift.org/blog/swift-4-2-released/).

With [Package Manager System Library Targets](https://github.com/apple/swift-evolution/blob/master/proposals/0208-package-manager-system-library-targets.md), which move the current system-module packages feature from package to target level, describing a package dependency on a system library became much easier. Previously, we were tempted to create repos for each system library shim, containing lonely and deserted [module maps](https://clang.llvm.org/docs/Modules.html)—like [this one](https://github.com/michaelnisi/csqlite)—undermining the team’s original, remarkably naïve, intention of inherent standardization.

> Our original motivation in forcing system packages to be declared as standalone packages was to encourage the ecosystem to standardize on them, their names, their repository locations, and their owners. In practice, this effort did not work out and it only made the package manager harder to use.


