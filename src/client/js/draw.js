export function drwaResultUI(cardData){
    document.getElementById('search-result-data').innerHTML = '';
    debugger;
    const html = `
    <div class="card">
        <div class="card-title">
            <div>${cardData.destination}, ${cardData.countryName}</div>
            <div>
                <a href="#" id="save-btn" class="save-btn" title="Save to bookmar" data-id="${cardData.geonameId}"><i class="far fa-bookmark"></i></a>
            </div>
        </div>
        <div class="card-img">
            <img src="${cardData.imagesList[0]}">
        </div>
        <div class="all-info">
            <div class="info">
                <div><strong>Trip Inormation:</strong></div>
                <div><strong>To:</strong> ${cardData.destination}, ${cardData.countryName}</div>
                <div><strong>Depature:</strong> ${cardData.dateEnd}</div>
                <div><strong>Return:</strong> ${cardData.dateStart}</div>
                <div><strong>Duration:</strong> ${cardData.durationTxt}</div>
                <div><strong>Days Left:</strong> ${cardData.daysLeftTxt}</div>

            </div>
            <div class="info weather">
                <div><strong>Weather Forecast arrived date:</strong></div>
                <div>${cardData.weatherDataByDate[0].weather.description}</div>
                <div><strong>Min Temp:</strong> ${cardData.weatherDataByDate[0].min_temp}</div>
                <div><strong>Max Temp:</strong> ${cardData.weatherDataByDate[0].max_temp}</div>
                <div><strong>Current Temp:</strong> ${cardData.weatherDataByDate[0].temp}</div>
            </div>
        </div>
    </div>
    `;
    hideLoader();
    document.getElementById('search-result-data').innerHTML = html;

}  

export function showLoader(){
    document.getElementById('search-result-loader').classList.add('show-loader');
}


export function hideLoader(){
    document.getElementById('search-result-loader').classList.remove('show-loader');
}