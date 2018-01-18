<template>
	<div :class="'text-' + state.align">
		<img :src="imageSrc" :width="state.width" :height="state.height" />
	</div>
</template>
<script>
import base from '~/elements/base'
import placeholder from './placeholder'
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
  extends: base,

  data() {
	  return {
		  imageSrc: null
	  }
  },

  watch: {
	  state() {
		  this.refreshImageSrc()
	  },
	  inRenderMode() {
		  this.refreshImageSrc()
	  }
  }, 

  created() {
	  this.refreshImageSrc()
  },

  methods: {

	  refreshImageSrc() {
		  this.imageSrc = this.findImageSrc()
	  },

	  findImageSrc() {
		  if (!this.state.src) {
			return placeholder	  
		  }

		  switch (this.state.src.type) {
			  case 'base64':
			  	return this.state.src.content
			  case 'variable':
			  	return this.getVariableValue(this.state.src.content)
		  }

		  return placeholder
	  },
	  
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