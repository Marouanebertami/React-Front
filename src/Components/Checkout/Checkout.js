import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Row, Col,
        Form, Table, Button } from 'react-bootstrap';
import offerStyle from '../ComponentStyle/offers.module.css';
import API from '../../apiUsers';
// import { ClipLoader } from "react-spinners";

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
            });
        }

        this.setState(newState)
    }

    // Create une fonction pour validation des inputs
    validation = (state) => {
        let newState = Object.assign({}, this.state)
        
        var hasError = false;
        if(state.reservation != null){
            state.reservation.map(item => {
                if(item.information_voyageur != null){
                    item.information_voyageur.map(info => {
                        if(info.nom == "" || info.nom == undefined){
                            info.nomError = "Nom est Obligatoire";
                            hasError = true;
                        }else{
                            info.nomError = "";
                        }

                        if(info.prenom == "" || info.prenom == undefined){
                            info.prenomError = "Prenom est Obligatoire";
                            hasError = true;
                        }else{
                            info.prenomError = "";
                        }
                    })
                }
            })
        }

        if(state.facture_Info != null){
            if(state.facture_Info.nom == "" || state.facture_Info.nom == undefined){
                state.facture_Info.nomError = "Nom est Obligatoire";
                hasError = true;
            }else{
                state.facture_Info.nomError = "";
            }

            if(state.facture_Info.prenom == "" || state.facture_Info.prenom == undefined){
                state.facture_Info.prenomError = "Prenom est Obligatoire";
                hasError = true;
            }else{
                state.facture_Info.prenomError = "";
            }

            if(state.facture_Info.email == "" || state.facture_Info.email == undefined){
                state.facture_Info.emailError = "Email est Obligatoire";
                hasError = true;
            }else{
                state.facture_Info.prenomError = "";
            }

            if(state.facture_Info.phone == "" || state.facture_Info.phone == undefined){
                state.facture_Info.phoneError = "Téléphone est Obligatoire";
                hasError = true;
            }else{
                state.facture_Info.prenomError = "";
            }
        }

        this.setState(state)
        if(hasError){
            return false;
        }
        return true;
    }

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

    render() {

        if(this.props.location.state == undefined){
            return (<Redirect to = {{
                pathname: '/404',
            }}/>)
        }

        const override = `
                display: block;
                margin: 0 auto;
                border-color: red;
            `;
        const loading = true;
        const color = "#000"
        return (
            <Container fluid>
                {/* <div style={{position: "fixed", height: "100%", width: "100%", top: "0"}}>
                    <div style={{position: "relative", height: "100%"}}>
                        <ClipLoader color={color} loading={loading} css={override} size={150} />
                    </div>
                </div> */}
                <div className={offerStyle.offerVueParent} style={{backgroundImage: `url(http://127.0.0.1:8000/images/checkout.jpg)`}}>
                    <div className={offerStyle.offerTitleParent}>
                        <h2 className={offerStyle.offerTitle}>Checkout</h2>
                    </div>
                </div>
                <Container className="mt-5 mb-5">
                    <Form onSubmit={(e) => this.handelSubmit(e)}>
                        <Row>
                            <Col md={8}>
                                <Col md={12}>
                                    <h5 className={offerStyle.checkoutTitles}>
                                        <span className={offerStyle.checkoutTitlesSpan}>1</span> Informations de facturation
                                    </h5>
                                </Col>
                                <div className="mr-3 ml-3">
                                    <Row className="mt-5">
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>Civilité</Form.Label>
                                                <Form.Control as="select"
                                                    defaultValue={this.state.facture_Info.civilite}
                                                    onChange={this.handelFactureInfoCivilite}>
                                                    <option value="">Civilité</option>
                                                    <option value="M.">M.</option>
                                                    <option value="Mme">Mme</option>
                                                </Form.Control>
                                            </Form.Group >
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>Prénom*</Form.Label>
                                                <Form.Control type="text" 
                                                    value={this.state.facture_Info.prenom}
                                                    onChange={this.handelFactureInfoPrenom}
                                                    placeholder="Prénom"/>
                                                {
                                                    (this.state.facture_Info.prenomError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{this.state.facture_Info.prenomError}</Form.Label>) : ""
                                                }
                                            </Form.Group >
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>Nom*</Form.Label>
                                                <Form.Control type="text" 
                                                    value={this.state.facture_Info.nom} 
                                                    placeholder="Nom"
                                                    onChange={this.handelFactureInfoNom}/>
                                                {
                                                    (this.state.facture_Info.nomError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{this.state.facture_Info.nomError}</Form.Label>) : ""
                                                }
                                            </Form.Group >
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>E-mail*</Form.Label>
                                                <Form.Control type="text"
                                                    value={this.state.facture_Info.email}
                                                    onChange={this.handelFactureInfoEmail}
                                                    placeholder="E-mail"/>
                                                {
                                                    (this.state.facture_Info.emailError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{this.state.facture_Info.emailError}</Form.Label>) : ""
                                                }
                                            </Form.Group >
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>Confirmer E-mail</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="Confirmer E-mail"/>
                                            </Form.Group >
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group >
                                                <Form.Label>Téléphone*</Form.Label>
                                                <Form.Control type="text"
                                                    value={this.state.facture_Info.phone}
                                                    onChange={this.handelFactureInfoPhone}
                                                    placeholder="Téléphone"/>
                                                {
                                                    (this.state.facture_Info.phoneError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{this.state.facture_Info.phoneError}</Form.Label>) : ""
                                                }
                                            </Form.Group >
                                        </Col>
                                    </Row>
                                    
                                </div>
                                <hr/>
                                <Col md={12} className="mt-4">
                                    <h5 className={offerStyle.checkoutTitles}>
                                        <span className={offerStyle.checkoutTitlesSpan}>2</span> Informations des Voyageurs
                                    </h5>
                                </Col>
                                {
                                    (this.state.reservation != null) ? 
                                    this.state.reservation.map((item, i) => {
                                        return ((item.information_voyageur != null) ? item.information_voyageur.map((itemVoy, j) => {
                                            return (
                                                <div Key={i} className="mr-3 ml-3">
                                                    
                                                    <Row className="mt-5">
                                                        <Col md={4}>
                                                            <Form.Group >
                                                                <Form.Label>Civilité</Form.Label>
                                                                <Form.Control as="select"
                                                                    defaultValue={itemVoy.civilite}
                                                                    onChange={(e) => this.handelVayageurCivilite(e, i, j)}>
                                                                    <option value="">Civilité</option>
                                                                    <option value="M.">M.</option>
                                                                    <option value="Mme">Mme</option>
                                                                </Form.Control>
                                                            </Form.Group >
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group >
                                                                <Form.Label>Prénom*</Form.Label>
                                                                <Form.Control type="text"
                                                                    onChange={(e) => this.handelVayageurPrenom(e, i, j)}
                                                                    placeholder="Prénom"
                                                                    value={itemVoy.prenom}/>
                                                                {
                                                                    (itemVoy.prenomError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{itemVoy.prenomError}</Form.Label>) : ""
                                                                }
                                                            </Form.Group >
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group >
                                                                <Form.Label>Nom*</Form.Label>
                                                                <Form.Control type="text"
                                                                    onChange={(e) => this.handelVayageurNom(e, i, j)}
                                                                    placeholder="Nom"
                                                                    value={itemVoy.nom}/>
                                                                {
                                                                    (itemVoy.nomError != "") ? (<Form.Label style={{ display: "block" }} className="invalid-feedback">{itemVoy.nomError}</Form.Label>) : ""
                                                                }
                                                            </Form.Group >
                                                        </Col>
                                                    </Row>
                                                    
                                                </div>
                                            )
                                        }): "")
                                        
                                    }) : ""
                                }
                            </Col>
                            <Col md={4}>
                                <Col md={12}>
                                    <h5 className={offerStyle.checkoutTitles}>
                                        <span className={offerStyle.checkoutTitlesSpan}>3</span> Résumé de la réservation
                                    </h5>
                                </Col>
                                <Col md={12} className="m-0 mt-5 mb-5">
                                    <label className={offerStyle.spaceShowVoyageurTitle}>Voyageurs</label>
                                    <div className="p-3" style={{backgroundColor: "#dddcdc", borderRadius: "5px", fontFamily: "Poppins"}}>
                                        {
                                            (this.state.reservation != null) ? 
                                            this.state.reservation.map((item, i) => {
                                                return (
                                                    (item.information_voyageur != null) ?
                                                        item.information_voyageur.map((itemVoy, j) => {
                                                            if(itemVoy.civilite != "" || itemVoy.nom != "" || itemVoy.prenom != ""){
                                                                return (<p>{itemVoy.civilite} {itemVoy.prenom} {itemVoy.nom}</p>)
                                                            }
                                                        }): ""
                                                    
                                                )
                                            }) : ""
                                        }
                                    </div>
                                </Col>
                                <Col md={12} className="m-0 mt-5 mb-5">
                                    <label className={offerStyle.spaceShowVoyageurTitle}>information de facturation</label>
                                    <div className="p-3" style={{backgroundColor: "#dddcdc", borderRadius: "5px", fontFamily: "Poppins"}}>
                                        <p>{this.state.facture_Info.civilite} {this.state.facture_Info.prenom} {this.state.facture_Info.nom}</p>
                                        <p>{this.state.facture_Info.email}</p>
                                        <p>{this.state.facture_Info.phone}</p>
                                    </div>
                                </Col>
                                <Col md={12} className="m-0 mt-5 mb-5">
                                    <div className="p-3" style={{backgroundColor: "#dddcdc", borderRadius: "5px", fontFamily: "Poppins"}}>
                                        <p>Détails Résèrvation:</p>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th className="col-md-8">Description</th>
                                                    <th>Prix</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (this.state.reservation != null) ? 
                                                    this.state.reservation.map((item, i) => {
                                                        return (<tr key={i}>
                                                                        <td>{item.name} pour {item.nbr} Pers</td>
                                                                        <td>{item.total} <sup>MAD</sup></td>
                                                                    </tr>)
                                                    }) : ""
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <Button variant="primary" type="submit" className={offerStyle.btnReservation}>Confirmer Resérvation</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>
        )
    }
}

export default Checkout
