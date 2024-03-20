import React, { Component } from 'react'
import offerStyle from '../ComponentStyle/offers.module.css';
import { connect } from 'react-redux'
import { Container, Tabs, Tab, Row,
    Form, Button, Col } from 'react-bootstrap';
import { IoMdPin } from "react-icons/io";
import EventIcon from '@mui/icons-material/Event';
import { Link } from "react-router-dom";
import { fetchSearchData } from '../../store/Reducers/actions';
import ReactPaginate from 'react-paginate';
import SearchComponent from './searchComponent.module.css';
import StarIcon from '@mui/icons-material/Star';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import '../ComponentStyle/offer.css';

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
                <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(http://127.0.0.1:8000/images/backImage.jpg)`}}>
                    <div className={offerStyle.offerTitleParent}>
                        <h2 className={offerStyle.offerTitle}>Trouver votre plan</h2>
                    </div>
                </div>

                <Container className="ContainerTabs">
                    <Tabs className={offerStyle.offerTabs} style={{border: "1px solid rgb(255 255 255)"}} defaultActiveKey="information">
                        <Tab tabClassName={offerStyle.offerTab} eventKey="information" title={<span><EventIcon /> <span className="spanTabTitle">{"Date"}</span></span>}>
                            <Row>
                                <Col lg={9}>
                                    <Row>
                                        {
                                            (!isFetchingSearch) ? 
                                            (
                                                search.data.map((item, i) => {
                                                    var etoil = [];

                                                    for(var j=1;j<=5;j++){
                                                        if(item.etoil >= j){
                                                            etoil.push(<StarIcon key={i} style={{color: "rgb(240, 101, 36)"}} />)
                                                        }else{
                                                            etoil.push(<StarIcon key={i} style={{color: "rgb(197 197 197)"}} />)
                                                        }
                                                    }

                                                    return (
                                                        <Col key={i} lg={6} style={{marginTop: "15px",marginBottom: "15px"}}>
                                                            <Link className="linkReadMore" to={`/offer/${item.id}`}>
                                                                <div style={{boxShadow: "0px 0px 11px 0px rgb(219, 219, 219)",overflow: "hidden", position: "relative"}}>
                                                                    <div style={{width: "100%", height: "200px", backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative"}}>
                                                                        <p style={{ position: "absolute", bottom: "0", right: "0", padding: "15px", color: "#fff", backgroundColor: "rgb(240, 101, 36)", fontFamily: "Poppins" }}>
                                                                            A prtire du <br />
                                                                            <span style={{ fontWeight: "700" }}>1200 DH</span> <sub>/Pers</sub>
                                                                        </p>
                                                                    </div>
                                                                    <div style={{backgroundColor: "rgb(244 97 46)", fontSize: "12px"}} className="pl-3 pr-3 pt-2 pb-2">
                                                                        {item.period != null ? <span style={{color: "rgb(255 255 255)", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><EventIcon style={{ fontSize: "15px" }} /> {item.period}</span> : ""}
                                                                        {item.destination != null && item.destination != "" ? <span style={{color: "rgb(255 255 255)", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><IoMdPin style={{ fontSize: "15px" }} /> {item.destination}</span> : ""}
                                                                    </div>
                                                                    <div className="p-4" style={{backgroundColor: "rgb(255 255 255)"}}>
                                                                        <h5 style={{fontFamily: "Poppins", color: "#000", fontWeight: "400"}}>
                                                                            {item.titre}
                                                                        </h5>
                                                                        <div style={{ marginBottom: "10px" }}>
                                                                            {
                                                                                etoil.map(function(item, i){
                                                                                    return <span>{item}</span>;
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <p style={{fontFamily: "Poppins", color: "#000", fontWeight: "300"}}>
                                                                            {item.courte_description}
                                                                        </p>
                                                                    </div>
                                                                    <div className='readMoreDiv'>
                                                                        <span className='readMoreSpan'>Read More <ReadMoreIcon /></span>
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
                                            <Button type="button" onClick={this.loadDataSearch} className={"col-md-12 " + SearchComponent.searchButton}>Rechercher</Button>
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
