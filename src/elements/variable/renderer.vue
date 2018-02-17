<template>
  <div>
      {{ output }}
    </div>
</template>
<script>
import base from '~/elements/base'
import {getContentState} from '~/redux/actions/contents'

export default {

  extends: base(),
  
  methods: {
      renderOutput() {
        const data = {
            ..._swd.dataSource.data,
            ...this.context,
        }
        return _.get(data, this.state.variable)
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
