<template>
<div class="toolbar toolbar-left" v-show="!inRenderMode">

	<div class="toolbar-tabs">
		<a @click="openTab('layout')" :class="tab == 'layout' ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">assignment</i>
			<div>Page Layout</div>
		</a>		
		<a @click="openTab('components')" :class="tab == 'components' ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">layers</i>
			<div>components</div>
		</a>
		<a @click="openTab('styling')" :class="tab == 'styling' ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">format_paint</i>
			<div>styling</div>
		</a>

	</div>

	<div class="toolbar-content" v-if="tab == 'layout'">
		<h5>Page Layout</h5>
		<toolbar-button icon="settings_overscan" @onClick="$modal.show('page-margins')">Margins</toolbar-button>
		<toolbar-button icon="tab_unselected" @onClick="$modal.show('page-size')">Page Size</toolbar-button>
		<toolbar-button icon="color_lens" @onClick="$modal.show('page-color')">Color</toolbar-button>
		<hr>
		<toolbar-button icon="queue" @onClick="addPage()">Add New Page</toolbar-button>	
	</div>
	
	<div class="toolbar-content" v-show="tab == 'components'">
		<h5>Elements</h5>
		<div id="toolbar_components" ref="components">
			<toolbar-button
				v-for="component in components"
				:id="component.id"
				:key="component.id"
				:icon="component.icon">{{ component.label }}</toolbar-button>
		</div>
	</div>

	<div class="toolbar-content" v-show="tab == 'styling'">
		<router-view></router-view>
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
			tab: 'layout',
			components: _swd.registry.all()
		}
	},
	methods: {
		addPage() {
			addPage()
		},
		openTab(tab) {
			this.tab = tab
		}
	}
}
</script>