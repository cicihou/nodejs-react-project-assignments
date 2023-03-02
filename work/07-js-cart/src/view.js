function render(state, rootEl) {
  const { cats, cart } = state; // Destructure cats property from state into new variable
  const html = generateCatCardsHtml(cats, cart);
  rootEl.innerHTML = html;
}

function generateCatCardsHtml(cats, cart) {
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
    ${generateCartHtml(cart)}
  `;
}

function generateCatCardHtml(cat) {
  const imgHtml = cat.img ? `<span class="card__color"> <img src=${cat.img}></span>` : ``;
  const price = cat.price ? `<span class="card__age">Price: ${cat.price}</span>` : ``;
  const button = `<button class="cat__add" data-name="${cat.name}">Add to Cart</button>`;
  const html = `
    <h2 class="card__name">${cat.name}</h2>
    ${imgHtml}
    ${price}
    ${button}
  `;
  return html;
}

function generateCartHtml(cart) {

  const btn = cart ? `<button>View Cart${total}</button>` : ``;

}

export default render;
