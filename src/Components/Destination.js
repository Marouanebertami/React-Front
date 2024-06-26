import React from 'react'
import { Col } from 'react-bootstrap';
import DestinationCss from './ComponentStyle/destination.module.css';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { isMobile } from 'react-device-detect';

function Destination({ item }) {
    if(item.isMain && !isMobile){
        return (
            <Col lg={4} className="mt-3">
                <div>
                    <div className={DestinationCss.parentDestinationMain} style={{backgroundImage: `url(${item.image_url})` }}>
                        <span className={DestinationCss.destinationMain}>{item.title}</span>
                    </div>
                </div>
            </Col>
        )
    }else if(!item.isMain){
        var etoil = [];

        for(var i=1;i<=5;i++){
            if(item.etoil >= i){
                etoil.push(<StarIcon key={i} style={{color: "rgb(240, 101, 36)", fontSize: "18px"}} />)
            }else{
                etoil.push(<StarIcon key={i} style={{color: "rgb(197, 197, 197)", fontSize: "18px"}} />)
            }
        }

        return (
            <Col lg={4} className="mt-3">
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
                            <span className={DestinationCss.offerpriceSpan}>{item.price}</span>
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
    return "";
}

export default Destination
