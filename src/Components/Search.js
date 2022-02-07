import React, { Component } from 'react'
import { Container, Row, Col,
    Form, Button } from 'react-bootstrap';
import SearchStyle from './ComponentStyle/search.module.css';
import { Redirect } from "react-router-dom";
import { FaCalendarAlt, FaLocationArrow, FaNetworkWired, FaSearchLocation } from "react-icons/fa"

class Search extends Component {

    state = {
        search: false,
        where: null,
        month: null,
        type: null
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
            <Container>
                <Form onSubmit={this.handleSearch}>
                    <Row style={{backgroundColor: "#fff", marginTop: "-40px", boxShadow: "0 3px 13px 0 rgba(0,0,0,.07)", fontFamily: "Poppins"}}>
                        <Col md={3} className="p-0" style={{height: "80px", borderRight: "1px solid #f1f1f1"}}>
                            <Form.Group className={SearchStyle.formGroup}>
                                <FaLocationArrow className={SearchStyle.iconStyle} />
                                <Form.Control onChange={(e) => this.handelWhere(e)} value={this.state.where} type="text" placeholder="Where" className={SearchStyle.inputStyle}></Form.Control>
                            </Form.Group >
                        </Col>
                        <Col md={3} className="p-0" style={{height: "80px", borderRight: "1px solid #f1f1f1"}}>
                            <Form.Group className={SearchStyle.formGroup}>
                                <FaCalendarAlt className={SearchStyle.iconStyle} />
                                <Form.Control onChange={(e) => this.handelMonth(e)} value={this.state.month} type="text" placeholder="Month" className={SearchStyle.inputStyle}></Form.Control>
                            </Form.Group >
                        </Col>
                        <Col md={3} className="p-0" style={{height: "80px", borderRight: "1px solid #f1f1f1"}}>
                            <Form.Group className={SearchStyle.formGroup}>
                                <FaNetworkWired className={SearchStyle.iconStyle} />
                                <Form.Control type="text" placeholder="Type" className={SearchStyle.inputStyle}></Form.Control>
                            </Form.Group >
                        </Col>
                        <Col md={3} className="p-0" style={{height: "80px"}}>
                            <Form.Group style={{margin: "0", height: "100%"}}>
                                <Button type="submit" className="col-md-12" style={{height: "100%", borderRadius: 0, fontWeight: "700",backgroundColor: "#3fd0d4",borderColor: "#3fd0d4"}}><FaSearchLocation /> Rechercher</Button>
                            </Form.Group >
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default Search
