<template>
    <div is="container"
        :id="id"
        :context="context"
        :style="{flex: state.weight}"
        :allow-drop="true" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base()
}
</script>