// Slide - Inicialização do Swiper para o slide principal
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

// Modal - Abertura e fechamento do modal de detalhes dos Pokémons
const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details');

cardPokemon.forEach(card => {
  card.addEventListener('click', openDetailsPokemon); 
})

btnCloseModal.addEventListener('click', closeDetailsPokemon); 

// Dropdown - Funcionalidade para abrir/fechar o dropdown customizado
const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active'); // Alterna o estado ativo do dropdown
})

// Criação de Cards de Pokémons
const areaPokemons = document.getElementById('js-list-pokemons');

function createCardPokemon(code, type, nome, imagepok) {
  // Criação do elemento do card
  let card = document.createElement('button');
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  areaPokemons.appendChild(card);

  // Criação e adição da imagem do Pokémon
  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imgSrc = document.createElement('img');
  imgSrc.classList = 'thumb-img';
  imgSrc.setAttribute('src', imagepok);
  image.appendChild(imgSrc);

  // Criação e adição das informações do card
  let infoCardPokemon = document.createElement('div');
  infoCardPokemon.classList = 'info';
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement('div');
  infoTextPokemon.classList = 'text';
  infoCardPokemon.appendChild(infoTextPokemon);

  // Adição do código e nome do Pokémon
  let codePokemon = document.createElement('span');
  codePokemon.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  namePokemon.textContent = nome;
  infoTextPokemon.appendChild(namePokemon);

  // Criação e adição do ícone do tipo do Pokémon
  let areaIcon = document.createElement('div');
  areaIcon.classList = "icon";
  infoCardPokemon.appendChild(areaIcon);

  let imgType = document.createElement('img');
  imgType.setAttribute('src', `img/icon-types/${type}.svg`);
  areaIcon.appendChild(imgType);
}

// Listagem dos Pokémons - Requisição à API e criação de cards
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
          .then(response => {
            const { name, id, sprites, types } = response.data;

            const infoCard = {
              nome: name,
              code: id,
              image: sprites.other.dream_world.front_default,
              type: types[0].type.name
            }

            createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);

            const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');

            cardPokemon.forEach(card => {
              card.addEventListener('click', openDetailsPokemon); 
            })
          })
      })

    })
}

// Inicialização da listagem de Pokémons
listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=27&offset=0');

// Funções de abrir e fechar modal
function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal'); // Abre o modal
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal'); // Fecha o modal
}

// Tipos de Pokémons - Requisição à API e preenchimento das áreas de tipos
const areaTypes = document.getElementById('js-type-area');
const areaTypesMobile = document.querySelector('.dropdown-select');

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type'
})
  .then(response => {
    const { results } = response.data;

    results.forEach((type, index) => {

      if (index < 18) {

        // Preenchimento da área de tipos no desktop
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
        nameType.textContent = (type.name);
        buttonType.appendChild(nameType);

        // Preenchimento do select mobile dos tipos
        let itemTypeMobile = document.createElement('li');
        areaTypesMobile.appendChild(itemTypeMobile);

        let buttonTypeMobile = document.createElement('button');
        buttonTypeMobile.classList = `type-filter ${type.name}`;
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

// Botão Load More - Carregar mais Pokémons
const btnLoadMore = document.getElementById('js-btn-load-more');

let countPagination = 10;

function showMorePokemon() {
  listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);

  countPagination = countPagination + 9; // Incrementa o offset para carregar mais Pokémons
}
btnLoadMore.addEventListener('click', showMorePokemon); // Adiciona o evento de clique ao botão Load More
