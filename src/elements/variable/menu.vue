<template>
  <div>
    <div class="p-2 bg-grey-lightest">
      <div class="pr-2 mb-2">
        <label class="label">Variable</label>
        <input v-model="variable" />
      </div>
      <div class="mb-2">
        <label class="label pt-2">Placeholder</label>
        <input v-model="placeholder" />
        <button class="btn-primary" @click="setVariable()">{{ $t('global.set') }}</button>
      </div>
    </div>

    <br />

    <h5>Typography</h5>

    <div class="pr-2 mb-2">
      <label class="label">Font Type</label>
      <select
        class="form-control"
        :value="state.styles.fontFamily"
        @input="updateStyle('fontFamily', arguments[0].target.value)"
      >
        <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Font Size</label>
      <select
        class="form-control"
        :value="state.styles.fontSize"
        @input="updateStyle('fontSize', arguments[0].target.value)"
      >
        <option v-for="n in 10" :key="'fso' + n" :value="((n*2 + 4)) + 'pt'">{{ (n*2 + 4) }} pt</option>
      </select>
    </div>

    <div class="pr-2 mb-2">
      <label class="label">Line Spacing</label>
      <select
        class="form-control"
        :value="state.styles.lineHeight"
        @input="updateStyle('lineHeight', arguments[0].target.value)"
      >
        <option value="1em">Single Line</option>
        <option value="1.25em">1.25</option>
        <option value="1.5em">1.5</option>
        <option value="2em">Double Line</option>
      </select>
    </div>

    <hr />
    <h5>Alignment</h5>
    <div class="checkbox">
      <label>
        <input
          type="checkbox"
          :checked="state.styles.textAlign == 'left'"
          @change="updateStyle('textAlign', 'left')"
        />
        <i class="material-icons">format_align_left</i>
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input
          type="checkbox"
          :checked="state.styles.textAlign == 'center'"
          @change="updateStyle('textAlign', 'center')"
        />
        <i class="material-icons">format_align_center</i>
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input
          type="checkbox"
          :checked="state.styles.textAlign == 'justify'"
          @change="updateStyle('textAlign', 'justify')"
        />
        <i class="material-icons">format_align_justify</i>
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input
          type="checkbox"
          :checked="state.styles.textAlign == 'right'"
          @change="updateStyle('textAlign', 'right')"
        />
        <i class="material-icons">format_align_right</i>
      </label>
    </div>
    <hr />
    <h5>Text Color</h5>
    <color :mini="true" :value="state.styles.color" @input="updateStyle('color', arguments[0])" />
  </div>
</template>
<script>
import { connect } from "~/redux/connect";
import { updateStyle } from "~/redux/actions/styles";
import { updateContentState, getContentState } from "~/redux/actions/contents";

export default {
  props: ["id"],
  mixins: [
    connect((state, scope) => {
      return {
        styles: state.styles[scope.id]
      };
    })
  ],
  watch: {
    id() {
      this.loadState();
    }
  },
  data() {
    return {
      variable: null,
      placeholder: null,
      fonts: _swd.availableFonts
    };
  },
  mounted() {
    this.loadState();
  },
  methods: {
    loadState() {
      const state = getContentState(this.id);
      this.variable = state.variable;
      this.placeholder = state.placeholder;
    },
    updateStyle(prop, value) {
      updateStyle(this.id, prop, value);
    },
    setVariable() {
      if (!this.variable || !this.placeholder) {
        notifyError(
          "Variable not set",
          "You need to fill both variable and placeholder fields."
        );
        return;
      }
      updateContentState(this.id, {
        variable: this.variable,
        placeholder: this.placeholder
      });
    }
  }
};
</script>
