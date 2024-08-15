let tempCard = {};
export function getStorageData(){
    const planTripData = JSON.parse(localStorage.getItem("planTripData"));
    return planTripData;
}

export function addStorageData(item) {
    let planTripData = JSON.parse(localStorage.getItem("planTripData"));
    
    if (planTripData != null) {
        const index = planTripData.findIndex(existingItem => existingItem.geonameId === item.geonameId);
        
        if (index !== -1) {
            // Replace the existing item
            planTripData[index] = item;
        } else {
            // Add the new item to the beginning of the array
            planTripData.unshift(item);
        }
    } else {
        planTripData = [];
        planTripData.push(item);
    }

    localStorage.setItem('planTripData', JSON.stringify(planTripData));
}

export function setTempData(data){
    tempCard = data;
}


export function getTempData(){
    return tempCard;
}


/*
Add uniqe locatiin
delete location
fixed clik on save 
c=hnage button of save


Allow user to add multiple destinations on the same trip.
Pull in weather for additional locations.

Instead of just pulling a single day forecast, pull the forecast for multiple days.


Incorporate icons into forecast.

Allow user to Print their trip and/or export to PDF.

Allow the user to add a todo list and/or packing list for their trip.

*/