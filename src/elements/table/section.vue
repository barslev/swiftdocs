<template>
    <div is="container"
        :id="id"
        :html-tag="state.tag"
        :allow-drop="false" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base
}
</script>