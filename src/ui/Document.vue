<template>
	<div class="document">
		<page v-for="(page, index) in state.pages"
			:key="index"
			:number="index + 1"
			:page="page" />
	</div>
</template>
<script>
import { connect } from '~/redux/connect'
import { addPage } from '~/redux/actions/pages'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				title: state.title,
				pages: state.pages,
				defaults: state.defaults,
			}
		})
	],
	data() {
		return {
			styleEl: null,
		}
	},
	watch: {
		defaults() {
			this.updatePrintCss()
		}
	},
	mounted() {
		if ( ! this.state.pages.length ) {
			addPage()
		}
		this.styleEl = document.createElement('style')
		this.$el.appendChild(this.styleEl)
		this.updatePrintCss()
	},
	methods: {
		updatePrintCss() {
			// t r b l
			const margins = _.map(this.state.defaults.margins, (margin, key) => {
					return 'margin-' + key + ': ' + margin + 'mm'
				})
				.join(';')
			
			this.styleEl.innerText = '@media print { @page { ' + margins + ' } }'
		}
	}
}
</script>