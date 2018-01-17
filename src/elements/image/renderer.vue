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
		  if (this.state.src) {
			  return this.state.src
		  }
		  return placeholder
	  }
  }
}
</script>