import React, { Component } from 'react'
import { Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Offer from './Offer'
import Slider from "react-slick";
import './ComponentStyle/Offers.css';
import offersStyle from './ComponentStyle/offers.module.css';
import { fetchOfferToShowData } from '../store/Reducers/actions'

class Offers extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchOfferToShowData());
    }

    render() {
        const { offersToShow, isFetchingOffersToShow } = this.props

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: false,
            autoplay: true,
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
        
        return (
            (!isFetchingOffersToShow && offersToShow != undefined) ? 
                (
                    <Container className={offersStyle.containerGlob} fluid>
                        <Col lg={7} className="m-auto text-center">
                            <h4 className={offersStyle.topTitle}>{offersToShow.titles.top_title}</h4>
                            <h2 className={offersStyle.title}>{offersToShow.titles.title}</h2>
                            <p className={offersStyle.description}>{offersToShow.titles.description}</p>
                        </Col>
                        
                            {
                                (   
                                    <Slider {...settings}>
                                        {
                                            offersToShow.data.data.map(function(item, i){
                                                return(<Offer key={i} item={item} />)
                                            })
                                        }
                                    </Slider>
                                )
                            }
                        
                    </Container>
                )
            : "Loading"
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    const { offersToShow, isFetchingOffersToShow } = reducersData
    return {
        offersToShow: offersToShow,
        isFetchingOffersToShow
    };
}

export default connect(mapStateToProps)(Offers)
