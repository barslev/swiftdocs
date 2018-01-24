<template>
    <table v-if="state.init"
        :id="id"
        is="container"
        html-tag="table"
        :allow-drop="false"
        style="table-layout: fixed;"
        class="bordered" />
    
    <div v-else class="text-center text-sm text-grey p-4"><i>Empty Table</i></div>
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base
}
</script>