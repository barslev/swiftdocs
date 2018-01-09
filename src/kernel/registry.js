import Vue from 'vue'

export class Registry {

    constructor() {
        this.menus = {}
        this.languages = []
        this.components = []
    }

    use(component) {
        this.components.push(component)
        this._registerComponentRenderer(component)
        this._registerMenuComponents(component)
    }

    all() {
        return this.components
    }

    menus(componentId) {
        return this.menus[componentId]
    }

    /**
     * Private Methods
     */

    _registerComponentRenderer(component) {
        Vue.component(component.id, component.renderer)
    }

    _registerMenuComponents(component) {
        const menus = _.get(component, 'menus', [])

        if (this.menus[component.id] === undefined) {
            this.menus[component.id] = []
        }

        _.each(menus, (menu) => {
            let menuVueName = component.id + '-menus-' + menu.id
            this.menus[component.id].push(menuVueName)
            Vue.component(menuVueName, menu.renderer)
        })
    }
}