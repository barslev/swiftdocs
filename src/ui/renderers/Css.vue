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
    render() {
        return null
    },
    created() {
        const body = document.getElementsByTagName('body')[0]
        this.styleEl = document.createElement('style')
        body.appendChild(this.styleEl)
        this.styleEl.id = 'swd-styles'
    },
    watch: {
        'state.styles'() {
            this.styleEl.innerHTML = this.generateCss().join("\n")
        }
    },
    methods: {
        generateCss() {
            return Object.keys(this.state.styles).map(
                id => this.toCss(id, this.state.styles[id])
            )
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
				margin: this.pixelArray(styles.marginTop, styles.marginRight, styles.marginBottom, styles.marginLeft),
				padding: this.pixelArray(styles.paddingTop, styles.paddingRight, styles.paddingBottom, styles.paddingLeft),
            }
            // Name of the css rule
            const cssName = '.css-' + id
            return cssName + '{' + toStyle(styles) + '}'
        }
    }
}
</script>