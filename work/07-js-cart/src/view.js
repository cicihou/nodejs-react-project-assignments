function render(state, rootEl) {
  const { cats, cart } = state;
  rootEl.innerHTML = generateCatCardsHtml(cats, cart);
  document.querySelector('.cart__panel').style.display = 'none';
}

function generateCatCardsHtml(cats, cart) {
  const btn = cart ? `<button class="cart__view">View Cart (<span class="cart__count"></span>)</button>` : ``;
  const listHtml = Object.keys(cats).map( name => {
    return `
      <li class="card">
          ${generateCatCardHtml(cats[name])}
        </button>
      </li>
    `;
  }).join('');
  return `
    <ul class="cards">
      ${listHtml}
    </ul>
    ${btn}
    <div class="cart__panel"></div>
  `;
}

function generateCatCardHtml(cat) {
  const imgHtml = cat.img ? `<span class="card__color"> <img src=${cat.img}></span>` : ``;
  const price = cat.price ? `<span class="card__age">Price: ${cat.price}</span>` : ``;
  const button = `<button class="cat__add" data-name="${cat.name}">Add to Cart</button>`;
  return `
    <h2 class="card__name">${cat.name}</h2>
    ${imgHtml}
    ${price}
    ${button}
  `;
}

function generateCartHtml(cart, cartRoot) {
  let totalCost = 0;
  const cartPanel = Object.keys(cart).map( name => {
    const info = cart[name].data;
    const totalPrice = Number((cart[name].quantity * info.price).toFixed(2));
    console.log(totalPrice)
    totalCost = (Number(totalCost) + totalPrice).toFixed(2);
    return `
      <li class="cart__item">
        <div class="cart__item_info">
          <img src=${info.thumbnail}>
          <div class="info">
            <p>${info.name}</p>
            <p>Price: ${info.price}</p>
          </div>
        </div>
        <div class="cart__item_op">
            <div class="quantity">
                Quantity: 
                <span class="quantity__number">${cart[name].quantity}</span>
                <span class="quantity__add" data-name="${info.name}">+</span>
                <span class="quantity__decrease" data-name="${info.name}">-</span>
            </div>
            <div class="total">total price: <span class="total__price">${totalPrice}</span></div>
        </div>
      </li>
    `;
  }).join('');
  const nullMessage = `<p>Nothing in the cart</p>`
  const hideCartBtn = `<button class="cart__hide">Hide Cart</button>`;
  const checkoutBtn = `<button class="cart__checkout">Checkout</button>`;
  cartRoot.innerHTML = `
    <div class="cart__head">
        <div class="cart_btn">
            ${hideCartBtn}
            ${checkoutBtn}
        </div>
        <div class="total">total cost: <span class="total__price">${totalCost}</span></div>
    </div>
    <ul class="cart__list">
        ${cartPanel || nullMessage}
    </ul>
  `;
}

export { render, generateCartHtml };
