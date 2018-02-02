<template>
    <div>
        <custom-modal name="page-color" @on-ok="apply()">
            <div slot="title">{{ $t('modals.page_color.title') }}</div>
            <div slot="content">
                <div class="mb-4">
                    <label class="label">{{ $t('modals.page_color.color') }}</label>
                    <color v-model="state.color"></color>
                </div>
                <page-scope v-model="scope"></page-scope>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { connect } from '~/redux/connect'
import { updatePageColor, updateAllPageColors } from '~/redux/actions/pages'

export default {
    mixins: [
        connect((state, props) => {
            return {
                color: state.defaults.color,
            }
        })
    ],
    data() {
        return {
            scope: null,
        }
    },
    methods: {
        apply() {
            if (!this.scope) {
                return updateAllPageColors(this.defaultBackground)
            }
            return updatePageColor(this.defaultBackground, this.scope)
        }
    }
}
</script>
