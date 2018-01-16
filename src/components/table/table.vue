<template>
    <div>
        <table v-if="rows.length" class="bordered">
            <el v-for="element in rows"
                :key="element.id"
                :element="element" />
        </table>
        <div v-if="!rows.length">
            <div class="text-center text-sm text-grey p-4"><i>Empty Table</i></div>
        </div>
    </div>
</template>
<script>
import base from '~/components/base'

const defaultState = {}

export default {
    extends: base(defaultState),

    data() {
        return {
            rows: [],
            contents: this.$select('contents'),
        }
    },

    watch: {
        contents() {
            this.updateRows()
        }
    },

    created() {
        this.updateRows()
    },

    methods: {
        updateRows() {
			this.rows = this.contents.filter((content) => {
				return content.container_id === this.id
			})
        }
    }
}
</script>