How do you synchronize app state using CloudKit?

Why?

CloudKit is a distributed database, leaving local on-device storage to its users, decoupling local and remote data structures.

The CloudKit schema is structured into environments: development and production; databases: private, shared, and public; and records.

The elemental unit in CloudKit is CKRecord, records can contain simple types or pointers to other records, using parental references to structure data. Records are temporary containers, from which you‘d build your domain specific structures. Think, JSON with pointers.

To obtain the current user name, which is required for certain things, creating zones, for example, you can use CKFetchRecordsOperation.fetchCurrentUserRecordOperation(), CKContainer.fetchUserRecordID(), or simple the constant CKCurrentUserDefaultName.
