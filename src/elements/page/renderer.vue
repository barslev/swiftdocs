<template>
	<div class="document__page flex flex-col">
		<div :id="id"
			is="container"
			class="flex-1"
			:context="context"
			:children="children"
			:allowDrop="true"
			@click.native="selectPage()"></div>
		</div>
	</div>
</template>
<script>
import base from '~/elements/base.js'
import {deselectContent} from '~/redux/actions/session'

export default {
    extends: base(),
	methods: {
		selectPage() {
			if (!this.inRenderMode) {
				deselectContent()
			}
		}
	}
}
</script>