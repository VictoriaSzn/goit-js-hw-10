const BASE_URL = 'https://restcountries.com/v3.1/name';
export function fetchCountries(serch) {

    return fetch(`${BASE_URL}/${serch}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
    })
}