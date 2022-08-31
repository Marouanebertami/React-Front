import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Destination from '../Destination';
import mainDestinationStyle from '../ComponentStyle/mainDestination.module.css';
import { fetchOfferData } from '../../store/Reducers/Actions/HomeData.js'
import Slider from "react-slick";
import Offer from '../Offer'
import offersStyle from '../ComponentStyle/offers.module.css';
import '../ComponentStyle/Offers.css';
import OfferSection from '../OfferSection';
import { getSliderParam } from '../parametrage/parametrage.js';

class MainDestination extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchOfferData());
        console.log("components is done!")
    }
    
    render() {
        const { perfectData } = this.props;

        const settings = getSliderParam();
        
        const { perfectOffer, isFetchingPerfectOffer } = perfectData;
        
        return (
                (!isFetchingPerfectOffer && perfectOffer !== undefined) ?
                    perfectOffer.map((destinationItem, destinationIndex) => {
                        switch(destinationItem.type){
                            case "distination_with_offer":
                                return (<Container key={destinationIndex} className="mt-5 mb-5">
                                    <Col lg={7} className="m-auto text-center">
                                        <h4 className={mainDestinationStyle.topTitre}>{destinationItem.top_title}</h4>
                                        <h2 className={mainDestinationStyle.title}>{destinationItem.title}</h2>
                                        <p className={mainDestinationStyle.description}>{destinationItem.description}</p>
                                    </Col>
                                    { 
                                        (item.data.map((item, i) => {
                                            return (<Row key={i}>
                                            {
                                                (destinationVoyage.map((destinationVoyageItem, destinationVoyageItemIndex) => {
                                                    return (
                                                        <Destination key={destinationVoyageItemIndex} item={destinationVoyageItem} />
                                                    )
                                                }))
                                            }
                                            </Row>
                                        }))
                                    }
                                </Container>)
                            case "slider_offers":
                                return (
                                    <Container key={destinationIndex} className={offersStyle.containerGlob} fluid>
                                        <Col lg={7} className="m-auto text-center">
                                            <h4 className={offersStyle.topTitle}>{destinationItem.top_title}</h4>
                                            <h2 className={offersStyle.title}>{destinationItem.title}</h2>
                                            <p className={offersStyle.description}>{destinationItem.description}</p>
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
                            case "offers_limited":
                                return (
                                    <Row key={destinationIndex} className="mr-0 ml-0" style={{minHeight: "700px"}}>
                                        {
                                            item.data.map(function(item, i){
                                                return(<OfferSection key={i} item={item} />)
                                            })
                                        }
                                    </Row>
                                )
                            default:
                                return '';
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