//api key: Je9ZAyZ8f7w62ZrC74j2GuGS40Bn9p2o

let insertCurrentRate = document.getElementById('converted-amount');


//get historical currency conversion
const myHeaders = new Headers();
myHeaders.append("apikey", "Je9ZAyZ8f7w62ZrC74j2GuGS40Bn9p2o");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function getHistoricalConversion(to, from, amount){
fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result),
  insertCurrentRate.innerHTML = `${to}: ${amount}`)
  .catch(error => console.log('error', error));
}

  //historical currency sample response
//   {
//     "date": "2018-02-22",
//     "historical": "",
//     "info": {
//       "rate": 148.972231,
//       "timestamp": 1519328414
//     },
//     "query": {
//       "amount": 25,
//       "from": "GBP",
//       "to": "JPY"
//     },
//     "result": 3724.305775,
//     "success": true
//   }

  //end sample response
  //get current currency conversion

function getCurrentConversion(symbols, base){
  fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

  //sample current currency conversion

//   {
//     "base": "USD",
//     "date": "2021-03-17",
//     "rates": {
//       "EUR": 0.813399,
//       "GBP": 0.72007,
//       "JPY": 107.346001
//     },
//     "success": true,
//     "timestamp": 1519296206
//   }

  //currency conversion sample end
  // get currency list

async function getCurrencyList(){
await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

  //currency list sample response

//   {
//     "success": true,
//     "symbols": {
//       "AED": "United Arab Emirates Dirham",
//       "AFN": "Afghan Afghani",
//       "ALL": "Albanian Lek",
//       "AMD": "Armenian Dram"
//     }
//   }

  //end sample response

