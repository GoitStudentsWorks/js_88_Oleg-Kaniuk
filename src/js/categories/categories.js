import axios from 'axios';
import { backdropElem} from "/js/modal-recipe/modal-recipe.js"
import { onModal} from "/js/modal-recipe/modal-recipe.js"
import { createMarkupElForFilter } from '/js/recipes/recipes.js';
import { onCreateGoldStar } from '/js/recipes/recipes.js';
const BASEURL_CATEGORIES =
    'https://tasty-treats-backend.p.goit.global/api/categories';
const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';
export let responseFromCategoryFunction = null;
export let evtCategories = ''
export let evtStartMarkup = ''
const allCategoriesButton = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');
export const galleryEl = document.querySelector('.container-for-recipes');
const cardsPerPage = {
    small: 6,
    medium: 8,
    large: 9,
};
const getLocalStorageId = JSON.parse(localStorage.getItem('saveCheckedFavorite')) ?? [];
const getCardPerPage = () => {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 768) {
        return 'small';
    } else if (windowWidth < 1200) {
        return 'medium';
    } else {
        return 'large';
    }
};
export async function getRecipesByCategory(event) {
    evtCategories = event
    const buttons = document.querySelectorAll('.categories-list-element');
    buttons.forEach(button => {
        button.classList.remove('is-active');
    });
    event.target.classList.add('is-active');
    const checkedCategory = event.target.textContent;
    const currentCardPerPage = cardsPerPage[getCardPerPage()];
    try {
        const response = await axios.get(BASEURL_RECIPES, {
            params: {
                category: checkedCategory,
                page: 1,
                perPage: cardsPerPage,
            },
        });
        galleryEl.innerHTML = '';

        galleryEl.innerHTML = createMarkupElForFilter(response.data.results, getLocalStorageId);
        onCreateGoldStar(response.data.results);
        //  модалка  рецепт
        const cardsRecipesBtn = document.querySelectorAll(".btn-blok-recipes-see");
        [...cardsRecipesBtn].forEach(function (card) {
            const id = card.id;
            card.addEventListener('click', () => {
                onRecipeClick(id);
 
            });
        
        });
        responseFromCategoryFunction = response.data.results;
    } catch (error) {
        console.error(`Failed to fetch images: ${error}`);
    }
}

if (categoriesList && allCategoriesButton && galleryEl) {
    const fetchImages = async() => {
        try {
            const response = await axios.get(BASEURL_RECIPES, {
                params: {
                    page: 1,
                    limit: cardsPerPage[getCardPerPage()],
                },
            });
            evtStartMarkup = response.data.results
            if (galleryEl) {
                galleryEl.innerHTML = '';
                galleryEl.innerHTML = createMarkupElForFilter(response.data.results, getLocalStorageId);
                onCreateGoldStar(response.data.results);
                 //  модалка  рецепт
        const cardsRecipesBtn = document.querySelectorAll(".btn-blok-recipes-see");
        [...cardsRecipesBtn].forEach(function (card) {
            const id = card.id;
            card.addEventListener('click', () => {
                onRecipeClick(id);
 
            });
        
        });
            }
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };
    const fetchCategories = async() => {
        try {
            const response = await axios.get(BASEURL_CATEGORIES);
            const categories = response.data;
            const categoryButtons = categories
                .map(
                    category =>
                    `<li>
                <button class="categoreis-list-element">${category.name}</button>
                </li>`
                )
                .join('');
            categoriesList.innerHTML = categoryButtons;
            fetchImages();
        } catch (error) {
            console.error(error);
        }
    };


    const handleAllCategoriesBtnClick = () => {
        const buttons = document.querySelectorAll('.categories-list-element');
        buttons.forEach(button => {
            button.classList.remove('is-active');

        });
        allCategoriesButton.classList.add('is-active');
        galleryEl.innerHTML = '';
        evtCategories = '';
        fetchImages(evtCategories);
    };

    window.addEventListener('resize', fetchImages);
    window.addEventListener('load', fetchImages);

    categoriesList.addEventListener('click', getRecipesByCategory);
    allCategoriesButton.addEventListener('click', handleAllCategoriesBtnClick);
    fetchCategories();
} else {
    console.log("error");
}
        //  модалка  рецепт
onRecipeClick
function onRecipeClick(id) {
backdropElem.classList.remove('is-hidden-recipe-backdrop')
 onModal(id)
};