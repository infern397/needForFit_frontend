<template>
  <v-app>
    <v-app-bar
        app
        color="teal"
    >
      <v-container class="d-flex justify-space-between align-center">
        <v-app-bar-title class="ml-0" style="cursor: pointer;" @click="$router.push({name: 'workouts'})">
          <h3 class="text-white text-h4">Need For Fit</h3>
        </v-app-bar-title>
        <v-icon @click="$router.push({name: 'account', params: { id: 1 }})" >mdi-account</v-icon>
      </v-container>
    </v-app-bar>
    >
    <v-main class="position-relative">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Tempo from "@/components/Tempo";
import {mdiAccount} from '@mdi/js'

export default {
  name: 'App',
  components: [Tempo],
  data: () => ({
    mdiAccount
  }),
}
</script>
