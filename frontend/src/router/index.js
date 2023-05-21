import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ProdutosView from '../views/ProdutosView.vue';
import RecordsView from '../views/RecordsView.vue';
import UsersView from '../views/UsersView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/produtos',
            name: 'produtos',
            component: ProdutosView,
            meta: { requiresAuth: true }
        },
        {
            path: '/registros',
            name: 'registros',
            component: RecordsView,
            meta: { requiresAuth: true }
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            component: UsersView,
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = sessionStorage.getItem('token');
        if (!token) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;