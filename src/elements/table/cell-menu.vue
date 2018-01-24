<template>
    <div>
        <h5>Add Cell</h5>
        <button class="btn-default"><i class="material-icons">add</i> Before</button>
        <button class="btn-default"><i class="material-icons">add</i> After</button>
        <hr>

        <hr>
        <button class="btn-default" @click="openRow()">
            <i class="material-icons">grid_on</i>
            Go to Row
        </button>

    </div>
</template>
<script>
import {findContent} from '~/redux/actions/contents'
import {selectContent} from '~/redux/actions/session'

export default {
    props: ['id'],
    methods: {
        openRow() {
            const content = findContent(this.id)
            selectContent(content.container_id)
        }
    }
}
</script>