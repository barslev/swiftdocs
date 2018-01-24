<template>
    <div is="container"
        :id="id"
        html-tag="td"
        :context="context"
        :width="state.width ? state.width : null"
        :allow-drop="true"
        @mousedown.native="resizer.down" />
</template>
<script>
import base from '~/elements/base'
import Resizer from './resizer'

export default {
    extends: base,
    data() {
        return {
            resizer: null
        }
    },
    mounted() {
        this.resizer = new Resizer(
            this.$el,
            this.id,
        )
    }
}
</script>