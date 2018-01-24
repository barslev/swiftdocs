<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__page-container"
		:container-id="id"
		:page-id="root ? id : null"
		:items="containerContents" :context="context"
		:class="root ? '' : 'document__page-child-container'">
	</div>
</template>
<script>
export default {
	props: {
		id: {},
		root: {},
		context: {},
		htmlTag: {default: 'div'},
		allowDrop: {default: true},
	},
	data() {
		return {
			containerContents: [],
			contents: this.$select('contents')
		}
	},
	watch: {
		contents() {
			this.updateContainerContents()
		}
	},
	mounted() {
		if (this.allowDrop) {
			_swd.dragDrop.add(this.$el)
		}
		this.updateContainerContents()
	},
	beforeDestroy() {
		if (this.allowDrop) {
			_swd.dragDrop.remove(this.$el)
		}
	},
	methods: {
		updateContainerContents() {
			this.containerContents = this.contents.filter((content) => {
				return content.container_id === this.id
			})			
		}		
	}
}
</script>