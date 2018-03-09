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

    watch: {
        template() {
            this.renderText()
        }
    },

    methods: {
        renderText() {
            this.html = Handlebars.compile(this.template)(this.context)
        }
    }
}
</script>