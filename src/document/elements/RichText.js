import React, { Component } from 'react'

export const meta = {
    id: 'richtext',
    icon: 'text_fields',
    label: 'Text',
    hidden: true,
    defaultState: {
        text: '',
    },
    defaultStyle: {
        fontSize: '12pt',
        color: '#000000',
        fontFamily: 'Helvetica',
        lineHeight: '1.25em',
        textAlign: 'left'        
    }
}

export class Renderer extends Component {
    render() {
        return <div style={this.props.css} dangerouslySetInnerHTML={{__html: this.props.state.text}}></div>
    }
}

export const mapStateToProps = (state, scope) => {

    const content = state.contents.find(
        content => content.id === scope.id
    )
    
    return {
        state: content.state,
        css: state.styles[scope.id]
    }
}