<template>
	<div class="document">
		<container :root="true" :allowDrop="false"></container>
		<css />
	</div>
</template>
<script>
import { connect } from '~/redux/connect'
import { addInitialPage } from '~/redux/actions/pages'

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
		'state.defaults'() {
			this.updatePrintCss()
		}
	},
	mounted() {
		addInitialPage()
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