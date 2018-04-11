class TopMenu extends Component {
    
    renderDropdown() {
        if ( ! this.props.editable) {
            return null
        }
        return <DropdownMenu label="File">

        </DropdownMenu>
    }
    
    render() {
        return <div className="fixed pin-x pin-t bg-grey-lightest px-4 py-2 border-b border-grey-light" style="z-index:6">
            <div className="flex content-between">
                <div className="flex-1">
                    <dropdown-menu :label="$t('top.file')" v-if="state.editable">
                        <template v-if="inRenderMode">
                        <dropdown-option @click.native="beginEditMode()">
                            <div className="flex items-center">
                                <i className="material-icons mr-1 text-blue">edit</i> {{ $t('top.edit_document') }}
                            </div>
                        </dropdown-option>
                        </template>
                        <template v-if="!inRenderMode">
                        <dropdown-option @click.native="save()">
                            <div className="flex items-center">
                                <i className="material-icons mr-1 text-green">save</i> {{ $t('top.save') }}
                            </div>
                        </dropdown-option>
                        <dropdown-option @click.native="beginRenderMode()">
                            <div className="flex items-center">
                                <i className="material-icons mr-1 text-orange" style="margin-top:-3px">remove_red_eye</i> {{ $t('top.render') }}
                            </div>
                        </dropdown-option>
                        </template>
                        <dropdown-option v-if="hasTranslations" @click.native="changeUiLanguage()">
                            <div className="flex items-center">
                                <i className="material-icons mr-1 text-purple" style="margin-top:-3px">language</i> {{ $t('top.change_language') }}
                            </div>
                        </dropdown-option>                
                    </dropdown-menu>
                    <document-title></document-title>
                    <document-status></document-status>
                </div>

                <div className="flex-1" v-if="!inRenderMode">
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
                    <dropdown-menu color="grey-dark" icon="language" :label="$t('languages.' + state.translation)" align="pin-r">
                        <dropdown-option v-for="language in translations" :key="language" v-if="language != translation" @click.native="changeTranslationLanguage(language)">
                            {{ $t('languages.' + language) }}
                        </dropdown-option>
                    </dropdown-menu>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        editable: state.session.editable,
        translation: state.session.translation,
        selection: state.session.selectedId != '',
    }
}