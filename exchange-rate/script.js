const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rate and update DOM
async function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  const res = await fetch(`https://open.exchangerate-api.com/v6/latest`);
  const data = await res.json();
  const rate = data.rates[currency_two] / data.rates[currency_one];
  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
}

// Event listeners
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
calculate();
