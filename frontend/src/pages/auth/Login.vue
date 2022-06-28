<template>
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <div class="card w-50">
                <div class="card-header text-center pb-1"><h4>Login</h4></div>
                <div class="card-body">
                    <form @submit.prevent="onSubmitLoginForm">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="text" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:180px; font-size:20px">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {

    data() {
            return {
                email: '',
                password: ''
            }
        },
    methods:{
            async onSubmitLoginForm(){
                if(this.email === '' || this.password === ''){
                    alert('Email or Password can\'t be Empty');
                    return;
                }

                const url = 'https://dummyjson.com/auth/login'
                const data = {
                    username: this.email,
                    password: this.password,
                };

                const headers = {'Content-Type': 'application/json'};

                await axios.post(url, JSON.stringify(data), {headers: headers})
                .then((response) => {
                    localStorage.setItem("authToken", JSON.stringify(response.data.token));
                    localStorage.setItem("userData", JSON.stringify(response.data));
                    //history.back();
                    console.log(response.data)
                })
            }
        }

};
</script>

<style>
</style>
