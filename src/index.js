import weatherFetch from './modules/weather';
import displayWeather from './modules/dom';

const initializer = () => {
   // store reference to all the elements with logic by calling dom.js
   // add event listeners to all objects that will each call a seperate external function

   const form = document.querySelector(".form");
   const inputField = document.getElementById("searchfield");

    const dataObj = async (search) => {
        const weatherObj = await weatherFetch.getData(search);

        displayWeather(weatherObj).todayView();
    }

   form.addEventListener("submit", (e) => {
        e.preventDefault();
        const search = inputField.value;
        console.log(search);
        dataObj(search);
   })

   dataObj();

};

initializer();