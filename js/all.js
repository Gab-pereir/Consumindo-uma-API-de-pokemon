"use strict";document.addEventListener("DOMContentLoaded",function(){new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .swiper-pagination",clickable:!0},autoplay:{delay:3e3,disableOnInteraction:!1},loop:!0})});var cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),btnCloseModal=document.querySelector(".js-close-modal-details");cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),btnCloseModal.addEventListener("click",closeDetailsPokemon);var btnDropdownSelect=document.querySelector(".js-open-select-custom");btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")});var areaPokemons=document.getElementById("js-list-pokemons");function createCardPokemon(e,t,n,o){var a=document.createElement("button");a.classList="card-pokemon js-open-details-pokemon ".concat(t),areaPokemons.appendChild(a);var c=document.createElement("div");c.classList="image",a.appendChild(c);var d=document.createElement("img");d.classList="thumb-img",d.setAttribute("src",o),c.appendChild(d);c=document.createElement("div");c.classList="info",a.appendChild(c);d=document.createElement("div");d.classList="text",c.appendChild(d);a=document.createElement("span");a.textContent=(e<10?"#00":e<100?"#0":"#").concat(e),d.appendChild(a);a=document.createElement("h3");a.textContent=n,d.appendChild(a);a=document.createElement("div");a.classList="icon",c.appendChild(a);c=document.createElement("img");c.setAttribute("src","img/icon-types/".concat(t,".svg")),a.appendChild(c)}function listingPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),n=e.data,e=n.results,n=(n.next,n.count);t.innerText=n,e.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,n=t.name,o=t.id,e=t.sprites,t=t.types,t={nome:n,code:o,image:e.other.dream_world.front_default,type:t[0].type.name};createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");