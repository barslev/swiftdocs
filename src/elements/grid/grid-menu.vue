<template>
    <div>
        <h5>Justify Option</h5>
        <div>
            <select class="form-control" :value="state.justify" @change="updateJustification(arguments[0].target.value)">
                <option value="justify-start">Left</option>
                <option value="justify-center">Center</option>
                <option value="justify-end">Right</option>
                <option value="justify-between">Space Between</option>
                <option value="justify-around">Space Around</option>
            </select>
        </div>
    </div>
</template>
<script>
import base from '~/elements/base'
import {updateContentState} from '~/redux/actions/contents'

export default {
    extends: base(),
    
    methods: { 
        updateJustification(justify) {
            updateContentState(this.id, {justify})
        },
    }
}
</script>