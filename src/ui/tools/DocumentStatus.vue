<template>
    <div class="progress" v-if="saving">{{ $t('messages.saving') }}</div>
    <div v-else="saving" class="text-xs text-grey">
        {{ changed ? 'Modified' : ''}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            saving: this.$select('session.saving as saving'),
            changed: this.$select('session.changed as changed'),
        }
    },
    mounted() {
        window.onbeforeunload = () => {
            if (this.changed) {
                return 'This document has been modified. All unsaved changes will be LOST.'
            }
            return null
        }
    }
}
</script>