import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Destination from '../Destination';
import DestinationTest from './partial/Destination';
import mainDestinationStyle from '../ComponentStyle/mainDestination.module.css';
import { fetchOfferData } from '../../store/Reducers/Actions/HomeData.js'
import Slider from "react-slick";
import Offer from '../Offer'
import offersStyle from '../ComponentStyle/offers.module.css';
import '../ComponentStyle/Offers.css';
import OfferSection from '../OfferSection';
import { getSliderParam } from '../../parametrage/parametrage.js';
import { borderRadius } from '@mui/system';
import { isMobile } from 'react-device-detect';
import Carousel from 'react-bootstrap/Carousel'

class MainDestination extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchOfferData());
    }
    
    render() {
        const { perfectData } = this.props;

        const settings = getSliderParam();
        
        const { perfectOffer, isFetchingPerfectOffer } = perfectData;
        
        return (<>
                <DestinationTest></DestinationTest>
                {(!isFetchingPerfectOffer && perfectOffer !== undefined) ?
                    perfectOffer.map((destinationItem, destinationIndex) => {
                        switch(destinationItem.type){
                            case "distination_with_offer":
                                return (
                                <Container fluid key={destinationIndex} className="mt-5 mb-5">
                                    <Col lg={7} className="m-auto text-center">
                                        <h4 className={mainDestinationStyle.topTitre}>{destinationItem.top_title}</h4>
                                        <h2 className={mainDestinationStyle.title}>{destinationItem.title}</h2>
                                        <p className={mainDestinationStyle.description}>{destinationItem.description}</p>
                                    </Col>
                                    { 
                                        (destinationItem.data.map((destinationVoyage, i) => {
                                            return (<Row key={i} className={"ml-0 mr-0 " + mainDestinationStyle.DestinationOfferClass}>
                                            {
                                                (destinationVoyage.map((destinationVoyageItem, destinationVoyageItemIndex) => {
                                                    return (
                                                        <Destination key={destinationVoyageItemIndex} item={destinationVoyageItem} />
                                                    )
                                                }))
                                            }
                                            </Row>)
                                        })
                                        )
                                    }
                                </Container>
                                )
                                
                            case "offers_limited":
                                return (
                                    <Row key={destinationIndex} className="mr-0 ml-0" style={{minHeight: "700px"}}>
                                        {
                                            destinationItem.data.map(function(item, i){
                                                return(<OfferSection key={i} item={item} />)
                                            })
                                        }
                                    </Row>
                                )
                            default:
                                return '';
                        }
                    }) : ""}
                </>
        )
    }
}

function mapStateToProps(state) {
    const { HomeReducer } = state;
    const { HomeData } = HomeReducer;
    return {
        perfectData: HomeData
    };
}

export default connect(mapStateToProps)(MainDestination)