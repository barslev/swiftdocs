<template>
	<div class="document">
		<container v-if="!inRenderMode || !state.dataLoading" :root="true" :allowDrop="false" :context="state.data"></container>
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
				data: state.data.data ? Vue.nonreactive({...state.data.data}) : null,
				dataLoading: state.data.loading,
				defaults: state.defaults,
			}
		})
	],
	data() {
		return {
			context: _swd.dataSource.data,
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