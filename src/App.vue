<template>
  <v-app>
    <!--    <v-app-bar-->
    <!--        app-->
    <!--        color="teal"-->
    <!--    >-->
    <!--      <v-container class="d-flex justify-space-between align-center">-->
    <!--        <v-app-bar-title class="ml-0" style="cursor: pointer;" @click="$router.push({name: 'workouts'})">-->
    <!--          <h3 class="text-white text-h4">Need For Fit</h3>-->
    <!--        </v-app-bar-title>-->
    <!--        <v-icon @click="$router.push({name: 'account', params: { id: 1 }})" >mdi-account</v-icon>-->
    <!--      </v-container>-->
    <!--    </v-app-bar>-->
    <!--    >-->
    <header class="header">
      <div class="container header__inner">
        <div class="header__icon">
          <img src="/images/header/logo.svg" alt="Logo">
        </div>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-list-item"><a href="" class="header__nav-link">Меню</a></li>
            <li class="header__nav-list-item"><a href="" class="header__nav-link">О нас</a></li>
            <li class="header__nav-list-item"><a href="" class="header__nav-link">Связь</a></li>
          </ul>
        </nav>
        <div class="header__profile">
          <img src="/images/header/profile-logo.svg" class="header__profile-icon" alt="profile">
        </div>
      </div>
    </header>
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

<style lang="scss">
.container {
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 15px;
}

.header  {
  background: #7C8685;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  &__inner {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__icon {
    width: 86px;
    height: 86px;


    img {
      width: 100%;
      height: 100%;
    }
  }

  &__nav {
    margin-right: auto;
    margin-left: 136px;

    &-list {
      list-style: none;
      display: flex;
      gap: 50px;
    }
    
    &-link {
      color: inherit;
      text-decoration: none;
    }
  }

  &__profile {
    background: #FFFFFF;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    overflow: hidden;
  }
}

</style>