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
                    <option :value="null">Choose a condition</option>
                    <option :value="option" v-for="option in options" :key="option.key">
                        {{ $t('menus.logic.' + option.key) }}
                    </option>
                </select>
            </div>
            <div class="mb-3" v-if="condition.comparator && condition.comparator.hasValue">
                <label>{{ $t('menus.logic.this_value') }}</label>
                <input type="text" v-model="condition.value" />
            </div>
            <button class="btn-primary" @click="addCondition()">Add Rule</button>
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
            condition: {
                address: '',
                comparator: null
            },
            options: [
                {key: 'exists', hasValue: false},
                {key: 'truthy', hasValue: false},
                {key: 'falsy', hasValue: false},
                {key: 'equals', hasValue: true},
                {key: 'greater_than', hasValue: true},
                {key: 'less_than', hasValue: true},
            ]
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
                this.condition = {
                    ...this.state.logic.condition,
                    comparator: this.options.filter(o => o.key === this.state.logic.condition.comparator)[0]
                }
                console.log(this.condition)
            } else {
                this.condition = {
                    address: '',
                    comparator: null
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
        validateCondition() {
            if (!this.condition.address) {
                throw new Error($t('menus.logic.condition_error_address'))
            }
            if (!this.condition.comparator) {
                throw new Error($t('menus.logic.condition_error_comparator'))
            }
            if (this.condition.hasValue && !this.condition.value) {
                throw new Error($t('menus.logic.condition_error_value'))
            } 
        },
        addCondition() {

            try {
                this.validateCondition()
            } catch(error) {
                return notifyError(
                    $t('menus.logic.condition_error_title'),
                    error.toString()
                )
            }

            // Extract comparator key
            const condition = {
                ...this.condition,
                comparator: this.condition.comparator.key
            }

            updateContentState(this.id, {
                logic: {
                    ...this.state.logic,
                    condition,
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