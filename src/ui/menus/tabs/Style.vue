<template>
    <div>
        <h5>{{ $t('menus.style.margins') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.top') }}</label>
                <input type="text" :value="styles.marginTop" @input="updateValue('marginTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.bottom') }}</label>
                <input type="text" :value="styles.marginBottom" @input="updateValue('marginBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.left') }}</label>
                <input type="text" :value="styles.marginLeft" @input="updateValue('marginLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>{{ $t('menus.style.right') }}</label>
                <input type="text" :value="styles.marginRight" @input="updateValue('marginRight', arguments[0])" />
            </div>            
        </div>

        <h5>{{ $t('menus.style.paddings') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.top') }}</label>
                <input type="text" :value="styles.paddingTop" @input="updateValue('paddingTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.bottom') }}</label>
                <input type="text" :value="styles.paddingBottom" @input="updateValue('paddingBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.left') }}</label>
                <input type="text" :value="styles.paddingLeft" @input="updateValue('paddingLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>{{ $t('menus.style.right') }}</label>
                <input type="text" :value="styles.paddingRight" @input="updateValue('paddingRight', arguments[0])" />
            </div>            
        </div>

        <h5>{{ $t('menus.style.borders') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-4 mb-2">
                <label>{{ $t('menus.style.width') }}</label>
                <input type="text" :value="styles.borderWidth" @input="updateValue('borderWidth', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-4 mb-2">
                <label>{{ $t('menus.style.radius') }}</label>
                <input type="text" :value="styles.borderRadius" @input="updateValue('borderRadius', arguments[0])" />
            </div>
            <br>
            <div class="md:w-1/2 mb-2">
                <label>{{ $t('menus.style.sides') }}</label>
                <br>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="styles.borderTop" @change="updateBool('borderTop', arguments[0])" />
                        <i class="material-icons">border_top</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="styles.borderBottom" @change="updateBool('borderBottom', arguments[0])" />
                        <i class="material-icons">border_bottom</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="styles.borderLeft" @change="updateBool('borderLeft', arguments[0])" />
                        <i class="material-icons">border_left</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="styles.borderRight" @change="updateBool('borderRight', arguments[0])" />
                        <i class="material-icons">border_right</i>
                    </label>
                </div>
            </div>
        </div>
        <label>{{ $t('menus.style.border_color') }}</label>
        <color :mini="true" :value="styles.borderColor" @input="updateColor('borderColor', arguments[0])" />

        <br>
        <h5>{{ $t('menus.style.fill') }}</h5>
        <label>{{ $t('menus.style.background_color') }}</label>
        <color :mini="true" :value="styles.backgroundColor" @input="updateColor('backgroundColor', arguments[0])" />  

        <br>
        <h5>{{ $t('menus.style.remove_element') }}</h5>
        <toolbar-button icon="delete" @onClick="remove()">{{ $t('menus.style.remove_this_element') }}</toolbar-button>	    
    </div>
</template>
<script>
import {updateStyle} from '~/redux/actions/styles'
import {removeContentById} from '~/redux/actions/contents'
import {selectContent, deselectContent} from '~/redux/actions/session'

export default {
    data() {
        return {
            styles: {},
            id: this.$select('session.selectedId as id'),
            allStyles: this.$select('styles as allStyles'),
        }
    },
    mounted() {
        this.getStyles()
    },
    watch: {
        id() {
            this.getStyles()
        }
    },
    methods: {
        getStyles() {
            if ( ! (this.id in this.allStyles)) {
                deselectContent()
            }
            // If there is a previous id...
            if (this.id && this.id !== this.id) {
                deselectContent()
            }
            this.id = this.id
            selectContent(this.id)
            this.styles = Object.assign({}, this.allStyles[this.id])
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
            removeContentById(this.id)
        }
    }
}
</script>