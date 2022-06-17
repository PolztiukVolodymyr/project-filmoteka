function myLibraryHeaderTemplate(){
    return `
    <div class="header__navigation--library">
      <a class="header__logo link" href="./index.html"
        ><svg width="24" height="24">
          <use href="./images/symbol-defs.svg#icon-film"></use>
        </svg>
        <span class="header__title">Filmoteka</span>
      </a>
      <ul class="header__list list">
        <li class="header__nav">
          <a class="header__link link" href="./index.html">Home</a>
        </li>
        <li class="header__nav">
          <a class="header__link link header-nav--pege" href="#">My Library</a>
        </li>
      </ul>
    </div>
    <ul class="header__button list">
      <li class="header__item">
        <button class="header__btns header__btn--active" type="button" id="btn-watched">
          Watched
        </button>
      </li>
      <li class="header__item">
        <button class="header__btns header__btn--noactive" type="button" id="btn-queue">
          queue
        </button>
      </li>
    </ul>
    <div class="switcher">
      <button class="switcher-theme-name">Light</button>
      <label class="switch">
        <input type="checkbox" id="theme-switch" />
        <span class="slider round"></span>
      </label>
      <button class="switcher-theme-name">Dark</button>
    </div>
    `
}

export default myLibraryHeaderTemplate;