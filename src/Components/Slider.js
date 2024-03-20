import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'
import { fetchSliderData } from '../store/Reducers/actions'
import { Link } from "react-router-dom";
import SearchForm from './Search';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './ComponentStyle/slider.css'

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchSliderData());
    }

    // handleIsLoading = (is_loading) => {
    //     this.props.handleIsLoading(is_loading)
    // }

    render() {
        const { sliders, isFetchingSliders } = this.props;
        
        return (
            <div className="slider" style={{ height: "80vh", position: "relative", zIndex: "0" }}>
                {
                    (!isFetchingSliders && sliders != undefined) ? 
                    (
                        <Carousel className="carousel-container" style={{ height: "100%" }}>
                            {
                                (sliders.map((item, i) => {
                                    return ( <Carousel.Item key={i} className='carousel-item' style={{ height: "100%" }}>
                                        <img
                                        className="d-block w-100"
                                        src={item.image_url}
                                        alt="First slide"
                                        style={{ objectFit: "cover", maxHeight: "520px" }}
                                        />
                                    </Carousel.Item>
                                    )
                                }))
                            }
                        </Carousel>
                    ) : ""
                }
                <SearchForm />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    console.log(reducersData)
    const { sliders, isFetchingSliders } = reducersData
    return {
        sliders: sliders,
        isFetchingSliders
    };
}

export default connect(mapStateToProps)(Slider)