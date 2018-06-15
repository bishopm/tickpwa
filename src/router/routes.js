
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'home', path: '/', component: () => import('components/Home'), meta: {auth: true} },
      { name: 'projects', path: '/projects', component: () => import('components/Projects'), meta: {auth: true} },
      { name: 'tasks', path: '/tasks', component: () => import('components/Tasks'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
