<template>
    <div class="container-fluid">
        <h2 class="mb-4">Usuários</h2>
        <button class="btn btn-success mb-3" @click="openCreateModal">Cadastrar usuário</button>

        <div v-if="users.length === 0">Nenhum usuário encontrado.</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal de cadastro de usuário -->
        <div ref="createModal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cadastrar usuário</h5>
                        <button type="button" class="btn-close" @click="closeCreateModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleUserCreation">
                            <div class="form-group mb-3">
                                <label for="name">Nome:</label>
                                <input type="text" class="form-control" id="name" v-model="newUser.name" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" id="email" v-model="newUser.email" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Senha:</label>
                                <input type="password" class="form-control" id="password" v-model="newUser.password"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from '../api/backendApi.js';

export default {
    data() {
        return {
            users: [],
            newUser: {
                name: '',
                email: '',
                password: ''
            }
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            api.get('/users', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        handleUserCreation() {
            api.post('/users/register', this.newUser, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.newUser.name = '';
                    this.newUser.email = '';
                    this.newUser.password = '';

                    this.closeCreateModal()
                    this.fetchUsers();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        openCreateModal() {
            this.$refs.createModal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeCreateModal() {
            this.$refs.createModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
    },
    computed: {
        token() {
            return sessionStorage.getItem('token');
        }
    }
};
</script>
  
<style>
.container-fluid {
    margin-top: 20px;
}
</style>