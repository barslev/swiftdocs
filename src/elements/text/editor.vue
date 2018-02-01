<template>
    <p style="min-height:initial !important" @focus="editing = true" @blur="update($event)"></p>
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
        'content',
    ],

    data() {
        return {
            editing: false
        }
    },

    mounted() {
        this.writeContent()
        Vue.nextTick(() => {
            this.activateEditor()
        })
    },

    beforeDestroy() {
        if (this.editor) {
            this.editor.destroy()
        }
    },

    watch: {
        language() {
            this.writeContent()
        },
        editing() {
            this.writeContent()
        }
    },

    computed: {
        output() {
            if (this.editing) {
                return this.html
            }
            return this.html ? this.html : 'Placeholder'
        }
    },

    methods: {

        activateEditor() {
            this.editor = new MediumEditor(this.$el, {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'list-extension']
                },
                placeholder: {text: ''}
            })
        },

        updateEditing() {
            setTimeout(() => {
                if (this.$el !== document.activeElement) {
                    this.editing = false
                }
            }, 50)
        },
        
        update(event) {
            this.updateEditing()
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

            let activeLanguage = store.getState().session.translation
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
            // Update the element's state
            updateContentState(this.id, {
                text
            })
        },

        writeContent() {
            let content = this.content
            if ( ! this.editing && ! content) {
                content = 'Type here...'
            }
            this.$el.innerHTML = content
        }
    }
}
</script>