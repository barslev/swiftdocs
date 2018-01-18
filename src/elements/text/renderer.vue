<template>
  <p v-if="!inRenderMode" style="min-height:initial !important" @blur="update" v-html="state.text"></p>
  <div v-else v-html="html"></div>
</template>
<script>
import Handlebars from 'handlebars/dist/handlebars'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'

import base from '~/elements/base'
import MediumEditor from 'medium-editor'
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {

  extends: base,

  data() {
    return {
      html: null
    }
  },

  watch: {
    inRenderMode(render) {
      if (render) {
        this.render()
      } else {
        Vue.nextTick(() => {
          this.activateEditor()
        })
      }
    }
  },

  mounted() {
    if (this.inEditMode) {
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
    render() {
        const data = {
            ..._swd.dataSource.data,
            ...this.context,
        }
        const state = getElementState(this.id)
        this.html = Handlebars.compile(state.text)(data)
    }
  }
}
</script>
<style>
p {
  outline: 0
}
</style>
