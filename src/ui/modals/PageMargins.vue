<template>
    <div>
        <custom-modal name="page-margins" @on-ok="apply()">
            <div slot="title">{{ $t('modals.page_margins.title') }}</div>
            <div slot="content">
                <div class="flex flex-wrap">
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.top') }}</label>
                        <input type="number" class="form-control" v-model="state.margins.top" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.bottom') }}</label>
                        <input type="number" class="form-control" v-model="state.margins.bottom" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.left') }}</label>
                        <input type="number" class="form-control" v-model="state.margins.left" />
                    </div>
                    <div class="md:w-1/4 px-1 mb-4">
                        <label class="label">{{ $t('modals.page_margins.right') }}</label>
                        <input type="number" class="form-control" v-model="state.margins.right" />
                    </div>
                </div>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { connect } from '~/redux/connect'
import { updateAllPageMargins } from '~/redux/actions/pages'

export default {
    mixins: [
        connect((state, scope) => {
            return {
                margins: state.defaults.margins
            }
        })
    ],
    methods: {
        apply() {
            return updateAllPageMargins(this.state.margins)
        }
    }
}
</script>
