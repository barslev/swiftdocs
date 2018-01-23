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
			styleEl: null,
			title: this.$select('title'),
			pages: this.$select('pages'),
			defaults: this.$select('defaults'),
		}
	},
	watch: {
		defaults() {
			this.updatePrintCss()
		}
	},
	mounted() {
		if ( ! this.pages.length ) {
			addPage()
		}
		this.styleEl = document.createElement('style')
		this.$el.appendChild(this.styleEl)
		this.updatePrintCss()
	},
	methods: {
		updatePrintCss() {
			// t r b l
			const margins = _.map(this.defaults.margins, (margin, key) => {
					return 'margin-' + key + ': ' + margin + 'mm'
				})
				.join(';')
			
			this.styleEl.innerText = '@media print { @page { ' + margins + ' } }'
		}
	}
}
</script>