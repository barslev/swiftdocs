import { removeSelectedContent, duplicateSelectedContent, selectParent } from '~/redux/actions/commands'

export default () => {

    const makeContentEditButton = (icon, label, callback) => {
        return {
            editModeOnly: true,
            selectionAware: true,
            label,
            icon,
            callback,
        }
    }

    const defaultShortcuts = [
        makeContentEditButton(
            'delete',
            'Delete Content',
            removeSelectedContent
        ),
        
        makeContentEditButton(
            'content_copy',
            'Duplicate Content',
            duplicateSelectedContent
        ),

        makeContentEditButton(
            'arrow_upward',
            'Select Parent',
            selectParent
        ),   
    ]
    
    return defaultShortcuts.concat(_swd.registry.topMenuShortcuts())
}