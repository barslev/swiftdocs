<template>
    <div style="margin-top:2px">
        <div class="progress" v-if="state.saving">{{ $t('messages.saving') }}</div>
        <div v-else class="text-xs text-grey">
            {{ state.changed ? 'Modified' : 'Saved'}}
        </div>
    </div>
</template>
<script>
import { connect } from '~/redux/connect'

export default {
    mixins: [
        connect((state, scope) => {
            return {
                saving: state.session.saving,
                changed: state.session.changed,
            }
        })
    ],
    mounted() {
        window.onbeforeunload = () => {
            if (this.state.changed) {
                return 'This document has been modified. All unsaved changes will be LOST.'
            }
            return null
        }
    }
}
</script>