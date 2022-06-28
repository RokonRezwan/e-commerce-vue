<template>
    <div class="row g-0">
         <div class="col-3">
            <CategoryList />
        </div>
        <div class="col-9">
            <div class="row g-0 mx-3 px-2 border border-gray">
                <div class="col-12">
                    <div class="row p-2 mb-2">

                        <div class="col-12 text-center border-bottom border-gray">
                            <!-- <h3> Category: {{ category.name.charAt(0).toUpperCase() + category.name.substring(1) }} ( {{ category.products.length }} )</h3> -->
                        </div>

                        <div class="row g-0 mt-2">
                            <div class="col-7 text-end pe-2" style="padding-top:7px">                             
                                <label for="password" class="form-label">Filter By</label>
                            </div>     
                            <div class="col-2 pe-1">
                                <select v-model="filterName" class="form-select shadow-none w-100">
                                    <option value="1">Date</option>
                                    <option value="2">Price</option>
                                    <option value="3">Name</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <select v-model="filterByAD" class="form-select shadow-none w-100">
                                    <option value="1">Order By DESC</option>
                                    <option value="2">Order By ASC</option>
                                </select>
                            </div>    
                        </div>

                    </div>
                    <div class="row row-cols-1 row-cols-md-4 g-4">

                        <div v-for="(product, index) in filterProducts" :key="index">
                            <div class="card h-100">
                                <router-link :to="`/product/${product.id}`" :id="product.id" class="p-2">
                                    <img :src="`http://127.0.0.1:8000/product-images/${product.image}`" class="card-img-top" :alt="product.name" style="height:130px">
                                </router-link>
                                <div class="card-body g-0">
                                    <h6 class="card-title p-2 text-danger">
                                        <router-link :to="`/product/${product.id}`" :id="product.id" class="router-link">{{ product.name.substring(0, 35) }}</router-link>
                                    </h6>
                                </div>
                                <div class="card-footer text-center fs-5 p-1">
                                    <small class="text-primary float-start ms-2"> $500</small>
                                    <button class="btn btn-outline-danger btn-sm float-end" v-on:click="addToCart(product.id)">
                                        <i class="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row g-0 mt-3">
                        
                        <div class="col-12">

                            <nav aria-label="...">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item active" aria-current="page">
                                    <a class="page-link" href="#">4</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                                    <li class="page-item"><a class="page-link" href="#">6</a></li>
                                    <li class="page-item"><a class="page-link" href="#">7</a></li>
                                    <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import CategoryList from '../../partials/CategoryList.vue';

export default {
    name: 'CategoryWiseProducts',
    props: {
        id: {
            type: String,
            required: true
        }
    },

    data(){
        return{
            category: '',
            filterName: '1',
            filterByAD: '1',
        }
    },

    components: {
        CategoryList
    },

    // mounted() {
    //     axios.get('http://127.0.0.1:8000/api/api-category/' + this.id)
    //     .then(response => {
    //         this.category = response.data.category;
    //     });
        
    // },

    computed: {

        filterProducts: function(){
                  const cat =  axios.get('http://127.0.0.1:8000/api/api-category/' + Number(this.id))
        // .then(response => {
        //    // console.log(response.data.category);
        //     return response.data.category;
        // });
        console.log(cat);
        return cat;
           // return this.filterProductsByCategory(this.filterProductsByPrice(this.$store.getters.categories))
        },

    },

    methods: {
        addToCart(id) {
            this.$store.dispatch("addItem", id);
        },

        filterProductsByCategory: function(products){
            //console.log(products);
          // console.log(products.filter(product => product.id == this.id));
           return products.filter(product => product.id == this.id);
        },

        filterProductsByPrice: function(products){
            const filterName = this.filterName;
            const filterByAD = this.filterByAD;
            return products.sort((a, b) => {

                if (filterName === '1' && filterByAD === '1') {
                    return b.id - a.id;
                }

                else if (filterName === '1' && filterByAD === '2') {
                    return a.id - b.id;
                }

                else if (filterName === '2' && filterByAD === '1') {
                    return b.price - a.price;
                }

                else if (filterName === '2' && filterByAD === '2') {
                    return a.price - b.price;
                }

                else if (filterName === '3' && filterByAD === '1') {
                    return (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1;
                }

                else if (filterName === '3' && filterByAD === '2') {
                    return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1;
                }
            });
        },

        resetOptions:function(){
            this.title='',
            this.minRange=''
            this.maxRange=''
        },

    },

}
</script>

<style scoped>
.router-link {
    text-decoration: none;
}
</style>