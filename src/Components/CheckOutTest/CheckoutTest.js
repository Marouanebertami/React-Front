import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import offerStyle from '../ComponentStyle/offers.module.css';
import { useForm, useFieldArray } from "react-hook-form";
import API from '../../apiUsers';
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { ErrorSharp } from '@mui/icons-material';

export default function CheckoutTest (props){

    const SignupSchema = yup.object().shape({
        nom: yup.string().required("test"),
        prenom: yup.string().required("test"),
        email: yup.string().required("test"),
        phone: yup.string().required("test"),
        cin: yup.string().required("test"),
        // reservation: yup.object().shape({
        //     nom: yup.string().required("test"),
        //     prenom: yup.string().required("test"),
        //     email: yup.string().required("test"),
        //     phone: yup.string().required("test"),
        //     cin: yup.string().required("test")
        // })
    });

    const { register, control, handleSubmit, setValue, errors } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const [redirect, setRedirect] = useState(false);

    const { fields, append, replace, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "reservation", // unique name for your Field Array
      });

    const onSubmit = (data) => {
        API.post(`/reservation`, data).then((response) => {
            const { data } = response
            if(data.succes){
                setRedirect(true);
            }
        });
    };

    const {
        tarifId,
        reservation,
        dateDebart,
        dateRetour,
        duree,
        total,
        nbrChambre
    } = props.location.state;

    useEffect(() => {
        let reservationFieldToAdd = [];
        reservation.map(item => {
            let infoVoyageur = [];
            for(let i=0;i<item.adults;i++){
                infoVoyageur.push({
                    nom: "",
                    prenom: "",
                    email: "",
                    phone: "",
                    cin: ""
                });
            }
            reservationFieldToAdd.push({
                id_tarif: tarifId,
                adults: item.adults,
                bebe: item.bebe,
                premierEnfant: item.premierEnfant,
                deuxiemeEnfant: item.deuxiemeEnfant,
                type: item.type,
                total: item.total,
                infoVoyageur: infoVoyageur
            })
        });

        replace(reservationFieldToAdd);
    }, reservation)

    if(redirect)
    {
        return (<Redirect to = {{
            pathname: '/confirm'
        }}/>)
    }
    
    return (
            <Container fluid>
                <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(http://127.0.0.1:8000/images/checkout.jpg)`}}>
                    <div className={offerStyle.offerTitleParent}>
                        <h2 className={offerStyle.offerTitle}>Checkout</h2>
                    </div>
                </div>
                <Container className="mt-5 mb-5">
                    <div className="row">
                        <div className='col-md-4' style={{fontFamily: "Poppins", borderRight: "1px solid #e5e5e5"}}>
                            <h5>Les détails de votre réservation</h5>
                            <div className='row'>
                                <div className='col-md-6 text-center'>
                                    <h5>Débart</h5>
                                    <p><FlightTakeoffIcon style={{ color: "rgb(240, 101, 36)" }} /> { dateDebart }</p>
                                </div>
                                <div className='col-md-6 text-center'>
                                    <h5>Retour</h5>
                                    <p><FlightLandIcon style={{ color: "rgb(240, 101, 36)" }} /> { dateRetour }</p>
                                </div>
                            </div>
                            <div>
                                <p>Durée totale :</p>
                                <span style={{ fontWeight: "700" }}>{ duree }</span>
                            </div>
                            <hr />
                        </div>
                        
                        <div className='col-md-8'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row' style={{fontFamily: "Poppins"}}>
                                    <input type="hidden" {...register("tarifId")} value={tarifId}/>
                                    <input type="hidden" {...register("total")} value={total}/>
                                    <input type="hidden" {...register("nbr_chambre")} value={nbrChambre}/>
                                    <h3 className='col-md-12 mb-4' style={{fontFamily: "Poppins"}}>
                                        <FactCheckIcon style={{ fontSize: "24px", color: "rgb(240, 101, 36)" }} /> Saisissez vos coordonnées
                                    </h3>
                                    <div className='col-md-6 form-group'>
                                        <label>Nom: </label>
                                        <input className={`${offerStyle.inputStyle} form-control`} {...register("nom")} placeholder='Nom...' autoComplete='off'/>
                                    </div>
                                    <div className='col-md-6 form-group'>
                                        <label>Prenom: </label>
                                        <input className={`${offerStyle.inputStyle} form-control`} {...register("prenom")} placeholder='Prenom...' autoComplete='off'/>
                                    </div>
                                    <div className='col-md-6 form-group'>
                                        <label>Email: </label>
                                        <input className={`${offerStyle.inputStyle} form-control`} {...register("email")} placeholder='Email...' autoComplete='off'/>
                                    </div>
                                    <div className='col-md-6 form-group'>
                                        <label>Phone: </label>
                                        <input className={`${offerStyle.inputStyle} form-control`} {...register("phone")} placeholder='Phone...' autoComplete='off'/>
                                    </div>
                                    <div className='col-md-6 form-group'>
                                        <label>C.I.N: </label>
                                        <input className={`${offerStyle.inputStyle} form-control`} {...register("cin")} placeholder='C.I.N...' autoComplete='off'/>
                                    </div>
                                </div>
                                <hr />

                                {
                                    fields.map((item, index) => {
                                        return (
                                            <div>
                                                <div className='col-md-12 text-center'>
                                                    <span style={{ fontFamily: "Poppins", fontSize: "20px" }}>
                                                        <BedroomChildIcon  style={{ color: "rgb(240, 101, 36)" }}/> {item.type}
                                                    </span>
                                                </div>
                                                
                                                {
                                                    item.infoVoyageur.map((itemVoyageur, indexVoyageur) => {
                                                        return (
                                                            <div className='row' style={{fontFamily: "Poppins"}}>
                                                                <div className='col-md-4 form-group'>
                                                                    <label>Nom: </label>
                                                                    <input className={`${offerStyle.inputStyle} form-control`} {...register(`reservation.${index}.infoVoyageur.${indexVoyageur}.nom`)} placeholder='Nom...' autoComplete='off'/>
                                                                </div>
                                                                <div className='col-md-4 form-group'>
                                                                    <label>Prenom: </label>
                                                                    <input className={`${offerStyle.inputStyle} form-control`} {...register(`reservation.${index}.infoVoyageur.${indexVoyageur}.prenom`)} placeholder='Prenom...' autoComplete='off'/>
                                                                </div>
                                                                <div className='col-md-4 form-group'>
                                                                    <label>Email: </label>
                                                                    <input className={`${offerStyle.inputStyle} form-control`} {...register(`reservation.${index}.infoVoyageur.${indexVoyageur}.email`)} placeholder='Email...' autoComplete='off'/>
                                                                </div>
                                                                <div className='col-md-4 form-group'>
                                                                    <label>Phone: </label>
                                                                    <input className={`${offerStyle.inputStyle} form-control`} {...register(`reservation.${index}.infoVoyageur.${indexVoyageur}.phone`)} placeholder='Phone...' autoComplete='off'/>
                                                                </div>
                                                                <div className='col-md-4 form-group'>
                                                                    <label>C.I.N: </label>
                                                                    <input className={`${offerStyle.inputStyle} form-control`} {...register(`reservation.${index}.infoVoyageur.${indexVoyageur}.cin`)} placeholder='C.I.N...' autoComplete='off'/>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <button className='btn btn-primary btn-valider' type='submit'><DoneOutlineIcon style={{ fontSize: "18px"}} /> Valider</button>
                            </form>
                        </div>
                    </div>
                </Container>
            </Container>
        )
}