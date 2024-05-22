"use strict"; 

//Hämta in från local storage
let storedUser = localStorage.getItem('user'); 

let storedToken = localStorage.getItem('token');

let adminHeaderEl = document.getElementById("adminHeader");  

adminHeaderEl.innerHTML = "Välkommen tillbaka " + storedUser; 

//Ändra meny 

