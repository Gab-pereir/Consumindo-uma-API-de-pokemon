//Slide
document.addEventListener('DOMContentLoaded', function() {
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

function openDetailsPokemon(){
    document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon(){
    document.documentElement.classList.remove('open-modal');
}

cardPokemon.forEach(card => {
    card.addEventListener('click', openDetailsPokemon);
})

btnCloseModal.addEventListener('click', closeDetailsPokemon);

