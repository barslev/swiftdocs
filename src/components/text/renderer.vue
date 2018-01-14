<template>
  <p v-if="!inRenderMode" contenteditable :style="state.style" @blur="update"></p>
  <compile v-else :template="state.text" :style="state.style"></compile>
</template>
<script>
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

  components: {
    displayer: {
      props: ['content'],
      render(h) {
        return Vue.compile('<div>' + this.content + '</div>').render
      },
      staticRenderFns() {
        return Vue.compile('<div>' + this.content + '</div>').staticRenderFns
      }
    }
  },
  
  data() {
    return {
      state: getElementState(this.id, defaultState)
    }
  },

  mounted() {
    this.$el.innerHTML = this.state.text
  },

  methods: {
    update(event) {
      this.state = updateElementState(this.id, {
        ...this.state,
        text: event.target.innerHTML
      })
    }
  }
}
</script>
<style>
p {
  outline: 0
}
</style>
