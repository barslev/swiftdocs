<template>
	<div :data-name="id">
		<button @click="onClick()" class="toolbar__button toolbar__button-block">
			<i class="material-icons">{{ icon }}</i>
			<slot></slot>
		</button>
	</div>
</template>
<script>
export default {
	props: ['id', 'icon'],
	methods: {
		onClick() {
			this.$emit('onClick')
		}
	}
}
</script>