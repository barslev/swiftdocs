<template>
    <div>
        <custom-modal name="page-color" @before-open="getDefaults" @on-ok="apply()">
            <div slot="title">Page Background Color</div>
            <div slot="content">
                <div class="mb-4">
                    <label class="label">Color</label>
                    <color v-model="defaultBackground"></color>
                </div>
                <page-scope v-model="scope"></page-scope>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { updatePageColor, updateAllPageColors } from '~/redux/actions/pages'

export default {
    data() {
        return {
            scope: null,
            defaultBackground: ''
        }
    },
    methods: {
        getDefaults() {
            this.defaultBackground = this.$select('defaults.color as defaultBackground')
        },
        apply() {
            if (!this.scope) {
                return updateAllPageColors(this.defaultBackground)
            }
            return updatePageColor(this.defaultBackground, this.scope)
        }
    }
}
</script>
