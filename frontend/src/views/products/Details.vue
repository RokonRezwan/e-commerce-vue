<template>
    <div class="row g-0">
        <div class="col-sm-12 col-md-3">
            <CategoryList />
        </div>
        <div class="col-sm-12 col-md-9 ps-3 pe-2">
            <div class="row g-0">
                <div class="col-12 text-end p-2">
                    <a @click="$router.go(-1)" class="btn btn-success">Back</a>
                </div>
            </div>
            <div class="card" v-if="product">
                <div class="card-body">
                    <div class="row g-0">
                        <div class="col-4">
                            <img :src="`http://127.0.0.1:8000/product-images/${product.image}`" class="card-img-top" :alt="product.name" style="height:130px">
                        </div>
                        <div class="col-8 px-3 py-1">
                            <h3 class="card-title border-bottom pb-2">{{ product.name }}</h3>

                            <div class="row g-0">
                                <div class="col-12">
                                    <div class="text-black fs-5">Category: <strong class="text-primary">{{ product.category.name }}</strong></div>
                                    <div class="text-black fs-5">Price: <strong class="text-primary">$500</strong></div>
                                    <button class="btn btn-outline-danger mt-1" v-on:click="addToCart(product.id)">
                                        <i class="fas fa-shopping-cart"></i>
                                    </button>
                                    <p class="card-text fs-6 pt-1">{{ product.description }}</p>
                                </div>
                            </div>
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
    name: 'ProductDetails',
    props: {
        id: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            product: '',
        };
    },

    components: {
        CategoryList
    },

    mounted() {
        axios.get('http://127.0.0.1:8000/api/api-products/' + this.id).then(response => (this.product = response.data.product));
    },

    methods: {
        addToCart(id) {
            this.$store.dispatch("addItem", id);
        },
    },
};
</script>