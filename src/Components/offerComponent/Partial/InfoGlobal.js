import React, { Component, createRef } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { Redirect } from "react-router-dom";
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import BedIcon from '@mui/icons-material/Bed';
import KingBedIcon from '@mui/icons-material/KingBed';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import ChairIcon from '@mui/icons-material/Chair';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import TourIcon from '@mui/icons-material/Tour';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import BoyIcon from '@mui/icons-material/Boy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CollectionsIcon from '@mui/icons-material/Collections';
import Reservation from './Reservation';

class InfoGlobal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tarifId: null,
            dateDebart: null,
            dateRetour: null,
            duree: null,
            single_prix: null,
            double_prix: null,
            triple_prix: null,
            premier_enfant: null,
            deuxieme_enfant: null,
            bebe: null,
            show: false,
            nbrChambre: 1,
            reservation: [],
            total: 0,
            redirectToCheckout: false
        }

        this.ref = createRef();

        this.onChangeNbrChambre = this.onChangeNbrChambre.bind(this);
        this.changeType = this.changeType.bind(this);
        this.onChangeAdults = this.onChangeAdults.bind(this);
        this.onChangePremierEnfant = this.onChangePremierEnfant.bind(this);
        this.onChangeDeuxiemeEnfant = this.onChangeDeuxiemeEnfant.bind(this);
        this.onChangeBebe = this.onChangeBebe.bind(this);
        this.onSubmitReservation = this.onSubmitReservation.bind(this);
    }

    onChangeNbrChambre = (e) =>
    {
        this.setState({nbrChambre: e.target.value});

        let reservationList = [];
        let totalReservation = 0;
        for(var i=1;i<=e.target.value;i++){
            reservationList.push({
                key: i,
                type: 'SINGLE',
                adults: 1,
                premierEnfant: 0,
                deuxiemeEnfant: 0,
                bebe: 0,
                total: this.state.single_prix
            });
            totalReservation += this.state.single_prix
        }

        this.setState({
            reservation: reservationList,
            total: totalReservation
        });
    }

    changeType = (e, itemKey) => {
        const newReservation = this.state.reservation.map(item => {
            if(item.key == itemKey)
            {
                switch(e.target.value){
                    case "SINGLE":
                        return {...item, type: e.target.value, adults: 1, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: this.state.single_prix}
                    case "DOUBLE":
                        return {...item, type: e.target.value, adults: 1, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: this.state.double_prix}
                    case "TRIPLE":
                        return {...item, type: e.target.value, adults: 1, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: this.state.triple_prix}
                    default:
                        return item;
                }
            }

            return item;
        });

        let totalReservation = 0;

        newReservation.map(item => {
            totalReservation += item.total
        });

        this.setState({reservation: newReservation, total: totalReservation})
    }

    onChangeAdults = (e, itemKey) => {
        const newReservation = this.state.reservation.map(item => {
            if(item.key == itemKey)
            {
                switch(item.type){
                    case "SINGLE":
                        return {...item, adults: e.target.value, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: (this.state.single_prix * e.target.value)}
                    case "DOUBLE":
                        return {...item, adults: e.target.value, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: (this.state.double_prix * e.target.value)}
                    case "TRIPLE":
                        return {...item, adults: e.target.value, premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0, total: (this.state.triple_prix * e.target.value)}
                    default:
                        return item;
                }
            }

            return item;
        });

        let totalReservation = 0;

        newReservation.map(item => {
            totalReservation += item.total
        });

        this.setState({reservation: newReservation, total: totalReservation})
    }

    onChangePremierEnfant = (e, itemKey) => {
        const newReservation = this.state.reservation.map(item => {
            if(item.key == itemKey)
            {
                let total = (this.state.bebe * item.bebe) + (this.state.deuxieme_enfant * item.deuxiemeEnfant) + (this.state.premier_enfant * e.target.value);

                switch(item.type){
                    case "SINGLE":
                        total += (item.adults * this.state.single_prix);
                        break;
                    case "DOUBLE":
                        total += (item.adults * this.state.double_prix);
                        break;
                    case "TRIPLE":
                        total += (item.adults * this.state.triple_prix);
                        break;
                }

                return {...item, premierEnfant: e.target.value, total: total}
            }

            return item;
        });

        let totalReservation = 0;

        newReservation.map(item => {
            totalReservation += item.total
        });

        this.setState({reservation: newReservation, total: totalReservation})
    }

    onChangeDeuxiemeEnfant = (e, itemKey) => {
        const newReservation = this.state.reservation.map(item => {
            if(item.key == itemKey)
            {
                let total = (this.state.bebe * item.bebe) + (this.state.deuxieme_enfant * e.target.value) + (this.state.premier_enfant * item.premierEnfant);

                switch(item.type){
                    case "SINGLE":
                        total += (item.adults * this.state.single_prix);
                        break;
                    case "DOUBLE":
                        total += (item.adults * this.state.double_prix);
                        break;
                    case "TRIPLE":
                        total += (item.adults * this.state.triple_prix);
                        break;
                }

                return {...item, deuxiemeEnfant: e.target.value, total: total}
            }

            return item;
        });

        let totalReservation = 0;

        newReservation.map(item => {
            totalReservation += item.total
        });

        this.setState({reservation: newReservation, total: totalReservation})
    }

    onChangeBebe = (e, itemKey) => {
        const newReservation = this.state.reservation.map(item => {
            if(item.key == itemKey)
            {
                let total = (this.state.bebe * e.target.value) + (this.state.deuxieme_enfant * item.deuxiemeEnfant) + (this.state.premier_enfant * item.premierEnfant);

                switch(item.type){
                    case "SINGLE":
                        total += (item.adults * this.state.single_prix);
                        break;
                    case "DOUBLE":
                        total += (item.adults * this.state.double_prix);
                        break;
                    case "TRIPLE":
                        total += (item.adults * this.state.triple_prix);
                        break;
                }

                return {...item, bebe: e.target.value, total: total}
            }

            return item;
        });

        let totalReservation = 0;

        newReservation.map(item => {
            totalReservation += item.total
        });

        this.setState({reservation: newReservation, total: totalReservation})
    }

    onSubmitReservation = () => {
        this.setState({redirectToCheckout: true});
    }

    render(){

        if(this.state.redirectToCheckout){
            return (<Redirect to = {{
                pathname: '/checkout',
                state: this.state
            }}/>)
        }

        const {
            titre,
            price,
            description,
            destination,
            date_depart,
            date_retour,
            inclus,
            not_inclus,
            images,
            villes_depart,
            tarifs
        } = this.props.item;

        const onReservation = (id) => {
            let tarifSelected = tarifs.find(el => {
                return el.id === id
            });

            if(tarifSelected !== null){
                this.setState({nbrChambre: 1});
                this.setState({ 
                    tarifId: tarifSelected.id,
                    single_prix: tarifSelected.single_prix,
                    double_prix: tarifSelected.double_prix,
                    duree: tarifSelected.period,
                    triple_prix: tarifSelected.triple_prix,
                    dateDebart: tarifSelected.date_depart,
                    dateRetour: tarifSelected.date_retour,
                    premier_enfant: tarifSelected.premier_enfant_prix,
                    deuxieme_enfant: tarifSelected.second_enfant_prix,
                    bebe: tarifSelected.bebe_prix,
                    show: true,
                    reservation: [
                        {
                            key: 1,
                            type: 'SINGLE',
                            adults: 1,
                            premierEnfant: 0,
                            deuxiemeEnfant: 0,
                            bebe: 0,
                            total: tarifSelected.single_prix
                        }
                    ],
                    total: tarifSelected.single_prix
                });
            }

            this.ref.current?.scrollIntoView({behavior: 'smooth'});

            return tarifSelected;
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 clearfix">
                        <h4 className="tabTitleContent"><TourIcon style={{ fontSize: "40px" }}/> { titre }</h4>
                        <p className="tabPriceContent"><AttachMoneyIcon /> à partir du <span>{ price }</span><small>/ per person</small></p>
                    </div>
                    <div className="col-md-12 mt-2 mb-2">
                        <p className="tabDescriptionContent mt-4 mb-5" dangerouslySetInnerHTML={{ __html: description }} ></p>
                        <div className="row m-0 mb-4">
                            <div className="col-md-3 p-0 tabInformationContentTitle">Destination: </div>
                            <div className="col-md-9 tabInformationContentValue"><LocationOnIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ destination }</div>
                        </div>
                        <div className="row m-0 mb-4">
                            <div className="col-md-3 p-0 tabInformationContentTitle">Prochain départ: </div>
                            <div className="col-md-9 tabInformationContentValue">{ date_depart != null && <span><EventIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ date_depart }</span> }</div>
                        </div>
                        <div className="row m-0 mb-4">
                            <div className="col-md-3 p-0 tabInformationContentTitle">Retour: </div>
                            <div className="col-md-9 tabInformationContentValue">{ date_retour != null && <span><EventIcon style={{ color: "rgb(63, 208, 212)", marginRight: "5px", fontSize: "17px" }} />{ date_retour }</span> }</div>
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
                                        not_inclus.map(function(item, i){
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
                        <h3 className='galrieTitre'><EventAvailableIcon style={{ fontSize: "40px" }}/> Disponibilité & Résérvation</h3>
                        <div className='row webSpace' style={{ borderBottom: "1px solid #000" }}>
                            <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><AirplanemodeActiveIcon /> Companie</h6>
                            </div>
                            <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><DepartureBoardIcon /> Départ</h6>
                            </div>
                            <div className='col-md-4' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><ChairIcon /> Formule</h6>
                            </div>
                            <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><AttachMoneyIcon /> Prix</h6>
                            </div>
                            <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><VerifiedIcon /> Sélectionner</h6>
                            </div>
                        </div>
                        {
                            tarifs.map(function(tarif, i){
                                return (
                                    <div key={i} className='row' style={{ borderBottom: "1px solid #000" }}>
                                        <div className='col-md-2 col-sm-6 text-center p-3' style={{  textAlign: "center" }}>
                                            <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>
                                                <span className='mobileSpan'><AirplanemodeActiveIcon /> Companie :</span>
                                                { tarif.company_image != null ? <img style={{ width: "100%" }} src={`${tarif.company_image}`} /> : "" }
                                            </p>
                                        </div>
                                        <div className='col-md-2 col-sm-6 text-center p-3' style={{  textAlign: "center" }}>
                                            <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>
                                                <span className='mobileSpan'><DepartureBoardIcon /> Départ :</span>
                                                <span><FlightTakeoffIcon style={{ color: "rgb(240, 101, 36)" }} /> { tarif.date_depart }</span>
                                                <br />
                                                <span style={{ fontSize:"13px", fontWeight: "700", color: "rgb(240, 101, 36)" }}>{ tarif.period }</span>
                                                <br />
                                                <span><FlightLandIcon style={{ color: "rgb(240, 101, 36)" }} />{ tarif.date_retour }</span>
                                            </p>
                                        </div>
                                        <div className='col-md-4 text-center p-3' style={{  textAlign: "center" }}>
                                            <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>
                                                <span className='mobileSpan'><ChairIcon /> Formule :</span>
                                                <span>{ tarif.hotel }</span>
                                                <br />
                                                <span className='row'>
                                                    { tarif.excursion ? <span className='p-2 col-md-4 col-sm-6'><CurrencyExchangeIcon style={{ color: "rgb(240, 101, 36)" }}  /> Excursion</span> : "" }
                                                    { tarif.vol ? <span className='p-2 col-md-4 col-sm-6'><AirplanemodeActiveIcon style={{ color: "rgb(240, 101, 36)" }}  /> Vol A/R</span> : "" }
                                                    { tarif.transfert ? <span className='p-2 col-md-4 col-sm-6'><TransferWithinAStationIcon style={{ color: "rgb(240, 101, 36)" }}  /> Excursion</span> : "" }
                                                    { tarif.guide ? <span className='p-2 col-md-4 col-sm-6'><BoyIcon style={{ color: "rgb(240, 101, 36)" }}  /> Guide</span> : "" }
                                                </span>
                                            </p>
                                        </div>
                                        <div className='col-md-2 text-center p-3' style={{  textAlign: "center" }}>
                                            <p style={{ fontFamily: "Poppins", marginTop: ".5rem", marginBottom: ".5rem" }}>
                                                <span className='mobileSpan'><AttachMoneyIcon /> Prix :</span>
                                                <span>A partir 
                                                    <br />
                                                    <span style={{ color: "rgb(240, 101, 36)", fontWeight: "700" }} >{ tarif.single_prix } DH</span><sub>/Pers.</sub></span>
                                            </p>
                                        </div>
                                        <div className='col-md-2 text-center p-3' style={{  textAlign: "center" }}>
                                            {
                                                !tarif.epuisee ? 
                                                    <button className="btn btn-primary reserveButton" onClick={() => onReservation(tarif.id)}><BeenhereIcon /> Je réserve</button>
                                                    :
                                                    <button className="btn btn-primary reserveEduisee"><CancelIcon /> épuisée</button>
                                            }
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div ref={this.ref} className='tarifSelected mb-3'>
                        <div className={ (!this.state.show ? "d-none" : "") }>
                            <h3 className='galrieTitre'><AttachMoneyIcon style={{ fontSize: "40px" }}/> Tarifs</h3>
                            <div className='row webSpace'>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><SingleBedIcon /> Chambre single</h6>
                                </div>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><KingBedIcon /> Chambre double</h6>
                                </div>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><BedIcon /> Chambre triple</h6>
                                </div>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><ChildCareIcon /> Enfant 2-6 ans</h6>
                                </div>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><ChildCareIcon /> Enfant 6-12 ans</h6>
                                </div>
                                <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                                    <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><ChildFriendlyIcon /> Bébé</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><SingleBedIcon /> Chambre single :</span>
                                        { this.state.single_prix != null ? this.state.single_prix + " DH/pers" : "" }
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><KingBedIcon /> Chambre double :</span>
                                        { this.state.double_prix != null ? this.state.double_prix + " DH/pers" : "" }
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><BedIcon /> Chambre triple :</span>
                                        { this.state.triple_prix != null ? this.state.triple_prix + " DH/pers" : "" }
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildCareIcon /> Enfant 2-6 ans :</span>
                                        { this.state.premier_enfant != null ? this.state.premier_enfant + " DH/pers" : "" }
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildCareIcon /> Enfant 6-12 ans :</span>
                                        { this.state.deuxieme_enfant != null ? this.state.deuxieme_enfant + " DH/pers" : "" }
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildFriendlyIcon /> Bébé :</span>
                                        { this.state.bebe != null ? this.state.bebe + " DH/pers" : "" }
                                    </p>
                                </div>
                            </div>
                            <Reservation onChangeNbrChambre={this.onChangeNbrChambre} changeType={this.changeType} 
                                        onChangeAdults={this.onChangeAdults} onChangePremierEnfant={this.onChangePremierEnfant}
                                        onChangeDeuxiemeEnfant={this.onChangeDeuxiemeEnfant} onChangeBebe={this.onChangeBebe}
                                        reservation={this.state.reservation} nbrChambre={this.state.nbrChambre} total={this.state.total}
                                        dateDebart={this.state.dateDebart} dateRetour={this.state.dateRetour}
                                        duree={this.state.duree}
                                        onSubmitReservation={this.onSubmitReservation}/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h3 className="galrieTitre"><CollectionsIcon style={{ fontSize: "40px" }}/> Galerie</h3>
                        <div className="row">
                            {
                                (images != null) ? (
                                    images.map(function(item, i){
                                        return (<div key={i} className="col-md-4"><div style={{ backgroundImage: `url(${item.chemin})`, height: "200px", 
                                        backgroundPosition: "center", backgroundSize: "cover", marginBottom: "15px", borderRadius: "10px" }}></div></div>)
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
}

export default InfoGlobal
