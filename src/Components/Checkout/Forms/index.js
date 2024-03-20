import React, { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { buttonConfirm, spanNbr, formCheckOut, formInputs } from './FormsStyle.module.scss';

export function CheckOutForm(props){
    const { reservation, id_tarif } = props;
    
    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Yup.object().shape({
            id_tarif: Yup.number().required('ce champ est obligatoire'),
            reservation_detail: Yup.array().of(
                Yup.object().shape({
                    reservation_pre_id: Yup.number(),
                    mountPerPerssan: Yup.number(),
                    chambre_type: Yup.string(),
                    nbr_persson: Yup.number(),
                    total: Yup.number(),
                })
            ).required(),
            civilite: Yup.string().required('ce champ est obligatoire'),
            nom: Yup.string().required('ce champ est obligatoire'),
            prenom: Yup.string().required('ce champ est obligatoire'),
            email: Yup.string().required('ce champ est obligatoire').email("ce champ est invalide"),
            phone: Yup.string().required('ce champ est obligatoire'),
            voyageur_info: Yup.array().of(
                Yup.object().shape({
                    reservation_pre_id: Yup.number().required('ce champ est obligatoire'),
                    civilite: Yup.string().required('ce champ est obligatoire'),
                    nom: Yup.string().required('ce champ est obligatoire'),
                    prenom: Yup.string().required('ce champ est obligatoire')
                })
            ).required()
        }))
    });

    const { fields: VoyageurInfoFields,
            append: VoyageurInfoAppend,
            remove: VoyageurInfoRemove 
        } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "voyageur_info", // unique name for your Field Array
    });

    const { fields: ReservationDetailFields,
            append: ReservationDetailAppend,
            remove: ReservationDetailRemove 
        } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "reservation_detail", // unique name for your Field Array
    });

    const civilite = useWatch({
        control,
        name: "civilite",
    });

    useEffect(() => {
        setValue('id_tarif', id_tarif, { shouldValidate: false });
        var nbrPlace = 0;
        if(reservation != null){
            reservation.map((item) => {
                nbrPlace += parseInt(item.nbr);
                return nbrPlace;
            });

            reservation.map((item, index) => {
                // const newResVal = reservation.length;
                // const oldResVal = ReservationDetailFields.length;
                return ReservationDetailAppend({
                    reservation_pre_id: index,
                    mountPerPerssan: item.mountPerPerssan,
                    chambre_type: item.name,
                    nbr_persson: item.nbr,
                    total: item.total,
                });
                
            });
        }
        
        const newVal = parseInt(nbrPlace);
        const oldVal = VoyageurInfoFields.length;

        if (newVal > oldVal) {
            // append tickets to field array
            for (let i = oldVal; i < newVal; i++) {
                VoyageurInfoAppend({ reservation_pre_id: 1, civilite: '', nom: '', prenom: '' });
            }
        } else {
            // remove tickets from field array
            for (let i = oldVal; i > newVal; i--) {
                VoyageurInfoRemove(i - 1);
            }
        }
        
    }, [reservation])

    const sendForm = (data) => {
        props.sendForm(data);
    }

    return (
        <div>
            <form className={formCheckOut} onSubmit={handleSubmit(sendForm)}>
                <Row>
                    <Col md={8}>
                        <Col md={12}>
                            <h5>
                                <span className={spanNbr}>1</span> Informations de facturation
                            </h5>
                        </Col>
                        <div className="mr-3 ml-3">
                            <Row className="mt-5">
                                <Col key={0} md={6}>
                                    <Form.Group >
                                        <Form.Label>Civilité*: { civilite }</Form.Label>
                                        <select {...register("civilite")} className={`form-control ${formInputs} ${errors.civilite ? 'is-invalid' : ''}`} >
                                            <option key="0" value="">Civilité</option>
                                            <option key="1" value="M.">M.</option>
                                            <option key="2" value="Mme">Mme</option>
                                        </select>
                                        { errors.civilite != null && <label className='text-danger'>{ errors.civilite?.message }</label> }
                                    </Form.Group >
                                </Col>
                                <Col key={1} md={6}>
                                    <Form.Group >
                                        <Form.Label>Prénom*:</Form.Label>
                                        <input {...register("prenom")} className={`form-control ${formInputs} ${errors.prenom ? 'is-invalid' : ''}`} placeholder='Prénom' autoComplete='off'/>
                                        { errors.prenom != null && <label className='text-danger'>{ errors.prenom?.message }</label> }
                                    </Form.Group >
                                </Col>
                                <Col key={2} md={6}>
                                    <Form.Group >
                                        <Form.Label>Nom*:</Form.Label>
                                        <input {...register("nom")} className={`form-control ${formInputs} ${errors.nom ? 'is-invalid' : ''}`} placeholder='Nom' autoComplete='off'/>
                                        { errors.nom != null && <label className='text-danger'>{ errors.nom?.message }</label> }
                                    </Form.Group >
                                </Col>
                                <Col key={3} md={6}>
                                    <Form.Group >
                                        <Form.Label>E-mail*:</Form.Label>
                                        <input {...register("email")} className={`form-control ${formInputs} ${errors.email ? 'is-invalid' : ''}`} placeholder='Email' autoComplete='off'/>
                                        { errors.email != null && <label className='text-danger'>{ errors.email?.message }</label> }
                                    </Form.Group >
                                </Col>
                                <Col key={4} md={6}>
                                    <Form.Group >
                                        <Form.Label>Confirmer E-mail</Form.Label>
                                    </Form.Group >
                                </Col>
                                <Col key={5} md={6}>
                                    <Form.Group >
                                        <Form.Label>Téléphone*:</Form.Label>
                                        <input {...register("phone")} className={`form-control ${formInputs} ${errors.phone ? 'is-invalid' : ''}`} placeholder='Téléphone' autoComplete='off'/>
                                        { errors.phone != null && <label className='text-danger'>{ errors.phone?.message }</label> }
                                    </Form.Group >
                                </Col>
                            </Row>
                            
                        </div>
                        <hr/>
                        <Col md={12} className="mt-4">
                            <h5>
                                <span className={spanNbr}>2</span> Informations des Voyageurs
                            </h5>
                        </Col>
                        {VoyageurInfoFields.map((field, index) => {
                            return(
                                <div key={field.id} className="mr-3 ml-3">
                                    <Row key={index} className="mt-5">
                                        <Col key={0} md={4}>
                                            <Form.Group >
                                                <Form.Label>Civilité*:</Form.Label>
                                                <select {...register(`voyageur_info.${index}.civilite`)} className={`form-control ${formInputs} ${(errors.voyageur_info != undefined && errors.voyageur_info[index].civilite) ? 'is-invalid' : ''}`} >
                                                    <option key="0" value="">Civilité</option>
                                                    <option key="1" value="M.">M.</option>
                                                    <option key="2" value="Mme">Mme</option>
                                                </select>
                                                { (errors.voyageur_info != undefined && errors.voyageur_info[index].civilite != null) && <label className='text-danger'>{ errors.voyageur_info[index].civilite.message }</label> }
                                            </Form.Group >
                                        </Col>
                                        <Col key={1} md={4}>
                                            <Form.Group >
                                                <Form.Label>Prénom*:</Form.Label>
                                                <input {...register(`voyageur_info.${index}.prenom`)} className={`form-control ${formInputs} ${(errors.voyageur_info != undefined && errors.voyageur_info[index].prenom) ? 'is-invalid' : ''}`} placeholder='Prénom' autoComplete='off'/>
                                                { (errors.voyageur_info != undefined && errors.voyageur_info[index].prenom != null) && <label className='text-danger'>{ errors.voyageur_info[index].prenom.message }</label> }
                                            </Form.Group >
                                        </Col>
                                        <Col key={2} md={4}>
                                            <Form.Group >
                                                <Form.Label>Nom*:</Form.Label>
                                                <input {...register(`voyageur_info.${index}.nom`)} className={`form-control ${formInputs} ${(errors.voyageur_info != undefined && errors.voyageur_info[index].nom) ? 'is-invalid' : ''}`} placeholder='Nom' autoComplete='off'/>
                                                { (errors.voyageur_info != undefined && errors.voyageur_info[index].nom != null) && <label className='text-danger'>{ errors.voyageur_info[index].nom.message }</label> }
                                            </Form.Group >
                                        </Col>
                                    </Row>
                                </div>
                                )
                        })}
                    </Col>
                    <Col md={4}>
                        <Col md={12}>
                            <h5>
                                <span className={spanNbr}>3</span> Résumé de la réservation
                            </h5>
                        </Col>
                        <Col md={12} className="m-0 mt-5 mb-5">
                            
                        </Col>
                        <Col md={12} className="m-0 mt-5 mb-5">
                            
                        </Col>
                        <Col md={12} className="m-0 mt-5 mb-5">
                            
                        </Col>
                        <Col md={12}>
                            <Button className={buttonConfirm} variant="primary" type="submit">Confirmer Resérvation</Button>
                        </Col>
                    </Col>
                </Row>
            </form>
        </div>
    )
}