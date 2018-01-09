<template>
  <div>
    <label class="label">
        Apply To
    </label>
    <select class="form-control" v-model="scope" @change="changeScope">
      <option :value="null">All pages</option>
      <option :value="page.id" v-for="(page, i) in pages" :key="page.id">Only to page {{ i + 1}}</option>
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
