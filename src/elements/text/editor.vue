<template>
    <p style="min-height:initial !important" @blur="update" v-html="content"></p>
</template>
<script>
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/themes/default.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
    
    props: ['id', 'content'],

    mounted() {
      this.editor = new MediumEditor(this.$el, {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'list-extension']
        }
      })
    },

    methods: {
        
        update(event) {
            if (this.hasTranslations) {
                return this.updateMultilingual(
                    event.target.innerHTML
                )
            }
            // Or just update the text field
            updateElementState(this.id, {
                text: event.target.innerHTML
            })
        },

        updateMultilingual(content) {

            let activeLanguage = store.state.session.translation
            let text = _.get(getElementState(this.id), 'text', {})

            if (typeof text === 'string') {
                // Re-initialize text field as map
                text = {}
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
            updateElementState(this.id, {
                text
            })
        }
    }
}
</script>