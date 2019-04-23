<template>
    <div :id="id"
		is="container"
		class="flex flex-wrap"
		:class="state.justify ? state.justify : 'justify-between'"
		:context="context"
		:children="children"></div>
</template>
<script>
import base from '~/elements/base'
import {insertContent} from '~/redux/actions/contents'

export default {
	extends: base(),

	created() {
		if (!this.children.length) {
			// Default grid elements... Add 3 by default
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
		}
	}
}
</script>