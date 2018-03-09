<template>
    <div :is="htmlTag">
        <el v-for="(item, index) in displayItems"
            :key="'item-' + index + '-' + item.id"
            :element="item"
            :context="item.context">
        </el>
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {getContentState} from '~/redux/actions/contents'

function comparable(value) {
    if(_.isArray(value)) {
        return value.length
    }
    if(_.isNumber(value) || _.isString(value)) {
        return parseFloat(value)
    }
    if(_.isObject(value)) {
        return Object.keys(value)
    }
    return value
}

export default {
    props: [
        'items',
        'context',
        'htmlTag'
    ],

    mixins: [
        connect((state, scope) => {
            return {
                inRenderMode: state.session.mode
            }
        })
    ],

    data() {
        return {
            displayItems: [],
            fullContext: {}
        }
    },

    watch: {
        items() {
            this.refresh()
        },
        'state.inRenderMode'() {
            this.refresh()
        }
    },

    methods: {
        refresh() {
            if (this.state.inRenderMode) {
                // Display a rendered version of items
                this.displayItems = this.displayRenderedItems(
                    // Pass a clone of the current items
                    this.items.concat([])
                )
                return
            }
            // Display them as is
            this.displayItems = this.items
        },

        displayRenderedItems(items) {
            items = this.applyLoops(items)
            items = this.applyConditions(items)
            return items
        },

        applyLoops(items) {
            let result = []
            _.each(items, (item) => {
                let state = getContentState(item.id)
                let loop = _.get(state, 'logic.loop')
                if (loop) {
                    result = result.concat(this.getLoopedItems(item, loop))
                } else {
                    item.context = this.context
                    result.push(item)
                }
            })
            return result
        },

        getLoopedItems(item, loop) {
            let items = []
            console.log(this.context)
            _.each(_.get(this.context, loop.in), (foo, $index) => {
                items.push({
                    ...item,
                    context: {
                        ...this.context,
                        $index,
                        [loop.as]: foo
                    }
                })
            })
            return items
        },

        applyConditions(items) {        
            return _.filter(items, (item) => {
                let state = getContentState(item.id)
                let condition = _.get(state, 'logic.condition')
                
                if (!condition) {
                    return true
                }
                return this.evaluateCondition(condition)
            })
        },

        evaluateCondition(condition) {
            try {
                const address = _.get(
                    this.fullContext,
                    condition.address
                )

                switch (condition.comparator) {
                    case 'exists':
                        return address
                    case 'equals':
                        return address == condition.value
                    case 'greater_than':
                        return comparable(address) > parseFloat(condition.value)
                    case 'less_than':
                        return comparable(address) < parseFloat(condition.value)
                    default:
                        throw new Error('Unknown comparator: ' + condition.comparator)
                }

            } catch(e) {
                console.error(e)
                return false
            }
        }
    },
}
</script>