<template>
    <div>
        <custom-modal name="translations" @before-open="load()" @on-ok="apply()" height="220">
            <div slot="title">{{ $t('modals.translations.title') }}</div>
            <div slot="content">
                <div class="px-1 mb-4">
                    <label class="label">{{ $t('modals.translations.switch') }}</label>
                    <select class="form-control" v-model="language">
                        <option v-for="language in translations" :key="language" :value="language">{{ $t('languages.' + language) }}</option>
                    </select>
                </div>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import { updatePageMargin, updateAllPageMargins } from '~/redux/actions/pages'

export default {
    data() {
        return {
            language: _swd.translation,
            translations: _swd.translations,
        }
    },
    methods: {
        load() {
            this.language = _swd.translation
        },
        apply() {
            _swd.translation = this.language
        }
    }
}
</script>
