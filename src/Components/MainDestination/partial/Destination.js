import React, { Component } from 'react';
import { fetchDestinationSelectedData } from '../../../store/Reducers/Actions/DestinationsAction';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import offersStyle from '../../ComponentStyle/offers.module.css';
import mainDestinationStyle from '../../ComponentStyle/mainDestination.module.css';

class DestinationTest extends Component {

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchDestinationSelectedData());
    }

    render() {

        const { destinationReducersData } = this.props;
        const { isFetchingDestination, destinationSelected } = destinationReducersData;
        
        return (
            !isFetchingDestination ? 
                <Container fluid className={`${offersStyle.containerGlob}`}>
                    <Container>
                        <Col lg={9} className="m-auto text-center">
                            <h4 className={offersStyle.topTitle}>Nous destinations</h4>
                            <h2 className={offersStyle.title}>Selectionner votre destination</h2>
                            {/* <p className={offersStyle.description}>Hello</p> */}
                        </Col>
                        
                        <div className='row'>
                            {
                                destinationSelected.map(function(item, i){
                                    return(
                                        <div className='col-md-4 text-center' Key={i}>
                                            <div className={`m-4 ${mainDestinationStyle.DestinationItem}`} style={{ backgroundImage: `url(${item.image})` }}>
                                                <span style={{ position: "absolute", 
                                                                top: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                fontFamily: "Dancing Script, cursive",
                                                                fontSize: "40px",
                                                                color: "#fff" }}>{ item.name }</span>
                                            </div>
                                        </div>)
                                })
                            }
                        </div>
                    </Container>
                </Container> : ""
            
        );
    }
}

function mapStateToProps(state) {
    const { destinationReducer } = state;
    const { destinationReducersData } = destinationReducer;
    return {
        destinationReducersData: destinationReducersData
    };
}

export default connect(mapStateToProps)(DestinationTest)