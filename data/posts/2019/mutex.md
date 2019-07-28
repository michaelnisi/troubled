{
  "title": "Mutual Exclusivity",
  "description": "Exclusive access to shared mutable state with Swift.",
  "template": "article.pug",
  "date": "2019-07-28",
  "path": "2019/07"
}

Threads enable execution of multiple code paths concurrently. With things happening at the same time, we need to control access of mutable state in our programs. Granting access to only one thread at a time prevents race conditions, which put your program into quantum superposition—you know, the thing with the [cat](https://en.wikipedia.org/wiki/Schrödinger%27s_cat).

What happens when both kids grab that last dinner roll? 🍞💥

As introduction you should read what [Mike Ash](https://www.mikeash.com/pyblog/) has to say in [Locks, Thread Safety, and Swift: 2017 Edition](https://www.mikeash.com/pyblog/friday-qa-2017-10-27-locks-thread-safety-and-swift-2017-edition.html). And here’s a [Gist](https://gist.github.com/steipete/36350a8a60693d440954b95ea6cbbafc) by [@steipete](https://twitter.com/steipete) with performance tests of all locking options.

I tend to control access to mutable state from different threads on iOS with DispatchQueue, but let’s first look at a Foundation class.

#### NSLock

In [Foundation.framework](https://developer.apple.com/documentation/foundation) we find [NSLock](https://developer.apple.com/documentation/foundation/nslock), a simple but brittle and somewhat wordy mechanism for synchronizing access to a resource.

```swift
cheeseburger.lock()
defer { cheeseburger.unlock() }
return compute()
```

The `defer` keyword helps making sure we are always unlocking our lock, after returning or throwing. However, chances are that we unlock something that isn’t locked or unlock from a different thread which can result in undefined behavior.

#### DispatchQueue

Better than using locks is to design points of synchronization into your program. Queues are the obvious tool for organzing work. Many may be familiar with [message queues](https://en.wikipedia.org/wiki/Message_queue). On Apple platforms we use [Dispatch.framework](https://developer.apple.com/documentation/dispatch) to run code on multicore hardware. It uses dispatch queues for managing serial or concurrent task execution. *Dispatch* distributes work to threads and cores. Making the tough calls, it lets us concentrate on building our libraries and apps.

*Dispatch* gives you [DispatchQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue), which lets you create custom serial queues that can be used for controlling access in a rather elegant way.

```swift
let serialQueue = DispatchQueue(
  label: "me.can.has.cheeseburger",
  target: .global()
)

var cheeseburger: 🍔 {
  return serialQueue.sync { compute() }
}
```

The serial queue guarantees singly access, only one caller, thread to stay on topic, can access the resource at a time. Imagine a queue at a supermarket cash register where only one customer gets served at a time. 🛒🛒🛒

Making apps, I did not find this technique slowing anything down, quite the contrary. Keeping your code synchronous at the lower levels, allows for more creativity at the higher levels for making things go fast.

Also, note that creating a new DispatchQueue is quick, `os_signpost` just reported 160.93 µs Avg Duration, that’s 0.00016093 seconds on a crusty iPhone 6s Plus. However, I should probably trace the first dispatch, now that I think of it. Measuring can be misleading, keep that in mind.

For performance critical code with many reads and rare slow writes, you can go faster by using a concurrent queue to which you would submit your writing blocks with the `.barrier` flag asynchronously. This construction models a [readers-writer lock](https://en.wikipedia.org/wiki/Readers–writer_lock), only stalling reads during writes without corrupting ongoing reads.

💡 Aside from its ambiguity, always measure *performance*. Never make assumptions, you are not a computer.

If you are haunted by race conditions, don’t just perforate your code with locks and disparate queues, instead go back to the drawing board and think about the design of your software. Often times there is an elegant way out. Try to think in queues of events and tasks. Keep in mind that an [OperationQueue](https://developer.apple.com/documentation/foundation/operationqueue) can be made serial by limiting its maximum number of queued operations to one.

Combining DispatchQueue and OperationQueue creatively often produces satisfying solutions for humans and computers. Remember, performance is not everything.

💡 If your tasks are too small, context switching may thwart your efforts.

#### Avoid excessive thread creation

Unfortunately, we cannot be entirely thread-agnostic using Dispatch [just yet](https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782). Designing our own queues, we must avoid excessive thread creation. Never block the current thread from a task submitted to a concurrent dispatch queue, the system will create new threads to run its other tasks and eventually your app will run out of threads. Try not to use private concurrent queues, use the global concurrent queues instead.

Locking with serial queues is super handy, but you might end up creating too many threads. Make sure to set the target of your serial queues to one of the [global system queues](https://developer.apple.com/documentation/dispatch/dispatchqueue/2300077-global).

```swift
let serialQueue = DispatchQueue(
  label: "me.can.has.cheeseburger",
  target: .global()
)
```

The default [DispatchQoS.QoSClass](https://developer.apple.com/documentation/dispatch/dispatchqos/qosclass) usually does the job. If necessary, you can fine-tune timing by conducting access using different quality of service classes: user-interactive, user-initiated, default, utility, background, and unspecified.

#### Trust the system

Always fasten your seatbelts—[ThreadSantizer](https://clang.llvm.org/docs/ThreadSanitizer.html) and Main Thread Checker, found in the Diagnostics tab of your Xcode Scheme, have your back. Do not try to control threading yourself, trust Dispatch and keep your code simple.

💡 Check dispatch conditions with [dispatchPrecondition(condition:)](https://developer.apple.com/documentation/dispatch/1780605-dispatchprecondition).

Writing closures, don’t make assumptions about their target queue. Although redispatching seems costly, too many target assumptions set you up for a rickety house of cards, where unrelated changes have unexpected effects.

If your code absolutely must run on a specific queue, make it part of the contract, cleary expressed and documented. General rules within an app or library, segmenting it into subsystems that operate in specific dispatch trees, can help here. For example, [UIKit](https://developer.apple.com/documentation/uikit) only runs on the main queue. That’s the rule.

💡 Track down accessors with Xcode’s Find Call Hierarchy.

That’s all awfully ambivalent, but concurrent access is always a situation, even with Dispatch. We need stricter [contracts](https://github.com/apple/swift/blob/master/docs/OwnershipManifesto.md), so the compiler can safe us from ourselves.

Thread safely 🧵
