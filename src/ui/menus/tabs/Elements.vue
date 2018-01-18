<template>
    <div>
		<h5>{{ $t('menus.elements.title') }}</h5>
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
import dragDrop from '~/kernel/dragDrop'

export default {
    data() {
        return {
			elements: _swd.registry.all(),            
        }
    },
    mounted() {
        dragDrop.add(this.$refs.elements)
    },
    beforeDestroy() {
        dragDrop.remove(this.$refs.elements)
    }
}
</script>