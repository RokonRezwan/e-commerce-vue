<template>
<<<<<<< Updated upstream
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <div class="card w-50">
                <div class="card-header text-center pb-1"><h4>Register</h4></div>
                <div class="card-body">
                    <form>
=======
    <div class="row g-0">

        <div v-if="isLoggedIn" class="col-12 text-center">
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

        <div v-else class="col-12 d-flex justify-content-center">
            <div class="col-sm-12 col-md-6">
                <div class="card w-100">
                <div class="card-header text-center pb-1 pt-0 fs-4">Register</div>
                <div class="card-body">

                    <div class="row g-0 mb-3" v-if="registerErr">
                        <div class="col-12 alert alert-danger p-2 m-1" role="alert">
                            {{ registerErr }}
                        </div>
                    </div>

                    <form @submit.prevent="onSubmitRegisterForm">
>>>>>>> Stashed changes
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="fullName">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password">
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
<<<<<<< Updated upstream
                            <input type="password" class="form-control" id="confirmPassword">
=======
                            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                        </div>
                        <div class="mb-3">
                            <label for="ContactNumber" class="form-label">Contact Number</label>
                            <input type="text" class="form-control" id="ContactNumber" v-model="ContactNumber">
                        </div>
                        <div class="mb-3">
                            <label for="ParmanentAddress" class="form-label">Parmanent Address</label>
                            <input type="text" class="form-control" id="ParmanentAddress" v-model="ParmanentAddress">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
>>>>>>> Stashed changes
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:180px; font-size:20px">Login</button>
                    </form>
                </div>
            </div>
        </div>
<<<<<<< Updated upstream
=======
        



>>>>>>> Stashed changes
    </div>
</template>

<script>
export default {
<<<<<<< Updated upstream
    data(){
        return{
            message:''
        }
    }
=======

    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            ContactNumber: '',
            ParmanentAddress: '',
            errors: ''
        }
    },
    
    computed: {
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn;
        },

        registerErr(){
            return this.$store.getters.getregisterErrors ;
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
                contact_number: this.ContactNumber,
                parmanent_address: this.ParmanentAddress
            };
            this.$store.dispatch("register", data);
        },
    
        onLogout() {
            this.$store.dispatch("logout");
        }
    },

>>>>>>> Stashed changes
};
</script>

<style>
</style>
