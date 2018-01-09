import Vue from 'vue'
import storage from './storage'
import * as _ from './bootstrap'

class SwiftDocs {

    constructor(el, documentId, storageDriver = 'local') {
        this.el = el
        this.documentId = documentId
        this.storage = new storage[storageDriver]
    }

    init() {

        this.storage.load(this.documentId).then((doc) => {
            if (doc === null) {
                // TODO: New document
            }
        })

        // TODO: Wait before the document is loaded
        // TODO: Show document loading progress
        new Vue({
            el: this.el,
            i18n: require('./localization'),
            template: '<swiftdocs-editor></swiftdocs-editor>'
        })
    }
}

window.SwiftDocs = SwiftDocs