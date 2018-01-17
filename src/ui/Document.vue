<template>
	<div class="document">
		<page v-for="(page, index) in displayPages"
			:key="index"
			:number="index + 1"
			:page="page" />
	</div>
</template>
<script>
import { addPage } from '~/redux/actions/pages'
import { addPageLoop, findLoopById } from '~/redux/actions/logic'

export default {
	data() {
		return {
			title: this.$select('title'),
			pages: this.$select('pages'),
			displayPages: []
		}
	},
	watch: {
		inRenderMode() {
			this.refreshPages()
		},
		pages() {
			this.refreshPages()
		}
	},
	mounted() {
		if ( ! this.pages.length ) {
			addPage()
		}
		this.refreshPages()
	},
	
	methods: {
		refreshPages() {
			if (this.inRenderMode) {
				this.renderPages()
				return
			}
			this.editPages()
		},

		editPages() {
			this.displayPages = this.pages
		},

		renderPages() {
			const pages = []
			_.each(this.pages, (page) => {
				let loop = findLoopById(page.id)
				
				if (!loop) {
					pages.push(page)
					return
				}
				
				_.each(_swd.dataSource.data[loop.array], (item) => {
					pages.push({...page, context: {[loop.as]: item}})
				})
			})
			this.displayPages = pages
			return pages
		}
	}
}
</script>