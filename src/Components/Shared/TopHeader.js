import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import TopHeaderStyle from './TopHeaderStyle.module.css'
import { FaMailBulk, FaPhoneAlt, FaMapMarker } from "react-icons/fa"

function TopHeader() {
    return (
        <Container className={TopHeaderStyle.topHeader} fluid>
            <Row className="mr-0 ml-0">
                <Col xs lg={5}>
                    <Row>
                        <Col lg={5}><FaMailBulk /> Contact@followmetravel.ma</Col>
                        <Col xs={4}><FaPhoneAlt /> +212 6 53 24 32 16</Col>
                        <Col xs={3}><FaMapMarker /> Casablanca</Col>
                    </Row>
                </Col>
                <Col xs lg={7}>
                    <span className="float-right">test</span>
                </Col>
            </Row>
        </Container>
    )
}

export default TopHeader
