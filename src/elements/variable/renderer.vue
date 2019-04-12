<template>
  <div>{{ output }}</div>
</template>
<script>
import base from '~/elements/base'
import {getContentState} from '~/redux/actions/contents'

export default {

  extends: base(),
  
  methods: {
      renderOutput() {
        if (!this.state.variable) {
          return null
        }
        if (this.state.variable.indexOf('$index') >= 1) {
          this.state.variable = this.state.variable.replace(
            '$index',
            this.context.$index
          )
        }
        return _.get(this.context, this.state.variable)
      }
  },

  computed: {
      output() {
          if (this.inRenderMode) {
              return this.renderOutput()
          }
          return this.state.placeholder
      }
  },
}
</script>
<style>
p {
  outline: 0
}
</style>
