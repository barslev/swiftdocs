<template>
    <div is="container"
        :id="id"
        :html-tag="state.tag"
        :context="context"
        :children="children"
        :allow-drop="false" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base()
}
</script>