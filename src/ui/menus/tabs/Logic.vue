    <template>
    <div>
        <div class="p-2 bg-grey-lightest">
            <h5>{{ $t('menus.logic.loop') }}</h5>
            <div class="mb-3">
                <label>{{ $t('menus.logic.path') }}</label>
                <input type="text" v-model="state.loop.in" />
            </div>
            <div>
                <label>{{ $t('menus.logic.repeat_as') }}</label>
                <input type="text" v-model="state.loop.as" />
            </div>
            <button class="btn-primary" @click="setLoop()">{{ $t('global.set') }}</button>
            <button class="btn-default" @click="removeLoop()" v-show="state.loop.in">{{ $t('global.remove') }}</button>
        </div>
        <hr>
        <h5>Conditions</h5>
        <condition v-for="(condition, i) in state.conditions"
            :key="i"
            :index="i"
            :data="condition"
            @update="updateCondition(i, arguments[0])"
            @remove="removeCondition(i)" />
        <br>
        <button class="btn-default" @click="addCondition()">+ New Rule</button>
    </div>
</template>
<script>
import * as _ from 'lodash'
import {connect} from '~/redux/connect'
import {getContentState, updateContentState} from '~/redux/actions/contents'

export default {
    
    props: ['id'],
    
    mixins: [
        connect((state, scope) => {
            const content = _.find(
                state.contents,
                {id: scope.id}
            )
            return {
                loop: _.get(content, 'state.logic.loop', {
                    in: '',
                    as: ''
                }),
                conditions: _.get(content, 'state.logic.conditions', [])
            }
        })
    ],

    methods: {
        setLoop() {
            if (!this.state.loop.in || !this.state.loop.as) {
                notifyError(
                    $t('menus.logic.loop_error_title'),
                    $t('menus.logic.loop_error_text'),
                )
                return
            }
            const state = getContentState(this.id)
            updateContentState(this.id, {
                logic: {
                    ...state.logic,
                    loop: this.state.loop
                }
            })
            notifySuccess(
                $t('menus.logic.loop_success_title'),
                $t('menus.logic.loop_success_text'),
            )
        },
        removeLoop() {
            const state = getContentState(this.id)
            updateContentState(this.id, {
                logic: {
                    ...state.logic,
                    loop: undefined
                }
            })
            notifySuccess($t('menus.logic.loop_remove_success_title'))
        },
        addCondition() {
            const state = getContentState(this.id)
            if (!state.logic) {
                state.logic = {}
            }
            if (!state.logic.conditions) {
                state.logic = {
                    conditions: []
                }
            }
            state.logic.conditions = state.logic.conditions.concat([
                {address: '', comparator:null}
            ])
            updateContentState(this.id, {logic: state.logic})
            notifySuccess(
                $t('menus.logic.condition_success_title'),
                $t('menus.logic.condition_success_text')
            )
        },
        updateCondition(index, object) {
            const state = getContentState(this.id)
            state.logic.conditions = state.logic.conditions.concat([])
            state.logic.conditions[index] = object
            updateContentState(this.id, {
                logic: state.logic
            })
            notifySuccess('Logic updated')
        },
        removeCondition(index) {
            const state = getContentState(this.id)
            state.logic.conditions = state.logic.conditions.concat([])
            state.logic.conditions.splice(index, 1)
            updateContentState(this.id, {
                logic: state.logic
            })
            notifySuccess($t('menus.logic.condition_remove_success_title'))
        }
    }
}
</script>