import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const gallery = document.querySelector('div.gallery');

for (const image of galleryItems) {
  const galleryItem = document.createElement('a');
  galleryItem.classList.add('gallery__item');
  galleryItem.href = image.original;

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.src = image.preview;
  img.alt = image.description;

  galleryItem.insertAdjacentElement('afterbegin', img);
  gallery.insertAdjacentElement('afterbegin', galleryItem);
}

gallery.addEventListener('click', onImageClick);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  lightbox.on('show.simplelightbox');
}
