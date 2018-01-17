<template>
	<div :class="'text-' + state.align">
		<img :src="photoSrc" :style="style" />
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
		  if (this.state.src) {
			  return this.state.src
		  }
		  return placeholder
	  },
	  style() {
		  const style = {}

		  if ('width' in this.state) {
			  style.width = this.state.width + 'px'
		  }

		  if ('height' in this.state) {
			  style.height = this.state.height + 'px'
		  }
		  
		  return style
	  }
  }
}
</script>