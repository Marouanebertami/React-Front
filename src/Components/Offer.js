import React from 'react'
import { Col } from 'react-bootstrap'
import { FaCalendarAlt, FaStar } from "react-icons/fa"
import { IoIosStar, IoMdPin } from "react-icons/io"
import { Link } from "react-router-dom";

function Offer({item}) {
    var etoil = [];

    for(var i=1;i<=item.etoil;i++){
        etoil.push(<FaStar key={i} style={{color: '#000'}} />)
    }

    return (
        <Col lg={12} style={{marginTop: "15px",marginBottom: "15px",}}>
            <Link to={`/offer/${item.id}`}>
                <div style={{boxShadow: "0px 0px 11px 0px rgb(115, 113, 113)", borderRadius: "7px",overflow: "hidden"}}>
                    <div style={{width: "100%", height: "200px", backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
                    <div style={{backgroundColor: "#3fd0d4", fontSize: "12px"}} className="pl-3 pr-3 pt-2 pb-2">
                        <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><FaCalendarAlt /> {item.period}</span>
                        <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><IoMdPin style={{ fontSize: "15px" }} /> {item.destination}</span>
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
}

export default Offer
