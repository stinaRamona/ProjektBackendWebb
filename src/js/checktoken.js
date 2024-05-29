"use strict"; 

async function init(){ 
    //hämtar (om finns)
    let storedToken = localStorage.getItem('token');

    //Kontorllerar om token finns 
    if(!storedToken) {
        window.location.href = "login.html"; 
        return; 
    }

}

window.onload = init(); 