<template>
    <div>
        <div v-if="needsInit()">
            <h5>Table</h5>
            <div class="flex flex-wrap">
                <div class="md:w-1/2 pr-2 mb-2">
                    <label>Rows</label>
                    <input type="number" v-model="rows"  min="1" />
                </div>
                <div class="md:w-1/2 pr-2 mb-2">
                    <label>Columns</label>
                    <input type="number" v-model="columns" min="1" />
                </div>
            </div>

            <button class="btn-primary" @click="generate()">Generate</button>
        </div>
    </div>
</template>
<script>
import {findContent, insertContent} from '~/redux/actions/contents'

export default {
    props: ['id'],
    data() {
        return {
            rows: 1,
            columns: 5,
            contents: this.$select('contents')
        }
    },
    methods: {
        generate() {
            const content = findContent(this.id)

            for (let i = 0; i < this.rows; i++) {
                let rowId = insertContent('d-table-row', content.pageId, this.id)
                for (let k = 0; k < this.columns; k++) {
                    insertContent('d-text', content.pageId, rowId)
                }
            }
        },
        needsInit() {
            return !_.filter(this.contents, {container_id: this.id}).length
        }
    }
}
</script>