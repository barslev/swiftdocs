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
            <Container id="header" className="document__page-header" />
            <Container id={this.props.id} className="flex-1" />
            <Container id="footer" className="document__page-footer" />
        </div>
    }

}

export const mapStateToProps = (state) => {
    return {
        css: {
            width: '210mm',
            height: '297mm',
            backgroundColor: state.defaults.color,
            paddingLeft: state.defaults.margins.left + 'mm',
            paddingRight: state.defaults.margins.right + 'mm',
        }
    }
}