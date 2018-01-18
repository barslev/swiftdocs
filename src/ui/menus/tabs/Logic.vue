    <template>
    <div>
        <div class="p-2 bg-grey-lightest">
            <h5>Loop</h5>
            <div class="mb-3">
                <label>Path</label>
                <input type="text" v-model="loop.in" />
            </div>
            <div>
                <label>Repeat As</label>
                <input type="text" v-model="loop.as" />
            </div>
            <button class="btn-primary" @click="setLoop()">Set</button>
            <button class="btn-default" @click="removeLoop()" v-show="state.logic && state.logic.loop">Remove</button>
        </div>
        <hr>
        <div class="p-2 bg-grey-lightest">
            <h5>Display Condition</h5>
            <div class="mb-3">
                <label>Display this when this address</label>
                <input type="text" v-model="condition.address" />
            </div>
            <div class="mb-3">
                <select class="form-control" v-model="condition.comparator">
                    <option value="exists">Exists</option>
                    <option value="equals">Equals to</option>
                    <option value="greater_than">Greater Than</option>
                    <option value="less_than">Less Than</option>
                </select>
            </div>
            <div class="mb-3" v-if="condition.comparator != 'exists'">
                <label>This Value</label>
                <input type="text" v-model="condition.value" />
            </div>        
            <button class="btn-primary" @click="setCondition()">Set</button>
            <button class="btn-default" @click="removeCondition()" v-show="state.logic && state.logic.condition">Remove</button> 
        </div>
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
            loop: null,
            condition: null,
        }
    },

    created() {
        this.loadState()
    },

    methods: {
        loadState() {
            this.state = getElementState(this.id)
            this.loadLogic()
            this.loadCondition()
        },
        loadLogic() {
            if (this.state.logic && this.state.logic.loop) {
                this.loop = {...this.state.logic.loop}
            } else {
                this.loop = {
                    in: '',
                    as: '',
                }
            }
        },
        loadCondition() {
            if (this.state.logic && this.state.logic.condition) {
                this.condition = {...this.state.logic.condition}
            } else {
                this.condition = {
                    address: '',
                    comparator: 'exists',
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
                    ...this.state.logic,
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
        },
        setCondition() {
            if (!this.condition.address || (this.condition.comparator != 'exists' && !this.condition.value)) {
                notifyError('Condition not set', 'Please fill all the fields')
                return
            }
            updateElementState(this.id, {
                logic: {
                    ...this.state.logic,
                    condition: this.condition
                }
            })
            this.loadState()
            notifySuccess('Condition set', 'Condition will be effective at render time.')            
        },
        removeCondition() {

        }
    }
}
</script>