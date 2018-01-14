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
  
  data() {
    return {
      state: getElementState(this.id, defaultState)
    }
  },

  watch: {
    inRenderMode(render) {
      if (!render) {
        Vue.nextTick(() => {
          this.$el.innerHTML = this.state.text
        })
      }
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
