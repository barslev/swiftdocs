<template>
    <div is="container"
        :id="id"
        :context="context"
        :style="{flex: state.weight, width: state.width + 'px'}"
        :allow-drop="true" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base()
}
</script>