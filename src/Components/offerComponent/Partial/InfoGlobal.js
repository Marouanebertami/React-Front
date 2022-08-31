import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

function InfoGlobal(props) {

    const {
        titre,
        price,
        description,
        destination,
        date_depart,
        date_retour,
        inclus,
        images,
        villes_depart,
        tarifs
    } = props.item;
    
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-12 clearfix">
                    <h4 className="tabTitleContent">{ titre }</h4>
                    <p className="tabPriceContent">à partir du <span>{ price }</span><small>/ per person</small></p>
                </div>
                <div className="col-md-12 mt-2 mb-2">
                    <p className="tabDescriptionContent mt-4 mb-5" dangerouslySetInnerHTML={{ __html: description }} />
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Destination: </div>
                        <div className="col-md-9 tabInformationContentValue"><LocationOnIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ destination }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Prochain départ: </div>
                        <div className="col-md-9 tabInformationContentValue"><EventIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ date_depart }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Ville départ: </div>
                        <div className="col-md-9 tabInformationContentValue">
                            <div className="row">
                                {
                                    villes_depart.map(function(item, i){
                                        return(
                                            <div key={i} className="col-md-6">
                                                <p><CheckCircleOutlineIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} /> {item.trim()}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Retour: </div>
                        <div className="col-md-9 tabInformationContentValue"><EventIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ date_retour }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">les prix Inclus: </div>
                        <div className="col-md-9 tabInformationContentValue">
                            <div className="row">
                                {
                                    inclus.map(function(item, i){
                                        return(
                                            <div key={i} className="col-md-6">
                                                <p><CheckCircleOutlineIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} /> {item.trim()}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">les prix n'inclus pas: </div>
                        <div className="col-md-9 tabInformationContentValue">
                            <div className="row">
                                {
                                    inclus.map(function(item, i){
                                        return(
                                            <div key={i} className="col-md-6">
                                                <p><HighlightOffIcon style={{ color: "rgb(233, 0, 0)", marginRight: "5px", fontSize: "17px" }} /> {item.trim()}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mb-3 mt-3'>
                    <h3 className='galrieTitre'>Logements & Tarifs</h3>
                    <div className='row' style={{ borderBottom: "1px solid #000" }}>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Hotel</h6>
                        </div>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Single</h6>
                        </div>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Double</h6>
                        </div>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Triple</h6>
                        </div>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Enfant 2-6ANS</h6>
                        </div>
                        <div className='col-md-2' style={{  backgroundColor: "rgb(63, 208, 212)", textAlign: "center" }}>
                            <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}>Enfant 6-12ANS</h6>
                        </div>
                    </div>
                    {
                        tarifs.map(function(tarif, i){
                            return (
                                <div className='row' style={{ borderBottom: "1px solid #000" }}>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.hotel }</p>
                                    </div>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.single_prix } DH/Pers.</p>
                                    </div>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.double_prix } DH/Pers.</p>
                                    </div>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.triple_prix } DH/Pers.</p>
                                    </div>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.premier_enfant_prix } DH/Pers.</p>
                                    </div>
                                    <div className='col-md-2' style={{  textAlign: "center" }}>
                                        <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>{ tarif.second_enfant_prix } DH/Pers.</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-md-12">
                    <h3 className="galrieTitre">Galerie</h3>
                    <div className="row">
                        {
                            (images != null) ? (
                                images.map(function(item, i){
                                    return (<div key={i} className="col-md-4"><div style={{ backgroundImage: `url(${item.chemin})`, height: "200px", 
                                    backgroundPosition: "center", backgroundSize: "cover", marginBottom: "15px" }}></div></div>)
                                })
                            ) : ("test")
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

export default InfoGlobal
