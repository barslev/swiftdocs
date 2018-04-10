<template>
	<div class="document__page flex flex-col" :style="marginCss" style="width:210mm;min-height:297mm;">
		<div id="header"
			is="container"
			class="document__page-header"
			style="width:100%;overflow:hidden;padding:2mm 0mm"
			:style="{height: this.state.margins.top + 'mm'}"
			:context="context"
			:allowDrop="true"></div>
		<div :id="id"
			is="container"
			class="flex-1"
			:context="context"
			:allowDrop="true"
			@click.native="selectPage()"></div>
		<div id="footer"
			is="container"
			class="document__page-footer"
			style="width:100%;"
			:style="{height: this.state.margins.bottom + 'mm'}"			
			:context="context"
			:allowDrop="true"></div>
		</div>
	</div>
</template>
<script>
import base from '~/elements/base.js'
import {deselectContent} from '~/redux/actions/session'

export default {
    extends: base((state) => {
        return {
            color: state.defaults.color,
            margins: state.defaults.margins,
        }
    }),
	computed: {
		marginCss() {
			return {
				'background-color': this.state.color,
				//'padding-top': this.state.margins.top + 'mm',
				'padding-left': this.state.margins.left + 'mm',
				'padding-right': this.state.margins.right + 'mm',
				//'padding-bottom': this.state.margins.bottom + 'mm',
			}
		}
	},
	methods: {
		selectPage() {
			deselectContent()
		}
	}
}
</script>