<template>
    <div :is="element.element"
        class="document__page-element"
        :class="[state.selected ? 'selected' : '', 'element__' + element.element]"
        :id="element.id"
        :data-id="element.id"
		:context="context"
		:payload="payload"
        @click.native="click"
        @mouseover.native="mouseOver"
        @mouseout.native="mouseOut"
        :style="format(state.styles)" />
</template>
<script>
import {connect} from '~/redux/connect'
import {selectContent} from '~/redux/actions/session'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				styles: state.styles[scope.element.id],
				selected: state.session.selectedId === scope.element.id,
			}
		})
	],
    props: [
		'element',
		'context',
		'payload',
	],
    methods: {
		click($event) {
			selectContent(this.element.id)
			// Stop the event bubbling up the chain
			$event.stopPropagation()
        },
		mouseOut($event) {
			$event.target.classList.remove('hovering')
		},
		mouseOver($event) {
			let target;
			if ($event.target.classList.contains('document__page-element')) {
				target = $event.target
			} else {
				target = $event.target.closest('.document__page-element')
			}
			target.classList.add('hovering')
			$event.stopPropagation()
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
		format(styles) {
			if (this.element.element === 'page') {
				return {}
			}
			if (!styles) {
				return {}
			}
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
