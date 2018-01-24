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
import {selectContent} from '~/redux/actions/session'
import {findContent, updateElementState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    methods: {
        openRow() {
            const content = findContent(this.id)
            selectContent(content.container_id)
        },
        updateProp(prop, value) {
            updateElementState(this.id, {
                [prop]: value
            })
        }
    },
    data() {
        return {
            contents: this.$select('contents')
        }
    },
    computed: {
        state() {
            let state = _.get(_.find(this.contents, { id: this.id }), 'state')
            return state
        }
    }    
}
</script>