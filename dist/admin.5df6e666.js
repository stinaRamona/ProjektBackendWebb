"use strict";
//Hämta in från local storage
let storedUser = localStorage.getItem("user");
let storedToken = localStorage.getItem("token");
let adminHeaderEl = document.getElementById("adminHeader");
console.log(storedUser);
console.log(storedToken);
console.log(adminHeaderEl);
adminHeaderEl.innerHTML = storedUser;

//# sourceMappingURL=admin.5df6e666.js.map
