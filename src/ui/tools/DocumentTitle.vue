<template>
    <h4 class="mt-2" @click="change()">{{ title ? title : 'Untitled Document' }}</h4>
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
                'Enter a new title for this document',
                this.title ? this.title : ''
            )
            changeTitle(newTitle)
        }
    }
}
</script>