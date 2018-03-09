<template>
    <div></div>
</template>
<script>
import _ from 'lodash'
import {connect} from '~/redux/connect'
import {string as toStyle} from 'to-style'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				styles: state.styles,
			}
		})
    ],
    created() {
        const body = document.getElementsByTagName('body')[0]
        body.appendChild(
            this.styleEl = document.createElement('style')
        )
        this.styleEl.id = 'swd-styles'
    },
    watch: {
        'state.styles'() {
            this.styleEl.innerHTML = this.updateCss().join("\n")
        }
    },
    methods: {
        updateCss() {
            return Object.keys(this.state.styles).map(id => {
                return '.css-' + id + ' { ' + toStyle(
                    this.objectToCss(this.state.styles[id])
                ) + '}'
            })
        },
		pixelArray(top, right, bottom, left) {
			return [
				top ? top + 'px ' : '0 ',
				right ? right + 'px ' : '0 ',
				bottom ? bottom + 'px ' : '0 ',
				left ? left + 'px ' : '0'
			].join('')
		},
		borderWidths(styles) {
			return this.pixelArray(
				styles.borderTop ? styles.borderWidth : null,
				styles.borderRight ? styles.borderWidth : null,
				styles.borderBottom ? styles.borderWidth : null,
				styles.borderLeft ? styles.borderWidth : null
			)
		},        
        objectToCss(styles) {
			return {
				...styles,
				position: styles.position,
				backgroundColor: styles.backgroundColor,
				borderColor: styles.borderColor,
				borderStyle: 'solid',
				borderRadius: styles.borderRadius + 'px',
				borderWidth: this.borderWidths(styles),
				margin: this.pixelArray(styles.marginTop, styles.marginRight, styles.marginBottom, styles.marginLeft),
				padding: this.pixelArray(styles.paddingTop, styles.paddingRight, styles.paddingBottom, styles.paddingLeft),
			}
        }
    }
}
</script>