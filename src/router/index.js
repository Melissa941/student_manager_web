import {createMemoryHistory, createRouter} from 'vue-router'

import CreateStudent from '../pages/CreateStudent.vue'
import SearchStudent from '../pages/SearchStudent.vue'

const routes = [
  { 
    path: '/search',
    name: 'Search',
    component: SearchStudent
},
  { 
    path: '/createstudent',
    name: 'CreateStudent',
    component: CreateStudent 
  },
]

// const routes = {
//     '/SearchStudent': SearchStudent,
//     '/CreateStudent': CreateStudent
//   }

const router = createRouter({
  history: createMemoryHistory(),
  // history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router