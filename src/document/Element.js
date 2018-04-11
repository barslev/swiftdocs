import {connect} from 'react-redux'
import React, {Component} from 'react'

import Registry from './ElementRegistry'

class Element extends Component {

    render() {
        const Renderer = Registry.getRenderer(this.props.item.element)

        return <Renderer id={this.props.item.id}
            context={this.props.context}
            className={this.classes()} />
    }

    classes() {
        return [
            'document__page-element',
            'css-' + this.props.item.id,
            'element__' + this.props.item.element,
            // TODO: Add selected class..
        ]
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Element)