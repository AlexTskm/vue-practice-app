import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true  // данная страница требует авторизации
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      auth: true  // данная страница требует авторизации
    }
  },
  {
    path: '/request/:id', // роутер принимающий динамический id
    name: 'Request',      // название страницы
    component: () => import('../views/Request.vue'), // название компонента
    meta: {
      layout: 'main',
      auth: true  // данная страница требует авторизации
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false  // данная страница не требует авторизации
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',  // Подсвечиваем активную страницу в меню
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from,next) => {
  // Данный метод вызывается до создания
  // Смотрим, есть ли у страницы авторизация
  const requireAuth = to.meta.auth

  // Проверяем авторизацию и если она есть
  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
