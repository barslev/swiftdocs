import './stylesheets/app.scss'

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

Vue.use(VModal)
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(Notifications)

// Register components
Vue.component('page', require('./ui/Page.vue'))
Vue.component('document', require('./ui/Document.vue'))
Vue.component('designer', require('./ui/Designer.vue'))

// Register plug-ins