<template>
    <div>
        <button class="btn-default" @click="openTable()">
            <i class="material-icons">grid_on</i>
            Go to Table
        </button>
        <hr>    
        <h5>Add Row</h5>
        <button class="btn-default" @click="addBefore()"><i class="material-icons">add</i> Before</button>
        <button class="btn-default" @click="addAfter()"><i class="material-icons">add</i> After</button>


    </div>
</template>
<script>
import Generator from './generator'
import {findContent} from '~/redux/actions/contents'
import {selectContent} from '~/redux/actions/session'

export default {
    props: ['id'],
    methods: {
        openTable() {
            const content = findContent(this.id)
            const section = findContent(content.container_id)

            selectContent(section.container_id)
        },
        addBefore() {
            this.addRow(true)
        },
        addAfter() {
            this.addRow(false)
        },
        addRow(before) {
            Generator.addRow(this.id, before)            
        }
    }
}
</script>