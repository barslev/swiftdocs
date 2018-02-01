<template>
  <editor v-if="!inRenderMode" :id="id" :language="state.translation" :content="content"></editor>
  <displayer v-else :template="content" :context="context"></displayer>
</template>
<script>
import base from '~/elements/base'
import { connect } from '~/redux/connect'
import {getContentState} from '~/redux/actions/contents'

export default {

  extends: base,

  mixins: [
    connect((state, scope) => {
      return {
        text: getContentState(scope.id).text,
        translation: state.session.translation,
      }
    })
  ],

  components: {
    'editor': require('./editor.vue').default,
    'displayer': require('./displayer.vue').default,
  },
  
  computed: {
    content() {
      let text = this.state.text
      if (this.hasTranslations) {
        return this.translatedContent(
          text,
          this.state.translation
        )
      }
      return text
    }
  },

  methods: {
    translatedContent(text, language) {
      if (!text) {
        return ''
      }
      if (typeof text === 'string') {
        // It's not possible to get translations from a string.
        return text
      }
      // If translation exists, return it
      if (text[language]) {
        return text[language]
      }
      // If no translation is found, use another language
      for(let otherLang in text) {
        if (text[otherLang]) {
          return text[otherLang]
        }
      }
      return ''
    }
  },
}
</script>
<style>
p {
  outline: 0
}
</style>
