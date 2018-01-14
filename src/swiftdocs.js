import Vue from 'vue'
const dragula = require('dragula');
import storage from '~/storage'
import * as _ from '~/kernel/bootstrap'
import {Registry} from '~/kernel/registry'
import {DataSource} from '~/kernel/dataSource'
import {insertContent, moveContent} from '~/redux/actions/contents'

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
    }

    /**
     * Use this (only once) to initialize everything
     * After you configure your instance
     */
    start() {
        // Make this instance globally accessible
        window._swd = this
        // TODO: Show document loading progress
        this._useDefaultDesignComponents()
        
        this.storage.load(this.documentId)
            .then(this._bootDocument)
            .then(this._createVueApp)
    }

    /**
     * Receives null for new documents, object for existing ones
     * Boots the redux store with the given object so the editor displays the latest state of things.
     * @param {*} doc 
     */
    _bootDocument(doc) {
        if (doc === null) {
            // TODO: New document
        }
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
                window.drake = dragula({
                    revertOnSpill: true,
                    copy(el, source) {
                        return source.id == 'toolbar_components'
                    },
                    copySortSource: false,
                    accepts(el, target, source, sibling) {
                        return target.id !== 'toolbar_components'
                    }
                })
                drake.on('drop', function (element, container, source, sibling) {
                    drake.cancel();

                    const elementId = element.getAttribute('data-id')
                    const containerPageId = container.getAttribute('page-id')
                    const containerId = container.getAttribute('container-id')
                    const siblingId = sibling ? sibling.getAttribute('data-id') : null

                    if (element.hasAttribute('data-id')) {
                        // An already existing element got relocated
                        return moveContent(
                            element.getAttribute('data-id'),
                            containerPageId,
                            containerId,
                            siblingId
                        )
                    }

                    return insertContent(
                        element.getAttribute('data-name'),
                        containerPageId,
                        containerId,
                        siblingId
                    )
                });
            }            
        })
    }

    _useDefaultDesignComponents() {
        this.registry.use(require('~/components/text'))
        this.registry.use(require('~/components/image'))
        this.registry.use(require('~/components/container'))
        this.registry.use(require('~/components/grid'))
    }
}

window.SwiftDocs = SwiftDocs