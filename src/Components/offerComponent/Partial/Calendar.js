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
        redirectToForm: false
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
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d"); // Day of week 0...1..5...6
        return firstDay;
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
        if (this.state.showMonthTable == true) {
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
                return this.state.prixSingle * nbr
                break;
            case "double":
                return this.state.prixDouble * nbr
                break;
            case "triple":
                return this.state.prixTriple * nbr
                break;
        }
    }

    getMountType = (name) => {
        switch(name){
            case "single":
                return this.state.prixSingle
                break;
            case "double":
                return this.state.prixDouble
                break;
            case "triple":
                return this.state.prixTriple
                break;
        }
    }

    onChangeSelect = (e, name) => {
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
            this.setState({totalMount: false});
        }else{
            this.setState({totalMount: true});
        }
    };

    redirectToTest = () => {
        // if(this.state.totalMount){
            this.setState({redirectToForm: true});
        // }
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

        let weekdayshortname = this.weekdayshort.map(day => {
            return <th key={day} className="text-center text-capitalize">{day}</th>;
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="calendar-day empty">{""}</td>);
        }

        let daysReserve = [];
        this.props.tarifs.map((item, i) => {
            daysReserve.push({"date_depart" : item.depart, "id": item.id});
        })
        
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
                // let insertRow = cells.slice();
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
                        bebe={this.state.prixBebe} changeSelect={this.onChangeSelect}/>
                )}
                
                {
                    this.state.totalMount && (
                        <div className="col-md-12 pt-3 pb-3" style={{background: "#0d6aaf"}}>
                            <Table style={{color: "#fff"}}>
                                <thead>
                                    <tr>
                                        <th className="col-md-8">Description</th>
                                        <th>Prix/Pers</th>
                                        <th>Nombre Pres.</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.reservationItems != null ? 
                                            (
                                                this.state.reservationItems.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{item.name.toUpperCase()}</td>
                                                            <td>{item.mountPerPerssen} <sup>MAD</sup></td>
                                                            <td>x{item.nbr}</td>
                                                            <td>{item.total} <sup>MAD</sup></td>
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
