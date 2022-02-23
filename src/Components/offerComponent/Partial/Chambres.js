import React from 'react'

function Chambres(props) {
    return (
        <div className="col-md-12 mb-5">
            <div className="row" style={{backgroundColor: "#0d6aaf", padding: "15px"}}>
                <div className="form-group col-md-3" style={{marginBottom: "2rem",marginTop: "1rem"}}>
                    <label style={{fontFamily: "Poppins", fontWeight: "700", color: "#fff"}}>Single:</label>
                    <select className="form-control" style={{borderRadius: 0}} onChange={(e) => props.changeSelect(e, 'single')}>
                        <option key="0" value="0">0</option>
                        <option key="1" value="1">1</option>
                        <option key="2" value="2">2</option>
                        <option key="3" value="3">3</option>
                    </select>
                </div>
                <div className="form-group col-md-3" style={{marginBottom: "2rem",marginTop: "1rem"}}>
                    <label style={{fontFamily: "Poppins", fontWeight: "700", color: "#fff"}}>Double:</label>
                    <select className="form-control" style={{borderRadius: 0}} onChange={(e) => props.changeSelect(e, 'double')}>
                    <option key="0" value="0">0</option>
                        <option key="1" value="1">1</option>
                        <option key="2" value="2">2</option>
                        <option key="3" value="3">3</option>
                    </select>
                </div>
                <div className="form-group col-md-3" style={{marginBottom: "2rem",marginTop: "1rem"}}>
                    <label style={{fontFamily: "Poppins", fontWeight: "700", color: "#fff"}}>Triple:</label>
                    <select className="form-control" style={{borderRadius: 0}} onChange={(e) => props.changeSelect(e, 'triple')}>
                    <option key="0" value="0">0</option>
                        <option key="1" value="1">1</option>
                        <option key="2" value="2">2</option>
                        <option key="3" value="3">3</option>
                    </select>
                </div>
                {
                    props.doubleOrTriple ? 
                        <div className="form-group col-md-3" id="premierEnfant" style={{marginBottom: "2rem",marginTop: "1rem"}}>
                            <label style={{fontFamily: "Poppins", fontWeight: "700", color: "#fff"}}>Premier Enfant:</label>
                            <select className="form-control" style={{borderRadius: 0}} onChange={(e) => props.changeSelect(e, 'premierEnfant')}>
                            <option key="0" value="0">0</option>
                            <option key="1" value="1">1</option>
                            <option key="2" value="2">2</option>
                            </select>
                        </div>
                    : ""
                }
                <div className="form-group col-md-3"></div>
                <div className="form-group col-md-3"></div>
                <div className="form-group col-md-3"></div>
                {
                    props.doubleOrTriple ? 
                        <div className="form-group col-md-3" id="deuxiemeEnfant" style={{marginBottom: "2rem",marginTop: "1rem"}}>
                            <label style={{fontFamily: "Poppins", fontWeight: "700", color: "#fff"}}>Deuxieme Enfant:</label>
                            <select className="form-control" style={{borderRadius: 0}} onChange={(e) => props.changeSelect(e, 'dexiemeEnfant')}>
                            <option key="0" value="0">0</option>
                            <option key="1" value="1">1</option>
                            <option key="2" value="2">2</option>
                            </select>
                        </div>
                    : ""
                }
                
                
            </div>
            {/* <h3>Supplement</h3> */}
        </div>
    )
}

export default Chambres
