<template>
    <div>
        <div v-if="needsInit">
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
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    data() {
        return {
            columns: 5,
            header: true,
            footer: false,
            contents: this.$select('contents')
        }
    },
    computed: {
        state() {
            let state = _.get(_.find(this.contents, { id: this.id }), 'state')
            return state
        },
        needsInit() {
            return ! this.state.init
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