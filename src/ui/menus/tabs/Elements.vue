<template>
    <div>
		<h5>Elements</h5>
		<div id="toolbar_elements" ref="elements">
			<toolbar-button
				v-for="element in elements"
                v-if="!element.hidden"
				:id="element.id"
				:key="element.id"
				:icon="element.icon">{{ element.label }}</toolbar-button>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
			elements: _swd.registry.all(),            
        }
    },
    mounted() {
        drake.containers.push(this.$refs.elements)
    },
    beforeDestroy() {
        const index = drake.containers.indexOf(this.$refs.elements)
        
        if (index >= 0) {
            drake.containers.splice(index, 1)
        }
    }
}
</script>