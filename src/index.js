import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce  from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//const response = fetch('https://restcountries.com/v3.1/name/italy');
//response.then(resp => resp.json()).then(capital => console.log(capital));

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    evt.preventDefault();
    let countrySerch = inputEl.value;
   fetchCountries(countrySerch.trim())
       .then(name => {
           if (name.length > 10) {
               Notify.info('Too many matches found. Please enter a more specific name.');
               ulEl.innerHTML = "";
               divEl.innerHTML = "";
               //return;
           }
           if (name.length > 1 && name.length <= 10) {
               createMarkupCountryList(name);
           }
           if (name.length === 1) {
               createMarkupCountry(name);
           }
       })
       .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        ulEl.innerHTML = "";
        divEl.innerHTML = "";
        return err;
    })
    // console.log(countrySerch);

 }

function createMarkupCountryList(countries) {
    const cardMarcup = countries.map(({ flags, name }) => 
    `<li class = country-item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>`)
    ulEl.innerHTML = cardMarcup.join('')
}
function createMarkupCountry(countries) {
    const cardMarcup = countries.map(({ flags, name, capital, population, languages  }) => 
    `<div class="country">
      <img class = "capital-flag" src="${flags.svg}" alt="${name.official}" width = 100/>
      <h2 class = "country-title">Country: ${name.official}</h2>
      <p class = "country-text">Capital: ${capital}</p>
      <p class="country-text">Population: ${population}</p>
      <p class="country-text">Languages: ${Object.values(languages)}</p>
    </div>`)
    ulEl.innerHTML = cardMarcup.join('')
}