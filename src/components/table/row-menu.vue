<template>
    <div>
        <h5>Add Row</h5>
        <button class="btn-default"><i class="material-icons">add</i> Before</button>
        <button class="btn-default"><i class="material-icons">add</i> After</button>
        <hr>

        <h5>Repeat Logic</h5>
        <div class="pr-2 mb-2">
            <label>Repeat in Array</label>
            <input type="text" />
        </div>
        <div class="pr-2 mb-2">
            <label>Repeat As</label>
            <input type="text" />
        </div>

        <button class="btn-primary">Set Logic</button>
        <button class="btn-default">Remove Logic</button>

        <hr>
        <button class="btn-default" @click="openTable()">
            <i class="material-icons">grid_on</i>
            Go to Table
        </button>

    </div>
</template>
<script>
import {findContent} from '~/redux/actions/contents'

export default {
    props: ['id'],
    methods: {
        openTable() {
            const content = findContent(this.id)
            console.log(content)
            this.$router.push({name: 'content', params: {id: content.container_id}})
        }
    }
}
</script>