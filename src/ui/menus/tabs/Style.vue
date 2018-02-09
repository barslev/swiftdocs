<template>
    <div>
        <div v-if="state.element.element !== 'page'">
        <h5>{{ $t('menus.style.margins') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.top') }}</label>
                <input type="text" :value="state.styles.marginTop" @input="updateValue('marginTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.bottom') }}</label>
                <input type="text" :value="state.styles.marginBottom" @input="updateValue('marginBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.left') }}</label>
                <input type="text" :value="state.styles.marginLeft" @input="updateValue('marginLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>{{ $t('menus.style.right') }}</label>
                <input type="text" :value="state.styles.marginRight" @input="updateValue('marginRight', arguments[0])" />
            </div>            
        </div>

        <h5>{{ $t('menus.style.paddings') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.top') }}</label>
                <input type="text" :value="state.styles.paddingTop" @input="updateValue('paddingTop', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.bottom') }}</label>
                <input type="text" :value="state.styles.paddingBottom" @input="updateValue('paddingBottom', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-2 mb-2">
                <label>{{ $t('menus.style.left') }}</label>
                <input type="text" :value="state.styles.paddingLeft" @input="updateValue('paddingLeft', arguments[0])" />
            </div>            
            <div class="md:w-1/4 mb-2">
                <label>{{ $t('menus.style.right') }}</label>
                <input type="text" :value="state.styles.paddingRight" @input="updateValue('paddingRight', arguments[0])" />
            </div>            
        </div>

        <h5>{{ $t('menus.style.borders') }}</h5>
        <div class="flex flex-wrap">
            <div class="md:w-1/4 pr-4 mb-2">
                <label>{{ $t('menus.style.width') }}</label>
                <input type="text" :value="state.styles.borderWidth" @input="updateValue('borderWidth', arguments[0])" />
            </div>
            <div class="md:w-1/4 pr-4 mb-2">
                <label>{{ $t('menus.style.radius') }}</label>
                <input type="text" :value="state.styles.borderRadius" @input="updateValue('borderRadius', arguments[0])" />
            </div>
            <br>
            <div class="md:w-1/2 mb-2">
                <label>{{ $t('menus.style.sides') }}</label>
                <br>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="state.styles.borderTop" @change="updateBool('borderTop', arguments[0])" />
                        <i class="material-icons">border_top</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="state.styles.borderBottom" @change="updateBool('borderBottom', arguments[0])" />
                        <i class="material-icons">border_bottom</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="state.styles.borderLeft" @change="updateBool('borderLeft', arguments[0])" />
                        <i class="material-icons">border_left</i>
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" :checked="state.styles.borderRight" @change="updateBool('borderRight', arguments[0])" />
                        <i class="material-icons">border_right</i>
                    </label>
                </div>
            </div>
        </div>
        <label>{{ $t('menus.style.border_color') }}</label>
        <color :mini="true" :value="state.styles.borderColor" @input="updateColor('borderColor', arguments[0])"></color>

        <br>
        <h5>{{ $t('menus.style.fill') }}</h5>
        <label>{{ $t('menus.style.background_color') }}</label>
        <color :mini="true" :value="state.styles.backgroundColor" @input="updateColor('backgroundColor', arguments[0])"></color>  
        </div>

        <br>
        <h5>{{ $t('menus.style.remove_element') }}</h5>
        <toolbar-button icon="delete" @onClick="remove()">{{ $t('menus.style.remove_this_element') }}</toolbar-button>
    </div>
</template>
<script>
import {connect} from '~/redux/connect'
import {updateStyle} from '~/redux/actions/styles'
import {findContent, removeContentById} from '~/redux/actions/contents'
import {selectContent, deselectContent} from '~/redux/actions/session'

export default {
    mixins: [
        connect((state, scope) => {
            return {
                id: state.session.selectedId,
                element: findContent(state.session.selectedId),
                styles: state.styles[state.session.selectedId],
            }
        })
    ],
    methods: {
        update(prop, value) {
            updateStyle(this.state.id, prop, value)
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
            removeContentById(this.state.id)
        }
    }
}
</script>