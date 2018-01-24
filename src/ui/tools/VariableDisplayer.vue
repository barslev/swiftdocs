<template>
    <div>
        <div class="bg-grey-lightest p-1 border" role="button" @click="toggle()">
            <i class="material-icons float-left mr-1" :class="'text-' + this.iconFormat.color">{{ this.iconFormat.icon}}</i>
            <span class="font-bold" style="font-family:monospace">{{ variable }}</span>
            <div class="float-right" v-if="cascading && notEmpty">
                <i class="material-icons">more_horiz</i>
            </div>
        </div>
        <div v-if="collapsed">
            <div class="bg-white p-1 border text-xs pb-2" v-if="!cascading">{{ value }}</div>
            
            <div v-if="cascading && type == 'object'" class="flex">
                <div class="border-l ml-1 mr-2"></div>
                <div class="flex-1">
                    <variable-displayer v-if="type == 'object'"
                    v-for="(v1, i) in Object.keys(value)"
                    :key="i"
                    :variable="v1"
                    :value="value[v1]"></variable-displayer>
                </div>
            </div>
            <div v-if="cascading && type == 'array'" class="flex">
                <div class="border-l ml-1 mr-2"></div>
                <div class="flex-1">
                    <variable-displayer v-if="type == 'array'"
                    v-for="(v1, i) in value"
                    :key="i"
                    :variable="i"
                    :value="value[i]"></variable-displayer>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>

function findObjectType(object) {
    if (_.isArray(object)) {
        return 'array'
    }
    if (object instanceof Date) {
        return 'date'
    }
    return 'object'
}

export default {
    props: ['variable', 'value'],

    data() {
        return {
            collapsed: false
        }
    },

    computed: {
        
        type() {
            if (_.isNull(this.value)) {
                return 'null'
            }
            let type = typeof this.value
            if (type === 'object') {
                return findObjectType(this.value)
            }
            return type
        },
        
        iconFormat() {
            return {
                'null': {color: 'grey', icon:'exposure_zero'},
                'string': {color: 'purple', icon: 'title'},
                'number': {color: 'orange', icon: 'looks_5'},
                'array': {color: 'green', icon: 'reorder'},
                'object': {color: 'red', icon: 'label_outline'},
                'date': {color: 'blue', icon: 'access_time'}
            }[this.type]
        },

        cascading() {
            return this.type === 'array' || this.type === 'object'
        },

        notEmpty() {
            switch (this.type) {
                case 'array':
                    return this.value.length
                case 'object':
                    return Object.keys(this.value).length
                default:
                    return !_.isEmpty(this.value)
            }
        }
    },

    methods: {
        toggle() {
            if (this.type === 'null') {
                return
            }
            if (this.cascading && ! this.notEmpty) {
                return
            }
            this.collapsed = ! this.collapsed
        }
    }
}
</script>
<style>
i {
    margin-top: 2px
}
</style>