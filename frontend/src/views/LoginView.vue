<template>
    <div class="login-page">
        <div class="container">
            <div class="alert alert-danger mb-4" v-if="errorMsg" role="alert">
                {{ errorMsg }}
            </div>
            <h2 class="mb-4">Login</h2>
            <form @submit.prevent="login">
                <div class="form-group mb-3">
                    <label for="email" class="mb-1">Email:</label>
                    <input type="email" class="form-control" v-model="email" required>
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="mb-1">Senha:</label>
                    <input type="password" class="form-control" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loggingIn">
                    {{ loggingIn ? 'Entrando...' : 'Entrar' }}
                </button>
            </form>
        </div>
    </div>
</template>
  
<script>
import api from '../api/backendApi.js';

export default {
    data() {
        return {
            email: '',
            password: '',
            loggingIn: false,
            errorMsg: '',
        };
    },
    methods: {
        login() {
            this.clearError();
            this.loggingIn = true;

            const loginData = {
                email: this.email,
                password: this.password
            };

            api.post('/login', loginData).then(response => {
                const token = response.data.token;
                const userId = response.data.user.id;

                console.log(response.data);

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('id', userId);

                this.$router.push('/produtos');
            }).catch((error) => {
                console.log(error);
                this.errorMsg = error?.response?.data?.message;
            }).finally(() => {
                this.loggingIn = false;
            });
        },

        clearError() {
            this.errorMsg = '';
        }
    },
    mounted() {
        if (sessionStorage.getItem('token')) {
            this.$router.push('/produtos');
        }
    }
};
</script>
  
<style>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

}

.container {
    max-width: 350px;
}
</style>