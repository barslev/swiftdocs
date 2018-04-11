import {connect} from 'react-redux'
import React, {Component} from 'react'

import Element from './Element'

class Presenter extends Component {
    render() {
        return this.props.items.map(item => <Element
            key={item.id}
            item={item}
            context={item.context} />
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(Presenter)