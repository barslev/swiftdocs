<template>
    <div>
        <table v-if="state.init"
            :id="id"
            is="container"
            html-tag="table"
            :allow-drop="false"
            :context="context"
            class="d-table d-table-bordered" />
            <div v-else class="text-center text-sm text-grey p-4">
                <i>Empty Table</i>
            </div>
    </div>
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base()
}
</script>