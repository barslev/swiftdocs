import { getContentIndex, getContentState, updateContentState } from '~/redux/actions/contents'
import { selectContent, getSelectedContentId } from '~/redux/actions/session'

const minWidth = 50
const resizingEdgeWidth = 10

class Rectangle {
    constructor(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    covers(point) {
        return point.x >= this.x1
            && point.y >= this.y1
            && point.x <= this.x2
            && point.y <= this.y2
    }
}

export default class Resizer
{
    constructor($el, id) {
        this.id = id
        this.$el = $el
        this.resizing = false
        this.rowId = $el.parentElement.getAttribute('data-id');

        // Bind context to internal methods
        this._up = this._up.bind(this)
        this._down = this._down.bind(this)
        this._move = this._move.bind(this)

        this.$el.addEventListener('mousedown', this._down)
    }

    destroy() {
        this.$el.removeEventListener('mousedown', this._down)
    }
    
    _startResize() {
        document.addEventListener('mouseup', this._up)
        document.addEventListener('mousemove', this._move)
    }

    _stopResize() {

        updateContentState(this.id, {
            width: this.$el.getAttribute('width')
        })

        updateContentState(this.$sibling.getAttribute('data-id'), {
            width: this.$sibling.getAttribute('width')
        })

        document.removeEventListener('mouseup', this._up)
        document.removeEventListener('mousemove', this._move)
    }

    _down(e) {

        if ( ! this._isSelected()) {
            return
        }

        if ( ! this._clickedOnResizingEdge(e)) {
            return
        }

        this._detectSibling()

        if (this.$sibling) {
            // In this case
            this._startResize()
        }
    }

    _up(e) {
        this._stopResize()
        e.preventDefault()
        e.stopPropagation()
        setTimeout(() => {
            selectContent(this.id)
        })
        return false
    }

    _detectSibling() {
        this.$sibling = null

        const siblingCells = _.filter(
            store.getState().contents,
            {container_id: this.rowId}
        )

        const elIndex = _.findIndex(siblingCells, {id: this.id})
        const sibling = _.get(siblingCells, elIndex + 1)

        if (sibling && sibling.element == 'd-table-cell') {
            this.$sibling = document.querySelector('td[data-id="' + sibling.id + '"]')
        }
    }

    _getSiblingWidth() {
        if ( ! this.$sibling) {
            return null
        }

        const width = this.$sibling.getAttribute('width') 

        if (width) {
            return width
        }

        return this.$sibling
            .getBoundingClientRect()
            .width
    }

    _move(e) {
        const rect = this.$el.getBoundingClientRect()
        const newWidth = parseInt(e.clientX - rect.x)
        
        if (newWidth < minWidth) {
            return
        }

        let siblingWidth = this._getSiblingWidth()
        
        if (siblingWidth) {
            let delta = newWidth - rect.width
            let newSiblingWidth = siblingWidth - delta

            if (newSiblingWidth < minWidth) {
                // You're squeezing your sibling way too hard.
                // Shame on you!
                return
            }

            this.$sibling.setAttribute('width', newSiblingWidth)
        }
        
        this.$el.setAttribute('width', newWidth)
    }

    _isSelected() {
        return getSelectedContentId() == this.id
    }

    _clickedOnResizingEdge(e) {
        const click = this._clickCoordinates(e)
        const edge = this._resizingEdgeRectangle()
        return edge.covers(click)
    }

    _clickCoordinates(e) {
        return {
            x: e.clientX,
            y: e.clientY
        }
    }

    _resizingEdgeRectangle() {
        const tdRect = this.$el.getBoundingClientRect()

        const x2 = tdRect.x + tdRect.width
        const x1 = x2 - resizingEdgeWidth

        const y1 = tdRect.y
        const y2 = tdRect.y + tdRect.height
        return new Rectangle(x1, x2, y1, y2)
    }
}