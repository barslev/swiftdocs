<template>
    <tr>
        <el v-for="(cell, i) in state.cells" :key="i" :element="cell" :context="context" :payload="(i + 1) == state.cells.length" />
    </tr>
</template>
<script>
import base from '~/elements/base'
import {connect} from '~/redux/connect'

export default {

    extends: base,
    
    mixins: [
        connect((state, scope) => {
            return {
                cells: state.contents.filter((content) => {
                    return content.container_id === scope.id
                })
            }
        })
    ],
}
</script>