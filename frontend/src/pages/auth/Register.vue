<template>
    <div class="row g-0">
        <div v-if="!isAuthenticated" class="col-12 d-flex justify-content-center">
            <div class="col-sm-12 col-md-6">
                <div class="card w-100">
                <div class="card-header text-center pb-1 pt-0 fs-4">Register</div>
                <div class="card-body">
                    <div class="row g-0 mb-3">
                        <div v-for="(error, i) in errors" :key="i" class="col-12 alert alert-danger p-2 m-1" role="alert">
                            {{ error[0] }}
                        </div>
                    </div>
                    <form @submit.prevent="onSubmitRegisterForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="text" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password">
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                        </div>
                        <div class="mb-3">
                            <label for="contact_number" class="form-label">contact_number</label>
                            <input type="text" class="form-control" id="contact_number" v-model="contact_number">
                        </div>
                        <div class="mb-3">
                            <label for="parmanent_address" class="form-label">parmanent_address</label>
                            <input type="text" class="form-control" id="parmanent_address" v-model="parmanent_address">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" @click="$router.go(-1)" class="btn btn-primary" style="width:180px; font-size:20px">Register</button>
                    </form>
                    <div class="row g-0 mt-2">
                        <div class="col-12">
                            Already have an account ?
                            <router-link to="/login" style="text-decoration: none">Login</router-link> here
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
        <div v-else class="col-12 text-center">
            <div class="card">
                <div class="card-header text-center pb-1"><h4>Welcome </h4></div>
                <div class="card-body">
                <div class="row g-0">
                    <div class="col-12">
                    <h4>You are logged in</h4>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-12">
                    <button
                        class="btn btn-primary"
                        style="width: 180px; font-size: 20px"
                        @click="onLogout"
                    >
                        Logout
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {

    data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                contact_number: '',
                parmanent_address: '',
                errors: ''
            }
        },
    
    computed: {
        isAuthenticated() {
        return this.$store.getters.isAuthenticated;
        }
    },

    methods:{
        onSubmitRegisterForm(){
            if(this.name === '' || this.email === '' || this.password === '' || this.confirmPassword === ''){
                alert('Email or Password can\'t be Empty');
                return;
            }

            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                contact_number: this.contact_number,
                parmanent_address: this.parmanent_address
            };
            this.$store.dispatch("register", data);
        },
    
        onLogout() {
            this.$store.dispatch("logout");
        }
    },

};
</script>

<style>
</style>
