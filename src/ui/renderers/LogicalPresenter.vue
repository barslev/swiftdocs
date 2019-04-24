<template>
    <div :is="htmlTag">
        <el v-for="(item, index) in items"
            :key="'item-' + index + '-' + item.id"
            :element="item">
        </el>
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {getContentState} from '~/redux/actions/contents'

export default {
    props: [
        'items',
        'htmlTag'
    ]
}
</script>