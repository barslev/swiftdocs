import React from 'react'
import {connect} from 'react-redux'

import Presenter from './Presenter'
import * as Page from './elements/Page'
import * as RichText from './elements/RichText'
import * as Container from './elements/Container'

class ElementRegistry {

    constructor(elements = []) {
        this.elements = {}
        elements.forEach(element => this.addElement(element))
    }

    addElement(element) {
        this.elements[element.meta.id] = this.connectRenderer(element)
    }

    connectRenderer(element) {
        const Renderer = connect(element.mapStateToProps)((props) => {
            return <element.Renderer registry={this}
                presenter={Presenter}
                {...props} />
        })
        return {
            ...element,
            Renderer
        }
    }

    getRenderer(elementName) {
        if (!this.elements.hasOwnProperty(elementName)) {
            throw new Error(`Make sure that the element named "${elementName}" is registered properly.`)
        }
        return this.elements[elementName].Renderer
    }
}

const registry = new ElementRegistry([
    Page,
    RichText,
    Container,
])
// ... Register more elements

export default registry