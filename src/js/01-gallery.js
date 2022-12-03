// Add imports above this line
// const simplelightbox = require('simplelightbox');
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const imgGallery = createGallery(galleryItems);

gallery.insertAdjacentHTML('beforeend', imgGallery);

function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
    `
    }).join('');
};

const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
