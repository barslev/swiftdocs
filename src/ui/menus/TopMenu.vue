<template>
    <div class="fixed pin-x pin-t bg-grey-lightest px-4 py-2 border-b border-grey-light" style="z-index:6">
        <div class="float-left">
            <dropdown-menu :label="$t('top.file')">
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
            </dropdown-menu>
        </div>

        <div class="float-left">
            <document-title></document-title>
        </div>
        
        <div class="float-right">
            <dropdown-menu color="grey-dark" icon="language" :label="$t('languages.' + locale)" align="pin-r">
                <dropdown-option v-for="language in languages" v-if="language != locale" @click.native="changeLocale(language)">
                    {{ $t('languages.' + language) }}
                </dropdown-option>
            </dropdown-menu>
        </div>

        <div class="clearfix"></div>

        
    </div>
</template>
<script>
import {beginRenderMode, beginEditMode} from '~/redux/actions/session';

export default {
    created() {
        this.beginEditMode = beginEditMode
        this.beginRenderMode = beginRenderMode
    },
    data() {
        return {
            languages: _swd.languages
        }
    },
    computed: {
        locale() {
            return this.$i18n.locale
        }
    },
    methods: {
        save() {
            _swd.save()
        },
        changeLocale(locale) {
            _swd.setLanguage(locale)
        }
    }
}
</script>