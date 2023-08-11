import { getImages } from './pixabay-api.js';
import { createGalleryMarkup } from './createGalleryMarkup.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery-list');
const loadMoreBtn = document.querySelector('.load-more-button');

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

let userQuery = '';
let amountPerPage = 40;
let currentPage = 1;

searchFormEl.addEventListener('submit', onSearch);

export async function onSearch(evt) {
    evt.preventDefault();
    
    currentPage = 1;
    userQuery = evt.target.firstElementChild.value.trim();

    if (!userQuery) {
        return;
    }

    const resp = await getImages(userQuery, currentPage)
    try {
        const galleryItems = resp.data.hits;
        const totalHits = resp.data.totalHits;
        const totalPages = Math.ceil(totalHits / amountPerPage);

        galleryListEl.innerHTML = '';

        if (galleryItems.length === 0) {
            loadMoreBtn.classList.add('is-hidden');
            Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        } else {
            Notify.success(`Hooray! We found ${totalHits} images.`);
            galleryListEl.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));
            lightbox.refresh();

            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * (-100),
            behavior: "smooth",
            }); 
        }

        if (totalPages > currentPage) {
            loadMoreBtn.classList.remove('is-hidden');
        }
    }   
    catch (error) {
        console.log(error);
    }
    finally {
        evt.target.reset();
    }
}

loadMoreBtn.addEventListener('click', onLoad);

async function onLoad() {
    currentPage += 1;
    const response = await getImages(userQuery, currentPage);

    const galleryItems = response.data.hits;
    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / amountPerPage);
    
    galleryListEl.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));
    lightbox.refresh();

    if (currentPage === totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
}


