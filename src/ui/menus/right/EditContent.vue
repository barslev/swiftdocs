<template>
    <div>

        <div class="flex">
            <button class="bg-grey-light hover:bg-grey text-grey-darkest flex-1 font-bold py-2 px-4 rounded-l">
                Basic
            </button>
            <button class="bg-grey-light hover:bg-grey text-grey-darkest flex-1 font-bold py-2 px-4 rounded-r">
                Properties
            </button>
        </div>
        
        <h5>Margins</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Top</label>
                <input type="text" :value="contentStyles.marginTop" @input="updateValue('marginTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Bottom</label>
                <input type="text" :value="contentStyles.marginBottom" @input="updateValue('marginBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Left</label>
                <input type="text" :value="contentStyles.marginLeft" @input="updateValue('marginLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>Right</label>
                <input type="text" :value="contentStyles.marginRight" @input="updateValue('marginRight', arguments[0])" />
            </div>            
        </div>

        <h5>Padding</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Top</label>
                <input type="text" :value="contentStyles.paddingTop" @input="updateValue('paddingTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Bottom</label>
                <input type="text" :value="contentStyles.paddingBottom" @input="updateValue('paddingBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>Left</label>
                <input type="text" :value="contentStyles.paddingLeft" @input="updateValue('paddingLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>Right</label>
                <input type="text" :value="contentStyles.paddingRight" @input="updateValue('paddingRight', arguments[0])" />
            </div>            
        </div>

        <h5>Border</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-4 mb-2">
                <label>Width</label>
                <input type="text" :value="contentStyles.borderWidth" @input="updateValue('borderWidth', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-4 mb-2">
                <label>Radius</label>
                <input type="text" :value="contentStyles.borderRadius" @input="updateValue('borderRadius', arguments[0])" />
            </div>
            <div class="md:w-1/2 mb-2">
                <label>Sides</label>
                <br>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="contentStyles.borderTop" @change="updateBool('borderTop', arguments[0])" />
                        <i class="material-icons">border_top</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="contentStyles.borderBottom" @change="updateBool('borderBottom', arguments[0])" />
                        <i class="material-icons">border_bottom</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="contentStyles.borderLeft" @change="updateBool('borderLeft', arguments[0])" />
                        <i class="material-icons">border_left</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="contentStyles.borderRight" @change="updateBool('borderRight', arguments[0])" />
                        <i class="material-icons">border_right</i>
                    </label>
                </div>
            </div>
        </div>
        <label>Border Color</label>
        <color :mini="true" :value="contentStyles.borderColor" @input="updateColor('borderColor', arguments[0])" />

        <h5>Fill</h5>
        <label>Background Color</label>
        <color :mini="true" :value="contentStyles.backgroundColor" @input="updateColor('backgroundColor', arguments[0])" />  

        <h5>Remove Element</h5>
        <toolbar-button icon="delete" @onClick="remove()">Remove This Element</toolbar-button>	    
    </div>
</template>
<script>
import {updateStyle} from '../../../actions/styles'
import {removeContent, selectContent, deselectContent} from '../../../actions/contents'

export default {

    data() {
        return {
            id: null,
            contentStyles: {},
            styles: this.$select('styles')
        }
    },
    created() {
        this.getStyles()
    },
    beforeRouteLeave(to, from, next) {
        deselectContent(this.id)
        this.id = null
        next()
    },
    watch: {
        styles() {
            this.getStyles()
        },
        '$route' () {
            this.getStyles()
        }
    },
    methods: {
        getStyles() {
            if ( ! (this.$route.params.id in this.styles)) {
                return this.$router.replace({name: 'main'})
            }
            // If there is a previous id...
            if (this.id && this.id !== this.$route.params.id) {
                deselectContent(this.id)
            }
            this.id = this.$route.params.id
            selectContent(this.id)
            this.contentStyles = Object.assign({}, this.styles[this.id])
        },
        update(prop, value) {
            updateStyle(this.id, prop, value)
        },
        updateValue(prop, event) {
            this.update(prop, event.target.value)
        },
        updateColor(prop, e) {
            this.update(prop, e)
        },
        updateBool(prop, event) {
            this.update(prop, event.target.checked)
        },
        remove() {
            removeContent(this.id)
            this.$router.replace({name: 'main'})
        }
    }
}
</script>