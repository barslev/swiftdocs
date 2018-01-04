import Vue from 'vue'
import * as _ from './bootstrap'

class SwiftDocs {
    constructor(el) {
        this.el = el
        this._initApp = this._initApp.bind(this)
        window.addEventListener('load', this._initApp)
    }

    _initApp() {
        new Vue({
            el: this.el,
            template: '<swiftdocs></swiftdocs>'
        })
    }
}

window.SwiftDocs = SwiftDocs