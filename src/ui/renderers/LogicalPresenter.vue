<template>
    <div>
        <el v-for="(item, index) in displayItems"
            :key="'item-' + index"
            :element="item"
            :context="item.context">
        </el>
    </div>
</template>
<script>
import {getElementState} from '~/redux/actions/contents'

export default {
    props: [
        'items',
        'context'
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
        inRenderMode() {
            this.refresh()
        }
    },

    created() {
        this.refresh()
    },

    methods: {
        refresh() {
            if (this.inRenderMode) {
                // Refresh context
                this.buildContext()
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

        buildContext() {
            this.fullContext = {
                ..._swd.dataSource.data,
                ...this.context,
            }
        },

        displayRenderedItems(items) {
            items = this.applyLoops(items)
            items = this.applyConditionals(items)
            return items
        },

        applyLoops(items) {
            let result = []
            _.each(items, (item) => {
                let state = getElementState(item.id)
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
            _.each(_.get(this.fullContext, loop.in), (foo, $index) => {
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

        applyConditionals(items) {        
            return _.filter(items, (item) => {
                let state = getElementState(item)
                let conditional = _.get(state, 'logic.conditional')
                
                if (!conditional) {
                    return true
                }
                
                // TODO: Evaluate condition
                return true
            })
        },
    },
}
</script>