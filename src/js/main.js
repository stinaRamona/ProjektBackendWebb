"use strict"; 

//Hämtar in element 
let menuDivEl = document.getElementById("menuDiv"); 

//Hämta data från API 
async function getMenu(){
    try {
        let response = await fetch("https://projektbackend.onrender.com/api/menu"); 

        let menu = await response.json(); 

        printMenu(menu); 

    } catch(error) {
        console.log("Något gick fel!" + error); 
    }
}

//läser ut menyn från API
function printMenu(menu){
    
    menu.forEach(menuItem => {
        let item = document.createElement("article"); 

        item.innerHTML = `
        <div class="cursiveTxt">${menuItem.dishName}..........${menuItem.price} kr</div> <br>
        ${menuItem.description}<br><br>`

        menuDivEl.appendChild(item); 
    });
}


window.onload = getMenu(); 