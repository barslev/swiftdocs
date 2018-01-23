import remove from '~/ui/commands/remove'
import duplicate from '~/ui/commands/duplicate'

const commands = [
    remove,
    duplicate,
    // Register more commands...
]

export default function() {

     // for IE to cover IEs window event-object


    document.onkeydown = (e) => {
        e = e || window.event;

        if (!e.ctrlKey) {
            // Alt key is not pressed. Invoke nothing.
            return
        }

        for (let i in commands) {
            let command = commands[i]
            if (command.key === e.which) {
                command.invoke()
                e.preventDefault()
                e.stopPropagation()
                return false
            }
        }
        // No command is matched.
    }
}