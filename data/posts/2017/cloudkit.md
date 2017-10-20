Synchronizing App State With CloudKit

Apple‘s CloudKit enables you to store structured data in iCloud, using Apple‘s infrastructure for free, if you have a developer account, of course. This is fantastic, it means low operational effort and low costs to maintain an app that synchronizes data across devices, which is important for Apple, of course, selling a plethora device types, while providing a somewhat consistent user experience across macOS, iOS, watchOS, and tvOS. They can impossibly rely on their developer community to get sync, a reasonably hard problem, right. At least, Apple realizes, they have to help with that.

The CloudKit framework is a iCloud client for structured data, leaving local storage to its users, decoupling local and remote data structures, while providing efficient diffing between the two.

The CloudKit schema is structured into environments: development and production; databases: private, shared, and public; and records.

The elemental unit in CloudKit is CKRecord, records can contain simple types or pointers to other records, using parental references to structure data. Records are temporary containers, from which you‘d build your domain specific structures. Think, JSON with pointers.

To obtain the current user name, which is required for certain things, creating zones, for example, you can use CKFetchRecordsOperation.fetchCurrentUserRecordOperation(), CKContainer.fetchUserRecordID(), or simple the constant CKCurrentUserDefaultName.
