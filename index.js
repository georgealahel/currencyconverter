const selectOption = document.getElementById("selectCountry");
const buttonCurr = document.getElementById("buttonCurrency");
const flag = document.getElementById("flag");
const result = document.getElementById("result");
const world = document.getElementById("world");

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(countriesList => {
    countriesList.sort((a, b) => {
      if (a.name.common < b.name.common) return -1;
      if (a.name.common > b.name.common) return 1;
      return 0;
    });
        countriesList.forEach(country => {
      const optionElement = document.createElement('option');
      optionElement.value = country.name.common;
      optionElement.innerHTML = country.name.common;
      selectOption.appendChild(optionElement);
    });
  });

selectOption.addEventListener("change", () => {
const selectedCountry = selectOption.value;
buttonCurr.innerHTML = "";
flag.innerHTML = "";

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.find(country => country.name.common === selectedCountry).currencies);
        let flagDisplayed = false;
        currencies.forEach(currency => {
        const optionCurr = document.createElement('button');
        optionCurr.innerHTML = currency;
        buttonCurr.appendChild(optionCurr);

      if (!flagDisplayed) {
        const flags= data.find(country => country.name.common === selectedCountry).flags.png;
        const countryFlag= document.createElement('img');
        countryFlag.src = flags;
        countryFlag.width = '210';
        countryFlag.height = '110';
        flag.appendChild(countryFlag);
        flagDisplayed = true;}

        world.innerHTML="";
        result.innerHTML = "";
        optionCurr.onclick = function () { 
          var URL = 'https://api.fastforex.io/fetch-one?from=' + currency + '&to=USD&api_key=a0c1710b13-68c2e0cb5b-rr1d33' 
          fetch(URL)
                .then(response => response.json())
                .then(response => {
                    let  _exchangeRate = response.result.USD;
                    let res = document.createElement('p');
                    res.innerHTML = '1 ' + currency + ' = ' + _exchangeRate + ' USD';
                    result.appendChild(res);
                    optionCurr.disabled=true;
                 }
            )}
            });
      });
    });
  
