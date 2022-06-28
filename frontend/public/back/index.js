import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
    state: {
        products: [],
        pageTitle: "List of All Products",
        storeCart: [],
    },

    getters:{
      pageTitle: state => {  
        return state.pageTitle 
      },

      products: state => {  
        return state.products 
      },

      storeCart: state => {  
        return state.storeCart 
      },

      storeCartTotal: state => {
        return state.storeCart.length;
      },
    },
    
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },

        ADD_Item(state, id) {
          state.storeCart.push(id);
        },
    
        REMOVE_Item(state, index) {
          state.storeCart.splice(index, 1);
        },

    },

    actions: {
      async fetchProducts({ commit }) {
          try {
            const response = await axios.get('https://fakestoreapi.com/products')
              commit('SET_PRODUCTS', response.data)
            }
            catch (error) {
               // console.log(error)
            }
        },

        addItem(context, id) {
          context.commit("ADD_Item", id);
        },
    
        removeItem(context, index) {
          context.commit("REMOVE_Item", index);
        },

    },

})