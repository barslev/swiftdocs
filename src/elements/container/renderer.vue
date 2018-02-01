<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__page-container"
		:container-id="id"
		:page-id="root ? id : null"
		:items="state.contents" :context="context"
		:class="root ? '' : 'document__page-child-container'">
	</div>
</template>
<script>
import {connect} from '~/redux/connect'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				contents: state.contents.filter((content) => {
					return content.container_id == scope.id
				})
			}
		})
	],
	props: {
		id: {},
		root: {},
		context: {},
		htmlTag: {default: 'div'},
		allowDrop: {default: true},
	},
	mounted() {
		if (this.allowDrop) {
			_swd.dragDrop.add(this.$el)
		}
	},
	beforeDestroy() {
		if (this.allowDrop) {
			_swd.dragDrop.remove(this.$el)
		}
	},
}
</script>