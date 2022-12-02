// Add imports above this line
// const simplelightbox = require('simplelightbox');
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

console.log(galleryItems);


const gallery = document.querySelector('.gallery');
const imgGallery = createGallery(galleryItems);

gallery.insertAdjacentHTML('beforeend', imgGallery);
console.log(createGallery);

function createGallery(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
        return `
<div class="gallery__item">
<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `
    }).join('');
};

gallery.addEventListener('click', onGalleryClick);



function onGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName != 'IMG') {
        return;
    }

const instance = basicLightbox.create(
  `<img src = "${event.target.dataset.source}" width = "800" height = "600"/>`, {
    onShow: () => {document.addEventListener('keydown', onEscapeModalClose)},
onClose: () => {document.removeEventListener("keydown", onEscapeModalClose)},
  }
  );

  instance.show();
  function onEscapeModalClose(evt) {
  if (evt.code === "Escape") {
    instance.close();
  }
};
};