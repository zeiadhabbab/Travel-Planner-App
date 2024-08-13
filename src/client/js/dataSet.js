
export async function getStorageData(){
    const planTripData = JSON.parse(localStorage.getItem("planTripData"));
    return planTripData
}

export async function addStorageData(item){

    let planTripData = JSON.parse(localStorage.getItem("planTripData"));
    if(planTripData != null){
        planTripData.unshift(item);
    }else{
        planTripData = [];
        planTripData.push(item);
    }

    localStorage.setItem('planTripData', JSON.stringify(planTripData));

}


/*
Add uniqe locatiin
delete location
fixed clik on save 
c=hnage button of save
*/