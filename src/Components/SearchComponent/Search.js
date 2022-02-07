import React, { Component } from 'react'
import offerStyle from '../ComponentStyle/offers.module.css';
import { connect } from 'react-redux'
import { Container, Tabs, Tab, Row,
    Form, Button } from 'react-bootstrap'
import { IoIosCalendar, IoIosListBox, IoIosCheckmarkCircle, IoIosStar, IoMdPin } from "react-icons/io"
import Offer from '../Offer'
import { Col } from 'react-bootstrap'
import { FaCalendarAlt, FaLocationArrow, FaStar } from "react-icons/fa"
import { Link } from "react-router-dom";
import { fetchSearchData } from '../../store/Reducers/actions'
import ReactPaginate from 'react-paginate'
import SearchComponent from '../ComponentStyle/searchComponent.module.css'

export class Search extends Component {

    constructor(props) {
        super(props);
        const {
            where,
            month,
            type
        } = this.props.location.state

        this.state = {
            where: where,
            month: month,
            type: type,
            page: 1,
            pageCount: null
        }

    }

    componentDidMount = async () => {
        const { dispatch } = this.props
        
        dispatch(fetchSearchData(this.state.where, this.state.type, this.state.month, this.state.page))
    }

    loadDataPage = (data) => {
        let selected = data.selected;
        
        const { dispatch } = this.props
        dispatch(fetchSearchData(this.state.where, this.state.type, this.state.month, selected+1))
    }

    loadDataSearch = () => {
        const { dispatch } = this.props
        dispatch(fetchSearchData(this.state.where, this.state.type, this.state.month, 1))
    }

    handelWhere = (e) => {
        let newState = Object.assign({}, this.state)
        newState.where = e.target.value
        this.setState(newState)
    }

    handelType = (e) => {
        let newState = Object.assign({}, this.state)
        newState.type = e.target.value
        this.setState(newState)
    }

    handelMonth = (e) => {
        let newState = Object.assign({}, this.state)
        newState.month = e.target.value
        this.setState(newState)
    }

    render() {
        const { search, isFetchingSearch } = this.props
        
        return (
            <div>
                <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(http://127.0.0.1:8000/images/background/search.jpg)`}}>
                    <div className={offerStyle.offerTitleParent}>
                        <h2 className={offerStyle.offerTitle}>Trouver votre plan</h2>
                    </div>
                </div>

                <Container className="ContainerTabs">
                    <Tabs className={offerStyle.offerTabs} style={{border: "1px solid #fff"}} defaultActiveKey="information">
                        <Tab tabClassName={offerStyle.offerTab} eventKey="information" title={<span><FaCalendarAlt /> <span className="spanTabTitle">{"Date"}</span></span>}>
                            {/* <Offer key={i} item={item} /> */}
                            <Row>
                                <Col lg={9}>
                                    <Row>
                                        {
                                            (!isFetchingSearch) ? 
                                            (
                                                search.data.map((item, i) => {
                                                    var etoil = [];

                                                    for(var i=1;i<=item.etoil;i++){
                                                        etoil.push(<FaStar key={i} style={{color: '#000'}} />)
                                                    }

                                                    return (
                                                        <Col lg={6} style={{marginTop: "15px",marginBottom: "15px",}}>
                                                            <Link to={`/offer/${item.id}`}>
                                                                <div style={{boxShadow: "0px 0px 11px 0px rgb(219, 219, 219)",overflow: "hidden"}}>
                                                                    <div style={{width: "100%", height: "200px", backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
                                                                    <div style={{backgroundColor: "#3fd0d4", fontSize: "12px"}} className="pl-3 pr-3 pt-2 pb-2">
                                                                        <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><FaCalendarAlt style={{ fontSize: "15px" }} /> {item.period}</span>
                                                                        <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><FaLocationArrow style={{ fontSize: "15px" }} /> {item.destination}</span>
                                                                    </div>
                                                                    <div className="p-4" style={{backgroundColor: "#fff"}}>
                                                                        <h5 style={{fontFamily: "Poppins", color: "#000", fontWeight: "400"}}>
                                                                            {item.titre}
                                                                        </h5>
                                                                        <p style={{fontFamily: "Poppins", color: "#000", fontWeight: "300"}}>
                                                                            {item.courte_description}
                                                                        </p>
                                                                        {   
                                                                            etoil.map(function(item, i){
                                                                                return(item)
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    )
                                                })
                                                
                                            ) : ""
                                        }
                                    </Row>
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={!isFetchingSearch ? search.total_pages : 0}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.loadDataPage}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                    />
                                </Col>
                                <Col lg={3}>
                                    <Col lg={12} className={SearchComponent.searchSpace}>
                                        <h4>Trouver votre plan</h4>
                                        <br />
                                        <Form.Group>
                                            <Form.Control onChange={(e) => this.handelWhere(e)} className={SearchComponent.inputSearch} value={this.state.where} type="text" placeholder="Where"></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control onChange={(e) => this.handelType(e)} className={SearchComponent.inputSearch} value={this.state.type} type="text" placeholder="Type"></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control onChange={(e) => this.handelMonth(e)} className={SearchComponent.inputSearch} value={this.state.month} type="text" placeholder="Month"></Form.Control>
                                        </Form.Group>
                                        <Form.Group style={{margin: "0", height: "100%"}}>
                                            <Button type="button" onClick={this.loadDataSearch} className="col-md-12" style={{borderRadius: 0, fontWeight: "700", color: "rgb(63, 208, 212)",backgroundColor: "#fff",borderColor: "#fff"}}>Rechercher</Button>
                                        </Form.Group >
                                    </Col>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Container>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    const { search, isFetchingSearch } = reducersData
    return {
        search,
        isFetchingSearch
    };
}

export default connect(mapStateToProps)(Search)

// export default Search
