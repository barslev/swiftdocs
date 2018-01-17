<template>
    <div class="flex" ref="dropzone" :container-id="id" :page-id="pageId">
		<el v-for="pane in panes" :key="pane.id" :element="pane" class="flex-1 mr-2" />
    </div>
</template>
<script>
import {insertContent} from '~/redux/actions/contents'

export default {
  props: ['id', 'pageId'],
	data() {
		return {
				panes: [],
				contents: this.$select('contents')
		}
	},
	watch: {
		contents() {
			this.updatePanes()
		}
  },
	created() {
		this.updatePanes()
		if (!this.panes.length) {
			// Default grid elements... Add 3 by default
			insertContent('container', this.pageId, this.id)
			insertContent('container', this.pageId, this.id)
			insertContent('container', this.pageId, this.id)
		}
	},
	mounted() {
		// dragDrop.add(this.$refs.dropzone)
		// TODO: Remove from drake once it's unmounted
	},
	methods: {
		updatePanes() {
			this.panes = this.contents.filter((content) => {
				return content.container_id === this.id
			})
		}
	}
}
</script>