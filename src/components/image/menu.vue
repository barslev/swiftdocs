<template>
<div>
    <h5>Select Image</h5>
    <input ref="file" type="file" accepts="image/*" />
    <button class="btn-primary" @click="update()">Update</button>
    <button class="btn-default" @click="remove()">Remove</button>

    <hr>
    <h5>Dimensions</h5>
    <div class="flex flex-wrap">
        <div class="md:w-1/2 pr-2 mb-2">
            <label>Width</label>
            <input type="text" :value="state.style.width" @input="updateStyle('width', arguments[0].target.value)" />
        </div>
        <div class="md:w-1/4 pr-2 mb-2">
            <label>Height</label>
            <input type="text" :value="state.style.height" @input="updateStyle('height', arguments[0].target.value)" />
        </div>
    </div>

    <hr>
    <h5>Alignment</h5>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.align == 'left'" @change="updateAlignment('left')" />
            <i class="material-icons">format_align_left</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.align == 'center'" @change="updateAlignment('center')" />
            <i class="material-icons">format_align_center</i>
        </label>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" :checked="state.align == 'right'" @change="updateAlignment('right')" />
            <i class="material-icons">format_align_right</i>
        </label>
    </div>    
</div>
</template>
<script>
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    watch: {
        id() {
            this.state = getElementState(this.id)
        }
    },
    data() {
        return {
            state: getElementState(this.id)
        }
    },
    methods: {
        update() {
            this.readBase64Image()
                .then((src) => {
                    this.$refs.file.value = ''
                    this.state = updateElementState(this.id, {
                        ...this.state,
                        src,
                    })
                })
                .catch((error) => {
                    notifyError('Image not selected', 'Select an image before pressing update')
                })
        },

        readBase64Image() {
            return new Promise((resolve, reject) => {
                const file = this.$refs.file.files[0]
                if (!file) {
                    reject('Not selected')
                }
                const reader = new FileReader()
                reader.onloadend = function() {
                    resolve(reader.result)
                }
                reader.readAsDataURL(file)
            })
        },

        remove() {
            this.state = updateElementState(this.id, null)
        },

        updateAlignment(align) {
            this.state = updateElementState(this.id, {
                ...this.state,
                align: align
            })
        },

        updateStyle(key, value) {
            this.state = updateElementState(this.id, {
                ...this.state,
                style: {
                    ...this.state.style,
                    [key]: value
                }
            })
        }        
    }
}
</script>