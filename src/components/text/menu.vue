<template>
  <div>
  <h5>Typography</h5>

    <div class="pr-2 mb-2">
      <label class="label">Font Type</label>
      <select class="form-control" :value="state.style.fontFamily" @input="updateStyle('fontFamily', arguments[0].target.value)">
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Font Size</label>
      <select class="form-control" :value="state.style.fontSize" @input="updateStyle('fontSize', arguments[0].target.value + 'pt')">
          <option v-for="n in 10" :key="'fso' + n" :value="((n*2 + 4))">{{ (n*2 + 4) }} pt</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Line Spacing</label>
      <select class="form-control" :value="state.style.lineHeight" @input="updateStyle('lineHeight', arguments[0].target.value)">
          <option value="1em">Single Line</option>
          <option value="1.25em">1.25</option>
          <option value="1.5em">1.5</option>
          <option value="2em">Double Line</option>
      </select>
    </div>

    <hr>
    <h5>Alignment</h5>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.style.textAlign == 'left'" @change="updateStyle('textAlign', 'left')" />
            <i class="material-icons">format_align_left</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.style.textAlign == 'center'" @change="updateStyle('textAlign', 'center')" />
            <i class="material-icons">format_align_center</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.style.textAlign == 'right'" @change="updateStyle('textAlign', 'right')" />
            <i class="material-icons">format_align_right</i>
        </label>
    </div>
  </div>
</template>
<script>
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
  props: ['id'],
  data() {
    return {
      state: getElementState(this.id)
    }
  },
  watch: {
      id() {
        this.state = getElementState(this.id)
      }
  },
  methods: {
    updateStyle(prop, value) {
      const state = getElementState(this.id)
      this.state = updateElementState(this.id, {
        ...state,
        style: {
          ...state.style,
          [prop]: value
        }
      })
    }
  }
}
</script>
