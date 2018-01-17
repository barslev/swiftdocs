<template>
    <div></div>
</template>
<script>
export default {
    props: ['template', 'context'],
    created() {
        
        
        const el = document.createElement('div')
        try {
            const vm = new Vue({
                data: {..._swd.dataSource.data, ...this.context},
                template: '<div>' + this.template + '</div>',
                // add data that the element needs as well ...
            })
            vm.$mount(el)
        
            vm.$nextTick(() => {
                this.$el.innerHTML = vm.$el.innerHTML
            })
        } catch(e) {}
    }
}
</script>