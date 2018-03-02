<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__group"
		:container-id="id"
		:items="state.contents" :context="context">
	</div>
</template>
<script>
import {connect} from '~/redux/connect'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				contents: state.contents.filter(content => content.container_id === scope.id)
			}
		})
	],
	props: {
		id: {},
		context: {},
		htmlTag: {default: 'div'},
	},
}
</script>