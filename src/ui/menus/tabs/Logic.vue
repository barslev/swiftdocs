    <template>
    <div>
        <div class="p-2 bg-grey-lightest">
            <h5>{{ $t('menus.logic.loop') }}</h5>
            <div class="mb-3">
                <label>{{ $t('menus.logic.path') }}</label>
                <input type="text" v-model="loop.in" />
            </div>
            <div>
                <label>{{ $t('menus.logic.repeat_as') }}</label>
                <input type="text" v-model="loop.as" />
            </div>
            <button class="btn-primary" @click="setLoop()">{{ $t('global.set') }}</button>
            <button class="btn-default" @click="removeLoop()" v-show="state.logic && state.logic.loop">{{ $t('global.remove') }}</button>
        </div>
        <hr>
        <div class="p-2 bg-grey-lightest">
            <h5>{{ $t('menus.logic.condition') }}</h5>
            <div class="mb-3">
                <label>{{ $t('menus.logic.condition_address') }}</label>
                <input type="text" v-model="condition.address" />
            </div>
            <div class="mb-3">
                <select class="form-control" v-model="condition.comparator">
                    <option value="exists">{{ $t('menus.logic.exists') }}</option>
                    <option value="equals">{{ $t('menus.logic.equals') }}</option>
                    <option value="greater_than">{{ $t('menus.logic.greater_than') }}</option>
                    <option value="less_than">{{ $t('menus.logic.less_than') }}</option>
                </select>
            </div>
            <div class="mb-3" v-if="condition.comparator != 'exists'">
                <label>{{ $t('menus.logic.this_value') }}</label>
                <input type="text" v-model="condition.value" />
            </div>        
            <button class="btn-primary" @click="setCondition()">Set</button>
            <button class="btn-default" @click="removeCondition()" v-show="state.logic && state.logic.condition">Remove</button> 
        </div>
    </div>
</template>
<script>
import {getContentState, updateContentState} from '~/redux/actions/contents'

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
            this.state = getContentState(this.id)
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
                notifyError(
                    $t('menus.logic.loop_error_title'),
                    $t('menus.logic.loop_error_text'),
                )
                return
            }
            updateContentState(this.id, {
                logic: {
                    ...this.state.logic,
                    loop: this.loop
                }
            })
            this.loadState()
            notifySuccess(
                $t('menus.logic.loop_success_title'),
                $t('menus.logic.loop_success_text'),
            )
        },
        removeLoop() {
            updateContentState(this.id, {
                logic: {
                    ...this.state.logic,
                    loop: null
                }
            })
            this.loadState()
            notifySuccess($t('menus.logic.loop_remove_success_title'))
        },
        setCondition() {
            if (!this.condition.address || (this.condition.comparator != 'exists' && !this.condition.value)) {
                notifyError(
                    $t('menus.logic.condition_error_title'),
                    $t('menus.logic.condition_error_text')
                )
                return
            }
            updateContentState(this.id, {
                logic: {
                    ...this.state.logic,
                    condition: this.condition
                }
            })
            this.loadState()
            notifySuccess(
                $t('menus.logic.condition_success_title'),
                $t('menus.logic.condition_success_text')
            )
        },
        removeCondition() {
            updateContentState(this.id, {
                logic: {
                    ...this.state.logic,
                    condition: null
                }
            })
            this.loadState()
            notifySuccess($t('menus.logic.condition_remove_success_title'))
        }
    }
}
</script>