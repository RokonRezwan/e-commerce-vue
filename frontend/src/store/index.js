import { createStore } from "vuex";

import axios from "axios";

export default createStore({
  state: {
    products: [],
    categories: [],
    storeCart: JSON.parse(localStorage.getItem("cart")) || [],
  },

  getters: {
    products: (state) => {
      return state.products;
    },

    categories: (state) => {
      return state.categories;
    },

    getCategoryWiseProducts: (state) => (name) => {
      return state.products.find(product => product.category === 'laptops')
    },

    storeCart: (state) => {
      return state.storeCart;
    },

    cartCount: (state) => {
      return state.storeCart.length;
    },

    totalAmount: (state) => {
      state.total = state.storeCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      return state.total.toFixed(2);
    },
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

    ADD_ITEM(state, id) {
      const record = state.storeCart.find((p) => p.id === id);
      const item = state.products.find((p) => p.id === id);

      if (!record) {
        state.storeCart.push({
          id: id,
          name: item.name,
          price: item.prices[0].amount,
          image: item.image,
          quantity: 1,
        });
      } else {
        record.quantity++;
      }
    },

    REMOVE_ITEM(state, index) {
      state.storeCart.splice(index, 1);
    },

    UPDATE_QUANTITY(state, item) {
      const record = state.storeCart.find((p) => p.id === item.id);
      if (record) {
        record.quantity = item.quantity;
      }
    },

    CLEAR_CART(state) {
      state.storeCart = [];
    },
  },

  actions: {
    async fetchProducts({ commit }, page) {
      try {

        if (typeof page === 'undefined') {
          page = 1;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/api-products?page=' + page);
        commit("SET_PRODUCTS", response.data.products.data);
        // console.log(response.data.products);
      } catch (error) {
        // console.log(error)
      }
    },

    async fetchCategories({ commit }) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/api-categories");
        commit("SET_CATEGORIES", response.data.categories);
        //console.log(response.data.categories);
      } catch (error) {
        // console.log(error)
      }
    },

    addItem(context, id) {
      context.commit("ADD_ITEM", id);
      localStorage.setItem("cart", JSON.stringify(context.state.storeCart));
    },

    removeItem(context, index) {
      context.commit("REMOVE_ITEM", index);
      localStorage.setItem("cart", JSON.stringify(context.state.storeCart));
    },

    updateQuantity(context, item) {
      context.commit("UPDATE_QUANTITY", item);
      localStorage.setItem("cart", JSON.stringify(context.state.storeCart));
    },

    clearCart(context) {
      context.commit("CLEAR_CART");
      localStorage.setItem("cart", JSON.stringify(context.state.storeCart));
    },
  },
});
