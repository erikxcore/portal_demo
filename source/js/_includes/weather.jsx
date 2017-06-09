import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

require('../../sass/components/_weather.scss');


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	icon_id: null,
    	temp: null
   	};
  }

  componentDidMount(){
  	this.serverRequest = this.findLocation();
  }

  findLocation(){
  	let self = this;
  	return axios
	        .get("./php/api/location/")
	        .then(function(result) {
	          let long = result.data.long;
	          let lat = result.data.lat;
	          
	          if(long && lat){
	          	self.findWeather(long,lat);
	          }else{
	          	console.log("There was an issue determining your location.");
	          }
	      });
  }

  findWeather(long,lat){
  	let self = this;
  	return  axios
        .get(`http://api.openweathermap.org/data/2.5/weather?APPID=${self.props.apikey}&units=imperial&lat=${lat}&lon=${long}`)
        .then(function(result) {
        	
        	let weatherIcon = null;
        	//Seems like the weather object is always an array and will just return an array of 1 object 
        	//if there isn't multiple weather events happening.
        	if(Array.isArray(result.data.weather)){
        		weatherIcon = result.data.weather[0].icon;
        	}else{
        		weatherIcon = result.data.weather.icon;
        	}

        	weatherIcon = self.determineIcon(weatherIcon);

        	self.setState({
                temp: parseInt(result.data.main.temp,10)+'°',
                icon_id: weatherIcon
            });
            
        });
  }

  determineIcon(icon_id){
        	switch(icon_id){
        		//Clear Sky
        		case "01d":
        			icon_id = "wi-day-sunny";
        		break;
        		case "01n":
        			icon_id = "wi-night-clear";
        		break;
        		//Few Clouds
        		case "02d":
        			icon_id = "wi-day-cloudy";
        		break;
        		case "02n":
        			icon_id = "wi-night-alt-cloudy";
        		break;
        		//Scattered Clouds
        		case "03d":
        			icon_id = "wi-cloud";
        		break;
        		case "03n":
        			icon_id = "wi-cloud";
        		break;
        		//Broken Clouds
        		case "04d":
        			icon_id = "wi-cloudy";
        		break;
        		case "04n":
        			icon_id = "wi-cloudy";
        		break;
        		//Shower Rain
        		case "09d":
        			icon_id = "wi-day-showers";
        		break;
        		case "09n":
        			icon_id = "wi-night-alt-showers";
        		break;
        		//Rain
        		case "10d":
        			icon_id = "wi-day-rain";
        		break;
        		case "10n":
        			icon_id = "wi-night-alt-rain";
        		break;
        		//Thunderstorm
        		case "11d":
        			icon_id = "wi-day-storm-showers";
        		break;
        		case "11n":
        			icon_id = "wi-night-storm-showers";
        		break;
        		//Snow
        		case "13d":
        			icon_id = "wi-day-snow";
        		break;
        		case "13n":
        			icon_id = "wi-night-snow";
        		break;
        		//Mist
        		case "50d":
        			icon_id = "wi-day-haze";
        		break;
        		case "50n":
        			icon_id = "wi-night-cloudy-windy";
        		break;

        		default:
        		icon_id = 'wi-na';
        	}

  	return icon_id;
  }

  componentWillUnmount(){
  	this.serverRequest.abort();
    this.state = {
    	icon_id: null,
    	temp: null
   	};
  }

  render(){
    return (
      <div className="weather">
      	<span>{this.state.temp}</span>
        <i className={`wi ${this.state.icon_id}`}/>
      </div>
    );
  }

}

export default Weather;

