import React, { Component } from 'react'

class Confirmation extends Component {
    
    render() {
        return (
        <div className='container text-center' style={{ paddingBottom: "100px", paddingTop: "100px" }}>
            <h3 style={{ fontFamily: "Poppins",fontWeight: "700",fontSize: "100px",color: "#dc6f2c" }}>Merci</h3>
            <p style={{fontFamily: "Poppins",fontWeight: "500",fontSize: "20px"}}>
                Nous Vous remercions pour votre intérêt à notre entité,<br />
                nous vous informons que votre réservation est prise en considération.<br />
                Vous recevait un email de confirmation dans quelques instants
            </p>
        </div>)
    }
}

export default Confirmation