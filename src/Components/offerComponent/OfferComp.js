import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Container, Tabs, Tab } from 'react-bootstrap'
import offerStyle from '../ComponentStyle/offers.module.css';
import InfoGlobal from './Partial/InfoGlobal';
import Calendar from './Partial/Calendar';
import ProgramTab from './Partial/ProgramTab';
import '../ComponentStyle/offer.css';
import { fetchOfferSelectedData, fetchDestinationData } from '../../store/Reducers/actions'
import { IoIosCalendar, IoIosListBox, IoIosCheckmarkCircle, IoIosStar } from "react-icons/io"

class OfferComp extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount = async () => {
        const id = this.props.match.params.id;
        const { dispatch } = this.props
        switch(this.props.type){
            case "offer":
                dispatch(fetchOfferSelectedData(id))
                break;
            case "destination":
                dispatch(fetchDestinationData(id))
                break;
        }
    }

    getDestinationOrOffer = () => {
        const { offerSelected, isFetchingOfferSelect } = this.props
        const { isFetchingDestinationById, destinationById } = this.props
        if(!isFetchingOfferSelect && this.props.type == "offer"){
            return (
                <div>
                    <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(${offerSelected.image_url})`}}>
                        <div className={offerStyle.offerTitleParent}>
                            <span className={offerStyle.offerTopTitle}>Amazing Tour</span>
                            <h2 className={offerStyle.offerTitle}>{ offerSelected.titre }</h2>
                        </div>
                    </div>

                    <Container className="ContainerTabs">
                        <Tabs className={offerStyle.offerTabs} defaultActiveKey="information">
                            <Tab tabClassName={offerStyle.offerTab} eventKey="information" title={<span><IoIosListBox /> <span className="spanTabTitle">{"Information"}</span></span>}>
                                {/* get Global Information Component */}
                                <InfoGlobal item={offerSelected} />
                            </Tab>
                            <Tab tabClassName={offerStyle.offerTab} eventKey="program" title={<span><IoIosCalendar /> <span className="spanTabTitle">{"Program"}</span></span>}>
                                {/* get Program Component */}
                                <ProgramTab programs={offerSelected.programs} />
                            </Tab>
                            <Tab tabClassName={offerStyle.offerTab} eventKey="reserver" title={<span><IoIosCheckmarkCircle /> <span className="spanTabTitle">{"Réserver"}</span></span>}>
                                <div className="row">
                                    {/* <div className="col-md-12"> */}
                                        <div className="col-md-12 pb-3">
                                            <h4 className="tabTitleProgramme pb-2">Tarif & Disponibilité</h4>
                                            <h6 className="tabDescriptionReserver">Sélectionnez une date de départ dans le calendrier ci-dessous.</h6>
                                        </div>
                                        <Calendar tarifs={offerSelected.tarifs} />
                                    {/* </div> */}
                                </div>
                            </Tab>
                            <Tab tabClassName={offerStyle.offerTab} eventKey="test02" title={<span><IoIosStar /> <span className="spanTabTitle">{"Reviews"}</span></span>}>
                                test test01
                            </Tab>
                        </Tabs>
                    </Container>

                </div>)
        }else if(!isFetchingDestinationById && this.props.type == "destination"){
            return (<div>
                <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(${destinationById.image_principal.chemin})`}}>
                    <div className={offerStyle.offerTitleParent}>
                        <span className={offerStyle.offerTopTitle}>Amazing Tour</span>
                        <h2 className={offerStyle.offerTitle}>{ destinationById.name }</h2>
                    </div>
                </div>

                <Container className="ContainerTabs">
                    <div className={offerStyle.offerTabs} style={{height: "350px"}}>
                        test
                    </div>
                    {/* <Tabs  defaultActiveKey="information">
                        <Tab tabClassName={offerStyle.offerTab} eventKey="information" title={<span><IoIosListBox /> <span className="spanTabTitle">{"Information"}</span></span>}>
                            
                        </Tab>
                        <Tab tabClassName={offerStyle.offerTab} eventKey="program" title={<span><IoIosCalendar /> <span className="spanTabTitle">{"Program"}</span></span>}>
                            
                        </Tab>
                        <Tab tabClassName={offerStyle.offerTab} eventKey="reserver" title={<span><IoIosCheckmarkCircle /> <span className="spanTabTitle">{"Réserver"}</span></span>}>
                            <div className="row">
                                
                            </div>
                        </Tab>
                        <Tab tabClassName={offerStyle.offerTab} eventKey="test02" title={<span><IoIosStar /> <span className="spanTabTitle">{"Reviews"}</span></span>}>
                            test test01
                        </Tab>
                    </Tabs> */}
                </Container>

            </div>)
        }
    }

    render() {
        return (<Container fluid>
            {this.getDestinationOrOffer()}
        </Container>);
    }
}

function mapStateToProps(state, props) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    switch(props.type){
        case "offer":
            const { isFetchingOfferSelect, offerSelected } = reducersData
            return {
                offerSelected,
                isFetchingOfferSelect
            };
            break;
        case "destination":
            const { isFetchingDestinationById, destinationById } = reducersData
            return {
                destinationById,
                isFetchingDestinationById
            };
            break;
    }
}

export default connect(mapStateToProps)(OfferComp)