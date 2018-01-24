<template>
    <div>
        <h5>Grid Pane</h5>
        <div>
            <label>Pane Weight</label>
            <input type="text" :value="state.weight" @input="updateWeight(arguments[0].target.value)" />
        </div>
        <br>
        <h5>Add Pane</h5>
        <button class="btn-default" @click="addBefore()"><i class="material-icons">add</i> To Left</button>
        <button class="btn-default" @click="addAfter()"><i class="material-icons">add</i> To Right</button>        
    </div>
</template>
<script>
import base from '~/elements/base'
import {findContent, getContentIndex, updateElementState, insertContentAtIndex} from '~/redux/actions/contents'

export default {
    extends: base,
    methods: {
        updateWeight(weight) {
            updateElementState(this.id, {
                weight
            })
        },
        addBefore() {
            this.addPane(true)
        },
        addAfter() {
            this.addPane(false)
        },
        addPane(before) {

            const content = findContent(this.id)
            const index = getContentIndex(this.id)
            const targetIndex = before ? index - 1 : index + 1

            insertContentAtIndex('d-grid-pane', content.container_id, targetIndex)
        }
    }
}
</script>