/*
 * Drag & Drop Engine Activator
 */

const dragula = require('dragula')
import { isDocumentAlterable } from '~/redux/actions/session'
import { insertContent, moveContent } from '~/redux/actions/contents'

class dragDrop
{
    activate() {
        this._instantiateDragula()
        this._handleElementDrop()
    }

    add(container) {
        this.drake
            .containers
            .push(container)
    }

    remove(container) {
        const index = this.drake
            .containers
            .indexOf(container)

        if (index >= 0) {
            this.drake.containers.splice(index, 1)
        }
    }

    _instantiateDragula() {
        this.drake = dragula({
            revertOnSpill: true,
            copy(el, source) {
                return source.id == 'toolbar_elements'
            },
            copySortSource: false,
            accepts(el, target, source, sibling) {
                return target.id !== 'toolbar_elements'
            },
            moves() {
                return isDocumentAlterable()
            }
        })
    }

    _handleElementDrop() {
        this.drake.on('drop', (element, container, source, sibling) => {
            this.drake.cancel();

            const elementId = element.getAttribute('data-id')
            const containerId = container.getAttribute('container-id')
            const siblingId = sibling ? sibling.getAttribute('data-id') : null

            if (element.hasAttribute('data-id')) {
                // An already existing element got relocated
                return moveContent(
                    element.getAttribute('data-id'),
                    containerId,
                    siblingId
                )
            }

            return insertContent(
                element.getAttribute('data-name'),
                containerId,
                siblingId
            )
        });
    }
}

export default new dragDrop()