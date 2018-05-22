<template>
    <div class="flex flex-wrap justify-between" is="container" :id="id" :context="context"></div>
</template>
<script>
import base from '~/elements/base'
import {insertContent, childrenContent} from '~/redux/actions/contents'

export default {
	extends: base(),

	created() {
		const children = childrenContent(this.id)
		if (!children.length) {
			// Default grid elements... Add 3 by default
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
		}
	}
}
</script>