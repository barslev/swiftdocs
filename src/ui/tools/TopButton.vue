<template>
    <button @click="emitClick" :disabled="disabled" type="button" class="mt-1 p-1 border hover:bg-white inline-block text-center text-xs font-bold uppercase" :class="btnClass">
        <i class="material-icons">{{ icon }}</i>
    </button>
</template>
<script>
export default {
    props: ['icon', 'disabled'],
    computed: {
        btnClass() {
            return this.disabled ? 'text-grey-light border-grey-light' : 'text-grey-dark border-grey-dark hover:text-blue hover:border-blue'
        }
    },
    methods: {
        emitClick() {
            this.$emit('click')
        }
    }
}
</script>