<template>
    <div class="container-fluid">
        <h2 class="mb-4">Lista de Registros</h2>
        <button class="btn btn-success mb-3" @click="openCreateModal">Novo Registro</button>

        <!-- Lista de registros -->
        <ul class="list-group mb-3">
            <li v-for="registro in registros" :key="registro.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>Produto:</strong> {{ registro.product.name }}<br>
                    <strong>Autor:</strong> {{ registro.author.name }}<br>
                    <strong>Quantidade:</strong> {{ registro.qty > 0 ? `+${registro.qty}` : registro.qty }}<br>
                    <strong>Data e Hora:</strong> {{ formatDateTime(registro.moved_at) }}
                </div>
                <button class="btn btn-danger" @click="confirmDelete(registro.id)">Excluir</button>
            </li>
        </ul>

        <!-- Modal de confirmação de exclusão -->
        <div ref="deleteModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmar Exclusão</h5>
                        <button type="button" class="btn-close" @click="closeDeleteModal"></button>
                    </div>
                    <div class="modal-body">
                        Tem certeza de que deseja excluir o registro?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="deleteRegistro">Excluir</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de criação de registro -->
        <div ref="createModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Novo Registro</h5>
                        <button type="button" class="btn-close" @click="closeCreateModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger mb-4" v-if="newRegisterError" role="alert">
                            {{ newRegisterError }}
                        </div>
                        <form @submit.prevent="createRegistro">
                            <div class="mb-3">
                                <label for="productSelect" class="form-label">Produto</label>
                                <select id="productSelect" v-model="newRegistro.product_id" class="form-select">
                                    <option v-for="produto in produtos" :key="produto.id" :value="produto.id">{{
                                        produto.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="qtyInput" class="form-label">Quantidade</label>
                                <input type="number" id="qtyInput" v-model="newRegistro.qty" class="form-control" required>
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
import dayjs from 'dayjs';

export default {
    data() {
        return {
            registros: [],
            deleteRegistroId: null,
            token: sessionStorage.getItem('token'),
            produtos: [],
            newRegistro: {
                author_id: null,
                product_id: null,
                qty: null
            },
            newRegisterError: '',
        };
    },
    mounted() {
        this.fetchRegistros();
        this.fetchProdutos();
    },
    methods: {
        fetchRegistros() {
            api.get('/movements', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.registros = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        confirmDelete(registroId) {
            this.deleteRegistroId = registroId;
            this.$refs.deleteModal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeDeleteModal() {
            this.deleteRegistroId = null;
            this.$refs.deleteModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
        deleteRegistro() {
            if (this.deleteRegistroId) {
                api.delete(`/movements/${this.deleteRegistroId}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                    .then(() => {
                        this.closeDeleteModal();
                        this.fetchRegistros();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        formatDateTime(datetime) {
            return dayjs(datetime).format('DD/MM/YYYY - HH:mm');
        },
        openCreateModal() {
            this.newRegistro.author_id = this.getUserIdFromToken();
            this.$refs.createModal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeCreateModal() {
            this.newRegisterError = '';
            this.newRegistro.author_id = null;
            this.newRegistro.product_id = null;
            this.newRegistro.qty = null;
            this.$refs.createModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
        createRegistro() {
            api.post('/movements', this.newRegistro, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(() => {
                    this.closeCreateModal();
                    this.fetchRegistros();
                })
                .catch(error => {
                    this.newRegisterError = error?.response?.data?.message;
                    console.error(error);
                });
        },
        fetchProdutos() {
            api.get('/products', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    this.produtos = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getUserIdFromToken() {
            return parseInt(sessionStorage.getItem('id'));
        }
    }
};
</script>
  
<style>
.container-fluid {
    margin-top: 20px;
}
</style>