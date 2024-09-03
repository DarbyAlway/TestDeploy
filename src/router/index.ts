import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import nProgress from 'nprogress'
import LayoutView from '@/views/country/LayoutView.vue'
import { useCountryStore } from '@/stores/country'
import OlympicService from '@/service/OlympicService'
import DetailView from '@/views/country/DetailView.vue'
import SportView from '@/views/country/SportView.vue'
import CheerUpView from '@/views/country/CheerUpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country-list-view',
      component: HomeView,
      props: (route) => ({
        limit: parseInt(route.query.limit?.toString() || '5'),
        page: parseInt(route.query.page?.toString() || '1')
      })
    },
    {
      path: '/country/:id',
      name: 'country-layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const countryStore = useCountryStore()
        return OlympicService.getCountry(id)
          .then((response) => {
            countryStore.setCountry(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'country' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'country-detail-view',
          component: DetailView,
          props: true
        },
        {
          path: 'sport',
          name: 'country-sport-view',
          props: true,
          component: SportView
        },
        {
          path: 'cheer-up',
          name: 'country-cheer-up-view',
          props: true,
          component: CheerUpView
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ]
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
