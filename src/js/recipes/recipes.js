

// // Цей пошук потрібен лише для відмалювання, коли Діма доробить запит, то ми його видалимо



const containerForRecipes = document.querySelector('.container-for-recipes')


// function fetchBreeds() {
//     const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

//   return fetch(`${BASE_URL}`)
//     .then((resp) => {
//     if (!resp.ok) {console.log('Oops! Something went wrong! Try reloading the page!')}
//     return resp.json();
//     })
//     .catch(() =>console.dir('Oops! Something went wrong! Try reloading the page!'))
// }

//   fetchBreeds().then((data) => {
    
//     // const { _id, title, preview, description, rating } = data.results
//     containerForRecipes.innerHTML = createMarkupElForFilter(data.results)
    //     }
//   }).catch(() => {
//     console.log('err');
//   })

// важлива create функція

export function createMarkupElForFilter(arr) {
  
 return arr.map(({ _id, title, preview, description, rating }) => 
 
   `<div class="blok-recipes id="${_id}">
       <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem"
        name="heart-icon"
        value="off"
      />
      <label for="heart" aria-hidden="true" class="heart-icon-action">
        <svg class="icon-heart-svg" width="22" height="22">
          <use href="./img/icon-sprite.svg#icon-heart"></use>
        </svg>
      </label>

       <img class="img-blok-recipes" src="${preview}" alt="${title}" />

 <div class="context-blok-recipes"> <h3 class="title-blok-recipes">${title}</h3>
  <p class="text-blok-recipes">${description}</p>
  <div class="num-stars-btn"><div class="blok-rating">
    <p class="text-number-blok-recipes">${rating}</p>
     <div class="stars">
     <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      </div>
      </div>
  
  <button class="btn-blok-recipes-see" type="button">See recipe</button></div>
  </div>

</div>`).join(''); 
   
}
  
let action = false;
const KEY_FEEDBACK = 'saveCheckedFavorite';
let arrLocalStor = [];
let uniqueArrForLocalStor =JSON.parse(localStorage.getItem(KEY_FEEDBACK)) ?? [];
let idCard;

// console.log(iconSvg);
containerForRecipes.addEventListener('change', onClickHeart)


function onClickHeart(e) {
// const iconSvg = document.querySelector('.icon-heart-svg');
  if (!e.target) {
      return
  }

  if (e.target.value === 'on') {
     e.target.value = 'off';
  console.log("Я видаляю");
    console.log('idCard', idCard);
    let indexElCard = uniqueArrForLocalStor.indexOf(idCard);
    console.log(indexElCard);
    uniqueArrForLocalStor.splice(indexElCard, 1);
    console.log(uniqueArrForLocalStor);
      localStorage.setItem(KEY_FEEDBACK, JSON.stringify(uniqueArrForLocalStor));

  } else {
    console.log('Я додаю');




  
  // if (e.target.contains('svg-active')) {
  //       delete(arrLocalStor[e.target.id]) }
  
  //якщо клікнуте
    if (e.target.checked) {
    
      //  iconSvg.classList.add('svg-active');
      e.target.value = 'on';
      idCard = e.target.id
      arrLocalStor.push(idCard);
      console.log(e.target.value);
      console.log(arrLocalStor);
    }


 uniqueArrForLocalStor = arrLocalStor.filter(
   (elem, index, array) => array.indexOf(elem) === index);
  console.log(uniqueArrForLocalStor);
  localStorage.setItem(KEY_FEEDBACK, JSON.stringify(uniqueArrForLocalStor));
 }}
