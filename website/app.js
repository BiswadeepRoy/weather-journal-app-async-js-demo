/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apikey = '&appid=c3ed2f2ae9671c3671b587f5fbd620b9&units=metric'; // Personal API Key for OpenWeatherMap API and metric units for Celsius scale
let userEntry = "";

/* api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} API link*/
/* api key = c3ed2f2ae9671c3671b587f5fbd620b9 */
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntryHolderContent);

/* Function to GET Web API Data*/
const getWeather = async(baseURL, apikey, zipcode) => {
    const response = await fetch(`${baseURL}${zipcode},us${apikey}`);
    try {
        const responseData = await response.json();
        return responseData.main.temp_max.toString() + " C";

    } catch (error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async(url, responseObj = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseObj)
    });
    try {
        const newData = await response;
    } catch (error) {
        console.log('Post error', error);
    }
}

/* Function to GET Project Data and update on UI*/
const updateUI = async(url) => {
    const response = await fetch(url);
    try {
        const responseData = await response.json();
        document.getElementById('date').textContent = responseData.date;
        document.getElementById('temp').textContent = responseData.temparature;
        document.getElementById('content').textContent = responseData.feelings;

        console.log(responseData);
    } catch (error) {
        console.log('Get error', error);
    }
}

/* Function called by event listener */
function generateEntryHolderContent(event) {
    let zipcode = document.getElementById('zip').value;
    userEntry = document.getElementById('feelings').value;

    getWeather(baseURL, apikey, zipcode)
        .then(function(weather) {
            postData('/postdata', {
                temparature: weather,
                date: newDate,
                feelings: userEntry
            });
        }).then(function() {
            updateUI('/getdata')
        });
}