<template>
    <div>
        <custom-modal name="page-margins" @before-open="getDefaults" @on-ok="apply()">
            <div slot="title">{{ $t('modals.page_margins.title') }}</div>
            <div slot="content">
                <div class="flex flex-wrap">
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.top') }}</label>
                        <input type="number" class="form-control" v-model="defaultMargins.top" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.bottom') }}</label>
                        <input type="number" class="form-control" v-model="defaultMargins.bottom" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.left') }}</label>
                        <input type="number" class="form-control" v-model="defaultMargins.left" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.right') }}</label>
                        <input type="number" class="form-control" v-model="defaultMargins.right" />
                    </div>
                </div>
                <page-scope v-model="scope"></page-scope>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { updatePageMargin, updateAllPageMargins } from '~/redux/actions/pages'

export default {
    data() {
        return {
            scope: null,
            defaultMargins: {}
        }
    },
    methods: {
        getDefaults() {
            this.defaultMargins = Object.assign({}, this.$select('defaults.margins as defaultMargins'))
        },
        apply() {
            if (!this.scope) {
                return updateAllPageMargins(this.defaultMargins)
            }
            return updatePageMargin(this.defaultMargins, this.scope)
        }
    }
}
</script>
