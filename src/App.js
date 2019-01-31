import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationList from './components/WeatherLocation/LocationList';
import ForecastExtended from './components/ForecastExtended';
import './App.css';

const cities = [
  {
    name: 'Cali, Col',
    key: 1
  },
  {
    name: 'Bogota, Col',
    key: 2
  },
  {
    name: 'New Jersey, us',
    key: 3
  },
  {
    name: 'Madrid, es',
    key: 4
  },
  {
    name: 'Lima, pe',
    key: 5
  }
]
class App extends Component {

  constructor(){
    super();
    this.state = { city: null};
  }
  handleSelectedLocation = city => {
    this.setState({city: city.name})
  }
  
  render() {
    const { city } = this.state;
    return (
      <Grid className="App">
        <Row>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='title' color='inherit'>
                Weahter App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationList 
              cities={cities}
              onSelectedLocation={this.handleSelectedLocation}
            />    
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                {
                  city ?
                  <ForecastExtended city={city}></ForecastExtended> :
                  null
                  // <h1>No hay ninguna ciudad seleccionada</h1>
                  
                }
              </div>
            </Paper>
          </Col>
        </Row>
        
      </Grid>
    );
  }
}

export default App;
