import React, { Component } from 'react'
import { Container, Row, Col,
    Form, Button } from 'react-bootstrap';
import SearchStyle from './search.module.css';
import { Redirect } from "react-router-dom";
import PinDropIcon from '@mui/icons-material/PinDrop';
import EventIcon from '@mui/icons-material/Event';
import LanIcon from '@mui/icons-material/Lan';
import SearchIcon from '@mui/icons-material/Search';

class Search extends Component {

    state = {
        search: false,
        where: "",
        month: "",
        type: ""
    }

    handelWhere = (e) => {
        let newState = Object.assign({}, this.state)
        newState.where = e.target.value
        this.setState(newState)
    }

    handelMonth = (e) => {
        let newState = Object.assign({}, this.state)
        newState.month = e.target.value
        this.setState(newState)
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: true
        })
    }

    render() {
        
        if(this.state.search){
            return (<Redirect to = {{
                pathname: '/search',
                state: this.state
            }}/>)
        }

        return (
            <Form className={SearchStyle.formSpace} onSubmit={this.handleSearch}>
                <div style={{ padding: "30px 25px", borderBottom: "1px solid #f1f1f1", background: "rgb(240 101 36)", fontFamily: "Poppins", color: "rgb(252 252 252)" }}>
                    <h4>Expolre & Travel</h4>
                    <p> Discover the world today. Find your perfect far destination.</p>
                </div>
                <Col md={12} className="p-0" style={{height: "80px", borderBottom: "1px solid #f1f1f1", fontFamily: "Poppins"}}>
                    <Form.Group className={SearchStyle.formGroup}>
                        <PinDropIcon className={SearchStyle.iconStyle} />
                        <Form.Control onChange={(e) => this.handelWhere(e)} value={this.state.where} type="text" placeholder="Where" className={SearchStyle.inputStyle}></Form.Control>
                    </Form.Group >
                </Col>
                <Col md={12} className="p-0" style={{height: "80px", borderBottom: "1px solid #f1f1f1", fontFamily: "Poppins"}}>
                    <Form.Group className={SearchStyle.formGroup}>
                        <EventIcon className={SearchStyle.iconStyle} />
                        <Form.Control onChange={(e) => this.handelMonth(e)} value={this.state.month} type="text" placeholder="Month" className={SearchStyle.inputStyle}></Form.Control>
                    </Form.Group >
                </Col>
                <Col md={12} className="p-0" style={{height: "80px", fontFamily: "Poppins"}}>
                    <Form.Group className={SearchStyle.formGroup}>
                        <LanIcon className={SearchStyle.iconStyle} />
                        <Form.Control type="text" placeholder="Type" className={SearchStyle.inputStyle}></Form.Control>
                    </Form.Group >
                </Col>
                <Col md={12} className="p-0" style={{height: "80px", fontFamily: "Poppins"}}>
                    <Form.Group style={{margin: "0", height: "100%"}}>
                        <Button type="submit" className={SearchStyle.btnSearch + " col-md-12"}><SearchIcon /> Rechercher</Button>
                    </Form.Group >
                </Col>
            </Form>
        )
    }
}

export default Search
