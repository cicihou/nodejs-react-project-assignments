import state from './state';
import { fetchCatList, addCat } from './services';
import render from './view';

const rootEl = document.querySelector('.main');

rootEl.addEventListener('click', (e) => {
  if(e.target.classList.contains('cat__add')) {
    const name = e.target.dataset.name;
    addCat(name);
  }
});


fetchCatList()
.then( cats => {
  state.updateCats(cats);
  render(state, rootEl);
})
.catch( error => {
  console.warn("replace this with actual error reporting", error);
});
