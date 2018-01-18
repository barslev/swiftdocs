<template>
	<div :class="'text-' + state.align">
		<img :src="photoSrc" :width="state.width" :height="state.height" />
	</div>
</template>
<script>
import base from '~/elements/base'
import placeholder from './placeholder'
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
  extends: base,

  computed: {
	  photoSrc() {
		  if (!this.state.src) {
			return placeholder	  
		  }

		  switch (this.state.src.type) {
			  case 'base64':
			  	return this.state.src.content
			  case 'variable':
			  	return this.getVariableValue(this.state.src.content)
		  }
		  
	  }
  },

  methods: {
	  getVariableValue(address) {
		  if (!this.inRenderMode) {
			  return placeholder
		  }
		  const context = {
			  ..._swd.dataSource.data,
			  ...this.context,
		  }
		  return _.get(context, address)
	  }
  }
}
</script>