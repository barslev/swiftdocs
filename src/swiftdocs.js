import Vue from 'vue'
import Revue from 'revue'
import storage from '~/storage'
import * as _ from '~/kernel/bootstrap'
import {Registry} from '~/kernel/registry'
import {DataSource} from '~/kernel/dataSource'
import activateDragDrop from '~/kernel/dragDrop'
import storeFactory from '~/redux/stores/storeFactory'

class SwiftDocs {

    constructor(el, documentId, storageDriver = 'local') {
        this.el = el
        this.documentId = documentId
        this.registry = new Registry()
        this.dataSource = new DataSource()
        this.storage = new storage[storageDriver]

        this._bootDocument = this._bootDocument.bind(this)
        this._createVueApp = this._createVueApp.bind(this)
        this._useDefaultDesignComponents = this._useDefaultDesignComponents.bind(this)

        // Register default design components
        this._useDefaultDesignComponents()
        // Make this instance globally accessible
        window._swd = this
    }

    /**
     * Use this (only once) to initialize everything
     * After you configure your instance
     */
    start() {
        // TODO: Show document loading progress
        this.storage.load(this.documentId)
            .then(this._bootDocument)
            .then(this._createVueApp)
    }

    save() {
        const clonedState = {...window.store.state}
        // Remove live session state from the persistent data
        delete clonedState.session

        this.storage.persist(
            this.documentId,
            clonedState
        ).then(() => {
            notifySuccess('Saved!', 'All changes saved')
        })
    }

    /**
     * Receives null for new documents, object for existing ones
     * Boots the redux store with the given object so the editor displays the latest state of things.
     * @param {*} doc 
     */
    _bootDocument(doc) {
        window.store = new Revue(Vue, storeFactory(doc))        
    }

    /**
     * Creates the Vue application which runs the editor.
     */
    _createVueApp() {
        new Vue({
            el: this.el,
            i18n: require('~/localization'),
            router: require('~/kernel/router'),
            created() {
                activateDragDrop()
            }
        })
    }

    _useDefaultDesignComponents() {
        this.registry.use(require('~/components/text'))
        this.registry.use(require('~/components/image'))
        this.registry.use(require('~/components/container'))
        this.registry.use(require('~/components/grid'))
        this.registry.use(require('~/components/table'))
    }
}

window.SwiftDocs = SwiftDocs