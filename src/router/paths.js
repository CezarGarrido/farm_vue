export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/App'
    }
  },  
  {
    path: '/fazendas',
    meta: { breadcrumb: true },
    name: 'fazendasForm',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/components/fazendas/FazendaForm.vue`
    )
  },
  {
    path: '/fazendas/mapa',
    meta: { breadcrumb: true },
    name: 'fazendasMap',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/components/fazendas/FazendaMap.vue`
    )
  },
];
