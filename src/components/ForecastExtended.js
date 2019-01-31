import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';
import './styles.css';

const api_key = '3021a3598eaddfa56196f9ba4939200a';
const url = 'http://api.openweathermap.org/data/2.5/forecast';
class ForecastExtended extends Component {

    constructor(){
        super();
        this.state = { 
            forecastData: null
        }
    }

    componentDidMount(){
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city){
            this.setState({ forecastData: null });
            this.updateCity(nextProps.city);
        }
    }
    
    updateCity = city => {
        const url_forecast = `${url}?q=${this.props.city}&appid=${api_key}`;

        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weatherData => {
                const forecastData = transformForecast(weatherData);
                this.setState({
                    forecastData
                })
            }
        );
    }
    renderProgress(){
        return (
            <div>
                <h3>Cargando Pronóstico Extendido...</h3>
                <CircularProgress size={50}/>
            </div>
        );
    }

    renderForecastItemsDays(forecastData){
        return forecastData.map( forecast => (
            <ForecastItem 
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay} 
                hour={forecast.hour} 
                data={forecast.data}>
            </ForecastItem>));
    }
    render() {
        const { city } = this.props
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className='forecast-title'>
                    Pronóstico extendido para {city}
                </h2>
                { forecastData ? 
                    this.renderForecastItemsDays(forecastData) :
                    this.renderProgress()}
            </div>
        );
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;