<template>
  <div>
  <h5>Typography</h5>

    <div class="pr-2 mb-2">
      <label class="label">Font Type</label>
      <select class="form-control" :value="state.styles.fontFamily" @input="updateStyle('fontFamily', arguments[0].target.value)">
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Font Size</label>
      <select class="form-control" :value="state.styles.fontSize" @input="updateStyle('fontSize', arguments[0].target.value)">
          <option v-for="n in 10" :key="'fso' + n" :value="((n*2 + 4)) + 'pt'">{{ (n*2 + 4) }} pt</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Line Spacing</label>
      <select class="form-control" :value="state.styles.lineHeight" @input="updateStyle('lineHeight', arguments[0].target.value)">
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
            <input type="checkbox" :checked="state.styles.textAlign == 'left'" @change="updateStyle('textAlign', 'left')" />
            <i class="material-icons">format_align_left</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.styles.textAlign == 'center'" @change="updateStyle('textAlign', 'center')" />
            <i class="material-icons">format_align_center</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.styles.textAlign == 'justify'" @change="updateStyle('textAlign', 'justify')" />
            <i class="material-icons">format_align_justify</i>
        </label>
    </div>    
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.styles.textAlign == 'right'" @change="updateStyle('textAlign', 'right')" />
            <i class="material-icons">format_align_right</i>
        </label>
    </div>
    <hr>
    <h5>Text Color</h5>
    <color :mini="true" :value="state.styles.color" @input="updateStyle('color', arguments[0])" />      

  </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {updateStyle} from '~/redux/actions/styles'

export default {
  props: ['id'],
  mixins: [
    connect((state, scope) => {
      return {
        styles: state.styles[scope.id]
      }
    })
  ],
  methods: {
    updateStyle(prop, value) {
      updateStyle(this.id, prop, value)
    }
  }
}
</script>
