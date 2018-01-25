<template>
    <div>
        <custom-modal name="language" @before-open="load()" @on-ok="apply()" height="220">
            <div slot="title">{{ $t('modals.language.title') }}</div>
            <div slot="content">
                <div class="px-1 mb-4">
                    <label class="label">{{ $t('modals.language.switch') }}</label>
                    <select class="form-control" v-model="selectedLanguage">
                        <option v-for="language in languages" :key="language" :value="language">{{ $t('languages.' + language) }}</option>
                    </select>
                </div>
            </div>
        </custom-modal>
    </div>
</template>
<script>


export default {
    data() {
        return {
            selectedLanguage: null,
            languages: _swd.languages,
        }
    },
    computed: {
        language() {
            return this.$i18n.locale
        }
    },
    methods: {
        load() {
            this.selectedLanguage = this.language
        },
        apply() {
            _swd.setLanguage(this.selectedLanguage)
        }
    }
}
</script>
