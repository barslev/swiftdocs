<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__group"
		:container-id="id"
		:items="children"
		:context="context">
	</div>
</template>
<script>
export default {
	props: {
		id: {},
		context: {},
		children: {},
		htmlTag: {default: 'div'},
	},
}
</script>