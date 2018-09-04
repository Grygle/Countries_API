import React from 'react';
import Map from './Map';

import CountryInfo from './CountryInfo';

import './App.css';

class App extends React.Component {

    state = {
        error: null,
        weatherInfo: {},
        info: {},
        pending: true
    };

    handleClick = (e) => {
        const clickedCountry = e.target.getAttribute('id');

        if(clickedCountry) {
            fetch(`https://restcountries.eu/rest/v2/name/${clickedCountry}?fullText=true`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            info: {
                                country: result[0].name,
                                capital: result[0].capital,
                                code: result[0].alpha2Code,
                                currency: result[0].currencies[0].name,
                                flag: result[0].flag
                            },
                        });

                        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${result[0].capital}&appid=58efff396509f610293e0d55df56db5f&&units=metric`)
                            .then(results => results.json())
                            .then(
                                (result1) => {
                                    this.setState({
                                        weatherInfo: {
                                            temp: (result1.main.temp).toFixed(0),
                                            desc: result1.weather[0].description,
                                            icon: result1.weather[0].icon,
                                        },
                                        pending: false
                                    })
                                })
                    },
                )
                .catch(err => console.log(err));

            if(!e.target.classList.contains('clickedCountry')){
                e.target.classList.add('clickedCountry');
                e.target.classList.remove('clickedCountry-again');

            } else if (e.target.classList.contains('clickedCountry')){
                e.target.classList.remove('clickedCountry');
                e.target.classList.add('clickedCountry-again');
            }

        }

    };

    render() {
        return (
            <div className="main-container">
                <h1> Pick a country on the map </h1>
                <div className="map-container">
                    <Map handleClick={this.handleClick} />
                    <div className="country-infos">
                        {
                            this.state.pending ? null : <CountryInfo info={this.state.info} weatherInfo={this.state.weatherInfo}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default App;