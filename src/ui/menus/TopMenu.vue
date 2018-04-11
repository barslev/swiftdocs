<template>
    <div class="fixed pin-x pin-t bg-grey-lightest px-4 py-2 border-b border-grey-light" style="z-index:6">
        <div class="flex content-between">
            <div class="flex-1">
                <dropdown-menu :label="$t('top.file')" v-if="state.editable">
                    <template v-if="inRenderMode">
                    <dropdown-option @click.native="beginEditMode()">
                        <div class="flex items-center">
                            <i class="material-icons mr-1 text-blue">edit</i> {{ $t('top.edit_document') }}
                        </div>
                    </dropdown-option>
                    </template>
                    <template v-if="!inRenderMode">
                    <dropdown-option @click.native="save()">
                        <div class="flex items-center">
                            <i class="material-icons mr-1 text-green">save</i> {{ $t('top.save') }}
                        </div>
                    </dropdown-option>
                    <dropdown-option @click.native="beginRenderMode()">
                        <div class="flex items-center">
                            <i class="material-icons mr-1 text-orange" style="margin-top:-3px">remove_red_eye</i> {{ $t('top.render') }}
                        </div>
                    </dropdown-option>
                    </template>
                    <dropdown-option v-if="hasTranslations" @click.native="changeUiLanguage()">
                        <div class="flex items-center">
                            <i class="material-icons mr-1 text-purple" style="margin-top:-3px">language</i> {{ $t('top.change_language') }}
                        </div>
                    </dropdown-option>                
                </dropdown-menu>
                <document-title></document-title>
                <document-status></document-status>
            </div>

            <div class="flex-1" v-if="!inRenderMode">
                <top-button :disabled="!state.selection"
                    @click="deleteContent()"
                    v-tooltip="'Delete Content'"
                    icon="delete" />
                <top-button :disabled="!state.selection"
                    @click="duplicateContent()"
                    v-tooltip="'Duplicate Content'"
                    icon="content_copy" />
                <top-button :disabled="!state.selection"
                    @click="selectParent()"
                    v-tooltip="'Select Parent'"
                    icon="arrow_upward" />
            </div>
            <div>
                <dropdown-menu color="grey-dark" icon="language" v-if="translations.length > 1" :label="$t('languages.' + state.translation)" align="pin-r">
                    <dropdown-option v-for="language in translations" :key="language" v-if="language != translation" @click.native="changeTranslationLanguage(language)">
                        {{ $t('languages.' + language) }}
                    </dropdown-option>
                </dropdown-menu>
            </div>

        </div>
    </div>
</template>
<script>
import { connect } from '~/redux/connect'
import { setTranslation } from '~/redux/actions/session'
import { beginRenderMode, beginEditMode } from '~/redux/actions/session'
import { removeSelectedContent, duplicateSelectedContent, selectParent } from '~/redux/actions/commands'

export default {
    mixins: [
        connect((state, scope) => {
            return {
                editable: state.session.editable,
                translation: state.session.translation,
                selection: state.session.selectedId != '',
            }
        })
    ],
    created() {
        this.beginEditMode = () => {
            setTimeout(beginEditMode)
        }

        this.beginRenderMode = () => {
            setTimeout(beginRenderMode)
        }
    },
    data() {
        return {
            translations: _swd.translations,
        }
    },
    methods: {
        save() {
            _swd.save()
        },
        changeTranslationLanguage(locale) {
            setTranslation(locale)
        },
        changeUiLanguage() {
            this.$modal.show('language')
        },
        // Top Button Handlers
        selectParent: selectParent,
        deleteContent: removeSelectedContent,
        duplicateContent: duplicateSelectedContent,
    }
}
</script>