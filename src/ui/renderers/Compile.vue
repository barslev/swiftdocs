<template>
    <div></div>
</template>
<script>
export default {
    props: ['template'],
    created() {
        const el = document.createElement('div')
        const vm = new Vue({
            template: '<div>' + this.template + '</div>',
            // add data that the component needs as well ...
        })
        vm.$mount(el)
        vm.$nextTick(() => {
            this.$el.innerHTML = vm.$el.innerHTML
        })
    }
}
</script>