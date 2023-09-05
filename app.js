const rootElement = document.getElementById("root");

const initialParentElement = document.getElementById("parent-element");

const neighbouringCountryTag = "<p>Neighbouring Country</p>";

const abc = [1, 2, 3];

const countryInfos = [];

class cardDistributor {
  constructor() {
    this.appendedCards = 0;
  }

  distributeCards(response) {
    if (this.appendedCards === 0) {
      initialParentElement.append(
        createCountryCard(response, neighbouringCountryTag)
      );
    } else if (this.appendedCards === 1) {
      initialParentElement.prepend(
        createCountryCard(response, neighbouringCountryTag)
      );
    } else if (this.appendedCards === 2) {
      const flexDiv = document.createElement("div");
      flexDiv.classList.add(
        "d-flex",
        "justify-content-center",
        "gap-4",
        "my-5"
      );
      flexDiv.append(createCountryCard(response, neighbouringCountryTag));
      rootElement.append(flexDiv);
    } else if (this.appendedCards === 3) {
      const lastParent = document.querySelectorAll(".container > div");
      lastParent[1].append(createCountryCard(response, neighbouringCountryTag));
    } else if (this.appendedCards === 4) {
      const flexDiv = document.createElement("div");
      flexDiv.classList.add(
        "d-flex",
        "justify-content-center",
        "gap-4",
        "my-5",
        "align-items-end"
      );
      flexDiv.append(createCountryCard(response, neighbouringCountryTag));
      rootElement.prepend(flexDiv);
    } else if (this.appendedCards === 5) {
      const lastParent = document.querySelectorAll(".container > div");
      lastParent[0].append(createCountryCard(response, neighbouringCountryTag));
    }
    this.appendedCards += 1;
  }
}

const distr = new cardDistributor();

function createCountryCard(countryInfo, additionalHTML) {
  const div = document.createElement("div");

  div.classList.add("card", "h-75");

  const population = (countryInfo.population / 1000000).toFixed(1);

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

  div.innerHTML = `
      <img src="${countryInfo.flags.png}" class="card-img-top"/>
      <div class="card-body">
        <h5 class="card-title">${countryInfo.name.official}</h5>
        <p class="card-text">${countryInfo.region}</p>
        <p class="card-text">&#128106 ${population} млн.</p>
        <p class="card-text">&#128483 ${getLanguages(countryInfo.languages)}</p>
        <p class="card-text">&#128181  ${getCurrency(
          countryInfo.currencies
        )}</p>
        ${additionalHTML}
      </div>`;

  return div;
}

fetch("https://restcountries.com/v3.1/name/italy")
  .then((result) => result.json())
  .then((parsedResult) => {
    initialParentElement.appendChild(createCountryCard(parsedResult[0], ""));
    return parsedResult;
  })
  .then(async (parsedResult) => {
    const listOfCodes = parsedResult[0].borders.join(",");
    console.log(listOfCodes);
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${listOfCodes}`
    );
    const result = await response.json();
    result.forEach((country) => distr.distributeCards(country));
    console.log(result);
  });

