# Travel Planner App

This is implementation for Project: Travel Planner App
The Travel Planner App is a web tool that allows users to plan his next trip.

The goal of this project is to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Using APIs and creating requests to external URLs

The Application features
- Search for city and return city data
- Get Weather Forecast for arrived date
- Get Destination images and make it as slider.
- Get all trip Weather Forecast
- Show current Weather icon
- Calculate Duration time
- Calculate Days Left to the trip
- Save trip to Saved tab (Local storge)
- Add more information about trip like: Flight ,Lodging ,List ,Notes
- Update data trip by save find it by geonameId
- Remove trip from the (Local storge)

## Getting started
```
npm install 
```
if you face problem use this:
```
npm install --legacy-peer-deps
```

### Node & npm
```
node v20.11.0
npm 10.2.4
```

To run Server side on dev environment:
```
npm run start 
```
this will run serve on port 8888 

To run client side use:
```
npm run build-dev  
```
you can now check this URL to access the project
```
http://localhost:3000/
```

## Setting up the API

You need to creat account for  https://www.weatherbit.io , https://geonames.org, https://pixabay.com
and change the .env to your API key 
```
API_KEY = 647*********************

WEATHERBIT_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
WEATHERBIT_KEY = '&key=63e49*********************'


# API URL for geonames
GEONAMES_URL = 'http://api.geonames.org/searchJSON?q='
GEONAMES_KEY = '&maxRows=10&username=zei**********b'

# API URL fro pixabay
PIXABAY_URL = 'https://pixabay.com/api/?&image_type=photo&q='
PIXABAY_KEY = '&key=33701545-f6503********************'

```

## Deploying

I already deployed the project to this url

[https://travel-planner-app-kappa.vercel.app/](https://travel-planner-app-kappa.vercel.app/)

## Get in touch with me

[![My Skills](https://skillicons.dev/icons?i=js,html,css,angular,react,jquery,figma,mysql,php,wordpress)](https://zeyadmh.com)

Links

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/zeiad-habbab/)



## 💖 Support the Project

Thank you so much already for using my projects! If you want to go a step further and support my open source work, buy me a coffee:

<a href='https://ko-fi.com/O4O5114F0U' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>



