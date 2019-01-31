import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './index';
import './../styles.css';


const LocationList = ({ cities, onSelectedLocation }) => {
    const handleWeatherlocationLits = city => {
        onSelectedLocation(city);
    }
    const strToComponents = cities => (
        cities.map( city=> (
            <WeatherLocation 
                key={city.key} 
                city={city.name}
                onWeatherLocationClick = {() => handleWeatherlocationLits(city)}
            />
        ))
    );

    return (
        <div className='locationList'>
            {strToComponents(cities)}
        </div>
    )
    
};

LocationList.propTypes = {
    cities: PropTypes.array.isRequired,
    onSelectedLocation: PropTypes.func,
};
export default LocationList;