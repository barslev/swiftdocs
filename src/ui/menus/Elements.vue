<template>
    <div>
		<h5>Elements</h5>
		<div id="toolbar_components" ref="components">
			<toolbar-button
				v-for="component in components"
                v-if="!component.hidden"
				:id="component.id"
				:key="component.id"
				:icon="component.icon">{{ component.label }}</toolbar-button>
		</div>
    </div>
</template>
<script>
export default {
    props: ['components'],
    mounted() {
        drake.containers.push(this.$refs.components)
    },
    beforeDestroy() {
        const index = drake.containers.indexOf(this.$refs.components)
        
        if (index >= 0) {
            drake.containers.splice(index, 1)
        }
    }
}
</script>