import { spinner } from './constants/constants';

const showSpinner = () => {
  spinner.style.display = 'block';
};

const hideSpinner = () => {
  spinner.style.display = 'none';
};

export { showSpinner, hideSpinner };
