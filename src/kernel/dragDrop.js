/*
 * Drag & Drop Engine Activator
 */

 const dragula = require('dragula')
import { insertContent, moveContent } from '~/redux/actions/contents'

export default function () {
    window.drake = dragula({
        revertOnSpill: true,
        copy(el, source) {
            return source.id == 'toolbar_components'
        },
        copySortSource: false,
        accepts(el, target, source, sibling) {
            return target.id !== 'toolbar_components'
        }
    })
    drake.on('drop', function (element, container, source, sibling) {
        drake.cancel();

        const elementId = element.getAttribute('data-id')
        const containerPageId = container.getAttribute('page-id')
        const containerId = container.getAttribute('container-id')
        const siblingId = sibling ? sibling.getAttribute('data-id') : null

        if (element.hasAttribute('data-id')) {
            // An already existing element got relocated
            return moveContent(
                element.getAttribute('data-id'),
                containerPageId,
                containerId,
                siblingId
            )
        }

        return insertContent(
            element.getAttribute('data-name'),
            containerPageId,
            containerId,
            siblingId
        )
    });    
}