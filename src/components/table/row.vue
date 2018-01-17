<template>
    <tr>
        <td v-for="(cell, i) in cells" :key="i">
            <el :element="cell" :context="context" />            
        </td>
    </tr>
</template>
<script>
import base from '~/components/base'

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