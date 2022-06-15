
import { refs } from './refs';
import { userFilms } from './api';
import { IMG_URL } from './api';


refs.closeModalBtn.addEventListener('click', oncloseModal);
refs.backdrop.addEventListener('click', onClickBackdrop);
refs.filmsContainer.addEventListener('click', onOpenModal);


function onOpenModal(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    };
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscKeyPress);

    userFilms.setId(e.target.dataset.id);
    
    userFilms.onSearchById().then(respons => {
        console.log(respons)
        
        const markup = renderSelectedFilm(respons);
        refs.modalContainer.insertAdjacentHTML('afterbegin', markup);
        refs.scrollOnModal.classList.toggle('scroll-blocked');
        refs.modalContainer.querySelector('.js-watched-btn').addEventListener('click', onWatchedBtnClick);
        refs.modalContainer.querySelector('.js-queue-btn').addEventListener('click', onQueueBtnClick);

        function onWatchedBtnClick(){
          const key = "watched"
          const watchedMovies = addToWatchedStorage();
          const moviesId = watchedMovies.map(item => item.id);

          if(moviesId.includes(respons.id)) return;
          watchedMovies.push(respons);
          localStorage.setItem(key, JSON.stringify(watchedMovies));
        }

        function onQueueBtnClick(){
          const key = "queue"
          const queueMovies = addToQueueStorage();
          const moviesId = queueMovies.map(item => item.id);

          if(moviesId.includes(respons.id)) return
          queueMovies.push(respons);
          localStorage.setItem(key, JSON.stringify(queueMovies))
      }
    })
};

function addToWatchedStorage(){
  const data = JSON.parse(localStorage.getItem("watched"));
  if(data){
      return [...data];
  }
  return [];
};
function addToQueueStorage(){
  const data = JSON.parse(localStorage.getItem("queue"));
  if(data){
      return [...data];
  }
  return [];
};

function oncloseModal() {
    window.removeEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.add('is-hidden')
    refs.modalContainer.innerHTML = "";
    refs.scrollOnModal.classList.toggle('scroll-blocked');

};


function onClickBackdrop(e) {
    if (e.currentTarget === e.target) {
      oncloseModal()
    };
};

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      oncloseModal()
    };
};

function renderSelectedFilm(film) {

  const { original_title, poster_path, genres, vote_average,vote_count,popularity, overview, id } = film;
  return  `
    <div class="modal-wrap">
      <img data-id=${id} width="50px" src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="modal-image
    "/>
      <div class="modal-info">
        <h2 class="modal__title">${original_title}</h2>
        <ul class="modal-list">
          <li class="modal-item">
            Vote / Votes <span class="modal-value">${vote_average} / ${vote_count}</span>
          </li>
          <li class="modal-item">Popularity <span class="modal-value">${popularity}</span></li>
          <li class="modal-item">Original Title <span class="modal-value">${original_title}</span></li>
          <li class="modal-item">Genre <span class="modal-value">${genres.map(ganre => ' ' + ganre.name)}</span></li>
        </ul>
        <h3 class="modal-about">ABOUT</h3>
        <p class="modal-description">${overview}</p>
        <div class="modal-button-list">
            <button data-id=${id} class="modal-button js-watched-btn">add to Watched</button>
            <button data-id=${id} class="modal-button js-queue-btn">add to queue</button>
          </div>
      </div>
    </div>
        `;
}

