<template>
<div class="toolbar toolbar-left" v-show="!inRenderMode">

	<div class="toolbar-tabs">
		<a v-for="tab in tabs"
			:key="'tab' + tab.component"
			@click="openTab(tab)"
			:class="active == tab ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">{{ tab.icon }}</i>
			{{ tab.label }}
		</a>
	</div>

	<div class="toolbar-content" v-if="active">
		<div :is="active.component"></div>
	</div>
</div>
</template>
<script>
import {addPage} from '~/redux/actions/pages'
import {getSelectedContent} from '~/redux/actions/session'

import Data from './tabs/Data.vue'
import Style from './tabs/Style.vue'
import Layout from './tabs/Layout.vue'
import Elements from './tabs/Elements.vue'

function composeTab(component, label, icon) {
	return {
		icon,
		label,
		component
	}
}

export default {
	components: {
		'tab-data': Data,
		'tab-style': Style,
		'tab-layout': Layout,
		'tab-elements': Elements,
	},
	data() {
		return {
			tabs: [
				composeTab('tab-data', 'Data Connection', 'settings_input_hdmi'),
				composeTab('tab-layout', 'Page Layout', 'assignment'),
				composeTab('tab-elements', 'Elements', 'layers'),
				composeTab('tab-style', 'Style', 'format_paint'),
			],
			active: null,
			customTab: null,
			selectedId: this.$select('session.selectedId as selectedId'),
		}
	},
	watch: {
		selectedId() {
			return this.updateCustomTab()
		}
	},
	methods: {
		addPage() {
			addPage()
		},
		openTab(tab) {
			this.active = tab
		},
		updateCustomTab() {

			if (!this.selectedId) {
				return this.resetCustomTab('elements')
			}
			
			const content = getSelectedContent()
			const menu = _swd.registry.menu(content.element)

			if (!menu) {
				this.resetCustomTab()
				this.openTab('styling') // This content has no custom menu. Go to styling.
				return
			}

			this.customTab = menu
			this.openTab('custom')
		},
		resetCustomTab(go) {
			if (go && this.tab == 'custom') {
				this.tab = go
			}
			this.customTab = null
		}
	}
}
</script>