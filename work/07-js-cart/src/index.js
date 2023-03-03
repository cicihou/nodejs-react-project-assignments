import state from './state';
import { fetchCatList } from './services';
import { render, generateCartHtml } from './view';

const rootEl = document.querySelector('.main');

rootEl.addEventListener('click', (e) => {
  if(e.target.classList.contains('cat__add')) {
    const name = e.target.dataset.name;
    state.updateCart(name);
    const count = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(count) + 1;
    generateCartHtml(state.cart, document.querySelector('.cart__panel'));
  }

  if (e.target.classList.contains('cart__view')) {
    e.target.style.display = 'none';
    const cartRoot = document.querySelector('.cart__panel');
    generateCartHtml(state.cart, cartRoot);
    cartRoot.style.display = 'block';
  }

  if (e.target.classList.contains('cart__hide')) {
    document.querySelector('.cart__panel').style.display = 'none';
    document.querySelector('.cart__view').style.display = 'block';
  }

  if (e.target.classList.contains('cart__checkout')) {
    document.querySelector('.cart__panel').style.display = 'none';
    document.querySelector('.cart__view').style.display = 'block';
    state.cart = {};
    document.getElementsByClassName('cart__count')[0].innerText = '';
  }

  if (e.target.classList.contains('quantity__add')) {
    const name = e.target.dataset.name;
    state.cart[name].quantity += 1;
    const count = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(count) + 1;
    const cartRoot = document.querySelector('.cart__panel');
    generateCartHtml(state.cart, cartRoot);
  }

  if (e.target.classList.contains('quantity__decrease')) {
    const name = e.target.dataset.name;
    if (state.cart[name].quantity === 1) {
      delete state.cart[name];
    } else {
      state.cart[name].quantity -= 1;
    }
    const count = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(count) === 1 ? '' : Number(count) - 1;
    const cartRoot = document.querySelector('.cart__panel');
    generateCartHtml(state.cart, cartRoot);
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
