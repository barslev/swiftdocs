import * as title from './title'
import * as pages from './pages'
import * as styles from './styles'
import * as session from './session'
import * as contents from './contents'
import * as defaults from './defaults'
import * as attachments from './attachments'

function mergeActions(actions) {
    
    const output = {}

    actions.forEach((methods) => {
        for (let name in methods) {
            if (name in output) {
                throw new Error('Duplicate redux action: ' + name)
            }
            output[name] = methods[name]
        }
    })

    return output
}

export default mergeActions([
    title,
    pages,
    styles,
    session,
    contents,
    defaults,
    attachments,
])