import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container } from 'react-bootstrap';
import offerStyle from '../ComponentStyle/offers.module.css';
import API from '../../apiUsers';
import { CheckOutForm } from './Forms';

class Checkout extends Component {

    state = {
        id_tarif: null,
        reservation: null,
        facture_Info: {
            civilite: "",
            nom: "",
            prenom: "",
            email: "",
            phone: "",
            nomError: "",
            prenomError: "",
            emailError: "",
            phoneError: ""
        }
    }

    componentDidMount = async () => {
        const {
            reservation,
            id
        } = this.props.location.state

        let newState = Object.assign({}, this.state)
        newState.reservation = reservation
        newState.id_tarif = id;

        
        if(reservation != null){
            reservation.map((item, i) => {
                let voyageurs_info = [];
                for(let j=1;j<=item.nbr;j++){
                    voyageurs_info[j-1] = {
                        civilite: "",
                        nom: "",
                        prenom: "",
                        nomError: "",
                        prenomError: "",
                    }
                }
                item["information_voyageur"] = voyageurs_info;
                return item["information_voyageur"];
            });
        }

        this.setState(newState)
        console.log(newState)
    }

    // Create une fonction pour validation des inputs
    

    handelSubmit = (e) => {
        e.preventDefault();
        let reservation = {
            "id_tarif": this.state.id_tarif,
            "reservation_details": this.state.reservation,
            "information_facture": this.state.facture_Info
        };

        if(this.validation(this.state)){
            API.post(`/resevation`, reservation).then((response) => {
                const { data } = response
                if(data.succes){
                    this.props.history.push("/confirm");
                }
            });
        }
    }

    handelVayageurCivilite = (e, i, j) => {
        let newState = Object.assign({}, this.state)
        newState.reservation[i].information_voyageur[j].civilite = e.target.value
        this.setState(newState)
    }

    handelVayageurPrenom = (e, i, j) => {
        let newState = Object.assign({}, this.state)
        newState.reservation[i].information_voyageur[j].prenom = e.target.value
        this.setState(newState)
    }

    handelVayageurNom = (e, i, j) => {
        let newState = Object.assign({}, this.state)
        newState.reservation[i].information_voyageur[j].nom = e.target.value
        this.setState(newState)
    }

    handelFactureInfoCivilite = (e) => {
        let newState = Object.assign({}, this.state)
        newState.facture_Info.civilite = e.target.value
        this.setState(newState);
    }

    handelFactureInfoNom = (e) => {
        let newState = Object.assign({}, this.state)
        newState.facture_Info.nom = e.target.value
        this.setState(newState);
    }

    handelFactureInfoPrenom = (e) => {
        let newState = Object.assign({}, this.state)
        newState.facture_Info.prenom = e.target.value
        this.setState(newState);
    }

    handelFactureInfoEmail = (e) => {
        let newState = Object.assign({}, this.state)
        newState.facture_Info.email = e.target.value
        this.setState(newState);
    }

    handelFactureInfoPhone = (e) => {
        let newState = Object.assign({}, this.state)
        newState.facture_Info.phone = e.target.value
        this.setState(newState);
    }

    handelSubmitFormTest = (data) => {
        console.log(data)
    }

    render() {

        if(this.props.location.state === undefined){
            return (<Redirect to = {{
                pathname: '/404',
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
                    <CheckOutForm sendForm={this.handelSubmitFormTest} reservation={this.state.reservation} id_tarif={this.state.id_tarif} />
                </Container>
            </Container>
        )
    }
}

export default Checkout
