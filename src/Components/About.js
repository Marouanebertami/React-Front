import React, { Component } from 'react'
import ReactAutocomplete from 'react-autocomplete'

class About extends Component {

    state = {
        where: ""
    }

    componentDidMount = async () => {
        // const {
        //     where
        // } = this.props.location.state

        // let newState = Object.assign({}, this.state)
        // newState.where = where

        // this.setState(newState)
    }

    handleChangeWhere = (e) => {
        let newState = Object.assign({}, this.state)
        newState.where = e.target.value
        // console.log(e.target.value)
        this.setState(newState)
    }

    handleSelectWhere = (val) => {
        let newState = Object.assign({}, this.state)
        newState.where = val
        this.setState(newState)
    }

    render(){
        return (
            <div>
                <ReactAutocomplete
                    items={[
                        { id: 'foo', label: 'foo' },
                        { id: 'bar', label: 'bar' },
                        { id: 'baz', label: 'baz' },
                    ]}
                    shouldItemRender={(item, where) => item.label.toLowerCase().indexOf(where.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                    <div
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    >
                        {item.label}
                    </div>
                    }
                    value={this.state.where}
                    onChange={e => this.setState({ where: e.target.value })}
                    onSelect={where => this.setState({ where })}
                />
            </div>
        )
    }
}

export default About;
