import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Destination from './Destination';
import mainDestinationStyle from './ComponentStyle/mainDestination.module.css';
import { fetchOfferData } from '../store/Reducers/actions'
import Slider from "react-slick";
import Offer from './Offer'
import offersStyle from './ComponentStyle/offers.module.css';
import './ComponentStyle/Offers.css';
import OfferSection from './OfferSection';
import { getSliderParam } from '../parametrage/parametrage.js';

class MainDestination extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchOfferData());
    }
    
    render() {
        const { perfectData } = this.props;

        const settings = getSliderParam();
        
        const { perfectOffer, isFetchingPerfectOffer } = perfectData;
        return (
                (!isFetchingPerfectOffer && perfectOffer != undefined) ?
                    
                    perfectOffer.map((item, i) => {
                        switch(item.type){
                            case "distination_with_offer":
                                return (<Container key={i} className="mt-5 mb-5">
                                    <Col lg={7} className="m-auto text-center">
                                        <h4 className={mainDestinationStyle.topTitre}>{item.top_title}</h4>
                                        <h2 className={mainDestinationStyle.title}>{item.title}</h2>
                                        <p className={mainDestinationStyle.description}>{item.description}</p>
                                    </Col>
                                    { 
                                        (item.data.map((item, i) => {
                                            return (<Row key={i}>
                                            {
                                                item.map((value, index) => {
                                                    return (<Destination key={index} item={value} />)
                                                })
                                            }
                                            </Row>)
                                        }))
                                    }
                                </Container>)
                                break;
                            case "slider_offers":
                                return (
                                    <Container key={i} className={offersStyle.containerGlob} fluid>
                                        <Col lg={7} className="m-auto text-center">
                                            <h4 className={offersStyle.topTitle}>{item.top_title}</h4>
                                            <h2 className={offersStyle.title}>{item.title}</h2>
                                            <p className={offersStyle.description}>{item.description}</p>
                                        </Col>
                                        
                                            {
                                                (   
                                                    <Slider {...settings}>
                                                        {
                                                            item.data.map(function(item, i){
                                                                return(<Offer key={i} item={item} />)
                                                            })
                                                        }
                                                    </Slider>
                                                )
                                            }
                                        
                                    </Container>)
                                break;
                            case "offers_limited":
                                return (
                                    <Row className="mr-0 ml-0" style={{minHeight: "700px"}}>
                                        {
                                            item.data.map(function(item, i){
                                                return(<OfferSection key={i} item={item} />)
                                            })
                                        }
                                    </Row>
                                )
                                break;
                        }
                    }) : ""
            
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    return {
        perfectData: reducersData
    };
}

export default connect(mapStateToProps)(MainDestination)