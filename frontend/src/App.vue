<template>
    <div>
        <header v-if="!isLoginRoute" class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/produtos">Produtos</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/registros">Registros</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/usuarios">Usuarios</RouterLink>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" @click="logout" to="/usuarios">Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <div class="app">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const router = useRouter();

const isLoginRoute = computed(() => {
    return route.name === 'login';
});


function logout() {
    sessionStorage.clear();
    router.push({ name: 'login' });
}

</script>

<style scoped>
.nav-link {
    cursor: pointer;
}
</style>
