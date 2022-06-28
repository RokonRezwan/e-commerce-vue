<template>
    <div class="row g-0 position-relative w-100">
        <div class="col-12">
            <div class="input-group p-1" style="border-radius: 10px 0px 0px 10px">
                <input type="text" v-model="search" placeholder="Search Product" class="form-control shadow-none px-3 py-2">
                <button name="search" class="btn btn-primary">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="col-12 position-absolute mt-5" style="z-index:9999;">
            <div v-if="limitedProductsList.length > 0" class="list-group">
                <router-link v-for="(product, index) in limitedProductsList" :key="index" 
                :to="`/product/${product.id}`" :id="product.id" 
                class="list-group-item list-group-item-action py-1 px-2 text-primary" @click="resetInput">
                    {{ product.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchComponent',

    data(){
        return{
            search: '',
            category:'',
            searchResultsLimit: 10
        }
    },

    mounted() {
          this.$store.dispatch("fetchCategories");
          this.$store.dispatch("fetchProducts");
    },

    computed: {


        categories() {
            return this.$store.getters.categories;
        },

        filterProducts(){
            if (this.search) {
            return this.filterProductsByName(this.$store.getters.products)
            } else {
                return '';
            }
        },

        limitedProductsList(){
            return this.filterProducts.slice(0, this.searchResultsLimit);
        }
        
    },

    methods: {

        filterProductsByName: function(products) {
            return products.filter(product => { return product.title.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        
        resetInput(){
            this.search = ''
        },

    }
}
</script>

<style scoped>
    .border-bottom:last-child{
        border:none
    }

</style>