<template>
    <div class="flex" ref="dropzone" :container-id="id">
		<el v-for="pane in state.panes" :key="pane.id" :element="pane" class="flex-1 mr-2" />
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {insertContent} from '~/redux/actions/contents'

export default {
  props: ['id'],
	mixins: [
			connect((state, scope) => {
					return {
							panes: state.contents.filter((content) => {
									return content.container_id === scope.id
							})
					}
			})
	],
	created() {
		if (!this.state.panes.length) {
			// Default grid elements... Add 3 by default
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
			insertContent('d-grid-pane', this.id)
		}
	},
	mounted() {
		// dragDrop.add(this.$refs.dropzone)
		// TODO: Remove from drake once it's unmounted
	}
}
</script>