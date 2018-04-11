import { connect } from 'react-redux'
import React, { Component } from 'react'
import {string as toStyle} from 'to-style'

class Styles extends Component {

    render() {
        return <style>{this.parseCss()}</style>
    }

    parseCss() {
        return Object.keys(this.props.styles)
            .map(id => this.toCss(id, this.props.styles[id]))
            .join("\n")
    }

    pixelArray(array) {
        return array.map(val => val + 'px').join(' ')
    }

    borderWidths(styles) {
        return this.pixelArray(styles.border)
    }

    toCss(id, styles) {
        // First make some transformations
        styles = {
            ...styles,
            position: styles.position,
            backgroundColor: styles.backgroundColor,
            borderColor: styles.borderColor,
            borderStyle: 'solid',
            borderRadius: styles.borderRadius + 'px',
            borderWidth: this.borderWidths(styles),
            margin: this.pixelArray(styles.margin),
            padding: this.pixelArray(styles.padding),
        }
        // Name of the css rule
        const cssName = '.css-' + id
        return cssName + '{' + toStyle(styles) + '}'
    }
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles
    }
}

export default connect(mapStateToProps)(Styles)