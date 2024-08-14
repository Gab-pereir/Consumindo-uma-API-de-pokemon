//Slide
document.addEventListener('DOMContentLoaded', function () {
  var slide_hero = new Swiper('.slide-hero', {
    effect: 'fade',
    pagination: {
      el: '.slide-hero .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });
});


//Modal
const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details');



cardPokemon.forEach(card => {
  card.addEventListener('click', openDetailsPokemon);
})

btnCloseModal.addEventListener('click', closeDetailsPokemon);

//list

const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
})



const areaPokemons = document.getElementById('js-list-pokemons')

function createCardPokemon (code, type, nome, imagepok){
  let card = document.createElement('button')
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  areaPokemons.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imgSrc = document.createElement('img');
  imgSrc.classList ='thumb-img'
  imgSrc.setAttribute('src', imagepok)
  image.appendChild(imgSrc);

  let infoCardPokemon = document.createElement('div');
  infoCardPokemon.classList = 'info';
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement('div');
  infoTextPokemon.classList = 'text';
  infoCardPokemon.appendChild(infoTextPokemon);

  let codePokemon = document.createElement('span');
  codePokemon.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}` ;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  namePokemon.textContent = nome;
  infoTextPokemon.appendChild(namePokemon);
  
  let areaIcon = document.createElement('div');
  areaIcon.classList = "icon";
  infoCardPokemon.appendChild(areaIcon);
  
  let imgType = document.createElement('img');
  imgType.setAttribute('src', `img/icon-types/${type}.svg`);
  areaIcon.appendChild(imgType)
}

function listingPokemons(urlApi) {
  axios({
    method: 'GET',
    url: urlApi
  })
    .then((response) => {
      const countPokemons = document.getElementById('js-count-pokemons');
      const { results, next, count } = response.data;
      
      countPokemons.innerText = count;

      results.forEach(pokemon => {
        let urlApiDetails = pokemon.url;

          axios({
            method: 'GET',
            url: `${urlApiDetails}`
          })
          .then(response =>{
            const { name, id, sprites, types} = response.data; 

            const infoCard = {
              nome: name,
              code: id,
              image: sprites.other.dream_world.front_default,
              type: types[0].type.name
            }

            createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);  
            
            const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');

            cardPokemon.forEach(card => {
              card.addEventListener('click', openDetailsPokemon)
            })
          })   
      })
      
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');



function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}