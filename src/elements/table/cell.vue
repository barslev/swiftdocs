<template>
    <div is="container"
        width="25%"
        :id="id"
        html-tag="td"
        :allow-drop="true" />
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base
}
</script>