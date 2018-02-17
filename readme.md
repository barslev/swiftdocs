Swiftdocs
===========

#### Drag & Drop Dynamic Document Builder implemented \w Vue.

Build document templates in the browser, plug in an API endpoint to retrieve data from, and generate documents based on that data.
Useful for reports, invoices, tickets and any other dynamic documents that you want to build without writing any extra code.

Try it now:
[https://swiftmade.github.io/swiftdocs/](https://swiftmade.github.io/swiftdocs/)

## Usage

### Shortcuts

1. control + **d**uplicate -> duplicate selected content
2. control + backspace -> remove selected content
3. control + **s**ave -> save the document
4. control + **p**arent -> selects the parent of the currently selected content

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

## Initializing In Different Modes

By default, SwiftDocs will start in edit mode. In some cases, you might wish to start from render mode.
Or you might want to prevent editing altogether or only allow translation work.

You can set the initial mode by passing an argument to the .start() call.

* **.start('render')**: Starts in render mode. User can switch back to edit mode.
* **.start('render_only')**: Starts in render mode, but the user can't switch back to edit mode.
* **.start('translate')**: Starts in edit mode, but user can't add, move or remove content.

*However;*

*Please note that the user can switch the mode via developer's console if they really want to.*
*Always make sure you handle your security and authorization on the server-side.*

## Storing and Retrieving Documents

Out of the box, Swiftdocs provides two storage providers.

1. LocalStorage (local), which uses HTML5 LocalStorage
2. Server-side (server), which talks to your server-side implementation to store and retrieve documents.

**NB!** LocalStorage is easy to use, it requires no extra implementation on your side, but it's only intended for testing purposes. Please make sure you are using the server driver in production environments

#### Using the Server-side Storage

Pass the third parameter as `"server"` while instantiating SwiftDocs.

	var swiftDocs = new SwiftDocs('#app', documentId, 'server')
	
And before you invoke the `.start()` command, configure it:

	swiftDocs.storage.configure("http://yourserver.com/api/swiftdocs", axios)

The second parameter must point to an axios instance. This is a chance for you to pass a customized axios instance, that has necessary headers and tokens to talk to your server.

**Note:** Axios is not included by default. You'll have to include it in your project yourself.

## Developing Custom Elements

By default, SwiftDocs provides you with basic elements such as Text, Table and Image. It's possible to develop and integrate your own elements, too.

To do so, create a meta file that introduces your element's files to the registry. The file should look like this:

	module.exports = {
		// Any name you choose is fine, just make it unique
		id: 'd-custom-element',
		// Icon options are here: https://material.io/icons/
		icon: 'text_fields',
		// The name of this element
		label: 'Text',

		// The vue component that renders this item
		renderer: require('./renderer.vue'),

		// Optional menu Vue component.
		// This will be displayed when your custom item is selected
		menu: require('./menu.vue'),

		defaultState: {
			// Initial state of your element when added to the document
			// Each instance of the element has its own isolated state.
		},

		defaultStyle: {
			// This is optional
			// You can pass a custom style for your element   
		}
	}

You can also use one meta file to register multiple elements at once by passing an array of these objects.

Finally, you'll need to register your element like so:
	
	_swd.registry.use(require('./yourMetaFile.js'))
	
After these steps, your custom element should appear in the "Elements" tab on the left menu. You should be able to drag and drop your element on to the document and it will be rendered using the renderer Vue component you passed in.