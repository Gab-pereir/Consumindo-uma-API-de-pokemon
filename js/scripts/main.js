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

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=27&offset=0');



function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

const areaTypes = document.getElementById('js-type-area');
const areaTypesMobile = document.querySelector('.dropdown-select');

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type'
})
.then(response => {
  const { results } = response.data;

  results.forEach((type, index) => {
    
    if (index < 18){

      let itemType = document.createElement('li');
      areaTypes.appendChild(itemType);
  
      let buttonType = document.createElement('button');
      buttonType.classList = `type-filter ${type.name}`;
      itemType.appendChild(buttonType);
  
      let iconType = document.createElement('div');
      iconType.classList = "icon";
      buttonType.appendChild(iconType);
  
      let srcType = document.createElement('img');
      srcType.setAttribute('src', `img/icon-types/${type.name}.svg`);
      iconType.appendChild(srcType);

      let nameType = document.createElement('span');
      nameType.textContent =(type.name);
      buttonType.appendChild(nameType);

      // Aqui é o preenchimento do select mobile dos tipos
      let itemTypeMobile = document.createElement('li');
      areaTypesMobile.appendChild(itemTypeMobile);

      let buttonTypeMobile = document.createElement('button');
      buttonTypeMobile.classList = `type-filter ${type.name}`
      buttonTypeMobile.setAttribute('code-type', index + 1);
      itemTypeMobile.appendChild(buttonTypeMobile);

      let iconTypeMobile = document.createElement('div');
      iconTypeMobile.classList = "icon";
      buttonTypeMobile.appendChild(iconTypeMobile);

      let srcTypeMobile = document.createElement('img');
      srcTypeMobile.setAttribute('src', `img/icon-types/${type.name}.svg`);
      iconTypeMobile.appendChild(srcTypeMobile);

      let nameTypeMobile = document.createElement('span');
      nameTypeMobile.textContent = (type.name);
      buttonTypeMobile.appendChild(nameTypeMobile);      
    }
  })
})

// aqui é o script que faz a funcionalidade do load more
const btnLoadMore = document.getElementById('js-btn-load-more');

let countPagination = 10;

function showMorePokemon() {
  listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);

  countPagination = countPagination + 9;
}
btnLoadMore.addEventListener('click', showMorePokemon);

