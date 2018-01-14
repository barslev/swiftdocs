<template>
    <div></div>
</template>
<script>
export default {
    props: ['template'],
    created() {
        console.log(_swd.dataSource)
        const el = document.createElement('div')
        const vm = new Vue({
            data: _swd.dataSource.data,
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