<template>
    <h4 class="inline-block" @click="change()">{{ state.title ? state.title : $t('top.untitled_document') }}</h4>
</template>
<script>
import {connect} from '~/redux/connect'
import {changeTitle} from '~/redux/actions/title'

export default {
    mixins: [
        connect((state, scope) => {
            return {
                title: state.title,
            }
        })
    ],
    methods: {
        change() {
            if (this.inRenderMode) {
                return
            }
            const newTitle = prompt(
                this.$t('top.enter_title'),
                this.state.title ? this.state.title : ''
            )
            changeTitle(newTitle)
        }
    }
}
</script>