import React, { Component } from 'react';

export default class Document extends Component
{
    render() {
        return <div className="document">
            <Container root={true}
                allowDrop={false}
                context={this.props.data} />
        </div>
    }
}