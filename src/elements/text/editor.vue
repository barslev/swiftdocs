<template>
    <p style="min-height:initial !important" @blur="update($event)"></p>
</template>
<script>
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/themes/default.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import {getContentState, updateContentState} from '~/redux/actions/contents'

export default {
    
    props: [
        'id',
        'language',
        'content'
    ],

    mounted() {
        this.writeContent()
        Vue.nextTick(() => {
            this.activateEditor()
        })
    },

    watch: {
        language() {
            this.writeContent()
        }
    },

    methods: {

        activateEditor() {
            
            this.editor = new MediumEditor(this.$el, {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'list-extension']
                }
            })
        },
        
        update(event) {
            if (this.hasTranslations) {
                return this.updateMultilingual(
                    event.target.innerHTML
                )
            }
            // Or just update the text field
            updateContentState(this.id, {
                text: event.target.innerHTML
            })
        },

        updateMultilingual(content) {

            let activeLanguage = store.state.session.translation
            let text = _.get(getContentState(this.id), 'text', {})

            if (typeof text === 'string') {
                // Re-initialize text field as map
                text = {}
            } else if (typeof text === 'object') {
                // Clone text, keep immutability
                text = {...text}
            }
            // Update the current translation
            text[activeLanguage] = content

            _.each(_swd.translations, (language) => {
                if (language == activeLanguage) {
                    return
                }
                // When translation does not exist in other language,
                // Update them too so it becomes easier to edit later on
                if (!_.get(text, language)) {
                    text[language] = content
                }
            })
            // Finally update the element's state
            updateContentState(this.id, {
                text
            })
        },

        writeContent() {
            this.$el.innerHTML = this.content
        }
    }
}
</script>