import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from "react-router-dom"

function OfferSection({ item }) {
    return (
        <Col lg={3} style={{backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative"}}>
            <Link to={`/destination/${item.id}`} style={{width: "100%", display: "block", height: "100%"}}>
                <div style={{position: "absolute",fontFamily: "Poppins", bottom: "10%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <h5 style={{ color: "rgb(63, 208, 212)",fontFamily: "Dancing Script", textAlign: "center" }}>{item.destination}</h5>
                    <h3 style={{ color: "#fff" }}>{item.titre}</h3>
                </div>
            </Link>
        </Col>
    )
}

export default OfferSection
