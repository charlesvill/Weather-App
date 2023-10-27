/* eslint-disable camelcase */
 const weatherFetch = (() => {

    function processData (dataObj) {
        const {current:{condition},current:{icon}, current:{temp_c, temp_f}, current:{wind_mph, wind_dir}, location:{name}, location:{region}, location:{localtime}} = dataObj;

        const {
            0:today, 1:dayTwo, 2: dayThree
        } = dataObj.forecast.forecastday;

        return {condition, icon, temp_c, temp_f, wind_mph, wind_dir, localtime, name, region, today, dayTwo, dayThree};

    }

    async function getData (location = "Los Angeles") {
    const endpoint =  `https://api.weatherapi.com/v1/forecast.json?key=6f8b669ef47e4df6aa511347231710&q=${location}&days=3&aqi=no&alerts=no`;

    try {
        const response = await fetch(endpoint, {mode: "cors"});
        if(!response.ok){throw new Error(response.status)}
        const json  = await response.json();
        console.log(json);
        const obj = processData(await json);
        return obj;

    } catch(err) {
        throw new Error(`There was a problem getting a network response: ${err}`);
    }

    }
    return {getData};
})();

export default weatherFetch