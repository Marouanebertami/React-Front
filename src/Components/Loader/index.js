import React from 'react'

function Loader(props){
    if(props.is_loading){
        return <div className='loader'></div>;
    }

    return "";
}

export default Loader;