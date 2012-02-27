{
  "title": "Tools",
  "description": "Making oneself at home",
  "template": "article.jade",
  "date": "2012-01-07"
}

It is a rainy Saturday afternoon and I have just created a new user for myself on this machine, the lofty 13-Inch MacBook Air of my dear mother. Yes, she is almost 70 and impossible cool. To actually do something with this beautiful machine, I have to setup the environment. I figured it could be fun to write down the steps while I take them. Maybe you want to follow along. 

First things first: the Terminal. I prefer [iTerm 2] (http://iterm2.com) over the included Terminal. Download it from the [website](http://code.google.com/p/iterm2/downloads/list), move it to the Applications directory and launch it.

	Rhea:~ michael$

*Snippet 1: At the beginning*

I do not want to install everything manually, therefor it might be sensible to get a package manager now. The missing package manager for OS X is [Homebrew](http://mxcl.github.com/homebrew/), which requires [Xcode](http://developer.apple.com/xcode/) and Java Developer Update 3.

Xcode is available in the App Store. After I click Install, an installer is downloaded. Once the download is complete head to the Launchpad, launch the installer and click Install. To see if it went well, I check for [Clang](http://clang.llvm.org/), the frontend for [LLVM](http://www.llvm.org/), the compiler integrated in Xcode.

	Rhea:~ michael$ clang -v
	Apple clang version 3.0 (tags/Apple/clang-211.12) (based on LLVM 3.0svn)
	Target: x86_64-apple-darwin11.2.0
	Thread model: posix

*Snippet 2: Clang version*

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

*Snippet 3: hello, world*

>*While small test programs existed since the development of programmable computers, the tradition of using the phrase "Hello, world!" as a test message was influenced by an example program in the seminal book The C Programming Language. The example program from that book prints "hello, world" (without capital letters or exclamation mark), and was inherited from a 1974 Bell Laboratories internal memorandum by Brian Kernighan, Programming in C: A Tutorial, which contains the first known version.*—[Wikipedia](http://en.wikipedia.org/wiki/Hello_world_program)

If you are unfamiliar with Clang, you should introduce some errors and recompile to peep the expressive warnings and errors provided by Clang.

Next up, our beloved aunty Java, which is not preinstalled in OS X, but an installer is executed automatically, when you first request for Java.

	Rhea:~ michael$ java -version
	No Java runtime present, requesting install.
	Rhea:~ michael$ java -version
	java version "1.6.0_29"
	Java(TM) SE Runtime Environment (build 1.6.0_29-b11-402-11M3527)
	Java HotSpot(TM) 64-Bit Server VM (build 20.4-b02-402, mixed mode)

*Snippet 4: Java version*

Ready to install Homebrew now by executing this [script](https://raw.github.com/gist/323731).

	Rhea:~ michael$ /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"

*Snippet 5: Installing Homebrew*

I am not sure if the above way to install Java is sufficient and I do not know which brews actually require Java Developer Tools. The Java compiler is there at least.

javac -v

Hm, although my interest is rather dimmed, let me try to install Scala.

brew install scala

What next? [Wget](http://www.gnu.org/software/wget/), a package for retrieving files using HTTP, HTTPS and FTP; could prove useful in the near future.

	Rhea:~ michael$ brew install wget

*Snippet 6: Installing Wget*

I just realised that it may be more elegant to just alias curl. To apply that I could do the following.

	Rhea:~ michael$ brew uninstall wget
	Rhea:~ michael$ alias wget="curl -O"

*Snippet 7: Aliasing Curl*

Next up: the shell. I prefer [Z shell](http://www.zsh.org/), which comes with [Darwin](http://en.wikipedia.org/wiki/Darwin_(operating_system)).

	Rhea:~ michael$ zsh --version
	zsh 4.3.11 (i386-apple-darwin11.0)

*Snippet 8: Z shell version*

I switch the default shell from [bash](http://www.gnu.org/software/bash/) to zsh by installing [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh), a community-driven framework for managing your zsh configuration.

	Rhea:~ michael$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh

*Snippet 9: Installing oh-my-zsh*

Start zsh by opening a new terminal.

	Last login: Sat Jan  7 15:49:53 on ttys000
	➜  ~

*Snippet 10: Default oh-my-zsh prompt*

Homelike! Making progress. 

The default [theme](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) is solid, but I relish [Solarized](http://ethanschoonover.com/solarized), a sixteen color palette, designed by [Ethan Schoonover](http://ethanschoonover.com/).

	➜  ~ vim .zshrc
	
Change ZSH_THEME="robbyrussell" to ZSH_THEME="blinks".

	➜  ~ git clone git://github.com/altercation/solarized.git

*Snippet 12: Cloning Solarized*

Navigate in the iTerm menu to iTerm > Preferences > Profiles. Duplicate Default profile, name it Solarized Dark. Select Color tab and select Import… in the Load Presets ComboBox at the bottom. Import ~/solarized/iterm2-colors-solarized/Solarized Dark.itermcolors.

	➜  ~. ~/.zshrc 

*Snippet 12: Reloading Z shell configuration*

OK! As the terminal is adequate for my needs, it is time to get a proper editor, the second important tool in my toolset after the terminal. The editor of my choice is MacVim.

	michael@Rhea ~
  	  % brew install macvim

*Snippet 13: Installing MacVim*

Solarize mvim.

	michael@Rhea ~
  	  % mkdir -p ~/.vim/autoload ~/.vim/bundle

	michael@Rhea ~
  	  % curl -so ~/.vim/autoload/pathogen.vim https://raw.github.com/tpope/vim-pathogen/HEAD/autoload/pathogen.vim

*Snippet 13: Installing Pathogen*

	michael@Rhea ~
	  % cd .vim  

	michael@Rhea ~/.vim
	  % git clone git://git.wincent.com/command-t.git bundle/command-t 

	michael@Rhea ~/.vim
	  % cd bundle/command-t 

	michael@Rhea ~/.vim/bundle/command-t [master]
	± % rake make

*Snippet 13: Installing Command-t*

I spare you further details of Vim configuration and leave the editor with a link to my actual [.vimrc file](https://github.com/michaelnisi/mnconfig/blob/master/.vimrc).

I am learning Erlang these days.

	michael@Rhea ~
  	  % brew install erlang

*Snippet 13: Installing Erlang*

	michael@Rhea ~
	  % erl                                                                     !69
	Erlang R14B04 (erts-5.8.5) [source] [64-bit] [smp:4:4] [rq:4] [async-threads:0] [hipe] [kernel-poll:false]

	Eshell V5.8.5  (abort with ^G)
	1> 6*7.
	42
	2> q().
	ok
	3> %  

*Snippet 13: The Erlang shell*


And most importantly I need Node.js.

	michael@Rhea ~
  	  % brew install node

*Snippet 13: Installing Node*

	michael@Rhea ~
	  % . ~/.zshrc                                                              !93

	michael@Rhea ~
	  % node                                                                    !94
	> 6*7
	42
	> process.exit()


Next up: NPM, a packet manager for Node.

CoffeeScript is so intriguing.

npm install coffeescript

What next? Wouldn't a database and a webserver be nice?

A database.
brew install mongodb

A webserver.
brew install nginx

Done! It is getting dark by now and teatime is overdue. Good to have another machine setup, although my mother will probably never let me use it, I just grabbed this rare occassion by the horns to sneak in this installation. I hope you find it useful or maybe even entertaining.
