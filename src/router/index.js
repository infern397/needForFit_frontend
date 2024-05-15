import { createRouter, createWebHistory } from 'vue-router'
import WorkoutsPage from "@/pages/WorkoutsPage";
import WorkoutPage from "@/pages/WorkoutPage";
import ExercisesPage from "@/pages/ExercisesPage";
import AccountPage from "@/pages/AccountPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ContactsPage from "@/pages/ContactsPage";

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
    path: '/account',
    name: 'account',
    component: AccountPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
