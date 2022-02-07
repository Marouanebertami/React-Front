import React, { Component } from 'react'

class testElements extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}

export default testElements
