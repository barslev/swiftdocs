<template>
    <div></div>
</template>
<script>
import {connect} from '~/redux/connect'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				styles: state.styles,
			}
		})
	],
    watch: {
        'state.styles'() {
            console.log(this.state.styles)
        }
    }
}
</script>