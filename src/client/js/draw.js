import { getSlider } from 'simple-slider';
import { getTempData, setTempData, addStorageData, getStorageData } from './dataSet.js';


export function drwaResultUI(cardData){
    document.getElementById('search-result-data').innerHTML = '';

    let images = '';
    let list = '';
    let flight = '';
    let lodging = '';
    let notes = '';

    cardData.imagesList.forEach(element => {
        images = images + `<img src="${element}">`;
    });


    if(cardData.notes){
        notes = `
            <div class="more-info">
                <div><strong>Your Notes</strong></div>
                ${cardData.notes}
            </div>
        `;
    }

    if(cardData.list){
        list = `
            <div class="more-info">
                <div><strong>Your List</strong></div>
                ${cardData.list}
            </div>
        `;
    }

    if(cardData.flight){
        flight = `
            <div class="more-info">
                <div><strong>Your Flight</strong></div>
                ${cardData.flight}
            </div>
        `;
    }

    if(cardData.lodging){
        lodging = `
            <div class="more-info">
                <div><strong>Your Lodging</strong></div>
                ${cardData.lodging}
            </div>
        `;
    }

    const html = `
    <div class="card">
        <div class="card-title">
            <div>${cardData.destination}, ${cardData.countryName}</div>
            <div>
                <a href="#" id="save-btn" class="save-btn" title="Save to Trip" data-id="${cardData.geonameId}"><i class="far fa-bookmark"></i> Save</a>
            </div>
        </div>
        <div class="card-img data-simple-slider-${cardData.geonameId}" id="data-simple-slider-${cardData.geonameId}" style="height: 150px;">
            ${images}
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
                <div><strong>Weather Forecast arrived date ( ${cardData.weatherDataByDate[0].valid_date}):</strong></div>
                <div>${cardData.weatherDataByDate[0].weather.description}</div>
                <div><strong>Min Temp:</strong> ${cardData.weatherDataByDate[0].min_temp}</div>
                <div><strong>Max Temp:</strong> ${cardData.weatherDataByDate[0].max_temp}</div>
                <div><strong>Current Temp:</strong> ${cardData.weatherDataByDate[0].temp}</div>
                <button id="all-weather-data"><i class="fa-solid fa-plus"></i> More Data</button>
            </div>
        </div>

        ${flight}
        ${list}
        ${lodging}
        ${notes}

        <div class="tool-bar">
            <div class="flight">
                <a href="#addflight" id="add-flight"><i class="fa-solid fa-plus"></i>Flight</a>
            </div>
            <div class="lodging">
                <a href="#addlodging" id="add-lodging"><i class="fa-solid fa-plus"></i>Lodging</a>
            </div>
            <div class="list">
                <a href="#addlist" id="add-list"><i class="fa-solid fa-plus"></i>List</a>
            </div>
            <div class="notes">
                <a href="#addnotes" id="add-notes"><i class="fa-solid fa-plus"></i>Notes</a>
            </div>
        </div>

    </div>
    `;

    hideLoader();
    document.getElementById('search-result-data').innerHTML = html;

    getSlider({
        container: document.getElementById('data-simple-slider-' + cardData.geonameId),
        transitionTime:1,
        delay:2.5
    });


    document.getElementById('add-flight').addEventListener('click',()=>{
        addDataToCards('flight');
    });

    document.getElementById('add-lodging').addEventListener('click',()=>{
        addDataToCards('lodging');
    });

    document.getElementById('add-list').addEventListener('click',()=>{
        addDataToCards('list');
    });

    document.getElementById('add-notes').addEventListener('click',()=>{
        addDataToCards('notes');
    });


    document.getElementById('all-weather-data').addEventListener('click',()=>{
        addDataToCards('all-weather-data', cardData);
    });


    document.getElementById('save-btn').addEventListener('click',function(event){
        let tempCard = getTempData();
        if(tempCard != null){
            addStorageData(tempCard);
            alert('Data Saved Successfully, checked saved tab');
        }
    },true);

}  

export function showLoader(){
    document.getElementById('search-result-loader').classList.add('show-loader');
}


export function hideLoader(){
    document.getElementById('search-result-loader').classList.remove('show-loader');
}


export function addDataToCards(type, cardData = null){
    let html = `
    <div class="add_data_popup" id="add_data_popup">
        <div class="add_data_from">
            $$from
            <div class="btns-bar">
                <button id="save-from">Save</button>
                <button id="cancel">Cancel</button>
            </div>
        </div>
    <div>
    `;
    let form = ``;

    switch( type ){

        case 'notes':
            form =`
            <h4>Write your nots:</h4>
            <textarea name="message" id="txt_data" rows="7" cols="25" data-type="${type}"></textarea>
            `;
        break;

        case 'lodging':
            form =`
            <h4>Write lodging:</h4>
            <textarea name="message" id="txt_data" rows="7" cols="25" data-type="${type}"></textarea>
            `;
        break;

        case 'list':
            form =`
            <h4>Write your list:</h4>
            <textarea name="message" id="txt_data" rows="7" cols="25" data-type="${type}"></textarea>
            `;
        break;

        case 'flight':
            form =`
            <h4>Write your flight:</h4>
            <textarea name="message" id="txt_data" rows="7" cols="25" data-type="${type}"></textarea>
            `;
        break;

        case 'all-weather-data':
            form = '<div class="info-weather-all">';
            cardData.weatherDataByDate.forEach(item=>{
                form = form + `
                    <div class="info weather">
                        <div><strong>Weather Forecast on: ${item.valid_date}</strong></div>
                        <div>${item.weather.description}</div>
                        <div><strong>Min Temp:</strong> ${item.min_temp}</div>
                        <div><strong>Max Temp:</strong> ${item.max_temp}</div>
                        <div><strong>Current Temp:</strong> ${item.temp}</div>
                    </div>
                `;
            });
            form = form + '</div>';
            
        break;
    }

    html = html.replace( '$$from' ,form);

    document.getElementById('popup-holder').innerHTML = html;

    document.getElementById('save-from').addEventListener('click',()=>{
        let tempCard = getTempData();
        const elm = document.getElementById('txt_data');

        if(elm && elm.value!=""){
            const type = elm.dataset.type;
            const value = elm.value;
            tempCard[type] = value;

            drwaResultUI(tempCard);

            setTempData(tempCard);

           
        }

        removePopup();

    });

    document.getElementById('cancel').addEventListener('click',()=>{
        removePopup();
    });

}


function removePopup(){
    document.getElementById("add_data_popup").remove();
}



export function drawSavedUI(){


    let html = '';
    let savedView = document.getElementById('saved-view');
    savedView.innerHTML = ''

    const cards = getStorageData();
    if(cards && cards.length > 0){
        cards.forEach(cardData=>{
            let images = '';
            let list = '';
            let flight = '';
            let lodging = '';
            let notes = '';

            cardData.imagesList.forEach(element => {
                images = images + `<img src="${element}">`;
            });


            if(cardData.notes){
                notes = `
                    <div class="more-info">
                        <div><strong>Your Notes</strong></div>
                        ${cardData.notes}
                    </div>
                `;
            }

            if(cardData.list){
                list = `
                    <div class="more-info">
                        <div><strong>Your List</strong></div>
                        ${cardData.list}
                    </div>
                `;
            }

            if(cardData.flight){
                flight = `
                    <div class="more-info">
                        <div><strong>Your Flight</strong></div>
                        ${cardData.flight}
                    </div>
                `;
            }

            if(cardData.lodging){
                lodging = `
                    <div class="more-info">
                        <div><strong>Your Lodging</strong></div>
                        ${cardData.lodging}
                    </div>
                `;
            }

            html = html + `
            <div class="card">
                <div class="card-title">
                    <div>${cardData.destination}, ${cardData.countryName}</div>
                    
                </div>
                <div class="card-img data-simple-slider-${cardData.geonameId}" id="saved-simple-slider-${cardData.geonameId}" style="height: 150px;">
                    ${images}
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

                ${flight}
                ${list}
                ${lodging}
                ${notes}

            
            </div>
            `;
        });


        savedView.innerHTML = html;
        cards.forEach(cardData=>{
            getSlider({
                container: document.getElementById('saved-simple-slider-' + cardData.geonameId),
                transitionTime:1,
                delay:2.5
            });
        });
    }else{
        savedView.innerHTML = `<div class="no-data">No Saved Data Yet!</div>`;
    }

}  
