import { btnLoadMore, galleryWrapper, searchForm } from './constants/constants';
import { fetchImages } from './fetch';
import {
  showEndOfResultsNotification,
  showFailureNotification,
  showSuccessNotification,
} from './notifications';
import { lightbox } from './lightbox';

let keyword = '';
let currentPage = 1;

const getData = async () => {
  console.log('getData');
  const { hits, totalHits } = await fetchImages(keyword, currentPage);

  if (hits.length === 0 && totalHits === 0) {
    showFailureNotification();
    return;
  }
  showSuccessNotification(totalHits);

  if (hits.length === 40) btnLoadMore.classList.remove('hidden');
  render(hits);
};

const loadNextPage = async () => {
  const { hits, totalHits } = await fetchImages(keyword, currentPage);
  if (hits.length === 0 && totalHits === 0) {
    showFailureNotification();
    return;
  }
  currentPage++;
  render(hits);
  if (currentPage * 40 >= totalHits) {
    showEndOfResultsNotification();
    btnLoadMore.classList.add('hidden');
    return;
  }
};

function handlerForm(e) {
  e.preventDefault();

  const { searchQuery } = Object.fromEntries(new FormData(searchForm));
  galleryWrapper.innerHTML = '';
  currentPage = 1;
  keyword = searchQuery;
  getData();
}

function render(images) {
  const template = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
        </div>`;
      }
    )
    .join('');
  galleryWrapper.insertAdjacentHTML('beforeend', template);
  lightbox.refresh();
}

searchForm.addEventListener('submit', handlerForm);
btnLoadMore.addEventListener('click', loadNextPage);
