<template>
	<div class="document">
		<container v-if="!inRenderMode || !state.dataLoading" :root="true" :allowDrop="false" :context="state.data"></container>
		<css />
	</div>
</template>
<script>
import { connect } from '~/redux/connect'
import { string as toStyle } from 'to-style'
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
			// r l 
			const margins = toStyle({
				marginTop: this.state.defaults.margins.top + 'mm',
				marginBottom: this.state.defaults.margins.bottom + 'mm',
				marginLeft: this.state.defaults.margins.left + 'mm',
				marginRight: this.state.defaults.margins.right + 'mm',
			})
			//const margins = 'margin-left:' + this.state.defaults.margins.left + 'mm;'
			 //	+ 'margin-right:' + this.state.defaults.margins.right + 'mm;'
			this.styleEl.innerText = '@media print { @page { ' + margins + ' } }'
		}
	}
}
</script>