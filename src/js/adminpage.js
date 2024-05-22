"use strict"; 

//Hämta in från local storage
let storedUser = localStorage.getItem('user'); 
let storedToken = localStorage.getItem('token');
let adminHeaderEl = document.getElementById("adminHeader");  
//för formulär 
let addBtnEl = document.getElementById("addBtn"); 
//för error
let errorDivAdminEl = document.getElementById("errorDivAdmin"); 
//skriva ut admin meny
let menuListAdmin = document.getElementById("menuListAdmin"); 

//skriver ett meddelande vid inladdning av sidan
async function init() {
    //hälsar välkommen
    adminHeaderEl.innerHTML = "Välkommen tillbaka " + storedUser;

    try {
        let response = await fetch("https://projektbackend.onrender.com/api/menu"); 

        let menu = await response.json(); 

        printAdminMenu(menu); 

    } catch(error) {
        console.log("Något gick fel!" + error); 
    }
} 

//hämtar meny och skriver ut så man kan uppdatera och ta bort 
function printAdminMenu(menu){
    
    menu.forEach(menuItem => {
        let item = document.createElement("article"); 

        item.innerHTML = `
        ${menuItem.dishName}<br>
        ${menuItem.price}<br>
        ${menuItem.description}<br>`

        menuListAdmin.appendChild(item); 
    });
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

//lägger till något till menyn
async function addToMenu(dishName, price, description, allergens){

    let newMenuItem = {
        dishName: dishName, 
        price: price, 
        description: description, 
        allergens: allergens
    }; 

    try {
        let response = await fetch("https://projektbackend.onrender.com/api/menu", {
            method: "POST", 
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Bearer ' + storedToken 
            },
            body: JSON.stringify(newMenuItem)
        }) 

        let data = await response.json(); 

        console.log(data)
    } catch(error) {
        console.error("Något gick fel" + error); 
    }
}

//ta bort något från menyn 
async function deleteFromMenu(){

    //behöver id från menuItem

}

//Ändra något på menyn 
async function updateMenuItem(){
    
    //behöver läsa in från body och uppdatera det som är nytt. 
    //id behövs också här 
}


//initiering av sidan 
window.onload = init()