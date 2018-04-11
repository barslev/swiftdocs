import React, { Component } from 'react'
import { connect } from 'react-redux'

import Styles from './Styles'
import Registry from './ElementRegistry'

class Document extends Component
{
    render() {
        
        const Container = Registry.getRenderer("container");
    
        return <div className="document">
            <Container root={true}
                allowDrop={false}
                context={this.props.data} />
            <Styles />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data
    }
}

export default connect(mapStateToProps)(Document)