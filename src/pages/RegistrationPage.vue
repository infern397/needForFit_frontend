<template>
  <div class="container">
    <div class="registration__inner">
      <form action="" class="registration__form">
        <div class="registration__header">Регистрация</div>
        <label for="" class="registration__label">Логин
          <input type="text" v-model="username" class="registration__input">
        </label>
        <label for="" class="registration__label">Пароль
          <input type="text" v-model="password" class="registration__input">
        </label>
        <div class="registration__btns">
          <button class="registration__btn" @click.prevent="registration">Зарегистрироваться</button>
          <router-link class="registration__btn" :to="{ 'name': 'login' }">Авторизация</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    registration() {
      axios({
        method: "post",
        url: "users/register",
        data: {
          "username": this.username,
          "password": this.password,
        },
      })
          .then(function (response) {
            //handle success
            console.log(response);
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
.registration {
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