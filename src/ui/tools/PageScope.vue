<template>
  <div>
    <label class="label">
        {{ $t('scope.apply_to') }}
    </label>
    <select class="form-control" v-model="scope" @change="changeScope">
      <option :value="null">{{ $t('scope.all_pages') }}</option>
      <option :value="page.id" v-for="(page, i) in state.pages" :key="page.id">{{ $t('scope.only_to_page', [i + 1]) }}</option>
    </select>
  </div>
</template>
<script>
import {connect} from '~/redux/connect'

export default {
  mixins: [
    connect((state, scope) => {
      return {
        pages: state.pages
      }
    })
  ],
  data() {
    return {
      scope: null
    }
  },
  created() {
    this.$emit('input', this.scope)
  },
  methods: {
    changeScope() {
      this.$emit('input', this.scope)
    }
  }
}
</script>
