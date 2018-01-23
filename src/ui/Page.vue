<template>
	<div>
		<div class="document__page" style="width:210mm;height:297mm;" @click="selectPage()">
			<div :style="marginCss">
				<container :id="page.id" :root="true" :context="page.context"></container>
			</div>
		</div>
	</div>
</template>
<script>
import {deselectContent} from '~/redux/actions/session'

export default {
	props: [
		'page',
		'number'
	],
	computed: {
		marginCss() {
			return {
				'height': '100%',
				'background': this.page.color,
				'padding-top': this.page.margins.top + 'mm',
				'padding-left': this.page.margins.left + 'mm',
				'padding-right': this.page.margins.right + 'mm',
				'padding-bottom': this.page.margins.bottom + 'mm',
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
