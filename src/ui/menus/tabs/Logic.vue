<template>
    <div>
        <h5>Loop</h5>
        <div class="mb-3">
            <label>Path</label>
            <input type="text" v-model="loop.in" />
        </div>
        <div>
            <label>Repeat As</label>
            <input type="text" v-model="loop.as" />
        </div>
        <button class="btn-primary" @click="setLoop()">Set Loop</button>
        <button class="btn-default" @click="removeLoop()">Remove Loop</button>
    </div>
</template>
<script>
import {getElementState, updateElementState} from '~/redux/actions/contents'

export default {
    props: ['id'],

    watch: {
        id() {
            this.loadState()
        }
    },

    data() {
        return {
            state: null,
            loop: null
        }
    },

    created() {
        this.loadState()
    },

    methods: {
        loadState() {
            this.state = getElementState(this.id)

            if (this.state.logic && this.state.logic.loop) {
                this.loop = this.state.logic.loop
            } else {
                this.loop = {
                    in: '',
                    as: '',
                }
            }
        },
        getLogicParam(type, param) {
            return _.get(this.state, 'logic.' + type + '.' + param)
        },
        setLoop() {
            if (!this.loop.in || !this.loop.as) {
                notifyError('Loop not set.', 'Fill both fields to set a loop.')
                return
            }
            updateElementState(this.id, {
                logic: {
                    loop: this.loop
                }
            })
            this.loadState()
            notifySuccess('Loop set', 'Loop will be effective at render time.')
        },
        removeLoop() {
            updateElementState(this.id, {
                logic: {}
            })
            this.loadState()
            notifySuccess('Loop removed')
        }
    }
}
</script>