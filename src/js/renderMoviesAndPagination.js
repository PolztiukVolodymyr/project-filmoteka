import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import { validationSearchedArray } from './onSearchByKeyWord';
import movieTemplate from './movieTamplate';
import createPagination from './pagination';
import toggleDragonSpiner from './spiner';
import onMyLibraryBtnClick from './my-library/myLibraryBtn';
import {renderQueueMovies} from './my-library/renderMyLibraryMovies';

refs.headerLogo.addEventListener('click', onLogoAndHomeClickHandler);
refs.headerHomePage.addEventListener('click', onLogoAndHomeClickHandler);

export default function renderMoviesAndPagination() {
  refs.filmsContainer.innerHTML = '';
  if (userFilms.userSearch) {
    toggleDragonSpiner();
    userFilms.onSearchFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          if (validationSearchedArray(results)) return;
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  } else {
    toggleDragonSpiner();
    userFilms.getTrendingFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  }
};

// renderMoviesAndPagination();
checkWhatPageRender();

function renderTrendsOnMain(films) {
  const murkup = films.map(movieTemplate);
  refs.filmsContainer.innerHTML = murkup.join('');
};


export function onLogoAndHomeClickHandler(event){
  event.preventDefault()
  localStorage.setItem('page', '1');
  localStorage.setItem('library', false);
  userFilms.setPage(1);
  renderMoviesAndPagination();
};


function checkWhatPageRender(){
  const library = localStorage.getItem('library');
  
  if(library === 'watched'){
    console.log('render watched page');
    onMyLibraryBtnClick();
  }else if (library === 'queue'){
    console.log('render queue page');
    onMyLibraryBtnClick();
    renderQueueMovies();
    document.querySelector('.js-watched-btn').classList.remove('isActive');
    document.querySelector('.js-queue-btn').classList.add('isActive');
  }else {
    renderMoviesAndPagination();
  };
};