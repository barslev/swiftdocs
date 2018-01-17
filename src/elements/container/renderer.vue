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
		drake.containers.push(this.$refs.container)
		this.updateContainerContents()
	},
	beforeDestroy() {
		
		const index = drake.containers
			.indexOf(this.$refs.container)
		
		if (index >= 0) {
			drake.containers.splice(index, 1)
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