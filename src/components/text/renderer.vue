<template>
  <p contenteditable="true" :style="state.style" @blur="update">text goes here</p>
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

  mounted() {
    this.$el.innerHTML = this.state.text
  },

  methods: {
    update(event) {
      updateElementState(this.id, {
        ...this.state,
        text: event.target.innerHTM
      })
    }
  }
}
</script>
<style>
p:focus {
  outline: 0
}
</style>
