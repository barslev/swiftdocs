<template>
    <div :is="element.element"
        class="document__page-element"
        :class="['css-' + element.id, state.selected ? 'selected' : '', 'element__' + element.element]"
        :id="element.id"
        :data-id="element.id"
		:context="context"
		:payload="payload" />
</template>
<script>
import {connect} from '~/redux/connect'
import {selectContent} from '~/redux/actions/session'

export default {
	mixins: [
		connect((state, scope) => {
			return {
				selected: state.session.selectedId === scope.element.id,
			}
		})
	],
    props: [
		'element',
		'context',
		'payload',
	],
	created() {
		this.click = this.click.bind(this)
		this.mouseOut = this.mouseOut.bind(this)
		this.mouseOver = this.mouseOver.bind(this)
	},
	watch: {
		inRenderMode() {
			Vue.nextTick(() => {
				this.updateMouseListeners()
			})
		}
	},
    methods: {
		updateMouseListeners() {
			if (this.inRenderMode) {
				return this.removeListeners()
			}
			return this.addListeners()
		},
		addListeners() {
			this.$el.addEventListener('click', this.click)
			this.$el.addEventListener('mouseout', this.mouseOut)
			this.$el.addEventListener('mouseover', this.mouseOver)
		},
		removeListeners() {
			this.$el.removeEventListener('click', this.click)
			this.$el.removeEventListener('mouseout', this.mouseOut)
			this.$el.removeEventListener('mouseover', this.mouseOver)
		},
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
		}
    }
}
</script>
