<template>
    <div class="card">
        <div class="card-body d-flex justify-content-between">
            <div>
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Quantidade em estoque: {{ product.qty }}</p>
                <p class="card-text">Preço: R$ {{ product.price }}</p>
            </div>
            <div class="d-flex align-self-end">
                <button class="btn btn-danger me-2" @click="$emit('delete')">
                    Excluir
                </button>
                <button class="btn btn-primary" @click="$emit('edit')">
                    Editar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>