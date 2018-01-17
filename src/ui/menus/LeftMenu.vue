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
			<div>element</div>
		</a>

		<a v-if="customTab" @click="openTab('custom')" :class="tab == 'custom' ? 'active' : ''">
			<i class="material-icons" style="font-size:24px">{{ customTab.icon }}</i>
			<div>{{ customTab.label }}</div>
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
	
	<div class="toolbar-content" v-if="tab == 'components'">
		<elements :components="components"></elements>
	</div>

	<div class="toolbar-content" v-show="tab == 'styling'">
		<router-view></router-view>
	</div>

	<div class="toolbar-content" v-if="tab == 'custom'">
		<div :is="customTab.component" :id="selectedId"></div>
	</div>	
</div>
</template>
<script>
import {addPage} from '~/redux/actions/pages'
import {getSelectedContent} from '~/redux/actions/session'

export default {
	data() {
		return {
			tab: 'layout',
			customTab: null,
			components: _swd.registry.all(),
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
			this.tab = tab
		},
		updateCustomTab() {

			if (!this.selectedId) {
				return this.resetCustomTab('components')
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