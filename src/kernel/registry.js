import Vue from 'vue'

export class Registry {

    constructor() {
        this.menus = {}
        this.languages = []
        this.components = []
        this.defaultStates = {}
        this.defaultStyles = {}
    }

    use(component) {
        if (_.isArray(component)) {
            _.each(component, (c) => {
                this._registerComponent(c)
            })
            return
        }
        this._registerComponent(component)
    }

    all() {
        return this.components
    }

    menu(id) {
        const component = _.find(this.components, {id})

        if (!component.menu) {
            return null
        }

        return {
            icon: component.icon,
            label: component.label,
            component: component.id + '-menu',
        }
    }

    defaultState(elementId) {
        return _.get(this.defaultStates, elementId, {})
    }

    defaultStyle(elementId) {
        return _.get(this.defaultStyles, elementId, {})
    }

    /**
     * Private Methods
     */

    _registerComponent(component) {

        this.components.push(component)
        this._putDefaultState(component)
        this._putDefaultStyle(component)
        this._registerComponentMenu(component)
        this._registerComponentRenderer(component)
    }

    _registerComponentRenderer(component) {
        Vue.component(
            component.id,
            component.renderer
        )
    }

    _registerComponentMenu(component) {
        if('menu' in component) {
            Vue.component(
                component.id + '-menu',
                component.menu
            )
        }
    }

    _putDefaultState(component) {
        if('defaultState' in component) {
            this.defaultStates[component.id] = component.defaultState
        }
    }

    _putDefaultStyle(component) {
        if ('defaultStyle' in component) {
            this.defaultStyles[component.id] = component.defaultStyle
        }
    }    
}
