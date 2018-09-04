import React from 'react';
import './CountryInfo.css';

class CountryInfo extends React.Component {
    render() {
        return (
            <div className="info-container">
                <div className="country-name">{this.props.info.country}</div>
                <div>{this.props.info.capital}</div>
                <div>{this.props.info.code}</div>
                <div>{this.props.info.currency}</div>
                <div><img className="img-value" src={this.props.info.flag} alt="country flag"/></div>
                <div id="img"><img src={require(`./images/${this.props.weatherInfo.icon}.png`)} alt=""/></div>
                <div className="weather-desc">Temperature: {this.props.weatherInfo.temp}&#176;C</div>
                <div className="weather-desc">Description: {this.props.weatherInfo.desc}</div>
            </div>
        )
    }
}

export default CountryInfo;