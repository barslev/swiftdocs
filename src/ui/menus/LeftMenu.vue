<template>
<div class="toolbar toolbar-left">
	
	<h5>Page &amp; Layout</h5>
	<toolbar-button icon="settings_overscan" @onClick="$modal.show('page-margins')">Margins</toolbar-button>
	<toolbar-button icon="tab_unselected" @onClick="$modal.show('page-size')">Page Size</toolbar-button>
	<toolbar-button icon="color_lens" @onClick="$modal.show('page-color')">Color</toolbar-button>
	<toolbar-button icon="queue" @onClick="addPage()">Add Page</toolbar-button>	
	<hr>
	<h5>Elements</h5>
	<div id="toolbar_components" ref="components">
		<toolbar-button
			v-for="component in components"
			:id="component.id"
			:key="component.id"
			:icon="component.icon">{{ component.label }}</toolbar-button>
	</div>
</div>
</template>
<script>
import {addPage} from '~/redux/actions/pages'

export default {
	mounted() {
		drake.containers.push(this.$refs.components)
	},
	data() {
		return {
			components: _swd.registry.all()
		}
	},
	methods: {
		addPage() {
			addPage()
		}
	}
}
</script>