// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from "date-fns";

let weatherApiData = null;
const tempReformater = (num) => String(num).slice(0, 2);

export const changeTempUnits = (unit) => {
  const hiList = document.querySelectorAll(".hi");
  const loList = document.querySelectorAll(".lo");
  const unitBtn = document.getElementById("tempUnits");
  const currentTemp = document.getElementById("currentTemp");

  const listChanger = (nodelist, selector, bound) => {
    const nodeArr = Array.from(nodelist);

    nodeArr.forEach((element, index) => {
      const domElem = element;
      let tempSelector;

      if (bound === "lo") {
        tempSelector =
          weatherApiData.forecastday[index].day[`mintemp_${selector}`];
      } else {
        tempSelector =
          weatherApiData.forecastday[index].day[`maxtemp_${selector}`];
      }
      domElem.className = "";
      domElem.className = `${bound} ${selector}`;
      domElem.textContent = tempReformater(tempSelector);
    });

    unitBtn.className = selector;
    currentTemp.textContent = tempReformater(
      weatherApiData[`temp_${selector}`],
    );
    currentTemp.className = selector;
  };

  if (unit === "f") {
    // change class names of each element in nodelists to C

    listChanger(hiList, "c", "hi");
    listChanger(loList, "c", "lo");
  } else {
    // change class names of each element in nodelists to F
    listChanger(hiList, "f", "hi");
    listChanger(loList, "f", "lo");
  }
};

export const displayWeather = (data, giph) => {
  console.dir(data);
  const contentParent = document.querySelector(".content");
  const todayCont = document.querySelector(".todayContainer");
  const weekContainer = document.querySelector(".weekContainer");

  weatherApiData = data;

  // eslint-disable-next-line no-unused-vars
  const clearViews = (() => {
    todayCont.innerHTML = "";
    weekContainer.innerHTML = "";
  })();

  const todayView = () => {
    const location = document.querySelector(".location");
    const lcard = document.createElement("div");
    const currentTemp = document.createElement("div");
    const currentGiph = document.createElement("img");
    const rcard = document.createElement("div");
    const condCont = document.createElement("div");
    const condText = document.createElement("div");
    const condIcon = document.createElement("img");
    const tempCont = document.createElement("div");
    const hiCont = document.createElement("div");
    const lowCont = document.createElement("div");
    const condCont2 = document.createElement("div");
    const humCont = document.createElement("div");
    const windCont = document.createElement("div");
    const precipCont = document.createElement("div");
    const precipTxt = document.createElement("div");
    const precip = document.createElement("div");

    lcard.classList.add("lcard");
    currentTemp.classList.add("f");
    currentTemp.id = "currentTemp";
    currentGiph.classList.add("giph");
    rcard.classList.add("rcard");
    condCont.classList.add("cond1");
    condText.classList.add("condText");
    condIcon.classList.add("condIcon");
    tempCont.classList.add("tempCont");
    hiCont.className = "hi f";
    lowCont.className = "lo f";
    condCont2.classList.add("cond2");
    humCont.classList.add("hum");
    windCont.classList.add("wind");
    precipCont.classList.add("precipCont");
    precipTxt.classList.add("precipTxt");
    precip.classList.add("precip");

    location.textContent = `${data.name}, ${data.region}`;
    currentTemp.textContent = tempReformater(data.temp_f);
    currentGiph.src = giph.url;
    condText.textContent = data.condition.text;
    condIcon.src = data.condition.icon;
    hiCont.textContent = tempReformater(data.forecastday[0].day.maxtemp_f);
    lowCont.textContent = tempReformater(data.forecastday[0].day.mintemp_f);
    humCont.textContent = `${data.forecastday[0].day.avghumidity} %`;
    windCont.textContent = `${data.wind_mph} ${data.wind_dir}`;
    precipTxt.textContent = "Precipitation";
    precip.textContent = `${data.forecastday[0].day.totalprecip_in} in`;

    todayCont.appendChild(lcard);
    todayCont.appendChild(rcard);
    lcard.appendChild(currentTemp);
    lcard.appendChild(currentGiph);
    rcard.appendChild(condCont);
    condCont.appendChild(condText);
    condCont.appendChild(condIcon);
    rcard.appendChild(tempCont);
    tempCont.appendChild(hiCont);
    tempCont.appendChild(lowCont);
    rcard.appendChild(condCont2);
    condCont2.appendChild(humCont);
    condCont2.appendChild(windCont);
    rcard.appendChild(precipCont);
    precipCont.appendChild(precipTxt);
    precipCont.appendChild(precip);
  };

  const weekView = () => {
    // should see how many days it has
    // for each day, create a card for after
    const [, ...daysAhead] = data.forecastday;
    const cardBuilder = (day) => {
      const card = document.createElement("div");
      const date = document.createElement("div");
      const icon = document.createElement("img");
      const tempCont = document.createElement("div");
      const hi = document.createElement("div");
      const lo = document.createElement("div");

      card.classList.add("aheadCard");
      date.classList.add("aheadDate");
      icon.classList.add("aheadIcon");
      tempCont.classList.add("aheadTemp");
      hi.className = "hi f";
      lo.className = "lo f";

      date.textContent = format(new Date(`${day.date}T00:00`), "eee");
      console.log(date.textContent);
      console.log(day);
      icon.src = day.day.condition.icon;
      hi.textContent = String(day.day.maxtemp_f).slice(0, 2);
      lo.textContent = String(day.day.mintemp_f).slice(0, 2);

      weekContainer.appendChild(card);
      card.appendChild(date);
      card.appendChild(icon);
      card.appendChild(tempCont);
      tempCont.appendChild(hi);
      tempCont.appendChild(lo);
    };

    daysAhead.forEach((element) => {
      // pass element to card builder
      cardBuilder(element);
    });
  };
  todayView();
  weekView();
};
