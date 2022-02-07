import React from 'react'

function ProgramTab(props) {

    const { programs } = props;

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <h4 className="tabTitleProgramme pb-2">Programme</h4>
                </div>
                <div className="col-md-12">
                    {
                        (programs != null) ? 
                            programs.map(function(item, i){
                                return(
                                <div key={i} className="row">
                                    <div className="col-md-1">
                                        <h2 className="nbrJour">{item.jour_nbr}</h2>
                                        <span className="separator">
                                            <span className="separatorContent"></span>
                                        </span>
                                    </div>
                                    <div className="col-md-11">
                                        <h2 className="jourTitle">Jour {item.jour_nbr}: {item.jour_title}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    </div>
                                </div>
                                )
                            })
                        :("loading")
                    }
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

export default ProgramTab
