<template>
  <div class="container">
    <div class="login__inner">
      <form action="" class="login__form">
        <div class="login__header">Авторизация</div>
        <label for="" class="login__label">Логин
          <input type="text" v-model="username" class="login__input">
        </label>
        <label for="" class="login__label">Пароль
          <input type="text" v-model="password" class="login__input">
        </label>
        <div class="login__btns">
          <button class="login__btn" @click.prevent="auth">Войти</button>
          <router-link class="login__btn" :to="{ 'name': 'registration' }">Регистрация</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import router from "@/router";
import {mapActions} from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['fetchPhrase']),
    getPhrase() {
      this.fetchPhrase();
    },
    auth() {
      const bodyFormData = new FormData();
      bodyFormData.append('username', this.username);
      bodyFormData.append('password', this.password);

      axios({
        method: "post",
        url: "users/login",
        data: bodyFormData,
        headers: {"Content-Type": "multipart/form-data"},
      })
          .then((response) => { // Use arrow function here
            //handle success
            console.log(response);
            // Save the token and uid to localStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('uid', response.data.uid);
            // Set the Authorization header for all axios requests
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
            // Fetch the phrase
            this.getPhrase();
            router.push({name: 'workouts'})
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  &__inner {
    height: calc(100vh - 86px);
    display: flex;
    justify-content: center;
    align-items: center;

  }

  &__form {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding: 40px 100px;
    background-color: #D9D9D9;
    border-radius: 10px;
    border: 1px solid #000000;
  }

  &__header {
    font-size: 30px;
    font-weight: 500;
  }

  &__label {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__input {
    width: 316px;
    outline: none;
    padding: 0 5px;
    font-size: 36px;
    background-color: #fff;
    border: 1px solid #000000;
  }

  &__input:focus {
    outline: 1px solid #000000;
  }

  &__btns {
    margin-top: 10px;
    gap: 8px;
    display: flex;
    width: 100%;
  }

  &__btn {
    text-decoration: none;
    color: inherit;
    padding: 5px;
    flex: 1 1 0px;
    font-size: 26px;
    border: 1px solid #000000;
    border-radius: 10px;
  }
}

</style>