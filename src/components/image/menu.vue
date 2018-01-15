<template>
<div>
    <h5>Select Image</h5>
    <input ref="file" type="file" accepts="image/*" />
    <button class="mt-4 mr-1 p-2 bg-blue hover:bg-blue-light text-white text-xs font-bold uppercase" @click="update()">Update</button>
    <button class="mt-4 mr-1 p-2 bg-grey-darker hover:bg-grey-dark text-white text-xs font-bold uppercase" @click="remove()">Remove</button>
</div>
</template>
<script>
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
    props: ['id'],
    methods: {
        update() {
            this.readBase64Image()
                .then((src) => {
                    this.$refs.file.value = ''
                    const state = getElementState(this.id)
                    updateElementState(this.id, {
                        ...state,
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
            updateElementState(this.id, null)
        }
    }
}
</script>