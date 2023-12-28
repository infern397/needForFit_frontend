import { createRouter, createWebHistory } from 'vue-router'
import WorkoutsPage from "@/pages/WorkoutsPage";
import WorkoutPage from "@/pages/WorkoutPage";
import ExercisesPage from "@/pages/ExercisesPage";
import AccountPage from "@/pages/AccountPage";

const routes = [
  {
    path: '/',
    name: 'workouts',
    component: WorkoutsPage
  },
  {
    path: '/workout/:id',
    name: 'workout',
    component: WorkoutPage
  },
  {
    path: '/exercises/:id',
    name: 'exercises',
    component: ExercisesPage
  },
  {
    path: '/account/:id',
    name: 'account',
    component: AccountPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
