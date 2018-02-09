<template>
    <div
        is="container"
        class="document__page"
        style="width:210mm;min-height:297mm;"
        :style="marginCss"
        :id="id"
        :context="context"
        :allowDrop="true"
        @click.native="selectPage()"></div>
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
				'padding-top': this.state.margins.top + 'mm',
				'padding-left': this.state.margins.left + 'mm',
				'padding-right': this.state.margins.right + 'mm',
				'padding-bottom': this.state.margins.bottom + 'mm',
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