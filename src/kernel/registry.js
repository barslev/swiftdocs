import Vue from 'vue'

export class Registry {

    constructor() {
        this.menus = {}
        this.languages = []
        this.components = []
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

    /**
     * Private Methods
     */

    _registerComponent(component) {

        this.components.push(component)
        
        Vue.component(
            component.id,
            component.renderer
        )

        if ('menu' in component) {
            Vue.component(
                component.id + '-menu',
                component.menu
            )
        }
    }
}