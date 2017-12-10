{
  "title": "Synchronizing App State With CloudKit",
  "description": "A conceptual overview of using Apple‘s CloudKit framework to synchronize data across devices running your app.",
  "template": "article.pug",
  "date": "2017-10-23",
  "path": "2017/10"
}

[Maintaining a Local Cache of CloudKit Records](https://developer.apple.com/library/content/documentation/DataManagement/Conceptual/CloudKitQuickStart/MaintainingaLocalCacheofCloudKitRecords/MaintainingaLocalCacheofCloudKitRecords.html#//apple_ref/doc/uid/TP40014987-CH12-SW1) is well [documented](https://developer.apple.com/documentation/cloudkit). I won‘t go into details here, but I will try to provide a conceptual overview and point out stumbling blocks, I encountered implementing sync with CloudKit.

Apple‘s CloudKit enables you to store structured data in iCloud, leveraging Apple‘s vast infrastructure for free, given you have a developer account, of course. This is fantastic, it means low operational effort and low costs to maintain an app that synchronizes data across devices, which is important for Apple, of course, selling a plethora device types, while providing a somewhat consistent user experience across macOS, iOS, watchOS, and tvOS. They can impossibly rely on their developer community to get sync, a reasonably hard problem, right—again and again, for each and every app. At least, Apple realizes, they have to help with this hideous task. And they do, providing ways to store, with CloudKit, and review, with the CloudKit Dashboard, structured data in iCloud, making sync, not trivial—it never will be—but manageable.

The CloudKit framework is a iCloud client for structured data, leaving local storage to its users, decoupling local and remote data structures, while providing efficient diffing between the two.

The CloudKit schema is structured into environments: development and production; databases: private, shared, and public; zones, and records.

For a quick conceptual refresher, watch the first part of this presentation from WWDC 2017, [Build Better Apps with CloudKit Dashboard](https://developer.apple.com/videos/play/wwdc2017/226/), Session 226, Dan Browning, CloudKit:

TODO: Database

TODO: Zone

The elemental unit in CloudKit is `CKRecord`, records can contain simple types or pointers to other records, using parental references to structure data. Records are temporary containers, from which you‘d build your domain specific structures. Records are identified by `CKRecordID`, using a zone ID, `CKRecordZoneID`, and a record name, which, for automatically created records, is a UUID, and is therefore unique across zones. Custom names must be unique per-zone.

TRUTH is a multifaceted, in life and in distributed systems. Sync, synchronization of state between different computers, is one of those classic computer science problems. Paxos, et al. Where‘s truth? For CloudKit sync, truth is on the server. In a iCloud based system, the iCloud server is the source of truth, while the app maintains a local cache, and CloudKit is the glue between the two. **The truth lies in the cloud** is the fundamental assumption to internalize when working with CloudKit. Consequently, this means the app should be able to toss the local cache entirely, starting from scratch by pulling data from iCloud. While at the same time, and that’s the interesting part, the source of truth, iCloud, might not be available due to network outage, for example, or the user might not have an iCloud account at all, meaning the app has to be build in such a way, that it’s usable without iCloud, ergo **the truth lies in the cloud, if it’s available.** Sounds like fun? 💞

The stateful access point of the CloudKit API is `CKContainer`. It owns an operation queue, to which you add operation to interact with a iCloud database.

TODO: Operations

While pushing data to the server with CKModifyRecordsOperation you can pass client change token, probably a UUID. The server will include this in the result of your next fetch as means for you to check if your last push went through. It doesn’t really help much, of course, but at least you can adjust your assumptions. Contrary to the server change tokens, which are per database and per zone, there’s only one client change token per database. I just mention this, because it tripped me up, during my first experiments with this API.

Comparing server change tokens, I’ve noticed that they, database change tokens at least, are updated with each request, wether data on the server changed or not. Probably to track time between requests on the server.

To obtain the current user name, which is required for certain things, creating zones, for example, you can use CKFetchRecordsOperation.fetchCurrentUserRecordOperation(), `CKContainer`.fetchUserRecordID(), or simple the constant CKCurrentUserDefaultName.

TODO: Change Tracking

> To use the change tracking functionality of CloudKit, you need to store your app data in a custom zone in the user's private database

To minimize data transfer, CloudKit uses change tokens. In a typical refresh cycle you might first fetch data base changes, receiving identifiers of all zones that have been changed, since a specific server change token, you might have received with an earlier request; or without a token, starting from scratch. Notice the distinction between database and zone tokens, from the [docs](https://developer.apple.com/documentation/cloudkit/ckfetchdatabasechangesoperation/1640502-init):

> This per-database CKServerChangeToken is not to be confused with the per-recordZone CKServerChangeToken from CKFetchRecordZoneChangesOperation.

With the identifiers of changed zones, you’d now fetch the changed records, including deleted ones, again, passing a token, except now, the per-recordZone server change token.

As with all network programming—and although conveniently high level, that‘s what it is—pessimistic error handling, expecting the worst, is paramount, when using CloudKit.

