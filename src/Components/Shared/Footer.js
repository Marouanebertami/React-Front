import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchLogoUrl } from '../../store/Reducers/actions'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FooterStyle from './css/Footer.module.css';
// import logo from '../../img/logo.png'

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchLogoUrl());
    }

    render() {
        const { logoUrl, isFetchingLogo } = this.props;

        return (
            <div className={ FooterStyle.backgroundCheckout }>
                <Container fluid>
                    <Row className="p-5 mr-0 ml-0">
                        <Col lg={3}>
                            { !isFetchingLogo ? <img src={ logoUrl } alt="Follow me travel" style={{width: "100px",height: "70px"}} /> : "" }
                            <p style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400", marginTop: "15px"}}>Follow Me Travel est une agence de voyage enligne basée au Maroc. elle combine le service de qualité d'une agence de rue et les prix cassés d' un site enligne, L’ agence choisit pour vous les meilleurs deals possibles et casse les prix sur beaucoup de destinations dont Istanbul /Turquie, Paris/France et Malaisie.</p>
                        </Col>
                        <Col lg={3}>
                            <h5 style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", textTransform: "uppercase"}}>Suivez-nous</h5>
                            <div className="text-center">
                                <a href="#" style={{ color: "#fff" }}><FacebookIcon /></a>
                                <a href="#" style={{ color: "#fff" }}><InstagramIcon /></a>
                            </div>
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

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    const { logoUrl, isFetchingLogo } = reducersData
    return {
        isFetchingLogo,
        logoUrl
    };
}

export default connect(mapStateToProps)(Footer)
