import { createStore } from "vuex";

import axios from "axios";

export default createStore({
  state: {
    products: [],
    categories: [],
    storeCart: JSON.parse(localStorage.getItem("cart")) || [],
    authToken: JSON.parse(localStorage.getItem("authToken")) || null,
    userData: JSON.parse(localStorage.getItem("userData")) || {},
  },

  getters: {

    isAuthenticated: (state) => {
      if (state.authToken) {
        return true;
      } else {
        return false;
      }
    },

    getUserData: (state) => {
      return state.userData;
    },

    products: (state) => {
      return state.products;
    },

    categories: (state) => {
      return state.categories;
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

    SET_USER_DATA(state, userData) {
      state.userData = userData;
    },

    SET_USER_TOKEN(state, token) {
      state.userToken = token;
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
      localStorage.removeItem("cart");
      state.storeCart = [];
    },

    LOGOUT(state) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      state.userToken = '';
      state.userData = [];
      alert("Logout Successfully");
    },

  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api-products');
        commit("SET_PRODUCTS", response.data.products);
      } catch (error) {
        // console.log(error)
      }
    },

    async fetchCategories({ commit }) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/api-categories");
        commit("SET_CATEGORIES", response.data.categories);
      } catch (error) {
        // console.log(error)
      }
    },

    login({ commit }, data) {
      axios.post('http://127.0.0.1:8000/api/login', data)
        .then(response => {
          localStorage.setItem("authToken", JSON.stringify(response.data.token));
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          commit("SET_USER_DATA", response.data.user);
          commit("SET_USER_TOKEN", response.data.token);
           alert("Login Successfully");
        })
        .catch(error => {
          console.log(error);
        }
        );
    },

    register({ commit }, data) {
      axios.post('http://127.0.0.1:8000/api/register', data)
        .then(response => {
            localStorage.setItem("authToken", JSON.stringify(response.data.token));
            localStorage.setItem("userData", JSON.stringify(response.data.user));
            commit("SET_USER_DATA", response.data.user);
            commit("SET_USER_TOKEN", response.data.token);
            alert("Register Successfully");
        })
        .catch(error => {
            console.log(error);
        }
        );
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

    logout(context) {
      context.commit("LOGOUT");
    }
  },
});
