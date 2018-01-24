<template>
    <tr>
        <el v-for="(cell, i) in cells" :key="i" :element="cell" :context="context" />
    </tr>
</template>
<script>
import base from '~/elements/base'

export default {
    extends: base,

    data() {
        return {
            cells: [],
            contents: this.$select('contents'),
        }
    },

    watch: {
        contents() {
            this.updateCells()
        }
    },

    created() {
        this.updateCells()
    },

    methods: {
        updateCells() {
			this.cells = this.contents.filter((content) => {
				return content.container_id === this.id
			})
        }
    }
}
</script>