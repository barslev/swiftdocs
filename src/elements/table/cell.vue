<template>
    <div is="container"
        :id="id"
        html-tag="td"
        :context="context"
        :width="state.width ? state.width : null"
        :allow-drop="true"
        :class="isResizable() ? 'resizable' : null" />
</template>
<script>
import base from '~/elements/base'
import Resizer from './resizer'

export default {
    props: [
        'payload'
    ],
    extends: base,
    data() {
        return {
            resizer: null
        }
    },
    mounted() {
        if (this.isResizable()) {
            this.resizer = new Resizer(
                this.$el,
                this.id,
            )
        }
    },
    beforeDestroy() {
        if (this.resizer) {
            this.resizer.destroy()
        }
    },
    methods: {
        isResizable() {
            return ! this.payload
        }
    }
}
</script>