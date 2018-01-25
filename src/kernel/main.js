import Vue from 'vue'
import Revue from 'revue'
import storage from '~/storage'
import Action from '~/kernel/action'
import dragDrop from '~/kernel/dragDrop'
import * as boot from '~/kernel/bootstrap'
import { Registry } from '~/kernel/registry'
import registerCommands from '~/kernel/commands'
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
        this._showBootError = this._showBootError.bind(this)
        this._removeLoadingIndicator = this._removeLoadingIndicator.bind(this)
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
        this._showLoadingIndicator()

        this.storage.load(this.documentId)
            .then(this._bootDocument)
            .then(this._removeLoadingIndicator)
            .then(this._createVueApp)
            .catch(this._showBootError)
    }

    save() {
        return this.action.saveCurrentSession()
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
        
        // Mark all received attachments as uploaded.
        this.action.markAttachmentsAsUploaded()
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
            mounted() {
                registerCommands()
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

    _showLoadingIndicator() {
        const loading = document.createElement('div')
        loading.innerHTML = 'loading'
        loading.classList.add('loading')
        loading.classList.add('progress')
        document.querySelector(this.el).appendChild(loading)
    }

    _removeLoadingIndicator(doc) {
        document.querySelector(this.el).innerHTML = ''
        return doc
    }

    _showBootError(error) {
        console.error(error)
        document.querySelector(this.el).innerHTML = '<div class="boot-error"><h3>Oh No! 😔</h3> ' + error + '</div>'
    }
}