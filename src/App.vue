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
      <div class="header__wrapper">
        <div class="container header__inner">
          <div class="header__icon" @click="$router.push({name: 'workouts'})">
            <img src="/images/header/logo.svg" alt="Logo">
          </div>
          <nav class="header__nav">
            <ul class="header__nav-list">
              <li class="header__nav-list-item">
                <p class="header__nav-link">Меню</p>
                <ul class="dropdown">
                  <li><a href="#">Каталог&nbsp;тренировок</a></li>
                  <li><a href="#">Каталог&nbsp;упражнений</a></li>
                  <li><a href="#">Видеоуроки</a></li>
                </ul>
              </li>
              <li class="header__nav-list-item">
                <RouterLink :to="{ name: 'account' }" href="" class="header__nav-link">Личный&nbsp;кабинет</RouterLink>
              </li>
              <li class="header__nav-list-item">
                <RouterLink :to="{ name: 'contacts' }" href="" class="header__nav-link">Связь</RouterLink>
              </li>
            </ul>
          </nav>
          <div class="header__right">
            <div class="header__profile"
                 @click.capture="$router.push({name: 'account'})"
            >
              <img src="/images/header/profile-logo.svg" class="header__profile-icon" alt="profile">
            </div>
            <ul class="dropdown profile__dropdown">
              <li>
                <RouterLink :to="{ name: 'account' }" href="" class="header__nav-link">Личный&nbsp;кабинет</RouterLink>
              </li>
              <RouterLink :to="{ name: 'profile' }" href="" class="header__nav-link">Профиль</RouterLink>
              <li><a href="#" @click="logout">Выйти</a></li>
            </ul>
            <div class="header__menu" @click="toggleMenu">
              <img src="/images/header/burger.png" alt="menu">
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
      <div class="burger-menu" v-if="isMenuOpen">
        <ul class="burger-menu__list">
          <li class="burger-menu__item">Меню</li>
          <li class="burger-menu__item">Каталог тренировок</li>
          <li class="burger-menu__item">Каталог упражнений</li>
          <li class="burger-menu__item">Видеоуроки</li>
          <li class="burger-menu__item">Связь</li>
          <li class="burger-menu__item">
            <div class="burger-menu__item-profile">
              <img src="/images/header/profile-logo.svg" alt="">
            </div>
          </li>
          <li class="burger-menu__item">Личный кабинет</li>
          <li class="burger-menu__item">Профиль</li>
          <li class="burger-menu__item">Выход</li>
        </ul>
      </div>
      </transition>
      <div class="header__phrase" @load="adjustContentPadding">
        <div class="container">
          <div class="header__phrase-text">
            {{ phrase.phrase }}
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  data: () => ({
    mdiAccount,
    isMenuOpen: true,
  }),
  methods: {
    ...mapActions(['fetchPhrase']),

    adjustContentPadding() {
      const header = document.querySelector('.header');
      const mainContent = document.querySelector('.v-main');
      if (header && mainContent) {
        const headerHeight = header.offsetHeight;

        mainContent.style.paddingTop = `${headerHeight}px`;
      }
    },
    logout() {
      localStorage.removeItem('access_token');
      delete instance.defaults.headers.common['Authorization'];
      router.push('/login');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  created() {
    this.fetchPhrase()
    window.addEventListener('resize', this.adjustContentPadding);
  },
  watch: {
    phrase() {
      this.$nextTick(() => {
        this.adjustContentPadding();
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustContentPadding);
  },
  computed: {
    ...mapGetters(['phrase']),
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

.v-main {
  padding-top: 0;
  transition: padding-top 0.6s ease;
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
  font-family: "Roboto", sans-serif;
  font-size: 20px;

  &__wrapper {
    background: #7C8685;

  }

  &__inner {
    z-index: 1000;
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

  &__right {
    position: relative;

    @media (max-width: 425px) {
      position: unset !important;
    }
  }

  &__menu {
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    @media (max-width: 768px) {
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

    @media (max-width: 768px) {
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

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__right {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__logout {
  }

  &__phrase {
    background-color: rgba(124, 134, 133, 0.5);
  }

  &__phrase-text {
    text-align: center;
    font-style: italic;
    max-width: 80%;
    margin: 0 auto;
  }
}

.add__btn {
  width: 100px;
  height: 100px;
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

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
    padding: 16px;
    right: 32px;
    bottom: 32px;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 12px;
    right: 20px;
    bottom: 20px;
  }

  &-image {
    width: 100%;
    height: 100%;
  }
}

.burger-menu {
  padding: 0 9px;
  position: fixed;
  z-index: 10;
  width: 100%;
  display: none;
  transform-origin: top;
  @media (max-width: 768px) {
    display: block;
  }

  &__list {
    list-style: none;
    padding: 20px 33px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-direction: column;
    background-color: #7C8685;
  }

  &__item {
    text-align: center;
    font-size: 40px;
    width: 100%;
    border-bottom: 1px solid #000000;
    line-height: 1;

    &-profile {
      background-color: #fff;
      border-radius: 50%;
      height: 70px;
      width: 70px;
      margin: 0 auto 20px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

main {
  background-color: #AAACA1;
}

.swiper-pagination-bullet-active {
  background-color: #7C8685 !important;
}

.dropdown {
  padding: 8px;
  position: absolute;
  list-style: none;
  background-color: #7C8685;
  border-top: 2px solid #00000033;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.header__nav-list-item {
  position: relative;
}

.profile__dropdown {
  bottom: -108px;
  right: 0;
}

.dropdown {
  padding: 8px;
  position: absolute;
  list-style: none;
  background-color: #7C8685;
  border-top: 2px solid #00000033;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.3s ease-in-out;
}

.header__nav-list-item:hover .dropdown {
  transform: scaleY(1);
}

.header__right:hover .dropdown {
  transform: scaleY(1);

  @media (max-width: 768px) {
    transform: scaleY(0);
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: scaleY(0);
}
</style>