import {format} from 'date-fns'

const displayWeather = (data, giph) => {
    console.dir(data);
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
        hiCont.textContent = String(data.forecastday[0].day.maxtemp_f).slice(0,2);
        lowCont.textContent = String(data.forecastday[0].day.mintemp_f).slice(0,2);
        humCont.textContent =
        `${data.forecastday[0].day.avghumidity} %`;
        windCont.textContent =
        `${data.wind_mph} ${data.wind_dir}`;
        precipTxt.textContent = "Precipitation";
        precip.textContent =
        `${data.forecastday[0].day.totalprecip_in} in`;

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
            hi.className = "hi F";
            lo.className = "lo F";

            date.textContent = format(new Date(`${day.date}T00:00`), "eee");
            console.log(date.textContent);
            console.log(day);
            icon.src = day.day.condition.icon;
            hi.textContent = String(day.day.maxtemp_f).slice(0,2);
            lo.textContent = String(day.day.mintemp_f).slice(0,2);

            weekContainer.appendChild(card);
            card.appendChild(date);
            card.appendChild(icon);
            card.appendChild(tempCont);
            tempCont.appendChild(hi);
            tempCont.appendChild(lo);


        }

        daysAhead.forEach(element => {
            // pass element to card builder
            cardBuilder(element);
        });

    }
    todayView();
    weekView();
}

export default displayWeather;