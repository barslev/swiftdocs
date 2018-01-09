import Vue from 'vue'
import storage from './storage'
import * as _ from './bootstrap'

class SwiftDocs {

    constructor(el, documentId, storageDriver = 'local') {
        this.el = el
        this.documentId = documentId
        this.storage = new storage[storageDriver]
        this.bootDocument = this.bootDocument.bind(this)
        this.createVueApp = this.createVueApp.bind(this)
    }

    start() {
        // TODO: Show document loading progress
        this.storage.load(this.documentId)
            .then(this.bootDocument)
            .then(this.createVueApp)
    }

    /**
     * Receives null for new documents, object for existing ones
     * Boots the redux store with the given object so the editor displays the latest state of things.
     * @param {*} doc 
     */
    bootDocument(doc) {
        if (doc === null) {
            // TODO: New document
        }
    }

    /**
     * Creates the Vue application which runs the editor.
     */
    createVueApp() {
        new Vue({
            el: this.el,
            i18n: require('./localization'),
            template: '<swiftdocs-editor></swiftdocs-editor>'
        })
    }
}

window.SwiftDocs = SwiftDocs