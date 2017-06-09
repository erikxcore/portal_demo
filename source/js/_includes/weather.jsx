import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
/*
main.temp,name
*/

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

        	self.setState({
                temp: parseInt(result.data.main.temp,10),
                icon_id: weatherIcon
            });
            
        });
  }

  provideIcon(icon_id){
  	
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
      		<br/>
      	<span>{this.state.icon_id}</span>
      </div>
    );
  }

}

export default Weather;

