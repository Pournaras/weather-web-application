import Search from "../search";
import React, { useState, useEffect } from "react";

export default function Weather(){
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(parameter){
        setLoading(true);

        if(parameter=="") parameter = "athens";

        try{

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${parameter}&appid=0b924e803770c7623c3bf6f22849ec76`
            );

            const data = await response.json();

            if(data) {
                setWeatherData(data);
                setLoading(false);
            }

        }catch(e){
            setLoading(false);
            console.log(e);
        }
    }

    function handleSearch(){
        fetchWeatherData(search)
    }

    useEffect(()=> {fetchWeatherData("athens");

    }, []);

    console.log(weatherData);

    function getCurrentDate(){
        return new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div>
            {/*Search input*/}
            <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />

            {/*Weather info display*/}
            {
                loading ? <div className="loading">Loading...</div> :
                <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>

                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>

                    <div className="temperature">{((weatherData?.main?.temp)-273.15).toFixed(1)} °C</div>

                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                    </p>

                    <div className="weather-info">
                        <div className="column">
                            <div>
                            <p className="wind">
                                {weatherData?.wind?.speed} m/s
                            </p>
                            <p>Wind speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                            <p className="humidity">
                                {weatherData?.main?.humidity}%
                            </p>
                            <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}