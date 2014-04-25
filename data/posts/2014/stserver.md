
{
  "title": "Static files over HTTP locally",
  "description": "While working on web UIs, it is often convenient to serve static files over HTTP in the local network in order to test on different devices.",
  "template": "article.jade",
  "date": "2014-04-25",
  "path": "2014/04"
}

OSX comes with `apachectl`, the Apache HTTP Server Control Interface, which lets you configure the preinstalled [Apache HTTP server](http://httpd.apache.org/) on your Mac.

To serve a particular directory on your system, you have to specify it in the Apache HTTP server configuration file located at:

    /etc/apache2/httpd.conf

Change these two lines (170 and 197 in my case):
    
    DocumentRoot "/Library/WebServer/Documents"
    <Directory "/Library/WebServer/Documents">

to point to your desired path:

    DocumentRoot "/path/to/your/site"
    <Directory "/path/to/your/site">

Start the server:
 
    sudo apachectl restart

Now you can browse to `http://YourComputerName.local` with your phone or tablet to check your responsive design (located at `/path/to/your/site` on your Mac).

Trivial of course, but I kept forgetting. Hopefully now, as I have written it down, on the next rare occassion when I have to fiddle with CSS, I will remember.

But wait! You don't really want to run Apache on your system, do you—I mean, who could possibly want that? Why not use [Node](http://nodejs.org/) to write a little server and save it to a file named `stserver.js`:

    var http = require('http')
      , st = require('st')

    http.createServer(st('/path/to/your/site')).listen(80)

Start the server (sudo because of access rights to port 80):
    
    sudo node stserver.js

Browse to `http://YourComputerName.local` to test. Less fluff, more buff! The [st](https://github.com/isaacs/st) module serves static files, does etags, caching, etc. In fact, it also comes with a CLI. So, if installed globally:

    npm install -g st

You can spawn a server from the command-line like so:

    sudo st -p 80 -d /path/to/your/site

Anyhow, what was my point? I forgot.

