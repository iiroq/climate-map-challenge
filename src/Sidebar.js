import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

function Sidebar({className, selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);

    //define time and weather information for output
    const weatherString = JSON.stringify(loc && loc.data);
    //console.log(weatherString)
    let weather = {}
    let currentTemp = 0;
    let currentSnow = 0;
    let currentRain = 0;
    let currentWind = 0;
    //parse object if string is not undefined
    if (weatherString !== undefined) {
        weather = JSON.parse(weatherString);
        let tempArray = weather.t.timeValuePairs;
        currentTemp = tempArray[tempArray.length -3].value
        //console.log(currentTemp)
        var time = tempArray[tempArray.length -3].time;
        var date = Date(time);
        
        let snowArray = weather.snowdepth.timeValuePairs;
        currentSnow = snowArray[snowArray.length -3].value
        //console.log(currentSnow)

        let rainArray = weather.r_1h.timeValuePairs;
        currentRain = rainArray[rainArray.length -3].value
        //console.log(currentRain)

        let windArray = weather.ws_10min.timeValuePairs;
        currentWind = windArray[windArray.length -3].value
        //console.log(currentWind)
        

    }

    return (
    <div className={className}>
        
        <p>Selected location:</p>
        <pre>{loc && JSON.stringify(loc.info.name, null, 4)}</pre>
        <p>Current weather in selected location</p>
        {/*Render if information is not undefined
        If received weather information is null, print: not available*/}
        {weatherString !== undefined &&
            <pre  style={{whiteSpace: 'pre-wrap'}}>
            {date} <br />
            <br />
            Air Temperature (degC): {currentTemp == null ? currentTemp = 'N/A' : currentTemp} <br/>
            <br />
            Precipitation (mm): {currentRain == null ? currentRain = 'N/A' : currentRain} <br/>
            <br />
            Snow Depth (cm): {currentSnow == null ? currentSnow = 'N/A' : currentSnow === -1 ? currentSnow = 0 : currentSnow} <br/>
            <br />
            Wind Speed 10min average (m/s): {currentWind == null ? currentWind = 'N/A' : currentWind} <br/>
            </pre>
        }

    </div>
    );
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;