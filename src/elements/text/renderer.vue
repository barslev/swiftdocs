<template>
  <editor v-if="!inRenderMode" :id="id" :language="translation" :content="content"></editor>
  <displayer v-else :template="content" :context="context"></displayer>
</template>
<script>
import base from '~/elements/base'

export default {

  extends: base,

  components: {
    'editor': require('./editor.vue').default,
    'displayer': require('./displayer.vue').default,
  },

  data() {
    return {
      translation: this.$select('session.translation as translation')
    }
  },
  
  computed: {
    content() {
      let text = this.state.text
      if (this.hasTranslations) {
        return this.translatedContent(
          text,
          this.translation
        )
      }
      return text
    }
  },

  methods: {
    translatedContent(text, language) {
      if (typeof text === 'string') {
        // It's not possible to get translations from a string.
        return text
      }
      return text[language]
    }
  }
}
</script>
<style>
p {
  outline: 0
}
</style>
