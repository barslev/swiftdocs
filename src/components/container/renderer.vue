<template>
	<div class="document__page-container" :container-id="id" ref="container" :page-id="root ? id : null" :class="root ? '' : 'document__page-child-container'">
		<el v-for="element in containerContents"
			:key="element.id"
			:element="element" />
	</div>
</template>
<script>
export default {
	props: ['id', 'root'],
	data() {
		return {
			containerContents: [],
			contents: this.$select('contents')
		}
	},
	watch: {
		contents() {
			this.containerContents = this.contents.filter((content) => {
				return content.container_id === this.id
			})
		}
	},
	mounted() {
		drake.containers.push(this.$refs.container)
		// TODO: Remove from drake once it's unmounted
	}
}
</script>