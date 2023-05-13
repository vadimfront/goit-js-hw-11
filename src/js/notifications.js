import { Notify } from 'notiflix/build/notiflix-notify-aio';

const showFailureNotification = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

const showSuccessNotification = totalHits => {
  Notify.success(`Hooray! We found ${totalHits} images.`);
};

const showEndOfResultsNotification = () => {
  Notify.info("We're sorry, but you've reached the end of search results.");
};

export {
  showFailureNotification,
  showSuccessNotification,
  showEndOfResultsNotification,
};
