const { geonames } = require("./dummy");
const { wetherData } = require("./dummy");
const { pixiData } = require("./dummy");

const path = require('path');
const express = require('express');
const port = 8000;
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))
dotenv.config();

isDummy = false;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// Variables for url and api key

// API URL for weatherbit
const weatherbitURL = process.env.WEATHERBIT_URL;
const weatherbitKey = process.env.WEATHERBIT_KEY;

// API URL for geonames
const geonamesURL = process.env.GEONAMES_URL;
const geonamesKey = process.env.GEONAMES_KEY;


// API URL fro pixabay
const pixabayURL = process.env.PIXABAY_URL;
const pixabayKey = process.env.PIXABAY_KEY;

// API URL for countrylayer
const countriesAPI = process.env.COUNTRIES_API;
const countriesKey = process.env.COUNTRIES_KEY;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// POST Route for getFromGeonamesAPI
app.post("/getFromGeonamesAPI", async (req, res) => {
    console.log(req.body.destination);
   
    const requestUrl = geonamesURL + req.body.destination + geonamesKey;
    try {

        if(isDummy){

            return  res.send(geonames);

        }else{
            const response = await fetch(requestUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = await response.json();
    
            console.log(data);
            return  res.send(data);
        }

    } catch (error) {
        console.log("get request from Geonames API > " );
        console.log(error);
        return res.send(error);
    }
});



// POST Route for getFromGeonamesAPI
app.post("/getFromPixabayAPI", async (req, res) => {

    let dest = req.body.destination.replaceAll(' ', '+');
    const requestUrl = pixabayURL + dest + pixabayKey;
    
    try {
        if(isDummy){
            return res.send(pixiData);
        }else{
            const response = await fetch(requestUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = await response.json();
            return res.send(data);
        }
        
    } catch (error) {
        console.log("get request from Pixabay API > " );
        console.log(error);
        return res.send(error);
    }
});


// POST Route for getFromGeonamesAPI
app.post("/getFromWeatherbitAPI", async (req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const requestUrl = weatherbitURL + `?&lat=${lat}&lon=${lng}` + weatherbitKey;
   
    try {
        if(isDummy){
            const response = await fetch(requestUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            return res.send(data);
        }else{
            return res.send(wetherData);
        }
    } catch (error) {
        console.log("get request from Weatherbit API > " );
        console.log(error);
        return res.send(error);
    }
});


// POST Route for getFromCountryAPI
app.post("/getFromCountryAPI", async (req, res) => {
    const country = res.countData.country;
    const requestUrl = countriesAPI + country + countriesKey;
   
    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("get request from Country API > " );
        console.log(error);
        return error;
    }
});


// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log('Serve app listening on port ' + port);
});


