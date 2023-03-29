import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'))
const CoachesRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachesRegistration.vue'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'))
const RequestsRecieved = defineAsyncComponent(() => import('./pages/requests/RequestsRecieved.vue'))
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'))


const router = createRouter({

    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },

        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach }, //coaches/c1/contact
            ]
        },
        { path: '/register', component: CoachesRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsRecieved, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },

    ]
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})



export default router;