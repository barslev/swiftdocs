import Main from '~/kernel/main'
import base from '~/elements/base'
import Actions from '~/redux/actions'
import { connect } from '~/redux/connect'

window.SwiftDocs = Main

module.exports = {
    SwiftDocs: Main,
    base: base,
    connect: connect,
    actions: Actions
}