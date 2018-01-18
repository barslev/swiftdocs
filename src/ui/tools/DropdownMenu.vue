<template>
	<div class="relative float-left mr-2">
		<a @click="isOpen = !isOpen"
			v-click-outside="close"
			class="p-2 pt-2 border hover:bg-white inline-block text-center text-xs font-bold uppercase"
			:class="styles"
			role="button">
			{{ label }} <i class="material-icons float-right ml-1" style="margin-top:-2px">{{ icon ? icon : 'keyboard_arrow_down'}}</i>
		</a>
		<div v-if="isOpen" class="border-l border-r border-b border-grey bg-white shadow overflow-hidden absolute min-w-full">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: ['label', 'color', 'icon'],
	data() {
		return {
			isOpen: false
		}
	},
	computed: {
		styles() {
			let classes = ['border-blue', 'text-blue']
			if (this.color) {
				classes = [
					'border-' + this.color,
					'text-' + this.color
				]
			}
			if (this.isOpen) {
				classes.push('bg-white')
			}
			return classes
		}
	},
	methods: {
		close() {
			this.isOpen = false
		}
	}
}
</script>