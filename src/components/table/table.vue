<template>
    <div>
        <table v-if="rows.length" class="bordered">
            <el v-for="(row, i) in displayRows"
                :key="row.id + i"
                :element="row"
                :context="row.context" />
        </table>
        <div v-if="!rows.length">
            <div class="text-center text-sm text-grey p-4"><i>Empty Table</i></div>
        </div>
    </div>
</template>
<script>
import base from '~/components/base'
import { findLoopById } from '~/redux/actions/logic'

export default {
    extends: base,

    data() {
        return {
            rows: [],
            displayRows: [],
            contents: this.$select('contents'),
        }
    },

    watch: {
        contents() {
            this.updateRows()
        },
        inRenderMode(mode) {

            this.updateRows()
            
            if (!mode) {
                this.editMode()
                return
            }
            this.renderMode()
        }
    },

    created() {
        this.updateRows()
        this.editMode()
    },

    methods: {
        updateRows() {
			this.rows = this.contents.filter((content) => {
				return content.container_id === this.id
			})
        },

        editMode() {
            this.displayRows = this.rows
        },

        renderMode() {
			const rows = []
			_.each(this.rows, (row) => {
                let loop = findLoopById(row.id)
                
				
				if (!loop) {
                    row.context = this.context
					rows.push(row)
					return
                }

				_.each(_.get(this.context, loop.array), (item) => {
					rows.push({
                        ...row,
                        context: {...this.context, [loop.as]: item}
                    })
				})
			})
			this.displayRows = rows          
        }
    }
}
</script>