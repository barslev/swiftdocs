<template>
    <div>
        <custom-modal name="page-size" :height="220" @before-open="getDefaults" @on-ok="apply()">
            <div slot="title">Page Size</div>
            <div slot="content">
                <div class="flex flex-wrap">
                    <div class="md:w-1/2 px-1 mb-4">
                        <label class="label">Width</label>
                        <input type="number" class="form-control" v-model="defaultDimensions.width" />
                    </div>
                    <div class="md:w-1/2 px-1 mb-4">
                        <label class="label">Height</label>
                        <input type="number" class="form-control" v-model="defaultDimensions.height" />
                    </div>
                </div>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { updateAllPageDimensions } from '~/redux/actions/pages'

export default {
    data() {
        return {
            scope: null,
            defaultDimensions: {}
        }
    },
    methods: {
        getDefaults() {
            this.defaultDimensions = Object.assign({}, this.$select('defaults.dimensions as defaultDimensions'))
        },
        apply() {
            return updateAllPageDimensions(this.defaultDimensions)
        }
    }
}
</script>
