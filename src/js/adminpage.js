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
        item.setAttribute("data-id", menuItem._id); //lagrar id för rätterna

        //rätter skrivs ut med content editable så att de kan ändras enkelt
        item.innerHTML = `
        <div contenteditable="true" class="dishName">${menuItem.dishName}</div><br>
        <div contenteditable="true" class="price">${menuItem.price}</div><br>
        <div contenteditable="true" class="description">${menuItem.description}</div><br>`

        //skapa knapp för att ta bort 
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Ta bort rätt";
        deleteBtn.setAttribute('id', 'deleteBtn');  

        //skapa knapp för att uppdatera om man ändrat något
        let updateBtn = document.createElement("button"); 
        updateBtn.textContent = "Uppdatera rätt"; 

        //skickar id av den rätt som man vill ta bort till deleteFromMenu funktionen
        deleteBtn.addEventListener('click', function(){
            deleteFromMenu(menuItem._id);  
        }); 

        //skickar id och uppdaterad information av den rätt som ska uppdateras till updateMenuItem
        updateBtn.addEventListener('click', function(){
            let updatedItem = {
                dishName : item.querySelector('.dishName').innerText, 
                price : item.querySelector('.price').innerText,
                description : item.querySelector('.description').innerText
            }

            updateMenuItem(menuItem._id, updatedItem); 
        })

        item.appendChild(deleteBtn); 
        item.appendChild(updateBtn); 
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
        window.location.reload(); //så sidan laddas om
    } catch(error) {
        console.error("Något gick fel" + error); 
    }
}

//ta bort något från menyn 
async function deleteFromMenu(_id){
    try {
        let response = await fetch("https://projektbackend.onrender.com/api/menu" + _id, {
            method: "DELETE", 
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Bearer ' + storedToken
            } 
        })

        let data = await response.json(); 

        console.log(data); 
        window.location.reload(); //så sidan laddas om
    } catch(error) {
        console.log("Gick inte att radera " + error); 
    }
}

//Ändra något på menyn 
async function updateMenuItem(_id, menuItem){

    try {
        let response = await fetch("https://projektbackend.onrender.com/api/menu" + _id, {
            method: "PUT",
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Bearer ' + storedToken
            }, 
            body: JSON.stringify(menuItem)  
        })
        
        let data = await response.json(); 

        console.log(data); 
        window.location.reload(); //så sidan laddas om
    } catch(error) {
        console.log("Gick inte att uppdatera " + error); 
    }

}


//initiering av sidan 
window.onload = init()