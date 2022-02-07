import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import logo from '../../img/logo.png'

class Footer extends Component {
    render() {
        return (
            <div style={{backgroundColor: "#212121", color: "#fff"}}>
                <Container>
                    <Row className="pt-5 pb-5">
                        <Col lg={3}>
                            <h1 style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", textTransform: "uppercase"}}>Template</h1>
                            {/* <img style={{width: "90%",height: "100px", marginBottom: "15px"}} src={logo} alt="" /> */}
                            <p style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400"}}>Follow Me Travel est une agence de voyage enligne basée au Maroc. elle combine le service de qualité d'une agence de rue et les prix cassés d' un site enligne, L’ agence choisit pour vous les meilleurs deals possibles et casse les prix sur beaucoup de destinations dont Istanbul /Turquie, Paris/France et Malaisie.</p>
                        </Col>
                        <Col lg={3}>
                            <h5 style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", textTransform: "uppercase"}}>Derniers Articles</h5>
                            <ul>
                                <li>Test</li>
                                <li>Test</li>
                                <li>Test</li>
                            </ul>
                        </Col>
                        <Col lg={3}>
                            <h5 style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", textTransform: "uppercase"}}>Abonnez-vous</h5>
                            <form>
                                <input style={{width: "100%",padding: "15px",backgroundColor: "#ffffff4d",border: "none",color: "#fff",fontFamily: "Poppins"}} type="text" placeholder="Email"/>
                                <button style={{width: "100%",marginTop: "10px",backgroundColor: "rgb(63, 208, 212)",border: "none",padding: "15px",color: "#fff",fontFamily: "Poppins",textTransform: "uppercase",fontWeight: "700"}} >Je m'abonne</button>
                            </form>
                        </Col>
                        <Col lg={3}>
                            <h5 style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", textTransform: "uppercase"}}>Contact</h5>
                            <p>Lorem Ipsum</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Footer
