const weatherHeading = document.querySelector(".weather-app__heading");

const weatherForecast = document.querySelector(".weather-app__forecast");

const xhr = new XMLHttpRequest();

class weatherManager {
  constructor(response, headerElement, forecastElement) {
    this.HTTPResponse = response;
    this.headerElement = headerElement;
    this.forecastElement = forecastElement;
    this.updateManager();
  }

  updateManager() {
    this.updateHeader();
    this.updateForecast();
    setInterval(() => this.updateHeader(), 30000);
    setInterval(() => {
      this.forecastElement.innerHTML = "";
      this.updateForecast();
    }, 300000);
  }

  updateHeader() {
    const currentTime = new Date();

    const hours =
      currentTime.getHours() > 9
        ? currentTime.getHours()
        : `0${currentTime.getHours()}`;

    const minutes =
      currentTime.getMinutes() > 9
        ? currentTime.getMinutes()
        : `0${currentTime.getMinutes()}`;

    this.headerElement.innerHTML = `
    <div class="time">
      <p class="city">${this.HTTPResponse.city.name}</p>
      <div class="clock">
        <p>${hours}</p>
        <p>:</p>
        <p>${minutes}</p>
      </div>
    </div>
    <div>
      <div class="weather">
        <img
          src="https://openweathermap.org/img/wn/${
            this.HTTPResponse.list[0].weather[0].icon
          }@2x.png"
          alt="${this.HTTPResponse.list[0].weather[0].description}"
          class="icon-img"
        />
        <p>${this.HTTPResponse.list[0].weather[0].main}</p>
        <p>${this.HTTPResponse.list[0].main.temp.toFixed()}°C</p>
      </div>
      <div class="speed">
        <p>Speed</p>
        <p>${this.HTTPResponse.list[0].wind.speed.toFixed(1)} m/s</p>
      </div>
    </div>`;
  }

  updateForecast() {
    for (let i = 0; i < 40; i += 8) {
      const time = this.HTTPResponse.list[i].dt_txt.split(" ");
      const iconSrc = `https://openweathermap.org/img/wn/${this.HTTPResponse.list[i].weather[0].icon}@2x.png`;
      const iconDesc = this.HTTPResponse.list[i].weather[0].description;
      const temp = this.HTTPResponse.list[i].main.temp.toFixed();

      const div = `
      <div class="weather-app__forecast-item">
        <div>
          <p>${time[0]}</p>
          <p>${time[1]}</p>
        </div>
        <img src="${iconSrc}" alt="${iconDesc}" class="icon-img">
        <p>${temp} °C</p>
      </div>`;

      this.forecastElement.innerHTML += div;
    }
  }
}

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const response = JSON.parse(xhr.responseText);
    const time = new weatherManager(response, weatherHeading, weatherForecast);
  } else {
    console.error("Произошла ошибка при запросе данных");
  }
};

xhr.open(
  "GET",
  "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric"
);

xhr.send();
