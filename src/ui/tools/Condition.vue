<template>
        <div class="p-2 mb-2 bg-grey-lightest">
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
            <button class="btn-primary" @click="update()">Update</button>
            <button class="btn-default" @click="remove()">Remove</button>
        </div>
</template>
<script>
import {getContentState, updateContentState} from '~/redux/actions/contents'

export default {

    props: ['data', 'index'],

    watch: {
        data() {
            this.reload()
        }
    },

    created() {
        this.reload()
    },
    
    data() {
        return {
            options: [
                {key: 'exists', hasValue: false},
                {key: 'truthy', hasValue: false},
                {key: 'falsy', hasValue: false},
                {key: 'equals', hasValue: true},
                {key: 'greater_than', hasValue: true},
                {key: 'less_than', hasValue: true},
            ],
            condition: null,
        }
    },

    methods: {

        reload() {
            this.condition = {
                ...this.data,
                comparator: this.options.filter(o => o.key === this.data.comparator)[0]
            }
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
        
        update() {

            try {
                this.validateCondition()
            } catch(error) {
                return notifyError(
                    $t('menus.logic.condition_error_title'),
                    error.toString()
                )
            }

            this.$emit('update', {
                ...this.condition,
                comparator: this.condition.comparator.key
            })
        },
        
        remove() {
            this.$emit('remove')
        }
    }
}
</script>