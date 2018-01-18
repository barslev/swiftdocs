<template>
    <div v-html="html" v-once></div>
</template>
<script>
import Handlebars from 'handlebars/dist/handlebars'

export default {
    props: ['template', 'context'],
    data() {
        return {
            html: null
        }
    },
    created() {
                
        try {


        } catch(e) {}
    }
}
</script>