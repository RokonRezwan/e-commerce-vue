<template>
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <div class="card w-50">
                <div class="card-header text-center pb-1"><h4>Register</h4></div>
                <div class="card-body">
                    <form>
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
                            <input type="password" class="form-control" id="confirmPassword">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:180px; font-size:20px">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            message:''
        }
    }
};
</script>

<style>
</style>
