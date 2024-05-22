"use strict"; 

//Hämta in från local storage
let storedUser = localStorage.getItem('user'); 
let storedToken = localStorage.getItem('token');
let adminHeaderEl = document.getElementById("adminHeader");  
//för formulär 
let addBtnEl = document.getElementById("addBtn"); 
//för error
let errorDivAdminEl = document.getElementById("errorDivAdmin"); 

//skriver ett meddelande vid inladdning av sidan
function init() {
    adminHeaderEl.innerHTML = "Välkommen tillbaka " + storedUser;
} 

//hämta värden från formulär
addBtnEl.addEventListener('click', (event) => {
    event.preventDefault(); //så att inte sidan laddas om 

    let dishNameStr = document.getElementById("dishName").value; 
    let priceStr = document.getElementById("price").value; 
    let descriptionStr = document.getElementById("description").value; 
    let allergensStr = document.getElementById("allergens").value; 

    if(dishNameStr == "" || priceStr == "" || descriptionStr == ""){
        errorDivAdminEl.innerHTML = "Du måste skriva i namn, pris och beskrivning"
    } else {
        addToMenu(dishNameStr, priceStr, descriptionStr, allergensStr); 
    }
}); 

async function addToMenu(dishName, price, description, allergens){

    
}



//initiering av sidan 
window.onload = init()