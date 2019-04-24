<template>
	<div
		is="logical-presenter"
		:html-tag="htmlTag"
		class="document__page-container"
		:container-id="id"
		:items="children"
		:class="root ? '' : 'document__page-child-container'">
	</div>
</template>
<script>
export default {
	props: {
		id: {},
		children: {},
		htmlTag: {default: 'div'},
		allowDrop: {default: true},
		root: {type: Boolean, default: false},
	},
	watch: {
		allowDrop() {
			this.toggleDropTarget()
		},
		inRenderMode() {
			this.toggleDropTarget()
		}
	},
	beforeDestroy() {
		this.destroyDropTarget()
	},
	methods: {
		toggleDropTarget() {
			if (this.inRenderMode && this.allowDrop) {
				return this.destroyDropTarget()
			} else if (!this.inRenderMode && this.allowDrop) {
				this.makeDropTarget()
			}
		},
		destroyDropTarget() {
			if (this._isDropTarget) {
				_swd.dragDrop.remove(this.$el)
				this._isDropTarget = false
			}
		},
		makeDropTarget() {
			_swd.dragDrop.add(this.$el)
			this._isDropTarget = true
		}
	}
}
</script>