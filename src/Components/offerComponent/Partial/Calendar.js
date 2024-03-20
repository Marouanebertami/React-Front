import React, { Component } from 'react'
import moment from 'moment';
import { Redirect } from "react-router-dom";
import 'moment/locale/fr';
import Chambres from './Chambres';
import { Table } from 'react-bootstrap' 

class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    weekdayshort = moment.weekdaysShort();
    state = {
        showCalendarTable: true,
        showMonthTable: false,
        dateObject: moment(),
        allmonths: moment.months(),
        showYearNav: false,
        tarifIdSelected: null,
        showTarif: false,
        prixSingle: null,
        prixDouble: null,
        prixTriple: null,
        prixPremierEnfant: null,
        prixDeuxiemeEnfant: null,
        prixBebe: null,
        reservationItems: [],
        totalMount: false,
        redirectToForm: false,
        doubleOrTriple:false
    };

    //get Days in Month
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };

    // get Year
    year = () => {
        return this.state.dateObject.format("Y");
    };

    // get la date du jour
    currentDay = () => {
        return this.state.dateObject.format("D");
    };

    // get premier jour du mois 
    firstDayOfMonth = () => {
        return moment(this.state.dateObject)
            .startOf("month")
            .format("d");
    };

    // get Mois
    month = () => {
        return this.state.dateObject.format("MMMM");
    };

    thisMonth = () => {
        return this.state.dateObject.format("MM");
    }

    showMonth = (e, month) => {
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showCalendarTable: !this.state.showCalendarTable
        });
    };
    setMonth = month => {
        let monthNo = this.state.allmonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showCalendarTable: !this.state.showCalendarTable
        });
    };

    onNext = () => {
        let curr = "";
        if (this.state.showMonthTable) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.add(1, curr)
        });
    };

    onPrev = () => {
        let curr = "";
        if (this.state.showMonthTable == true) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
    };

    onDayClick = (e, idTarif) => {
        let tarifSelected = this.props.tarifs.find(item => {
            return item.id == idTarif
        });
        
        if(tarifSelected != null){
            this.setState(
                {
                    tarifIdSelected: idTarif,
                    showTarif: true,
                    prixSingle: tarifSelected.single,
                    prixDouble: tarifSelected.double,
                    prixTriple: tarifSelected.triple,
                    prixPremierEnfant: tarifSelected.premier_enfant,
                    prixDeuxiemeEnfant: tarifSelected.deuxieme_enfant,
                    prixBebe: tarifSelected.bebe
                }
            );
        }
    };

    countMount = (name, nbr) => {
        switch(name){
            case "single":
                return this.state.prixSingle * nbr;
            case "double":
                return this.state.prixDouble * nbr;
            case "triple":
                return this.state.prixTriple * nbr;
            case "premierEnfant":
                return this.state.prixPremierEnfant * nbr;
            case "dexiemeEnfant":
                return this.state.prixDeuxiemeEnfant * nbr;
        }
    }

    getMountType = (name) => {
        switch(name){
            case "single":
                return this.state.prixSingle;
            case "double":
                return this.state.prixDouble;
            case "triple":
                return this.state.prixTriple;
            case "premierEnfant":
                return this.state.prixPremierEnfant;
            case "dexiemeEnfant":
                return this.state.prixDeuxiemeEnfant;
        }
    }

    onChangeSelect = (e, name) => {

        let hasDoubleOrTriple = false;
        if(this.state.reservationItems != null && this.state.reservationItems != undefined 
            && this.state.reservationItems.length != 0){
            this.state.reservationItems.map(item => {
                if(item.name === "double" || item.name === "triple"){
                    hasDoubleOrTriple = true;
                }
            });
        }
        
        if(!hasDoubleOrTriple || this.state.reservationItems.length == 0){
            if((name === "double" || name === "triple") && e.target.value > 0){
                this.setState({doubleOrTriple: true});
            }else{
                this.setState({doubleOrTriple: false});
            }
        }

        let reservationSelected = this.state.reservationItems.find(item => {
            return item.name == name
        });
        if(reservationSelected == undefined || reservationSelected == null){
            this.state.reservationItems.push({
                name: name,
                nbr: e.target.value,
                total: this.countMount(name, e.target.value),
                mountPerPerssen: this.getMountType(name)
            });
        }else{
            if(e.target.value == 0){
                this.state.reservationItems = this.state.reservationItems.filter(item => {
                    return item.name != name
                })
            }else{
                reservationSelected.nbr = e.target.value
                reservationSelected.total = this.countMount(name, e.target.value)
                reservationSelected.mountPerPerssen = this.getMountType(name)
            }
        }

        if(this.state.reservationItems.length == 0){
            this.setState({doubleOrTriple: false});
        }
        
        if(this.state.reservationItems.length == 0){
            this.setState({totalMount: false});
        }else{
            this.setState({totalMount: true});
        }
    };

    redirectToTest = () => {
        this.setState({redirectToForm: true});
    }

    render() {

        if(this.state.redirectToForm){
            return (<Redirect to = {{
                                        pathname: '/checkout',
                                        state: {
                                            id: this.state.tarifIdSelected,
                                            reservation: this.state.reservationItems
                                        }
                                    }}/>)
        }

        let weekdayshortname = this.weekdayshort.map((day, i) => {
            return <th key={day+i} className="text-center text-capitalize">{day}</th>;
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i} className="calendar-day empty">{""}</td>);
        }

        let daysReserve = [];
        if(this.props.tarifs != null){
            this.props.tarifs.map((item, i) => {
                daysReserve.push({"date_depart" : item.depart, "id": item.id});
            });
        }
        
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let currentDay = (d == this.currentDay()) ? "today" : "";
            let dateToShow = "";
            if(d<=9){
                dateToShow = this.year() + "-" + this.thisMonth() + "-0" + d;
            }else{
                dateToShow = this.year() + "-" + this.thisMonth() + "-" + d;
            }

            let dateReserved = daysReserve.find(item => {
                return item.date_depart == dateToShow
            })
            
            let dateThis = dateReserved != undefined ? "hasTarif" : "";
            let tarifId = dateReserved != undefined ? dateReserved.id : null;
            daysInMonth.push(
                <td key={d} className={`text-center calendar-day ${currentDay} ${dateThis}`}>
                    <span
                        onClick={e => dateReserved != undefined ? this.onDayClick(e, tarifId) : () => false }
                    >
                        {d}
                    </span>
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        let daysinmonth = rows.map((d, i) => {
            return <tr key={i}>{d}</tr>;
        });

        return (
            <div className="col-md-12">
                <div className="row mr-0 ml-0 mb-5" style={{borderRadius: "30px",overflow: "hidden"}}>
                    <div className="col-md-4 calendarYearMonthDiv">
                        <h4 className="calendarYearMonthLabel text-uppercase">
                            {this.month()} {this.year()}
                        </h4>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn" style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", border: "2px solid rgba(255, 255, 255, 0.73)",paddingLeft: "30px",paddingRight: "30px"}} onClick={e => {this.onPrev()}}>Prev</button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn" style={{color: "#fff", fontFamily: "Poppins", fontWeight: "700", border: "2px solid rgba(255, 255, 255, 0.73)",paddingLeft: "30px",paddingRight: "30px"}} onClick={e => {this.onNext()}}>Next</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {this.state.showCalendarTable && (
                            <div className="calendar-date">
                                <table className="table calendar-day">
                                    <thead>
                                        <tr>{weekdayshortname}</tr>
                                    </thead>
                                    <tbody>{daysinmonth}</tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                {this.state.showTarif && (
                    
                    <Chambres single={this.state.prixSingle} double={this.state.prixDouble} triple={this.state.prixTriple} 
                        premierEnfant={this.state.prixPremierEnfant} deuxiemeEnfant={this.state.prixDeuxiemeEnfant} 
                        bebe={this.state.prixBebe} changeSelect={this.onChangeSelect} doubleOrTriple={this.state.doubleOrTriple}/>
                )}
                
                {
                    this.state.totalMount && (
                        <div className="col-md-12 pt-3 pb-3" style={{background: "#0d6aaf"}}>
                            <Table style={{color: "#fff"}}>
                                <thead>
                                    <tr>
                                        <th key="0" className="col-md-8">Description</th>
                                        <th key="1">Prix/Pers</th>
                                        <th key="2">Nombre Pres.</th>
                                        <th key="3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.reservationItems != null ? 
                                            (
                                                this.state.reservationItems.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td key={i+0}>{item.name.toUpperCase()}</td>
                                                            <td key={i+1}>{item.mountPerPerssen} <sup>MAD</sup></td>
                                                            <td key={i+2}>x{item.nbr}</td>
                                                            <td key={i+3}>{item.total} <sup>MAD</sup></td>
                                                        </tr>
                                                    )
                                                })
                                            ) : 'Noting To Show'
                                    }
                                </tbody>
                            </Table>
                            <button className="btn" style={{width: "100%", color: "rgb(13, 106, 175)", backgroundColor: "#fff"}} onClick={this.redirectToTest}>Résérver</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Calendar
