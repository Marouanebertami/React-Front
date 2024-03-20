import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from "react-router-dom";
import { Container, Tabs, Tab } from 'react-bootstrap'
import offerStyle from '../ComponentStyle/offers.module.css';
import InfoGlobal from './Partial/InfoGlobal';
// import Calendar from './Partial/Calendar';
import ProgramTab from './Partial/ProgramTab';
import '../ComponentStyle/offer.css';
import { fetchOfferSelectedData } from '../../store/Reducers/Actions/OfferAction/index.js'
import { fetchDestinationData } from '../../store/Reducers/actions'
// import { IoIosCalendar, IoIosListBox, IoIosCheckmarkCircle, IoIosStar } from "react-icons/io"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
// import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import {Helmet} from "react-helmet";

class OfferCompponent extends Component {
    constructor(props) {
        super(props);
        console.log(props.is_loading);
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
                            <h1 className={offerStyle.offerTitle}>{ offerSelected.titre }</h1>
                        </div>
                    </div>

                    <Container className="ContainerTabs">
                        <Tabs className={offerStyle.offerTabs} defaultActiveKey="information">
                            <Tab tabClassName={offerStyle.offerTab} eventKey="information" title={<span><InfoOutlinedIcon style={{ color: "rgb(240 101 36)", marginRight: "5px" }} /> <span className="spanTabTitle">{"Information"}</span></span>}>
                                {/* get Global Information Component */}
                                <InfoGlobal item={offerSelected} />
                            </Tab>
                            <Tab tabClassName={offerStyle.offerTab} eventKey="program" title={<span><EventAvailableOutlinedIcon style={{ color: "rgb(240 101 36)", marginRight: "5px" }} /> <span className="spanTabTitle">{"Program"}</span></span>}>
                                {/* get Program Component */}
                                <ProgramTab programs={offerSelected.programs} />
                            </Tab>
                            <Tab tabClassName={offerStyle.offerTab} eventKey="test02" title={<span><FeedbackOutlinedIcon style={{ color: "rgb(240 101 36)", marginRight: "5px" }} /> <span className="spanTabTitle">{"Reviews"}</span></span>}>
                                Service indisponible pour le moment
                            </Tab>
                        </Tabs>
                    </Container>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{ offerSelected.titre } - Follow me travel</title>
                        <meta name="description" content={offerSelected.courte_description} />
                    </Helmet>
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
    
    switch(props.type){
        case "offer":
            const { offerReducer } = state;
            const { offerReducersData } = offerReducer;
            const { isFetchingOfferSelect, offerSelected } = offerReducersData
            return {
                offerSelected,
                isFetchingOfferSelect
            };
        case "destination":
            const { rootReducer } = state;
            const { reducersData } = rootReducer;
            const { isFetchingDestinationById, destinationById } = reducersData
            return {
                destinationById,
                isFetchingDestinationById
            };
    }
}

export default connect(mapStateToProps)(OfferCompponent)