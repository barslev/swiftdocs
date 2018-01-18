<template>
	<div class="document">
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
			pages: this.$select('pages')
		}
	},
	mounted() {
		if ( ! this.pages.length ) {
			addPage()
		}
	}
}
</script>