import React from 'react'
import MainDestination from './MainDestination'
import SearchForm from './Search'
import Slider from './Slider'

function Home() {
    return (
        <div>
            <Slider />
            <SearchForm />
            <MainDestination />
        </div>
    )
}

export default Home;
