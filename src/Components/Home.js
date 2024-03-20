import React from 'react';
import MainDestination from './MainDestination';
import Slider from './Slider';
import {Helmet} from "react-helmet";

function Home() {

    return (
        <div>
            <Slider />
            <MainDestination />
            <Helmet>
                <meta charSet="utf-8" />
                <title>Accueil - Follow me travel</title>
                <meta name="description" content="Follow Me travel" />
                <link rel="canonical" href="#" />
            </Helmet>
        </div>
    )
}

export default Home;
