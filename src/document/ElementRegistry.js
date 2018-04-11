import React from 'react'
import {connect} from 'react-redux'

import Presenter from './Presenter'
import * as Container from './elements/Container'

class ElementRegistry {

    constructor() {
        this.elements = {}
    }

    addElement(element) {
        this.elements[element.meta.id] = element
    }

    getRenderer(element) {
        if (!this.elements.hasOwnProperty(element)) {
            throw new Error(`Make sure that the element named "${element}" is registered properly.`)
        }
        const Renderer = this.elements[element].Renderer
        return connect(this.elements[element].mapStateToProps)((props) => {
            return <Renderer presenter={Presenter} {...props} />
        })
    }
}

const registry = new ElementRegistry()
registry.addElement(Container)
// ... Register more elements

export default registry