<template>
    <div class="container-fluid">
        <h2 class="mb-4">Lista de Produtos</h2>
        <button class="btn btn-success mb-3" @click="openCreateModal">Novo Produto</button>
        <div class="row">
            <div class="col-md-12 mb-3" v-for="product in products" :key="product.id">
                <ProductItem :product="product" @delete="confirmDelete(product.id)" @edit="openEditModal(product)" class="mb-3"/>
            </div>
        </div>

        <!-- Modal de criação de produto -->
        <div ref="createModal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Novo Produto</h5>
                        <button type="button" class="btn-close" @click="closeCreateModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitCreateForm">
                            <div class="mb-3">
                                <label for="create-name" class="form-label">Nome</label>
                                <input type="text" id="create-name" class="form-control" v-model="createForm.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="create-price" class="form-label">Preço</label>
                                <input type="text" id="create-price" class="form-control" v-model="createForm.price"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de edição -->
        <div class="modal" ref="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Produto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"
                            @click="closeEditModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitEditForm">
                            <div class="mb-3">
                                <label for="edit-name" class="form-label">Nome</label>
                                <input type="text" id="edit-name" v-model="editForm.name" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="edit-price" class="form-label">Preço</label>
                                <input type="text" id="edit-price" v-model="editForm.price" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de confirmação de exclusão -->
        <div class="modal" ref="deleteConfirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmar Exclusão</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"
                            @click="closeDeleteConfirmationModal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Tem certeza de que deseja excluir o produto?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="closeDeleteConfirmationModal">Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="deleteProduct">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import api from '../api/backendApi.js';
import ProductItem from '../components/ProductItem.vue';

export default {
    components: {
        ProductItem
    },
    data() {
        return {
            products: [],
            editForm: {
                id: null,
                name: '',
                price: 0
            },
            createForm: {
                name: '',
                price: 0
            }
        };
    },
    created() {
        const token = sessionStorage.getItem('token');
        api.get('products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.products = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        openEditModal(product) {
            this.editForm.id = product.id;
            this.editForm.name = product.name;
            this.editForm.price = product.price;
            this.$refs.editModal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeEditModal() {
            this.$refs.editModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
        submitEditForm() {
            const token = sessionStorage.getItem('token');
            const { id, name, price } = this.editForm;
            api.patch(`products/${id}`, {
                name,
                price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Produto editado com sucesso:', response.data);
                    this.closeEditModal();

                    this.fetchProducts();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchProducts() {
            const token = sessionStorage.getItem('token');
            api.get('products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        confirmDelete(productId) {
            this.deleteProductId = productId;
            this.$refs.deleteConfirmationModal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeDeleteConfirmationModal() {
            this.$refs.deleteConfirmationModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
        deleteProduct() {
            const token = sessionStorage.getItem('token');
            const productId = this.deleteProductId;
            api.delete(`products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    this.fetchProducts();
                    console.log('Produto excluído com sucesso:', response.data);
                    this.closeDeleteConfirmationModal();
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
            this.resetCreateForm();
        },

        resetCreateForm() {
            this.createForm.name = '';
            this.createForm.price = 0;
        },

        submitCreateForm() {
            const token = sessionStorage.getItem('token');
            const { name, price } = this.createForm;
            api.post('products', {
                name,
                price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Produto criado com sucesso:', response.data);
                    this.closeCreateModal();

                    this.fetchProducts();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>
  
<style>
.container-fluid {
    margin-top: 20px;
}

.card {
    height: 100%;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.card-text {
    margin-bottom: 0.5rem;
}

.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
    display: block;
}

.modal-dialog {
    margin-top: 10vh;
}

.modal-content {
    border-radius: 0;
}

.modal-header {
    background-color: #f8f9fa;
    border-bottom: none;
}

.modal-footer {
    background-color: #f8f9fa;
    border-top: none;
}
</style>