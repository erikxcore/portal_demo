import React from 'react';
import ReactDOM from 'react-dom';
import Time from './_includes/time.jsx'
import Weather from './_includes/weather.jsx'

class HeaderComponents extends React.Component {
  render(){
    return (
      <div>
        <Weather apikey="e4c9d96c94ea0ba506fdbe243c18839d"/>
        <Time />
      </div>
    );
  }

}

ReactDOM.render(
	<HeaderComponents />, document.getElementById('header_components')
);