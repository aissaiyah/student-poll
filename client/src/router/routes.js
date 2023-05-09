const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue'), name: 'Home' },
      { path: 'poll/', component: () => import('src/pages/PollPage.vue'), name: 'Poll' },
      { path: 'results', component: () => import('src/pages/ResultsPage.vue'), name: 'Results' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes