<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__page-container"
		:container-id="id"
		:items="state.contents" :context="context"
		:class="root ? '' : 'document__page-child-container'">
	</div>
</template>
<script>
import {connect} from '~/redux/connect'

const childFilter = (scope) => {
	return (content) => {
		return content.container_id === scope.id
	}
}

const rootFilter = () => {
	return (content) => {
		return content.container_id === null
	}
}

export default {
	mixins: [
		connect((state, scope) => {
			return {
				contents: state.contents.filter(
					scope.root ? rootFilter() : childFilter(scope)
				)
			}
		})
	],
	props: {
		id: {},
		context: {},
		htmlTag: {default: 'div'},
		allowDrop: {default: true},
		root: {type: Boolean, default: false},
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