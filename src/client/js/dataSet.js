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

export function removeStorageData(geonameId) {
    let planTripData = JSON.parse(localStorage.getItem("planTripData"));
    
    if (planTripData != null) {
        // Log the data before removing the item
        console.log("Before removal:", planTripData);

        // Filter out the item with the given geonameId
        planTripData = planTripData.filter(item => item.geonameId != geonameId);

        // Log the data after removing the item
        console.log("After removal:", planTripData);

        // Save the updated array back to localStorage
        localStorage.setItem('planTripData', JSON.stringify(planTripData));

        // Verify the data in localStorage after saving
        const updatedData = JSON.parse(localStorage.getItem("planTripData"));
        console.log("Updated localStorage data:", updatedData);
    } else {
        console.log("No data found in localStorage.");
    }
}


export function setTempData(data){
    tempCard = data;
}


export function getTempData(){
    return tempCard;
}


/*

Allow user to add multiple destinations on the same trip.


Incorporate icons into forecast.

Allow user to Print their trip and/or export to PDF.

Allow the user to add a todo list and/or packing list for their trip.

*/