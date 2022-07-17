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
import OfferSection from '../OfferSection'

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

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: false,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        
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
                                        (destinationItem.data.map((destinationVoyage, destinationVoyageIndex) => {
                                            return <Row key={destinationVoyageIndex}> 
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
                                                            destinationItem.data.map(function(item, i){
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
                                            destinationItem.data.map(function(item, i){
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