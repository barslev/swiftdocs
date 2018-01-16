<template>
	<div>
		<div class="document__page" :style="pageCss" @click="selectPage()">
			<div :style="marginCss">
				<container :id="page.id" :root="true" :context="page.context"></container>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: [
		'page',
		'number'
	],
	computed: {
		pageCss() {
			return {
				background: this.page.color,
				width: this.page.dimensions.width + 'mm',
				height: this.page.dimensions.height + 'mm',
			}
		},
		marginCss() {
			return {
				'height': '100%',
				'padding-top': this.page.margins.top + 'mm',
				'padding-left': this.page.margins.left + 'mm',
				'padding-right': this.page.margins.right + 'mm',
				'padding-bottom': this.page.margins.bottom + 'mm',
			}
		}
	},
	methods: {
		selectPage() {
			this.$router.push({name: 'main'})
		}
	}
}
</script>
