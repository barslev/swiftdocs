<template>
    <button data-clipboard-action="copy" :data-clipboard-text="address" @click="stop">
        <i class="material-icons text-grey-light">library_books</i>
    </button>
</template>
<script>
import ClipboardJS from 'clipboard'

export default {
    props: ['address'],
    
    mounted() {
        this.clipboard = new ClipboardJS(this.$el)
    },

    beforeDestroy() {
        if (this.clipboard) {
            this.clipboard.destroy()
        }
    },

    methods: {
        stop(e) {
            notifySuccess($t('menus.data.address_copied'))
            e.stopPropagation()
        },
    },
}
</script>