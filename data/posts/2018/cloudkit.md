{
  "title": "Synchronizing With CloudKit",
  "description": "A conceptual overview of using Apple’s CloudKit framework to synchronize data across devices running your app.",
  "template": "article.pug",
  "date": "2018-08-24",
  "path": "2018/08"
}

[CloudKit](https://developer.apple.com/icloud/cloudkit/) is Apple’s cloud backend service and application development framework for structured storage. CloudKit lets developers leverage Apple’s vast infrastructure basically for free, given you have a developer account, of course.

But wait, how much exactly does it cost?

> Simply put: you're not going to be paying for CloudKit. Period.
—[@guilhermerambo](https://medium.com/@guilhermerambo/synchronizing-data-with-cloudkit-94c6246a3fda)

Selling many device types to its customers, who often own multiple Apple devices, the company must provide a somewhat integrated user experience across macOS, iOS, watchOS, and tvOS. For [data synchronization](https://en.wikipedia.org/wiki/Data_synchronization), this infamously hard and repetitive challenge, they can impossibly rely on their developer community alone.

#### CloudKit currently scales to hundreds of millions of users

Apple has been treading a path for making sync easier, implementing, dog-fooding, and iterating on ways for storing and managing structured data for mobile applications with [CloudKit](https://developer.apple.com/documentation/cloudkit) and [CloudKit Dashboard](https://developer.apple.com/library/content/documentation/DataManagement/Conceptual/CloudKitQuickStart/EditingSchemesUsingCloudKitDashboard/EditingSchemesUsingCloudKitDashboard.html). Not trivial of course, but manageable—pleasant even. If CloudKit backs [iCloud Drive](https://www.apple.com/lae/icloud/icloud-drive/), [Photos](https://www.apple.com/ios/photos/), and Notes at Apple, we might consider using it for our puny apps.

📚👓 When I’ve initially been writing this, back in February 2018, Apple just published their CloudKit paper, [CloudKit: Structured Storage for Mobile Applications](http://www.vldb.org/pvldb/vol11/p540-shraer.pdf).

Isn’t this new [openess](https://hbr.org/2013/03/why-apple-is-going-have-to-bec) great? I love that the CloudKit stack employs two [Apache](http://apache.org/) projects, [Cassandra](http://cassandra.apache.org/) as storage layer and [Solr](http://lucene.apache.org/solr/) for indexing.

#### Local storage is your job

[Maintaining a local cache of CloudKit Records](https://developer.apple.com/library/content/documentation/DataManagement/Conceptual/CloudKitQuickStart/MaintainingaLocalCacheofCloudKitRecords/MaintainingaLocalCacheofCloudKitRecords.html#//apple_ref/doc/uid/TP40014987-CH12-SW1) is well documented. Skipping the details, I’ll sketch a conceptual overview of CloudKit from my perspective and point out stepping stones that surfaced for me, while implementing sync with CloudKit for [Podest](https://itunes.apple.com/app/podest/id794983364), my new podcast app.

The CloudKit framework implements an iCloud client for structured data, decoupling local and remote data structures, while providing efficient diffing between the two. Local storage is left to us, its users.

Data in iCloud is segregated and encapsulated in containers, owned by developers—apps of other developers cannot access your containers.

#### Environment, Database, Zone, and Record

The CloudKit schema, one of the aforementioned containers, is structured into environments (development and production), databases (private, shared, and public), zones, and records. For a quick conceptual refresher, watch the first part of this [WWDC 2017](https://developer.apple.com/videos/wwdc2017/) presentation: [Build Better Apps with CloudKit Dashboard](https://developer.apple.com/videos/play/wwdc2017/226/), Session 226, [@djbrowning](https://twitter.com/djbrowning), CloudKit.

#### Records are the elemental unit in CloudKit

Leapfrogging [containers](https://developer.apple.com/documentation/cloudkit/ckcontainer), environments, [databases](https://developer.apple.com/documentation/cloudkit/ckdatabase), and [zones](https://developer.apple.com/documentation/cloudkit/ckrecordzone); let’s examine [records](https://developer.apple.com/documentation/cloudkit/ckrecord) first, the elemental units in CloudKit. `CKRecord` can contain simple types or pointers to other records, using parental references to structure data. Records are temporary containers, from which you build your domain specific structures. Records are identified by `CKRecordID`, using a zone ID, `CKRecordZoneID`, and a record name, which, for automatically created records, is a UUID, and is therefore unique across zones. Custom names must be unique per-zone.

#### The truth lies in the cloud

Truth is multifaceted, in life and computing, especially in distributed systems. Sync, synchronization of state between different computers, is one of those classic computer science problems, [Paxos](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf), et al. What is true? Or better, where is truth? For CloudKit sync, truth is on the server. In a iCloud based system, the iCloud server is the source of truth, while the app maintains a local cache, and CloudKit is the glue between the two. The truth lies in the cloud is the fundamental assumption to internalize when working with CloudKit. Consequently, this means the app should be able to toss the local cache entirely, starting from scratch by pulling data from iCloud. While at the same time, and that’s the interesting part, the source of truth, iCloud, might not be available due to network outage, for example, or the user might not have an iCloud account at all, meaning the app has to be build in such a way, that it’s usable without iCloud. *The truth lies in the cloud if it’s available.*

The stateful access point of the CloudKit API is `CKContainer`. It owns an operation queue, to which you add operations to interact with a iCloud database.

#### CloudKit is Operation based

CoudKit’s API is [Operation](https://developer.apple.com/documentation/cloudkit/ckoperation) based, an interesting and inspiring choice, I think. On that note, even if you are not planning to use CloudKit, I recommend to study it, as guide for modern Cocoa API design.

To obtain the current user name, which is required for certain things, creating zones, for example, use the global constant [`CKCurrentUserDefaultName`](https://developer.apple.com/documentation/cloudkit/ckcurrentuserdefaultname).

#### Only what has changed

A powerful feature of CloudKit is change tracking. Being able to limit data transfers to just actual changes since the last request, including deletions, obviously, makes all the difference. Depending on your app, CloudKit request-response-cycles can be designed to be neglectably short, transferring tiny chunks of data to provide a seemless user experience.

> CloudKit lets you ask for only what has changed!

Change tracking is only available in custom zones of the user’s private database. To reduce data transfer, CloudKit assigns tokens to changes on the database and the zone level. Practically, you’d divide your app’s domain into zones of related data—in the context of change tracking. In a typical refresh cycle you might first fetch data base changes, receiving identifiers of all zones that have been changed since a state marked by a server change token from an earlier request—or without, starting from scratch. Notice the distinction between database and zone tokens. From the [docs](https://developer.apple.com/documentation/cloudkit/ckfetchdatabasechangesoperation/1640502-init):

> This per-database [`CKServerChangeToken`](https://developer.apple.com/documentation/cloudkit/ckserverchangetoken) is not to be confused with the per-recordZone [`CKServerChangeToken`](https://developer.apple.com/documentation/cloudkit/ckserverchangetoken) from [`CKFetchRecordZoneChangesOperation`](https://developer.apple.com/documentation/cloudkit/ckfetchrecordzonechangesoperation).

With the identifiers of changed zones, you’d now fetch the changed records, including deleted ones, again, passing a token, except now, the zone server change token. This gives you the changed records per zone, neatly relatable, which you would now integrate into your local cache.

Comparing server change tokens, I’ve noticed that they, database change tokens at least, are updated with each request, wether data on the server has changed or not. Probably to track time between requests on the server.

While pushing data to the server with [`CKModifyRecordsOperation`](https://developer.apple.com/documentation/cloudkit/ckmodifyrecordsoperation) you can pass a client change token. The server will include this in the result of your next fetch as means for you to check if your last push went through. It doesn’t really help much, of course, but at least you can adjust your assumptions. Contrary to the server change tokens, which are per database and per zone, there’s only one client change token per database. I just mention this, because it tripped me up, during my first experiments with this API.

Inherently, CloudKit change tokens are coupled with the state of your local cache. Don’t store them separately, but within the cache, guaranteeing synchronized deletion. You don’t want to end up deleting your local cache, while keeping the change tokens. Especially during development this can get confusing.

With that being said, by popular demand, here’s the [gist](https://gist.github.com/michaelnisi/ac0c1242db9ddb940b93f8a32c39ccf7) of persisting server change tokens and UUIDs, for client change tokens, with `UserDefaults`.

Merging is app specific, getting your hands dirty, you will find that handling all edge cases, even with just a single truth, in the cloud, can become challenging. As soon as you start tinkering with elaborate merge schemes, all is lost. At least initially, I recommend implementing a version where iCloud is master that works for most of your use cases. Iterate from there.

Don’t be surprised if you are receiving the changes on the device that pushed them, this kind of statefulness is irrelevant for Cloudkit. Use one code path for pulling and merging and one code path for pushing. Less state is better.

If you are new to data merging, begin thinking about synchronized deletions and [transaction logs](https://en.wikipedia.org/wiki/Transaction_log). 👀

#### CloudKit Dashboard

The CloudKit Dashboard is a convenient web UI that lets you inspect and modify your CloudKit containers. Select your container to access: data, logs, telemetry, usage, and settings of your respective development and production environments. While CloudKit is [schema-less](https://blog.couchbase.com/the-value-of-schema-less-databases/) and record introduction and modification is done via code, the Dashboard is priceless while iterating on sync. It lets you inspect live and historical logs, but more importantly it allows you to modify all aspects of your databases, zones, records, record types, indexes, subscriptions, subscription types, and security roles—**live**, while your test devices are connected. You can go wild in the development environment and put your code into unlikely places to make sure it’s able to recover.

CloudKit lets you add and remove indexes after the fact, which is pretty damn cool. You can index fields to be `QUERYABLE`, `SORTABLE`, and `SEARCHABLE`. Remove inessential indexes before deploying to production, reducing the footprint of your app. During development, index `recordName` as `QUERYABLE` to be able to query your zones for records, add and remove indexes as needed for inspection while you’re working on your client.

I miss a way to list specific record properties for comparing. And, of course, I would generally prefer a CLI, which would let me analyze data properly. But that would be too easy, it’s Apple after all.

A CloudKit CLI in Swift would be a 🔥 open source project. Email me if you are working on one.

#### Error Handling

As with all network programming, when using CloudKit, although conveniently high level, pessimistic error handling, anticipating the worst, is paramount for attaining [fail-safe](https://en.wikipedia.org/wiki/Fail-safe) operations. With [CKError](https://developer.apple.com/documentation/cloudkit/ckerror), CloudKit has a sophisticated error type, providing sufficient context for reasonable decisions. Errors like `.zoneNotFound` and `.userDeletedZone` are immanent in this API and among the first things you’d encounter starting out.

#### CloudKit is the obvious choice for synchronized storage of structured data

[Implicit authentication](https://medium.com/@skreutzb/ios-onboarding-without-signup-screens-cb8a76d01d6e), little operational effort, and low costs make CloudKit the obvious choice for synchronized data storage, for apps distributed through the App Store.
