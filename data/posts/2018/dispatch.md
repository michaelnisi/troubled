For lower latency, the time you have to wait for a response, work has to be done at the same time. Think supermarket cashiers. Commonly, this is called concurrency or parallelism.

Concurrent computing means executing work units during overlapping time periods. In single threaded environments, like Node.js.

In parallel computing work units are executed simultanously.

On Apple platforms, the Dispatch framework allows blocks to be scheduled for asynchronous and concurrent execution.

Don’t make any assumptions about where, on which thread, your callback blocks are run. Always shun the work to the queue you want it to run on. The caller knows the context, the worker does the work. The callback mediates between context, client, and worker.
