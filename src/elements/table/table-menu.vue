<template>
    <div>
        <div v-if="!state.init">
            <h5>Table</h5>
            <div class="flex flex-wrap">
                <div class="pr-2 mb-2">
                    <label>Columns</label>
                    <input type="number" v-model="columns" min="1" />
                </div>
                <div class="pr-2 mb-2">
                    <div class="checkbox"><label><input type="checkbox" v-model="header"> <i class="material-icons mr-1">check_circle</i> Header</label></div>
                </div>
                <div class="pr-2 mb-2">
                    <div class="checkbox"><label><input type="checkbox" v-model="footer"> <i class="material-icons mr-1">check_circle</i> Footer</label></div>
                </div>
            </div>

            <button class="btn-primary" @click="generate()">Generate</button>
        </div>
    </div>
</template>
<script>
import Generator from './generator'
import {connect} from '~/redux/connect'
import {getContentState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    mixins: [
        connect((state, scope) => {
            return {
                init: getContentState(scope.id).init
            }
        })
    ],    
    data() {
        return {
            columns: 5,
            header: true,
            footer: false,
        }
    },
    methods: {
        generate() {
            Generator.fire(
                this.id,
                this.columns,
                this.header,
                this.footer
            )
        }
    }
}
</script>