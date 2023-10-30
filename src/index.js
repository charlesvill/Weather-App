import weatherFetch from "./modules/weather";
import { displayWeather, changeTempUnits } from "./modules/dom";

const initializer = () => {
  // store reference to all the elements with logic by calling dom.js
  // add event listeners to all objects that will each call a seperate external function

  const form = document.querySelector(".form");
  const inputField = document.getElementById("searchfield");
  const unitChange = document.getElementById("tempUnits");

  const dataObj = async (search) => {
    try {
      const weatherObj = await weatherFetch.getData(search);
      const displayBuilder = displayWeather(
        weatherObj.obj,
        weatherObj.giphsearch,
      );
    } catch {
      alert("you should try again");
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = inputField.value;
    console.log(search);
    dataObj(search);
  });
  unitChange.addEventListener("click", (e) => {
    const currentUnit = e.target.className;
    console.log("units should be changing");
    changeTempUnits(currentUnit);
  });

  dataObj();
};

initializer();
