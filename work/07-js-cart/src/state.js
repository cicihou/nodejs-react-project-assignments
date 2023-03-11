const state = {
  cats: {},
  cart: {}
};

// cart = {'noodle': {}, 'orange': <cat>}

const storage = require("./storage");


state.updateCats = function() {
  state.cats = storage;
};

state.updateCart = function(name) {
  if (state.cart.hasOwnProperty(name)){
    state.cart[name].data = storage[name];
  } else {
    state.cart[name] = {'data': storage[name]};
  }
  if (!state.cart[name].hasOwnProperty('quantity')) {
    state.cart[name].quantity = 0
  }
  state.cart[name].quantity += 1;
};


export default state;
