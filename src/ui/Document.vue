<template>
	<div class="document">
		<div class="text-center">
			<h2>{{ title }}</h2>
		</div>
		<page v-for="(page, index) in pages"
			:key="index"
			:number="index + 1"
			:page="page" />
	</div>
</template>
<script>
import { addPage } from '~/redux/actions/pages'

export default {
	data() {
		return {
			title: this.$select('title'),
			pages: this.$select('pages'),
		}
	},
	mounted() {
		if ( ! this.pages.length ) {
			addPage()
		}
	}
}
</script>