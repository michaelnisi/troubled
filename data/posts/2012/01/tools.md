{
  "title": "Tools",
  "description": "Making oneself at home",
  "template": "article.jade",
  "date": "2012-01-07"
}
$end
It is a rainy Saturday afternoon and I have just created a new user for myself on this machine, the lofty 13-Inch MacBook Air of my dear mother. Yes, she is almost 70 and impossible cool. To actually do something with this beautiful machine, I have to setup the environment. I figured it could be fun to write down the steps while I take them. Maybe you want to follow along. 

First things first: the Terminal. I prefer [iTerm 2] (http://iterm2.com) over the included Terminal. Download it from the [website](http://code.google.com/p/iterm2/downloads/list), move it to the Applications directory and launch it.

	Rhea:~ michael$

Snippet 1: At the beginning

I do not want to install everything manually, therefor it might be sensible to get a package manager now. The missing package manager for OS X is [Homebrew](http://mxcl.github.com/homebrew/), which requires [Xcode](http://developer.apple.com/xcode/) and Java Developer Update 3.

Xcode is available in the App Store. After I click Install, an installer is downloaded. Once the download is complete head to the Launchpad, launch the installer and click Install. To see if it went well, I check for [Clang](http://clang.llvm.org/), the frontend for [LLVM](http://www.llvm.org/), the compiler integrated in Xcode.

	Rhea:~ michael$ clang -v
	Apple clang version 3.0 (tags/Apple/clang-211.12) (based on LLVM 3.0svn)
	Target: x86_64-apple-darwin11.2.0
	Thread model: posix

Snippet 2: Clang version

I should be able to compile C, C++ and Objective-C now.

	Rhea:~ michael$ vim hello.c
	
	1 #include <stdio.h>                                                          
	2 
	3 int main() {
	4     printf("hello, world\n");
	5 }

	Rhea:~ michael$ clang hello.c
	Rhea:~ michael$ ./a.out
	Rhea:~ michael$ hello, world

Snippet 3: hello, world

>*While small test programs existed since the development of programmable computers, the tradition of using the phrase "Hello, world!" as a test message was influenced by an example program in the seminal book The C Programming Language. The example program from that book prints "hello, world" (without capital letters or exclamation mark), and was inherited from a 1974 Bell Laboratories internal memorandum by Brian Kernighan, Programming in C: A Tutorial, which contains the first known version.*—[Wikipedia](http://en.wikipedia.org/wiki/Hello_world_program)

If you are unfamiliar with Clang, you should introduce some errors and recompile to peep the expressive warnings and errors provided by Clang.

Next up, our beloved aunty Java, which is not preinstalled in OS X, but an installer is executed automatically, when you first request for Java.

	Rhea:~ michael$ java -version
	No Java runtime present, requesting install.
	Rhea:~ michael$ java -version
	java version "1.6.0_29"
	Java(TM) SE Runtime Environment (build 1.6.0_29-b11-402-11M3527)
	Java HotSpot(TM) 64-Bit Server VM (build 20.4-b02-402, mixed mode)

Snippet 4: Java version

Ready to install Homebrew now.

	Rhea:~ michael$ /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
	Rhea:~ michael$ brew -v
	0.8.1

Snippet 5: Installing Homebrew

What next? Wget, a package for retrieving files using HTTP, HTTPS and FTP; could prove useful in the near future.

	Rhea:~ michael$ brew install wget

Snippet 6: Installing Wget

I just realised that it may be more elegant to just alias curl. To apply that I could do the following.

	Rhea:~ michael$ brew uninstall wget
	Rhea:~ michael$ alias wget="curl -O"

Snippet 7: Aliasing Curl

Next up: the shell. I prefer Z shell, which comes with Darwin.

	Rhea:~ michael$ zsh --version
	zsh 4.3.11 (i386-apple-darwin11.0)

Snippet 8: Z shell version

I switch the default shell from bash to zsh by installing [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh), a community-driven framework for managing your zsh configuration.

	Rhea:~ michael$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh

Snippet 9: Installing oh-my-zsh

Start zsh by opening a new terminal.

	Last login: Sat Jan  7 15:49:53 on ttys000
	➜  ~

Snippet 10: Default oh-my-zsh prompt

Homelike! I make progress. 

The default [theme](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) is solid, but I relish [Solarized](http://ethanschoonover.com/solarized), a sixteen color palette, designed by [Ethan Schoonover](http://ethanschoonover.com/).
