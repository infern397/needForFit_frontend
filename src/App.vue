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
        <div class="header__icon" @click="$router.push({name: 'workouts'})">
          <img src="/images/header/logo.svg" alt="Logo">
        </div>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-list-item"><a href="" class="header__nav-link">Меню</a></li>
            <li class="header__nav-list-item"><a href="" class="header__nav-link">О нас</a></li>
            <li class="header__nav-list-item"><a href="" class="header__nav-link">Связь</a></li>
          </ul>
        </nav>
        <div class="header__right">
          <div class="header__profile" @click="$router.push({name: 'account', params: { id: 1 }})">
            <img src="/images/header/profile-logo.svg" class="header__profile-icon" alt="profile">
          </div>
          <div class="header__menu" @click="$router.push({name: 'account', params: { id: 1 }})">
            <img src="/images/header/burger.png" class="header__menu" alt="menu">
          </div>
        </div>
      </div>
    </header>
    <v-main class="position-relative">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {mdiAccount} from '@mdi/js'
import instance from "@/axios";
import router from "@/router";

export default {
  name: 'App',
  data: () => ({
    mdiAccount
  }),
  methods: {
    logout() {
      // Удаляем токен из localStorage
      localStorage.removeItem('access_token');
      // Удаляем заголовок авторизации
      delete instance.defaults.headers.common['Authorization'];
      // Перенаправляем пользователя на страницу входа
      router.push('/login');
    }
  }
}
</script>

<style lang="scss">
main {
  position: relative;
  z-index: 0;
}

main * {
  z-index: 1;
}

main:before {
  z-index: 0;
  content: "";
  position: absolute;
  display: block;
  top: 0;
  width: 10%;
  height: 100%;
  background: url("~@/assets/images/background/bg-left.svg") repeat-y;
  background-size: contain;
}

main:after {
  z-index: 0;
  content: "";
  position: absolute;
  //display: block;
  top: 0; /* You can remove this line as it's not necessary */
  right: 0;
  height: 100%;
  width: 10%;
  background: url("~@/assets/images/background/bg-right.svg") repeat-y top;
  background-size: contain;
}

.container {
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 15px;
}

.header {
  background: #7C8685;
  font-family: "Roboto", sans-serif;
  font-size: 20px;

  &__inner {
    padding: 0 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 425px) {
      padding: 12px;
      position: relative;
      justify-content: center;
    }
  }

  &__menu {
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 425px) {
      display: block;
    }
  }

  &__icon {
    width: 86px;
    height: 86px;
    cursor: pointer;


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
      @media (max-width: 769px) {
        gap: 20px;

      }
    }

    &-link {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 769px) {
      margin-left: unset;
      margin-right: unset;
    }

    @media (max-width: 425px) {
      display: none;
    }
  }

  &__profile {
    cursor: pointer;
    background: #FFFFFF;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    overflow: hidden;

    @media (max-width: 425px) {
      display: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__logout {
  }

}

.add__btn {
  z-index: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  background: #D9D9D9;
  border-radius: 50%;
}

main {
  background-color: #AAACA1;
}

</style>