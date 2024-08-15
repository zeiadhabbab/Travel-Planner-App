
import Typewriter from 'typewriter-effect/dist/core';

import { drwaResultUI, showLoader } from './draw.js';
import { setTempData } from './dataSet.js';

/* handle From  */

const form = document.getElementById('plan-from');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    showLoader();
    let cardData = {};

    event.preventDefault();
   
    const dateEnd = document.getElementById('date-end').value;
    const dateStart = document.getElementById('date-start').value;
    const destination = document.getElementById('destination').value;

    let  body = {dateEnd:dateEnd,dateStart:dateStart,destination:destination};
    let errorMsg = '';

    getData('getFromGeonamesAPI', body).then((geoData)=>{
        
        if(geoData && geoData.totalResultsCount && geoData.totalResultsCount > 0){
            let geonameData = geoData.geonames[0];
            cardData.destination = destination;
            cardData.lat = geonameData.lat;
            cardData.lng = geonameData.lng;

            cardData.dateEnd = dateEnd;
            cardData.dateStart = dateStart;

            cardData.daysLeft = getCountdown(dateStart);
            cardData.duration = duration(dateStart, dateEnd);

            if(cardData.daysLeft > 1 ){
                cardData.daysLeftTxt = cardData.daysLeft + ' days';
            }else{
                cardData.daysLeftTxt = cardData.daysLeft + ' day'; 
            }


            if(cardData.duration > 1 ){
                cardData.durationTxt = cardData.duration + ' days';
            }else{
                cardData.durationTxt = cardData.duration + ' day'; 
            }

            cardData.countryName = geonameData.countryName;
            cardData.countryCode = geonameData.countryCode;
            cardData.geonameId = geonameData.geonameId;
            cardData.weatherDataByDate = [];
            cardData.countryData = [];
            cardData.imagesList = [];

            errorMsg = '';
           
            body = { lat: geonameData.lat, lng: geonameData.lng };

            getData('getFromWeatherbitAPI', body).then((wetherData)=>{
                var BreakException = {};
                if(wetherData && wetherData.data && wetherData.data.length > 0 ){
                    wetherData.data.forEach(element => {
                        cardData['weatherDataByDate'].push(element);
                    });

                    let  body = {dateEnd:dateEnd,dateStart:dateStart,destination:destination};
                    getData('getFromPixabayAPI', body).then((imagesList)=>{
                        let count = 0;
                        if(imagesList && imagesList.total && imagesList.total > 0 ){
                            try {
                                imagesList.hits.forEach(element => {
                                    cardData['imagesList'].push(element.webformatURL);
                                    count++;
                                    if(count > 5){
                                        throw BreakException;
                                    }
                                    
                                });
                            } catch (e) {
                                if (e !== BreakException) throw e;
                            }

                            drwaResultUI(cardData);

                            setTempData(cardData);

                            console.log(cardData);
                        }
                    });

                }else{
                    //Wether Not return data
                }

            });
        }else{
            errorMsg = 'Location Not Found, try other destination';
        }
    });
}

async function getData(url, body){

    try {
        // Function to send data to the server
        const response = await fetch(`http://localhost:8888/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch recent entry: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error updating UI:", error);
    }
}

function getCountdown(startDate) {
    const today = new Date();
    // Format today's date as YYYY-MM-DD
    const formattedToday = today.toISOString().split('T')[0];
    const daysLeft = duration(formattedToday, startDate);
    return daysLeft;
}

function duration(dateOne, dateTwo) {
    const timestamp1 = Date.parse(dateOne);
    const timestamp2 = Date.parse(dateTwo);

    const millisecondsPerDay = 86400000; // Number of milliseconds in a day
    const differenceInMilliseconds = Math.abs(timestamp1 - timestamp2);
    const differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsPerDay);

    return differenceInDays;
}