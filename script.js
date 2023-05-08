//getting html elements 
let insertConvertAmount = document.getElementById('converted-amount');
let selectCurrBase = document.getElementById('base-currency');
let selectCurrTarget = document.getElementById('target-currency');
let inputAmount = document.getElementById('amount');
let buttonHistoricRate = document.getElementById('historical-rates');
let buttonSaveFavorites = document.getElementById('save-favorite');
let favorites = document.getElementById('favorites');
let conversionRates = document.getElementById('conversion-rates');

//api key
const myHeaders = new Headers();
myHeaders.append("apikey", "AwebG5CXOd9V33ZxOIPnKj6wutsF2Dfr");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

//listing of currencies from the api and putting them into a select menu
async function getCurrencyList() {
  try {
    let response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    let data = await response.json()
    let currencyList = data.symbols;
    let currencyAbrevs = Object.keys(currencyList);
    let currencyNames = Object.values(currencyList);
    console.log(currencyAbrevs);
    console.log(currencyNames);
    for (let i = 0; i < currencyNames.length; i++) {
      let options = selectCurrBase.innerHTML;
      options += `<option value="${currencyAbrevs[i]}">${currencyNames[i]}</option>`
      console.log(options);
      selectCurrBase.innerHTML = options;
      selectCurrTarget.innerHTML = options;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

//converting currencies with a user specified date from 2010 
async function getHistoricalConversion() {
  let to = selectCurrTarget.value;
  let from = selectCurrBase.value;
  let amount = inputAmount.value;
  let date = '2010-01-01';

  try {
    let response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}&date=${date}`, requestOptions)
    let data = await response.json()
    console.log(data);
    insertConvertAmount.innerHTML = `${data.result} on ${date}`
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
buttonHistoricRate.addEventListener('click', getHistoricalConversion);


// converting current currency rates
async function getCurrentConversion() {
  let to = selectCurrTarget.value;
  let from = selectCurrBase.value;
  let amount = inputAmount.value;

  try {
    let response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`, requestOptions)
    let data = await response.json()
    console.log(data);
    insertConvertAmount.innerHTML = `${data.result}`
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
conversionRates.addEventListener('click', getCurrentConversion);

//saving two currencies that can then be viewed in a selector menu
arrayFavorites = [];

function saveFavorites() {
  let base = selectCurrBase.value;
  let target = selectCurrTarget.value;
  let pair = { base, target }
  let alreadyExists = false;

  for (let i = 0; i < arrayFavorites.length; i++) {
    if (arrayFavorites[i].base === base && arrayFavorites[i].target === target) {
      alreadyExists = true;
      console.log('Element already exists in array');
      break;
    }
  }
  if (alreadyExists === false) {
    arrayFavorites.push(pair);
    let favoritePair = favorites.innerHTML
    favoritePair += `<option value="${pair}">Base: ${base} Target: ${target}</option>`
    favorites.innerHTML = favoritePair;
  }
}
buttonSaveFavorites.addEventListener('click', saveFavorites);

//pulling two saved currencies from a selector menu and inserting them into the current selector menu
function getFavorites(index){
  let selectedPair = arrayFavorites[index];
    selectCurrBase.value = selectedPair.base;
    selectCurrTarget.value = selectedPair.target;
}

favorites.addEventListener('change', function(){
  let Index = favorites.selectedIndex;
  getFavorites(Index);
})
    

//adds the list of currencies to the selector menu on application startup
document.onload = getCurrencyList();

