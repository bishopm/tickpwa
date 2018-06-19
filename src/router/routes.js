
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'home', path: '/', component: () => import('components/Tasks'), meta: {auth: true} },
      { name: 'login', path: '/login', component: () => import('components/Login'), meta: {auth: false} },
      { name: 'projects', path: '/projects', component: () => import('components/Projects'), meta: {auth: true} },
      { name: 'project', path: '/projects/:id', component: () => import('components/Project'), meta: {auth: true} },
      { name: 'tasks', path: '/tasks', component: () => import('components/Tasks'), meta: {auth: true} },
      { name: 'task', path: '/tasks/:id', component: () => import('components/Task'), meta: {auth: true} },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: {auth: true} },
      { name: 'someday', path: '/someday', component: () => import('components/Someday'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
