import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	time: null,
    	date: null
   	};
   	this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount(){
  	this.updateClock();
  	setInterval(this.updateClock, 60000);
  }

  componentWillUnmount(){
    this.state = {
    	time: null,
    	date: null
   	};
  }

  updateClock(){
  	    let now = new Date(),
        months = ['January', 'February', 'March', 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October', 'November', 'December'];
            
        let time = (now.getHours() % 12 || 12) +':'+('0' + now.getMinutes()).slice(-2);

        let date = [months[now.getMonth()], 
                now.getDate(),
                now.getFullYear()].join(' ');

    this.setState({
      time: time,
      date: date
    }); 

  }


  render(){
    return (
      <div className="time">
      	<span>{this.state.time}</span>
      	<span>{this.state.date}</span>
      </div>
    );
  }

}

export default Time;


/*
//API KEY:e4c9d96c94ea0ba506fdbe243c18839d
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
//http://localhost:8080/portal_2/skeleton/build/php/api/location/
//https://www.npmjs.com/package/react-open-weather
//api.openweathermap.org/data/2.5/forecast/city?APPID=YOURAPIKEY 
//&units=imperial
main.temp,name
*/
