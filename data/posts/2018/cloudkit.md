{
  "title": "Synchronizing With CloudKit",
  "description": "A conceptual overview of using Apple’s CloudKit framework to synchronize data across devices running your app.",
  "template": "article.pug",
  "date": "2018-02-05",
  "path": "2018/02"
}

[CloudKit](https://developer.apple.com/icloud/cloudkit/) is Apple’s cloud backend service and application development framework for structured storage. CloudKit lets developers leverage Apple’s vast infrastructure basically for free, given you have a developer account, of course.

But wait, how much exactly does it cost?

> Simply put: you're not going to be paying for CloudKit. Period.
—[@guilhermerambo](https://medium.com/@guilhermerambo/synchronizing-data-with-cloudkit-94c6246a3fda).

Selling many device types to its customers, who often own multiple Apple devices, the company must provide a somewhat integrated user experience across macOS, iOS, watchOS, and tvOS. For data synchronization, this infamously hard and repetitive problem, they can impossibly rely on their developer community alone.

Apple has been treading a path for making sync easier, implementing, dog-fooding, and iterating on ways for storing and managing structured data for mobile application with [CloudKit](https://developer.apple.com/documentation/cloudkit) and [CloudKit Dashboard](https://developer.apple.com/library/content/documentation/DataManagement/Conceptual/CloudKitQuickStart/EditingSchemesUsingCloudKitDashboard/EditingSchemesUsingCloudKitDashboard.html). Not trivial, of course, but manageable—pleasant even. If CloudKit is ready for production with apps like [iCloud Drive](https://www.apple.com/lae/icloud/icloud-drive/), [Photos](https://www.apple.com/ios/photos/), and Notes; chances are it’s ready for our puny apps.

#### CloudKit currently scales to hundreds of millions of users

📚👓 When I’ve initially been writing this, back in February 2018, Apple just published their CloudKit paper, [CloudKit: Structured Storage for Mobile Applications](http://www.vldb.org/pvldb/vol11/p540-shraer.pdf).

Isn’t this new [openess](https://hbr.org/2013/03/why-apple-is-going-have-to-bec) great? I love that the CloudKit stack employs two [Apache](http://apache.org/) projects, [Cassandra](http://cassandra.apache.org/) as storage layer and [Solr](http://lucene.apache.org/solr/) for indexing.

Diving in—without losing sight of the forest for the trees, I hope.

#### Local storage is your job

[Maintaining a local cache of CloudKit Records](https://developer.apple.com/library/content/documentation/DataManagement/Conceptual/CloudKitQuickStart/MaintainingaLocalCacheofCloudKitRecords/MaintainingaLocalCacheofCloudKitRecords.html#//apple_ref/doc/uid/TP40014987-CH12-SW1) is well documented, I won’t go into details here, but I will try to provide a conceptual overview and point out stepping stones, I found implementing sync with CloudKit.

The CloudKit framework implements an iCloud client for structured data, decoupling local and remote data structures, while providing efficient diffing between the two. Local storage is left to us, its users.

Data in iCloud is segregated and encapsulated in containers, owned by developers—apps of other developers cannot access your containers.

#### Environment, Database, Zone, and Record

The CloudKit schema, one of the aforementioned containers, is structured into environments (development and production), databases (private, shared, and public), zones, and records. For a quick conceptual refresher, watch the first part of this [WWDC 2017](https://developer.apple.com/videos/wwdc2017/) presentation: [Build Better Apps with CloudKit Dashboard](https://developer.apple.com/videos/play/wwdc2017/226/), Session 226, [@djbrowning](https://twitter.com/djbrowning), CloudKit.

#### Records are the elemental unit in CloudKit

Leapfrogging [containers](https://developer.apple.com/documentation/cloudkit/ckcontainer), environments, [databases](https://developer.apple.com/documentation/cloudkit/ckdatabase), and [zones](https://developer.apple.com/documentation/cloudkit/ckrecordzone); let’s examine [records](https://developer.apple.com/documentation/cloudkit/ckrecord) first, the elemental units in CloudKit. `CKRecord` can contain simple types or pointers to other records, using parental references to structure data. Records are temporary containers, from which you build your domain specific structures. Records are identified by `CKRecordID`, using a zone ID, `CKRecordZoneID`, and a record name, which, for automatically created records, is a UUID, and is therefore unique across zones. Custom names must be unique per-zone.

#### The truth lies in the cloud

Truth is multifaceted, in life and computing, especially in distributed systems. Sync, synchronization of state between different computers, is one of those classic computer science problems. [Paxos](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf), et al. What is true? Or better, where is truth? For CloudKit sync, truth is on the server. In a iCloud based system, the iCloud server is the source of truth, while the app maintains a local cache, and CloudKit is the glue between the two. The truth lies in the cloud is the fundamental assumption to internalize when working with CloudKit. Consequently, this means the app should be able to toss the local cache entirely, starting from scratch by pulling data from iCloud. While at the same time, and that’s the interesting part, the source of truth, iCloud, might not be available due to network outage, for example, or the user might not have an iCloud account at all, meaning the app has to be build in such a way, that it’s usable without iCloud. The truth lies in the cloud if it’s available.

The stateful access point of the CloudKit API is `CKContainer`. It owns an operation queue, to which you add operation to interact with a iCloud database.

#### CloudKit’s API is Operation based

CoudKit’s API is Operation based, an interesting and inspiring choice, I think. On that note, even if you are not planning to use CloudKit, I recommend to study it, as guide for modern Cocoa API design.

While pushing data to the server with CKModifyRecordsOperation you can pass client change token, probably a UUID. The server will include this in the result of your next fetch as means for you to check if your last push went through. It doesn’t really help much, of course, but at least you can adjust your assumptions. Contrary to the server change tokens, which are per database and per zone, there’s only one client change token per database. I just mention this, because it tripped me up, during my first experiments with this API.

Comparing server change tokens, I’ve noticed that they, database change tokens at least, are updated with each request, wether data on the server changed or not. Probably to track time between requests on the server.

To obtain the current user name, which is required for certain things, creating zones, for example, use the global constant `CKCurrentUserDefaultName`.

#### Change tracking to minimize data transfer

A powerful feature of CloudKit is change tracking. Being able to limit data transfers to just actual changes since the last request, including deletions, obviously, makes all the difference. Depending on your app, CloudKit request-response-cycles can be designed to be neglectably short, transferring tiny chunks of data to provide a seemless user experience.

> To use the change tracking functionality of CloudKit, you need to store your app data in a custom zone in the user's private database

To minimize data transfer, CloudKit uses change tokens. In a typical refresh cycle you might first fetch data base changes, receiving identifiers of all zones that have been changed, since a specific server change token, you might have received with an earlier request, or, without token, starting from scratch. Notice the distinction between database and zone tokens, from the [docs](https://developer.apple.com/documentation/cloudkit/ckfetchdatabasechangesoperation/1640502-init):

> This per-database CKServerChangeToken is not to be confused with the per-recordZone CKServerChangeToken from CKFetchRecordZoneChangesOperation.

With the identifiers of changed zones, you’d now fetch the changed records, including deleted ones, again, passing a token, except now, the per-recordZone server change token.

> CloudKit lets you ask for only what has changed!

As with all network programming, when using CloudKit, although conveniently high level, pessimistic error handling—anticipating the worst—is paramount. Attachment to expectation causes suffering. 🐼

#### CloudKit is the obvious choice for synchronized storage of structured data

Implicit authentication, little operational effort, and low costs make CloudKit the obvious choice for synchronized data storage, for apps distributed through the store.
