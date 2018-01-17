<template>
<div class="toolbar toolbar-left" v-show="!inRenderMode">

	<div class="toolbar-tabs">
		<a v-for="tab in tabs"
			v-if="!tab.hidden && (tab.requireSelection ? selectedId : true)"
			:key="'tab' + tab.component"
			@click="openTab(tab)"
			:class="active == tab ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">{{ tab.icon }}</i>
			{{ tab.label }}
		</a>
	</div>

	<div class="toolbar-content" v-if="active">
		<div :is="active.component" :id="selectedId"></div>
	</div>
</div>
</template>
<script>
import {getSelectedContent} from '~/redux/actions/session'

import Data from './tabs/Data.vue'
import Style from './tabs/Style.vue'
import Layout from './tabs/Layout.vue'
import Elements from './tabs/Elements.vue'

function composeTab(component, label, icon, requireSelection = false) {
	return {
		icon,
		label,
		component,
		requireSelection,
	}
}

function composeCustomTab(menu) {
	return {
		...menu,
		custom: true,
		requireSelection: true,
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
				composeTab('tab-data', 'Data', 'settings_ethernet'),
				composeTab('tab-layout', 'Page Layout', 'assignment'),
				composeTab('tab-elements', 'Elements', 'layers'),
				composeTab('tab-style', 'Style', 'format_paint', true),				
			],
			active: null,
			customTab: null,
			selectedId: this.$select('session.selectedId as selectedId'),
		}
	},
	watch: {
		selectedId() {
			return this.reactToContentSelection()
		}
	},
	methods: {
		
		openTab(tab) {
			this.active = tab
		},
		
		openTabByName(name) {
			this.openTab(_.find(this.tabs, {
				label: name
			}))
		},
		
		reactToContentSelection() {
			if (!this.selectedId) {
				return this.onContentDeselected()
			}
			return this.onContentSelected(
				getSelectedContent()
			)
		},
		
		onContentDeselected() {
			this.removeCustomTabs()
			this.hideContentSpecificTabs()
		},
		
		onContentSelected(content) {
			// Get the custom menu for this content
			const menu = _swd.registry.menu(content.element)

			// Remove any custom tabs previously shown
			this.removeCustomTabs()
			this.showContentSpecificTabs()
			
			if ( ! menu) {
				// There is no custom menu for this content.
				// Just show the styling menu instead
				this.openTabByName('Style')
				return
			}

			const tab = composeCustomTab(menu)
			this.tabs.push(tab)

			// Open custom tab if current tab is not element specific.
			if (!this.active || !this.active.requireSelection) {
				this.openTab(tab)
			}
		},

		showContentSpecificTabs() {
			this.tabs = this.tabs.map((tab) => {
				tab.hidden = false
				return tab
			})
		},

		hideContentSpecificTabs() {
			this.tabs = this.tabs.map((tab) => {
				if (tab.requireSelection) {
					if (this.active == tab) {
						this.active = null
					}
					tab.hidden = true
				}
				return tab
			})
		},

		removeCustomTabs() {
			this.tabs = _.filter(this.tabs, (tab) => {
				if (tab.custom) {
					if (this.active == tab) {
						this.active = null
					}
					return false
				}
				return true
			})
		},
	}
}
</script>