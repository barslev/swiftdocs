import { connect } from 'react-redux'
import React, { Component } from 'react'
import {string as toStyle} from 'to-style'

class Styles extends Component {

    render() {
        return <style>{this.parseCss()}</style>
    }

    parseCss() {
        return [
            this.parsePrintStyles(),
            this.parseContentStyles(),
        ].join("\n")
    }

    parsePrintStyles() {
        return `@media print {
    @page {
        size: ${this.props.defaults.dimensions.width}mm ${this.props.defaults.dimensions.height}mm;
        margin: ${this.mmArray(Object.values(this.props.defaults.margins))};
    }
}`
    }
    
    parseContentStyles() {
        return Object.keys(this.props.styles)
            .map(id => this.toCss(id, this.props.styles[id]))
            .join("\n")
    }

    arrayToString(array, unit) {
        return array.map(val => val + unit).join(' ')
    }

    pixelArray(array) {
        return this.arrayToString(array, 'px')   
    }

    mmArray(array) {
        return this.arrayToString(array, 'mm')
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
        styles: state.styles,
        defaults: state.defaults,
    }
}

export default connect(mapStateToProps)(Styles)