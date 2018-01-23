import Vue from 'vue'
import Revue from 'revue'
import storage from '~/storage'
import Action from '~/kernel/action'
import * as _ from '~/kernel/bootstrap'
import dragDrop from '~/kernel/dragDrop'
import { Registry } from '~/kernel/registry'
import { DataSource } from '~/kernel/dataSource'
import storeFactory from '~/redux/stores/storeFactory'

export default class Main {

    constructor(el, documentId, storageDriver = 'local') {
        this.el = el

        this.dragDrop = dragDrop
        this.documentId = documentId

        this.action = new Action()
        this.registry = new Registry()
        this.dataSource = new DataSource()
        this.storage = new storage[storageDriver]

        this.languages = [
            'en',
            'tr'
        ]

        this._bootDocument = this._bootDocument.bind(this)
        this._createVueApp = this._createVueApp.bind(this)
        this._useDefaultDesignElements = this._useDefaultDesignElements.bind(this)

        // Register default design components
        this._useDefaultDesignElements()
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
        const clonedState = { ...window.store.state }
        // Remove live session state from the persistent data
        delete clonedState.session

        this.storage.persist(
            this.documentId,
            clonedState
        ).then(() => {
            notifySuccess(
                $t('messages.saved'),
                $t('messages.saved_more')
            )
        })
    }
    
    setLanguage(language) {
        this.vue.$i18n.locale = language
    }

    /**
     * Receives null for new documents, object for existing ones
     * Boots the redux store with the given object so the editor displays the latest state of things.
     * @param {*} doc 
     */
    _bootDocument(doc) {
        window.store = new Revue(Vue, storeFactory(doc))

        if (this.translations) {
            // Set active translation language
            this.action.setTranslation(this.translations[0])
        }
    }

    /**
     * Creates the Vue application which runs the editor.
     */
    _createVueApp() {
        this.vue = new Vue({
            el: this.el,
            template: '<designer></designer>',
            i18n: require('~/localization'),
            created() {
                window.$t = this.$t
                window.notifyError = this.notifyError.bind(this)
                window.notifySuccess = this.notifySuccess.bind(this)                
                
                dragDrop.activate()
            },
            methods: {
                notifyError(title, text) {
                    this.$notify({ type: 'error', title, text })
                },
                notifySuccess(title, text) {
                    this.$notify({ type: 'success', title, text })
                }
            }
        })
    }

    _useDefaultDesignElements() {
        this.registry.use(require('~/elements/text'))
        this.registry.use(require('~/elements/image'))
        this.registry.use(require('~/elements/container'))
        this.registry.use(require('~/elements/grid'))
        this.registry.use(require('~/elements/table'))
    }
}