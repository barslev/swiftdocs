<template>
	<div class="relative float-left mr-2">
		<a @click="isOpen = !isOpen"
			v-click-outside="close"
			class="p-2 pt-2 border border-blue hover:bg-white inline-block text-center text-xs font-bold uppercase text-blue"
			:class="isOpen ? 'bg-white' : ''"
			role="button">
			{{ label }} <i class="material-icons float-right ml-1" style="margin-top:-2px">keyboard_arrow_down</i>
		</a>
		<div v-if="isOpen" class="border-l border-r border-b border-grey bg-white shadow overflow-hidden absolute min-w-full">
			<slot></slot>
		</div>
	</div>
	
	<!--
	<div class="dropdown_menu">
		<div class="dropdown_menu__button">
			<slot name="link"></slot>
		</div>
		<slot name="options"></slot>
	</div>
	-->
</template>
<script>
export default {
	props: ['label'],
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		close() {
			this.isOpen = false
		}
	}
}
</script>