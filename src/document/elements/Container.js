import React, { Component } from 'react'

export const meta = {
    id: 'container',
    icon: 'crop_din',
    label: 'Container',    
}

export const defaultStyle = {
    borderWidth: 1,
    border: [1,1,1,1],
    borderColor: '#ebebeb',
    backgroundColor: '#f4f4f4',
    padding: [10,5,10,5],
}

export class Renderer extends Component
{
    render() {
        const Tag = this.tag()
        const Presenter = this.props.presenter
        
        return <Tag className={this.classes()}>
            <Presenter items={this.props.contents}></Presenter>
        </Tag>
    }
    
    classes() {
        const classes = ['document__page-container']
        if (!this.props.root) {
            classes.push('document__page-child-container')
        }
        return classes
    }

    tag() {
        let Tag = 'div'
        if (this.props.htmlTag) {
            Tag = this.props.htmlTag;
        }
        return Tag
    }
}

export const mapStateToProps = (state, scope) => {
    console.log(state)
    return {
        contents: scope.root
            ? state.contents.filter(content => content.container_id === null)
            : state.contents.filter(content => content.container_id = scope.id)
    }
}