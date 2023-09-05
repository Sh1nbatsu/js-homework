const parentElement = document.getElementById("parent");

function renderCountryCard(responseItem) {
  const population = (responseItem.population / 1000000).toFixed(1);

  const getLanguages = (languagesObj) => {
    let languages = [];
    for (let language in languagesObj) {
      languages.push(` ${languagesObj[language]}`);
    }
    return languages;
  };

  const getCurrency = (currencyObj) => {
    let currencyString = "";
    for (let item in currencyObj) {
      currencyString += currencyObj[item].symbol;
      currencyString += ` ${currencyObj[item].name}`;
    }
    return currencyString;
  };

  parentElement.innerHTML += `
  <div class="col">
    <div class="h-100 card">
      <img src="${responseItem.flags.png}" class="card-img-top"/>
      <div class="card-body">
        <h5 class="card-title">${responseItem.name.official}</h5>
        <p class="card-text">${responseItem.region}</p>
        <p class="card-text">&#128106 ${population} млн.</p>
        <p class="card-text">&#128483 ${getLanguages(
          responseItem.languages
        )}</p>
        <p class="card-text">&#128181  ${getCurrency(
          responseItem.currencies
        )}</p>
      </div>
    </div>
  </div>`;
}

fetch("https://restcountries.com/v3.1/all")
  .then((result) => result.json())
  .then((parsedResult) => {
    for (let i = 0; i < 250; i += 25) {
      renderCountryCard(parsedResult[i]);
    }
  });
