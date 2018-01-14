<template>
	<div>
		<dropdown-menu label="test">
			<div slot="link" class="document__page_number">
				<i class="material-icons">menu</i> Page {{ number }}
			</div>
			<ul slot="options">
				<li @click="remove()"><i class="material-icons">delete</i> Delete Page</li>
			</ul>
		</dropdown-menu>
	</div>
</template>
<script>
import {removePage} from '~/redux/actions/pages'

export default {
	props: ['id', 'number'],
	methods: {
		remove() {
			removePage(this.id)
		}
	}
}
</script>