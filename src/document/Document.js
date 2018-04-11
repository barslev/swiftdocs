import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'

class Document extends Component
{
    render() {
        return <div className="document">
            <Container root={true}
                allowDrop={false}
                context={this.props.data} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data
    }
}


export default connect(mapStateToProps)(Document)