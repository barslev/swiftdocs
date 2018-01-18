<template>
  <div>
    <label class="label">
        {{ $t('scope.apply_to') }}
    </label>
    <select class="form-control" v-model="scope" @change="changeScope">
      <option :value="null">{{ $t('scope.all_pages') }}</option>
      <option :value="page.id" v-for="(page, i) in pages" :key="page.id">{{ $t('scope.only_to_page', [i + 1]) }}</option>
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scope: null,
      pages: this.$select('pages'),
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
