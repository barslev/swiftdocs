<template>
	<div ref="container"
		class="document__page-container"
		:container-id="id"
		:page-id="root ? id : null"
		:class="root ? '' : 'document__page-child-container'">

		<el v-for="element in containerContents"
			:key="element.id"
			:context="context"
			:element="element" />
	</div>
</template>
<script>
export default {
	props: ['id', 'root', 'context'],
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
		_swd.dragDrop.add(this.$refs.container)
		this.updateContainerContents()
	},
	beforeDestroy() {
		_swd.dragDrop.remove(this.$refs.container)
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