document.getElementById('btnSearch').addEventListener('click', searchDestination);
document.getElementById('btnClear').addEventListener('click', clearResults);

function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let resultsHTML = '';
            
            if (input.includes('beach')) {
                data.beaches.forEach(beach => {
                    resultsHTML += `<div class="card"><img src="${beach.imageUrl}" alt="${beach.name}"><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
                });
            } else if (input.includes('temple')) {
                data.temples.forEach(temple => {
                    resultsHTML += `<div class="card"><img src="${temple.imageUrl}" alt="${temple.name}"><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
                });
            } else if (input.includes('japan')) {
                data.countries[0].cities.forEach(city => {
                    resultsHTML += `<div class="card"><img src="${city.imageUrl}" alt="${city.name}"><h3>${city.name}</h3><p>${city.description}</p></div>`;
                });
            } else {
                resultsHTML = '<p>No recommendations found for this keyword. Try "beach", "temple", or "Japan".</p>';
            }

            resultDiv.innerHTML = resultsHTML;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
