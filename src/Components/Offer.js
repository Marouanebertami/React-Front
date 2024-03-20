import React from 'react'
import { Col } from 'react-bootstrap'
import { FaCalendarAlt, FaStar } from "react-icons/fa"
import { IoMdPin } from "react-icons/io"
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import './ComponentStyle/offer.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

function Offer({item}) {
    var etoil = [];

    for(var i=1;i<=5;i++){
        if(item.etoil >= i){
            etoil.push(<StarIcon key={i} style={{color: "rgb(240, 101, 36)", fontSize: "18px"}} />)
        }else{
            etoil.push(<StarIcon key={i} style={{color: "rgb(197 197 197)", fontSize: "18px"}} />)
        }
    }

    return (
        <Col lg={12} style={{marginTop: "15px",marginBottom: "15px",}}>
            <Link to={`/offer/${item.id}`} className="linkReadMore">
                <div style={{boxShadow: "0px 0px 11px 0px rgb(115, 113, 113)", borderRadius: "7px",overflow: "hidden", position: "relative"}}>
                    <div style={{width: "100%", height: "200px", backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative"}}>
                        <p style={{ position: "absolute", bottom: "0", right: "0", padding: "15px", color: "#fff", backgroundColor: "rgb(240, 101, 36)", fontFamily: "Poppins" }}>
                            A prtire du <br />
                            <span style={{ fontWeight: "700" }}>1200 DH</span> <sub>/Pers</sub>
                        </p>
                    </div>
                    <div style={{backgroundColor: "rgb(240, 101, 36)", fontSize: "12px"}} className="pl-3 pr-3 pt-2 pb-2">
                        {item.period != null && <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><FaCalendarAlt /> {item.period}</span> }
                        <span style={{color: "#fff", fontFamily: "Poppins", fontWeight: "400",marginLeft: "15px", marginRight: "15px"}}><IoMdPin style={{ fontSize: "15px" }} /> {item.destination}</span>
                    </div>
                    <div className="p-4" style={{backgroundColor: "#fff"}}>
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
}

export default Offer
