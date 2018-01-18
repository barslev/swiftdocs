<template>
    <p v-html="html"></p>
</template>
<script>
import Handlebars from 'handlebars/dist/handlebars'

export default {
    props: ['template', 'context'],

    data() {
        return {
            html: ''
        }
    },

    created() {
        this.renderText()
    },

    methods: {
        renderText() {
            const data = {
                ..._swd.dataSource.data,
                ...this.context,
            }
            this.html = Handlebars.compile(this.template)(data)
        }
    }
}
</script>