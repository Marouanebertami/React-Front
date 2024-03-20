import React, { Component } from "react";
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

class Reservation extends Component{

    constructor(props) {
        super(props);
    }

    dataSubmit = () => {
        console.log("test")
    }
    
    render(){
        return (
            <div className='mt-4'>
                <div className='form-group'>
                    <label>Nombre de chambre:</label>
                    <select onChange={(e) => {this.props.onChangeNbrChambre(e)}} className="form-control selectCustom">
                        <option value="1">1 Chambre</option>
                        <option value="2">2 Chambres</option>
                        <option value="3">3 Chambres</option>
                        <option value="4">4 Chambres</option>
                    </select>
                </div>
                <div className="row">
                    <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                        <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><SingleBedIcon /> Type chambre</h6>
                    </div>
                    <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                        <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><PersonIcon /> Adults</h6>
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
                    <div className='col-md-2' style={{  backgroundColor: "rgb(240, 101, 36)", textAlign: "center" }}>
                        <h6 style={{ fontFamily: "Poppins", color: "#fff", marginTop: ".5rem" }}><MonetizationOnIcon /> Total</h6>
                    </div>
                </div>
                {
                    this.props.reservation.map((item, index) => {
                        return (
                            <div key={index} className='row'>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><SingleBedIcon /> Type chambre :</span>
                                        <select className="form-control selectCustom" value={item.type}  onChange={e => this.props.changeType(e, item.key)}>
                                            <option key={0} value="SINGLE">Single</option>
                                            <option key={1} value="DOUBLE">Double</option>
                                            <option key={2} value="TRIPLE">Triple</option>
                                        </select>
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><PersonIcon /> Adults :</span>
                                        <select className="form-control selectCustom" value={item.adults}  onChange={e => this.props.onChangeAdults(e, item.key)}>
                                            <option key={4} value="1">1</option>
                                            <option key={5} value="2">2</option>
                                            <option key={16} value="3">3</option>
                                            <option key={17} value="4">4</option>
                                        </select>
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildCareIcon /> Enfant 2-6 ans : </span>
                                        <select className="form-control selectCustom" value={item.premierEnfant} onChange={e => this.props.onChangePremierEnfant(e, item.key)}>
                                            <option key={6} value="0">0</option>
                                            <option key={7} value="1">1</option>
                                            <option key={8} value="2">2</option>
                                        </select>
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildCareIcon /> Enfant 6-12 ans :</span>
                                        <select className="form-control selectCustom" value={item.deuxiemeEnfant} onChange={e => this.props.onChangeDeuxiemeEnfant(e, item.key)}>
                                            <option key={9} value="0">0</option>
                                            <option key={10} value="1">1</option>
                                            <option key={11} value="2">2</option>
                                        </select>
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><ChildFriendlyIcon /> Bébé :</span>
                                        <select className="form-control selectCustom" value={item.bebe} onChange={e => this.props.onChangeBebe(e, item.key)}>
                                            <option key={13} value="0">0</option>
                                            <option key={14} value="1">1</option>
                                            <option key={15} value="2">2</option>
                                        </select>
                                    </p>
                                </div>
                                <div className='col-md-2' style={{ textAlign: "center" }}>
                                    <p style={{ fontFamily: "Poppins", marginTop: ".5rem" }}>
                                        <span className='mobileSpan'><MonetizationOnIcon /> Total :</span>
                                        <span>{ item.total } DH</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="row mb-4 mt-2">
                    <div className="col-md-10 text-right textMontantTotal">Montant Total:</div>
                    <div className="col-md-2 text-center montantValue">{ this.props.total } DH</div>
                </div>
                <div className="row">
                    <div className="col-md-8"></div>
                    <button className="btn btn-primary btn-valider col-md-4" onClick={this.props.onSubmitReservation}><DoneOutlineIcon style={{ fontSize: "18px"}} /> Valider</button>
                </div>
            </div>
        )
    }
}

export default Reservation;