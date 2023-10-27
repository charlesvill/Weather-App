const displayWeather = (data, giph) => {
    const contentParent = document.querySelector(".content");
    const todayCont = document.querySelector(".todayContainer");
    const weekContainer = document.querySelector(".weekContainer");

    const clearViews = (() => {todayCont.innerHTML = '';})();

    const todayView = () => {
        const header = document.createElement("h3"); // currently not being used
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

        header.classList.add("location");
        lcard.classList.add("lcard");
        currentTemp.classList.add("F");
        currentGiph.classList.add("giph");
        rcard.classList.add("rcard");
        condCont.classList.add("cond1");
        condText.classList.add("condText");
        condIcon.classList.add("condIcon");
        tempCont.classList.add("tempCont");
        hiCont.className = "hi F";
        lowCont.className = "lo F";
        condCont2.classList.add("cond2");
        humCont.classList.add("hum");
        windCont.classList.add("wind");
        precipCont.classList.add("precipCont");
        precipTxt.classList.add("precipTxt");
        precip.classList.add("precip");

        header.textContent = `${data.name}, ${data.region}`;
        currentTemp.textContent = data.temp_f;
        currentGiph.src = giph.url;
        condText.textContent = data.condition.text;
        condIcon.src = data.condition.icon;
        hiCont.textContent = data.today.day.maxtemp_f;
        lowCont.textContent = data.today.day.mintemp_f;
        humCont.textContent =
        `${data.today.day.avghumidity} %`;
        windCont.textContent =
        `${data.wind_mph} ${data.wind_dir}`;
        precipTxt.textContent = "Precipitation";
        precip.textContent =
        `${data.today.day.totalprecip_in} in`;

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
    }
    const weekView = () => {

    }
    return {todayView, weekView};
}

export default displayWeather;