import Vue from 'vue'

export class Registry {

    constructor() {
        this.menus = {}
        this.languages = []
        this.elements = []
        this.defaultStates = {}
        this.defaultStyles = {}
    }

    use(element) {
        if (_.isArray(element)) {
            _.each(element, (c) => {
                this._registerElement(c)
            })
            return
        }
        this._registerElement(element)
    }

    all() {
        return this.elements
    }

    menu(id) {
        const element = _.find(this.elements, {id})

        if (!element.menu) {
            return null
        }

        return {
            icon: element.icon,
            label: element.label,
            element: element.id + '-menu',
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

    _registerElement(element) {

        this.elements.push(element)
        this._putDefaultState(element)
        this._putDefaultStyle(element)
        this._registerElementMenu(element)
        this._registerElementRenderer(element)
    }

    _registerElementRenderer(element) {
        Vue.component(
            element.id,
            element.renderer
        )
    }

    _registerElementMenu(element) {
        if('menu' in element) {
            Vue.component(
                element.id + '-menu',
                element.menu
            )
        }
    }

    _putDefaultState(element) {
        if('defaultState' in element) {
            this.defaultStates[element.id] = element.defaultState
        }
    }

    _putDefaultStyle(element) {
        if ('defaultStyle' in element) {
            this.defaultStyles[element.id] = element.defaultStyle
        }
    }    
}
