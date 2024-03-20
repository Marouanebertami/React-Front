import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import TopHeaderStyle from './TopHeaderStyle.module.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function TopHeader() {
    return (
        <Container className={TopHeaderStyle.topHeader} fluid>
            <Row className="mr-0 ml-0">
                <Col xs={12} xl={8} lg={12}>
                    <Row>
                        <Col lg={5} md={12} sm={12} xs={12}><AlternateEmailIcon /> Contact@followmetravel.ma</Col>
                        <Col lg={4} md={12} xs={12}><PhoneIphoneIcon /> +212 6 53 24 32 16</Col>
                        <Col lg={3} md={12} xs={12}><LocationOnIcon /> Casablanca - Maroc</Col>
                    </Row>
                </Col>
                <Col xs={12} xl={4} lg={12}>
                    <div className="float-right">
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TopHeader
