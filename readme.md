Swiftdocs
===========

Work in progress. Details and documentation will be added in the future.

## Initializing

You'll need to reference swiftdocs.js file in your html and then bootstrap it like so:
	
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>Document Designer</title>
	</head>
	<body>
	    <div id="app"></div>
	    <script src="build/swiftdocs.js"></script>
	    <script>
	    	var swiftDocs = new SwiftDocs('#app', 'yourDocumentId')
	    	// Any plugins and additional config will go here...
	    	swiftDocs.start()
	    </script>
	</body>
	</html>

## Storing and Retrieving Documents

Out of the box, Swiftdocs provides two storage providers.

1. LocalStorage (local), which uses HTML5 LocalStorage
2. Server (server), which talks to your server-side implementation to store and retrieve documents.

LocalStorage is pretty much straightforward. It's selected by default. You don't need to do much else other than providing a unique document ID to work on. If that ID is found in the storage, corresponding document will be loaded.

#### Implementing an API for Server Storage

You have to explicitly choose this driver when instantiating SwiftDocs like so:

	var swiftDocs = new SwiftDocs('#app', documentId, 'server')
	
And before you initialize with the `.start()` command, call the following command:

	swiftDocs.storage.configure("http://yourserver.com/api/swiftdocs", axios)

The second parameter must point to your axios instance. You can have it configured the way you like (with necessary credentials and headers added in the form of interceptors)

**Note:** Axios is not included by default. You'll have to include it in your project yourself.