<template>
  <p v-if="!inRenderMode" style="min-height:inherit !important" :style="state.style" @blur="update" v-html="state.text"></p>
  <compile v-else :template="state.text" :style="state.style"></compile>
</template>
<script>
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'

import MediumEditor from 'medium-editor'
import {getElementState, updateElementState} from '~/redux/actions/contents'

const defaultState = {
  text: 'Text goes here',
  style: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: '1.25em'
  }
}

export default {
  props: ['id'],
  
	data() {
		return {
			contents: this.$select('contents')
		}
	},
	computed: {
		state() {
			const state = _.get(_.find(this.contents, {id: this.id}), 'state')
			return !state ? defaultState : state
		}
	},

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
    this.activateEditor()
  },

  methods: {
    activateEditor() {
      this.editor = new MediumEditor(this.$el, {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'list-extension']
        }
      })
      this.editor.pasteHTML(this.state.text)
    },
    update(event) {
      updateElementState(this.id, {
        ...this.state,
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
