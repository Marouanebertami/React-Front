import React from 'react'
import { Col } from 'react-bootstrap';
import DestinationCss from './ComponentStyle/destination.module.css';
import { Link } from "react-router-dom";

function Destination({ item }) {
    if(item.isMain){
        return (
            <Col lg={3} className="mt-4">
                <Link to={`/destination/${item.id}`}>
                    <div className={DestinationCss.parentDestinationMain} style={{backgroundImage: `url(${item.image_url})` }}>
                        <span className={DestinationCss.destinationMain}>{item.title}</span>
                    </div>
                </Link>
            </Col>
        )
    }else{
        return (
            <Col lg={3} className="mt-4">
                <Link to={`/offer/${item.id}`}>
                    <div className={DestinationCss.parentDestination} style={{backgroundImage: `url(${item.image_url})` }}>
                        <div className={DestinationCss.destination}>
                            <span>{item.title}</span><br/>
                            <span>Good</span>
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
    
}

export default Destination
