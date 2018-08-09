import React, { Component } from 'react'

export const meta = {
    id: 'page',
    icon: 'queue',
    label: 'Page',
    hidden: true,
    defaultStyle: {},
    defaultState: {},
}

export class Renderer extends Component {

    render() {

        const Container = this.props.registry.getRenderer('container')

        return <div className="document__page flex flex-col" style={this.props.css}>
            <Container id={this.props.id} className="flex-1" />
        </div>
    }

}

export const mapStateToProps = (state) => {
    return {
        css: {
            backgroundColor: state.defaults.color,
            paddingTop: state.defaults.margins.top + 'mm',
            paddingBottom: state.defaults.margins.bottom + 'mm',
            paddingLeft: state.defaults.margins.left + 'mm',
            paddingRight: state.defaults.margins.right + 'mm',
            width: state.defaults.dimensions.width + 'mm',
            height: state.defaults.dimensions.height + 'mm',            
        }
    }
}