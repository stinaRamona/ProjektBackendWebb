"use strict"; 

//läser in element från DOM 
let loginBtnEl = document.getElementById("loginBtn"); 
let errorDivLogin = document.getElementById("errorDivLogin"); 

loginBtnEl.addEventListener('click', (event)=> {
    event.preventDefault(); //gör att sidan inte laddar om

    let usernameStr = document.getElementById("usernameLogin").value; 
    let passwordStr = document.getElementById("passwordLogin").value; 

    //kontroll att strängarna inte är tomma 
    if(usernameStr == "" || passwordStr == ""){
        errorDivLogin.innerHTML = "Du måste ange både användarnam och lösenord"
    } else {
        loginUser(usernameStr, passwordStr); 
    }
})

//tar emot användarnamn + lösen och loggar in användaren
async function loginUser(username, password){
    let response = await fetch("https://projektbackend.onrender.com/api/auth/login", {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            username: username,
            password: password
        })
    }); 

    //Kontroll av innehåll 
    if(!response.ok){
        errorDivLogin.innerHTML = "Fel användarnamn eller lösenord"
    }

    let data = await response.json(); 

    console.log(data); 
}