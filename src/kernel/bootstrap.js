import '~/stylesheets/app.scss'

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VModal from 'vue-js-modal'
import { VTooltip } from 'v-tooltip'
import Notifications from 'vue-notification'
import NonReactive from 'vue-nonreactive'

window.Vue = Vue
window._ = require('lodash')

Vue.use(VModal)
Vue.use(VueI18n)
Vue.use(NonReactive)
Vue.use(Notifications)

Vue.directive('tooltip', VTooltip)

/**
 * Main Components
 */
Vue.component('document', require('~/ui/Document.vue').default)
Vue.component('designer', require('~/ui/Designer.vue').default)
Vue.component('css', require('~/ui/renderers/Css.vue').default)
Vue.component('el', require('~/ui/renderers/Element.vue').default)
Vue.component('logical-presenter', require('~/ui/renderers/LogicalPresenter.vue').default)

/**
 * Tools & Helpers
 */
Vue.component('color', require('~/ui/tools/Color.vue').default)
Vue.component('condition', require('~/ui/tools/Condition.vue').default)
Vue.component('page-scope', require('~/ui/tools/PageScope.vue').default)
Vue.component("top-button", require("~/ui/tools/TopButton.vue").default)
Vue.component('toolbar-button', require('~/ui/tools/Button.vue').default)
Vue.component('dropdown-menu', require('~/ui/tools/DropdownMenu.vue').default)
Vue.component('document-title', require('~/ui/tools/DocumentTitle.vue').default)
Vue.component('dropdown-option', require('~/ui/tools/DropdownOption.vue').default)
Vue.component('document-status', require('~/ui/tools/DocumentStatus.vue').default)
Vue.component('variable-displayer', require('~/ui/tools/VariableDisplayer.vue').default)

/**
 * Toolbar items
 */
Vue.component('custom-modal', require('~/ui/modals/Modal.vue').default)
Vue.component('page-color', require('~/ui/modals/PageColor.vue').default)
Vue.component('page-margins', require('~/ui/modals/PageMargins.vue').default)
Vue.component('language', require('~/ui/modals/Language.vue').default)

/**
 * Menus
 */
Vue.component('top-menu', require('~/ui/menus/TopMenu.vue').default)
Vue.component('left-menu', require('~/ui/menus/LeftMenu.vue').default)

Vue.mixin({
  data() {
    return {
      hasTranslations: 'translations' in _swd,
      translation: _swd.translations ? _swd.translation : null,
      inRenderMode: false,
    }
  },
  created() {
    this.inRenderMode = store.getState().session.mode
    this.mixinUnsubscribe = store.subscribe(() => {
      this.inRenderMode = store.getState().session.mode
    });
  },
  beforeDestroy() {
    this.mixinUnsubscribe();
  }
})

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  },
});