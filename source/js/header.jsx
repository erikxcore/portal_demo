import React from 'react';
import ReactDOM from 'react-dom';
import Time from './_includes/time.jsx'
import Weather from './_includes/weather.jsx'

class HeaderComponents extends React.Component {
  render(){
    return (
      <div>
        <Weather />
        <Time />
      </div>
    );
  }

}

ReactDOM.render(
	<HeaderComponents />, document.getElementById('header_components')
);