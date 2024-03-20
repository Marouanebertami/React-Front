import React from 'react'
import { Col } from 'react-bootstrap';
import DestinationCss from './ComponentStyle/destination.module.css';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

function OfferDestination({ item }) {
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
        var etoil = [];

        for(var i=1;i<=5;i++){
            if(item.etoil >= i){
                etoil.push(<StarIcon key={i} style={{color: "rgb(240, 101, 36)", fontSize: "18px"}} />)
            }else{
                etoil.push(<StarIcon key={i} style={{color: "rgb(197, 197, 197)", fontSize: "18px"}} />)
            }
        }

        return (
            <Col lg={3} className="mt-4">
                <Link to={`/offer/${item.id}`}>
                    <div className={DestinationCss.parentDestination}>
                        <div className={DestinationCss.destinationBackground} style={{backgroundImage: `url(${item.image_url})` }}></div>
                        <div className={DestinationCss.destination}>
                            <span key={1}>{item.title}</span><br/>
                            <span key={2}>
                            {
                                etoil.map(function(item, i){
                                    return <span>{item}</span>;
                                })
                            }
                            </span>
                        </div>
                        <div className={DestinationCss.offerprice}>
                            <p className={DestinationCss.offerpriceP}>A partir du 
                                <br />
                                <span className={DestinationCss.offerpriceSpan}>{item.price}</span>
                                <sub>/ Pers</sub>
                            </p>
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
    
}

export default OfferDestination
