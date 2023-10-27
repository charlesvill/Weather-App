/* eslint-disable camelcase */
 const weatherFetch = (() => {

    function processData (dataObj) {
        console.dir(dataObj);
        const {current:{condition},current:{icon}, current:{temp_c, temp_f}, current:{wind_mph, wind_dir}, location:{name}, location:{region}, location:{localtime}} = dataObj;

        const {forecastday} = dataObj.forecast;

        return {condition, icon, temp_c, temp_f, wind_mph, wind_dir, localtime, name, region, forecastday};

    }

    function processGiphData (dataObj) {
        const {url, height, width} = dataObj.data[0].images.fixed_height;
        return {url, height, width};
    }

    async function getGiph (condition) {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=1Mf6aV1UwPT2Wwtde5hl2QXPhSIJAfNh&q=${condition}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        try {
            const response = await fetch(endpoint, {mode: "cors"});
            if(!response.ok){throw new Error(response.status)}
            const json = await response.json();
            const giphyUrl = processGiphData(await json);
            return giphyUrl;
        } catch (err) {
            throw new Error(`There was issue with giphy response: ${err}`);
        }
    }

    async function getData (location = "Los Angeles") {
    const endpoint =  `https://api.weatherapi.com/v1/forecast.json?key=6f8b669ef47e4df6aa511347231710&q=${location}&days=3&aqi=no&alerts=no`;

    try {
        const response = await fetch(endpoint, {mode: "cors"});
        if(!response.ok){throw new Error(response.status)}
        const json  = await response.json();
        const obj = processData(await json);
        const giphsearch = await getGiph(obj.condition.text);
        return {obj, giphsearch};

    } catch(err) {
        throw new Error(`There was a problem getting a network response: ${err}`);
    }

    }

    return {getData};
})();

export default weatherFetch