<template>
    <div>
        <button class="btn-default" @click="openRow()">
            <i class="material-icons">grid_on</i>
            Go to Row
        </button>    

        
        <hr>        
        <h5>Add Cell</h5>
        <button class="btn-default"><i class="material-icons">add</i> Before</button>
        <button class="btn-default"><i class="material-icons">add</i> After</button>
        <hr>

        <h5>Spans</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/2 pr-4 mb-2">
                <label>Colspan</label>
                <input type="text" :value="state.colspan" @input="updateProp('colspan', arguments[0].target.value)" />
            </div>
            <div class="md:w-1/2 pr-4 mb-2">
                <label>Rowspan</label>
                <input type="text" :value="state.rowspan" @input="updateProp('rowspan', arguments[0].target.value)" />
            </div>
        </div>
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {selectContent} from '~/redux/actions/session'
import {findContent, getContentState, updateContentState} from '~/redux/actions/contents'

export default {
    props: [
        'id'
    ],

    mixins: [
        connect((state, scope) => {
            const contentState = getContentState(
                scope.id
            )
            return {
                colspan: contentState.colspan,
                rowspan: contentState.rowspan,
            }
        })
    ],

    methods: {
        openRow() {
            const content = findContent(this.id)
            selectContent(content.container_id)
        },
        updateProp(prop, value) {
            updateContentState(this.id, {
                [prop]: value
            })
        }
    }
}
</script>