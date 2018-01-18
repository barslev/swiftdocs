<template>
    <h4 class="mt-2" @click="change()">{{ title ? title : $t('top.untitled_document') }}</h4>
</template>
<script>
import {changeTitle} from '~/redux/actions/title'

export default {
    data() {
        return {
            title: this.$select('title')
        }
    },
    methods: {
        change() {
            const newTitle = prompt(
                this.$t('top.enter_title'),
                this.title ? this.title : ''
            )
            changeTitle(newTitle)
        }
    }
}
</script>