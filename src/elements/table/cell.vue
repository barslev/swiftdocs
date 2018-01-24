<template>
    <div is="container"
        :id="id"
        html-tag="td"
        :context="context"
        :allow-drop="true" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base
}
</script>