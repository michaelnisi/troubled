{
  "title": "Oh, We Met Through a Mutual Friend ",
  "description": "Access control to shared mutable state with Swift.",
  "template": "article.pug",
  "date": "2019-06-11",
  "path": "2019/06"
}

Threads enable execution of multiple code paths concurrently. With things happening at the same time, we need to control access to mutable state in our programs. Granting access to only one thread at a time prevents race conditions, which put your program into quantum superposition—you know, the thing with the [cat](https://en.wikipedia.org/wiki/Schrödinger%27s_cat). What happens if you and your date at dinner reach for the same piece of bread at the exact same time? 🍞

As introduction you should read what [Mike Ash](https://www.mikeash.com/pyblog/) has to say in [Locks, Thread Safety, and Swift: 2017 Edition](https://www.mikeash.com/pyblog/friday-qa-2017-10-27-locks-thread-safety-and-swift-2017-edition.html). Here’s a [Gist](https://gist.github.com/steipete/36350a8a60693d440954b95ea6cbbafc) by [@steipete](https://twitter.com/steipete) with performance tests of all locking options. I want to talk about two constructs I use with Swift on iOS to control access to mutable state from different threads: NSLock and DispatchQueue.

#### NSLock

Also in Foundation we find [NSLock](https://developer.apple.com/documentation/foundation/nslock), which uses POSIX threads to implement locking behaviour.

TODO: Explain lock

#### DispatchQueue

Better than using locks is to design points of synchronization into your program. Queues are the obvious tool for organzing work. Many may be familiar with [message queues](https://en.wikipedia.org/wiki/Message_queue). On Apple platforms we use [Dispatch.framework](https://developer.apple.com/documentation/dispatch) to run code on multicore hardware. It uses dispatch queues to manages the execution of tasks serially or concurrently. *Dispatch* distributes work to threads and cores. Doing chores, it lets us concentrate on our apps.

TODO: Explain serial queue sync locking

[DispatchQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue)

For performance critical code with many reads and rare slow writes, you can go faster by using a concurrent queue to which you would submit your writing blocks with the `.barrier` flag asynchronously. This construction models a [readers-writer lock](https://en.wikipedia.org/wiki/Readers–writer_lock), only stalling reads during writes without corrupting ongoing reads.

💡 *Aside from the term being ambigious, always measure performance, never make assumptions. You are not a computer.*

If you are haunted by race conditions, don’t perforate your code with locks, instead go back to the drawing board and think about the design of your software. Often times there is an elegant way out. Try to think in queues of events and tasks. Keep in mind that an [OperationQueue](https://developer.apple.com/documentation/foundation/operationqueue) can be made serial by limiting its maximum number of queued operations to one. Good apps use a creative combination of DispatchQueue and OperationQueue.

#### Avoid excessive thread creation

Unfortunately, we cannot be entirely thread-agnostic using Dispatch yet. Designing our own queues, we must avoid excessive thread creation. Never block the current thread from a task submitted to a concurrent dispatch queue, the system will create new threads to run its other tasks and eventually your app will run out of threads. Try not to use private concurrent queues, use the global concurrent queues instead. Locking with serial queues is super handy, but you might end up creating many queues. Make sure to set the target of your serial queues to one of the global concurrent queues.

#### Trust the system

I want to end with a rule of thumb for Dispatch. If you can delegate a decision to the system, do it. We are humans, we don’t know shit. And always use TSan, the [ThreadSantizer](https://clang.llvm.org/docs/ThreadSanitizer.html) of Xcode target Diagnostics—I never turn it off. Likewise, the Main Thread Checker.
