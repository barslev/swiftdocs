import * as _ from 'lodash'
import save from '~/ui/commands/save'
import render from '~/ui/commands/render'
import parent from '~/ui/commands/parent'
import remove from '~/ui/commands/remove'
import duplicate from '~/ui/commands/duplicate'

const commands = [
    save,
    render,
    parent,
    remove,
    duplicate,
    // Register more commands...
]

export default function() {
    
    // Apply throttle to invoke callbacks
    commands.map(command => {
         if (command.hasOwnProperty('throttle')) {
             command.invoke = _.throttle(command.invoke, command.throttle)
         }
         return command
     })

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