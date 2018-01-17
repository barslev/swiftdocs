<template>
  <p v-if="!inRenderMode" style="min-height:initial !important" @blur="update" v-html="state.text"></p>
  <compile v-else :template="state.text" :context="context"></compile>
</template>
<script>
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'

import base from '~/components/base'
import MediumEditor from 'medium-editor'
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {

  extends: base,

  watch: {
    inRenderMode(render) {
      if (!render) {
        Vue.nextTick(() => {
          this.activateEditor()
        })
      }
    }
  },

  mounted() {
    if (!this.inRenderMode) {
      this.activateEditor()
    }
  },

  methods: {
    activateEditor() {
      this.editor = new MediumEditor(this.$el, {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'list-extension']
        }
      })
      this.editor.pasteHTML('test')
    },
    update(event) {
      updateElementState(this.id, {
        text: event.target.innerHTML
      })
    },
  }
}
</script>
<style>
p {
  outline: 0
}
</style>
