import React, { Component } from 'react'
import OfferSection from './OfferSection'
import { Row } from 'react-bootstrap'
import API from '../apiUsers';

class OffersSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: null,
        }
    }

    componentDidMount = async () => {
        try{
            const response = await API.get('/getOfferLimitFour');
            if(response.status){
                this.setState({
                    offers: response.data.data,
                });
            }
        }catch(e){
            alert(e.message)
        }
    }

    render() {
        return (
            <Row className="mr-0 ml-0" style={{minHeight: "700px"}}>
                {
                    (this.state.offers != null) ? 
                        (
                            this.state.offers.map(function(item, i){
                                return(<OfferSection key={i} item={item} />)
                            })
                        ) : ('Loading')
                }
            </Row>
        )
    }
}

export default OffersSection
