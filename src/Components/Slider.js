import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'
import { fetchSliderData } from '../store/Reducers/actions'
import { Link } from "react-router-dom"

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchSliderData());
    }

    render() {
        const { sliders, isFetchingSliders } = this.props;
        return (
            <div className="slider" style={{ height: "520px", position: "relative", zIndex: "0" }}>
                {
                    (!isFetchingSliders && sliders != undefined) ? 
                    (
                        <Carousel style={{ height: "520px" }}>
                            {
                                (sliders.map((item, i) => {
                                    return ( <Carousel.Item key={i} style={{ height: "100%" }}>
                                        <img
                                        className="d-block w-100"
                                        src={item.image_url}
                                        alt="First slide"
                                        style={{ objectFit: "cover", maxHeight: "520px" }}
                                        />
                                        <Carousel.Caption style={{top: "50%", width: "100%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                            <h2 style={{ fontFamily: "Poppins", fontSize: "50px", fontWeight: "700" }}>{item.titre}</h2>
                                            <p style={{ fontFamily: "Poppins" }}>{item.courte_description}</p>
                                            <Link to={`/offer/${item.id}`} style={{backgroundColor: "rgb(63, 208, 212)", borderColor: "rgb(63, 208, 212)", borderRadius: "0", width: "30%"}} className="btn btn-primary">Book Now</Link>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    )
                                }))
                            }
                        </Carousel>
                    ) : ""
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    const { sliders, isFetchingSliders } = reducersData
    return {
        sliders: sliders,
        isFetchingSliders
    };
}

export default connect(mapStateToProps)(Slider)