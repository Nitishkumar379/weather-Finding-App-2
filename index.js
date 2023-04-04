// Initializing all elements constants
const temperatureField = document.querySelector(".weather1")
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span")
const emojiField = document.querySelector(".weather3 img")
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField")
const form = document.querySelector("form")
//Adding eventListner to the form
form.addEventListener("submit",search)
// default location
let target = "delhi";
// function to fetch Data from weather Api
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=b6e492a7b95642f7a0b133230221112&q=${target}`

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data); 
    // Destructuring 
    const {
        current: { temp_c, condition: {
            text, icon
        } }, location: { name, localtime },
    } = data;
    // calling updateDom function
    updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not Found");
    }
};
//function to update Dom
function updateDom(temp, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    temperatureField.innerText = temp;
    cityField.innerText = city;

    // console.log(exactDay);
    emojiField.src = emoji
    weatherField.innerText = text;
    dateField.innerText = `${exactTime}-${getDayFullName(exactDay)} ${exactDate}`;
    // console.log(time);
}

fetchData(target)

// b6e492a7b95642f7a0b133230221112            Api key--------------------------------------------//
// function to search the location
function search(e){
    e.preventDefault();
    target=searchField.value;
    fetchData(target);
}

//function to get the name of day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday"
            break;
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
         case 6:
            return "Saturday"
            break;

        default:
            return "Don't Know"
            break;
    }
}