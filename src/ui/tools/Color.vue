<template>
  <div>
      <div class="relative">
        <input :class="inputClass" :value="color" @input="updateColorRaw(arguments[0].target.value)" @click="showPicker()" />
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
            <div :class="cubeClass" :style="{backgroundColor: color}"></div>
        </div>
      </div>
      
      <div class="fixed z-10 mt-2" v-show="pickerShown">
        <sketch :value="{hex: color}" @input="updateColor(arguments[0])"></sketch>
      </div>
  </div>
</template>
<script>
import VueColor from 'vue-color'

export default {
    props: [
        'mini',
        'value',
    ],
    watch: {
        value() {
            this.color = this.value
        }
    },
    components: {
        sketch: VueColor.Sketch
    },
    computed: {
        inputClass() {
            return this.mini ? '' : 'form-control'
        },
        cubeClass() {
            return this.mini ? 'w-4 h-4 border -mt-2' : 'w-6 h-6 border'
        }
    },
    data() {
        return {
            color: null,
            colorObject: {},
            pickerShown: false
        }
    },
    created() {
        if (this.value) {
            this.color = this.value
        }
        this.closePickerOnClickOutside = this.closePickerOnClickOutside.bind(this)
    },
    methods: {
        updateColor(data) {
            this.updateColorRaw(data.hex)
        },
        updateColorRaw(color) {
            this.color = color
            this.$emit('input', this.color)
        },
        showPicker() {
            if (this.pickerShown) {
                return
            }
            this.pickerShown = true
            // We will hide the picker if clicked outside
            Vue.nextTick(() => {
                this.listenClickOutside()
            })
        },
        listenClickOutside() {
            document.body.addEventListener(
                'click',
                this.closePickerOnClickOutside,
                true
            )
        },
        stopListeningClickOutside() {
            document.body.removeEventListener(
                'click',
                this.closePickerOnClickOutside,
                true
            )
        },
        closePickerOnClickOutside($evt) {
            const className = $evt.target.className
            if (className.indexOf('vc') !== 0) {
                this.pickerShown = false
                this.stopListeningClickOutside()
            }
        }
    }
}
</script>

