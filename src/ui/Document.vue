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
		}
	},
	mounted() {
		if ( ! this.pages.length ) {
			addPage()
		}
		this.refreshPages()
		addPageLoop('cjcgzrl980000ue,_glgrwzob', 'analytes', 'analyte')
		addPageLoop('cjch060xv000bue,_73bqfpcj', 'analyte.result.resultList', 'result')
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