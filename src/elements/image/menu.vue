<template>
<div>
    <h5>From My Computer</h5>
    <input ref="file" type="file" accepts="image/*" />
    <button class="btn-primary" @click="update()">Update</button>
    <button class="btn-default" @click="remove()">Remove</button>
    <hr>


    <h5>URL From Variable</h5>
    <div>
        <label>Variable Address</label>
        <input type="text" v-model="variable" />
    </div>
    <button class="btn-primary" @click="loadFromVariable()">Set</button>
    <button class="btn-default" @click="remove()">Remove</button>    

    <hr>

    <h5>Dimensions</h5>
    <div class="flex flex-wrap">
        <div class="md:w-1/2 pr-2 mb-2">
            <label>Width</label>
            <input type="text" :value="state.width" @input="updateWidth(arguments[0].target.value)" />
        </div>
        <div class="md:w-1/4 pr-2 mb-2">
            <label>Height</label>
            <input type="text" :value="state.height" @input="updateHeight(arguments[0].target.value)" />
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
import {getContentState, updateContentState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    watch: {
        id() {
            this.state = getContentState(this.id)
        }
    },
    data() {
        return {
            variable: null,
            state: getContentState(this.id)
        }
    },
    created() {
        if (this.state.src && this.state.src.type == 'variable') {
            this.variable = this.state.src.content
        }
    },
    methods: {
        update() {
            this.readBase64Image()
                .then((src) => {
                    this.$refs.file.value = ''
                    this.state = updateContentState(this.id, {
                        src: {
                            type: 'base64',
                            content: src
                        }
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

        loadFromVariable() {
            this.state = updateContentState(this.id, {
                src: {
                    type: 'variable',
                    content: this.variable
                }
            })
        },

        remove() {
            this.variable = ''
            this.state = updateContentState(this.id, {src: null})
        },

        updateAlignment(align) {
            this.state = updateContentState(this.id, {align})
        },

        updateWidth(width) {
            this.state = updateContentState(this.id, {width})
        },

        updateHeight(height) {
            this.state = updateContentState(this.id, {height})
        },        
    }
}
</script>