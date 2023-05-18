/**
 * The function generates HTML code for displaying information about a country and a list of countries
 * @param country - The `country` parameter is an object that contains information about a specific
 * object as input and returns an HTML string that represents the country's information in a formatted way.
 */
export function countryhtml(country) {
  return `<article class="list-group-country">
  <img class="img" src="${country.flag}"/>
  <div class="data>
    <h3 class = "name">${country.name}</h3>
    <h4 class = "region">${country.region}</h4>
    <h4 class = 'capital'>${country.capital}</h4>
    <button class = "more-info" data-id = "${country._id}">More Info</button>
  </div>
</article>`;
}

/**
 * put all country from list as generates HTML form and insert to home page
 */
let countryhtml = countrys
  .map((country) => {
    return countryhtml(country);
  })
  .join(" ");
document
  .getElementById("country-lis")
  .insertAdjacentHTML("beforeend", itemshtml);
