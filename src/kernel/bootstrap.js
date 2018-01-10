import '~/stylesheets/app.scss'

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

import store from '~/redux/stores/defaultStore'
window.Vue = Vue
window.store = store

window._ = require('lodash')

Vue.use(VModal)
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(Notifications)

/**
 * Main Components
 */
Vue.component('page', require('~/ui/Page.vue').default)
Vue.component('document', require('~/ui/Document.vue').default)
Vue.component('designer', require('~/ui/Designer.vue').default)
Vue.component('el', require('~/ui/renderers/Element.vue').default)

/**
 * Tools & Helpers
 */
Vue.component('color', require('~/ui/tools/Color.vue').default)
Vue.component('page-scope', require('~/ui/tools/PageScope.vue').default)
Vue.component('toolbar-button', require('~/ui/tools/Button.vue').default)
Vue.component('dropdown-menu', require('~/ui/tools/DropdownMenu.vue').default)

/**
 * Toolbar items
 */
Vue.component('custom-modal', require('~/ui/modals/Modal.vue').default)
Vue.component('page-size', require('~/ui/modals/PageSize.vue').default)
Vue.component('page-color', require('~/ui/modals/PageColor.vue').default)
Vue.component('page-margins', require('~/ui/modals/PageMargins.vue').default)

/**
 * Menus
 */
Vue.component('page-menu', require('~/ui/menus/PageMenu.vue').default)
Vue.component('left-menu', require('~/ui/menus/LeftMenu.vue').default)
Vue.component('right-menu', require('~/ui/menus/RightMenu.vue').default)

// Mix-ins
Vue.mixin({
    methods: {
        notifyError(title, text) {
            this.$notify({ type: 'error', title, text })
        },
        notifySuccess(title, text) {
            this.$notify({ type: 'success', title, text })
        }
    },
    mounted() {
        window.notifyError = this.notifyError.bind(this)
        window.notifySuccess = this.notifySuccess.bind(this)
    }
})