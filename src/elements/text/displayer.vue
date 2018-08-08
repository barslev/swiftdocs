<template>
    <p v-html="html"></p>
</template>
<script>
import Handlebars from 'handlebars/dist/handlebars'

const urlPattern = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
const replacePattern = '<a href="$1" target="_blank">$1</a>'

Handlebars.registerHelper('with_links', content => {
    content = Handlebars.escapeExpression(content)
    return new Handlebars.SafeString(
        content.replace(urlPattern, replacePattern)
    )
})

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