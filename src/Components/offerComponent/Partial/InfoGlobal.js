import React from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io"

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
        villes_depart
    } = props.item;
    
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 clearfix">
                    <h4 className="tabTitleContent">{ titre }</h4>
                    <p className="tabPriceContent">{ price }<small>/ per person</small></p>
                </div>
                <div className="col-md-12 mt-2 mb-2">
                    <p className="tabDescriptionContent mt-4 mb-5" dangerouslySetInnerHTML={{ __html: description }} />
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Destination: </div>
                        <div className="col-md-9 tabInformationContentValue">{ destination }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Prochain départ: </div>
                        <div className="col-md-9 tabInformationContentValue">{ date_depart }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Ville départ: </div>
                        <div className="col-md-9 tabInformationContentValue">
                            <div className="row">
                                {
                                    villes_depart.map(function(item, i){
                                        return(
                                            <div key={i} className="col-md-6">
                                                <p><IoIosCheckmarkCircle style={{color: "rgb(63, 208, 212)", marginRight: "5px"}} /> {item.trim()}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Retour: </div>
                        <div className="col-md-9 tabInformationContentValue">{ date_retour }</div>
                    </div>
                    <div className="row m-0 mb-4">
                        <div className="col-md-3 p-0 tabInformationContentTitle">Inclus: </div>
                        <div className="col-md-9 tabInformationContentValue">
                            <div className="row">
                                {
                                    inclus.map(function(item, i){
                                        return(
                                            <div key={i} className="col-md-6">
                                                <p><IoIosCheckmarkCircle style={{color: "rgb(63, 208, 212)", marginRight: "5px"}} /> {item.trim()}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <h3 className="galrieTitre">Galerie</h3>
                    <div className="row">
                        {
                            (images != null) ? (
                                images.map(function(item, i){
                                    return (<div key={i} className="col-md-4"><div style={{backgroundImage: `url(${item.chemin})`, height: "200px", 
                                    backgroundPosition: "center", backgroundSize: "cover", marginBottom: "15px"}}></div></div>)
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
