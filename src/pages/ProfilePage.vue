<template>
  <div class="container">
    <div class="profile__title-mobile">
      Профиль
    </div>
    <div class="profile__inner">
      <div class="profile__left">
        <img :src="'http://' + user.profile_picture" alt="" class="profile__img">
        <div class="profile__left-btns">
          <input type="file" @change="onFileChange" class="profile__left-input" ref="fileInput" style="display: none">
          <button class="profile__left-btn" @click="onButtonClick">Загрузить фото</button>
          <button class="profile__left-btn" @click="deleteAva">Удалить фото</button>
        </div>
      </div>
      <div class="profile__right">
        <div class="profile__title">Профиль</div>
        <div class="profile__data">
          <div class="profile__form">
            <label for="" class="profile__label">Логин
              <input type="text" class="profile__input" v-model="newLogin" @input="v$.newLogin.$touch" autocomplete="new-password">
              <span v-if="v$.newLogin.$dirty">
                <span v-if="v$.newLogin.required.$invalid" class="error">Поле обязательно для заполнения</span>
                <span v-if="v$.newLogin.minLength.$invalid" class="error">Логин должен быть не менее 3 символов</span>
              </span>
            </label>
            <div class="profile__btns">
              <button class="profile__btn" @click="updateLog">
                <img src="/images/profile/Vector.png" alt="Сохранить">
              </button>
              <button class="profile__btn" @click="resetLogin">
                <img src="/images/profile/Vector-1.png" alt="Отменить">
              </button>
            </div>
          </div>
          <div class="profile__form">
            <label for="" class="profile__label">Старый пароль
              <input type="password" class="profile__input" v-model="oldPassword" @input="v$.oldPassword.$touch" autocomplete="new-password">
              <span v-if="v$.oldPassword.$dirty">
                <span v-if="v$.oldPassword.required.$invalid"
                      class="error">Поле обязательно для заполнения</span>
                <span v-if="v$.oldPassword.minLength.$invalid" class="error">
                  Пароль должен быть не менее 8 символов
                </span>
              </span>
            </label>
            <label for="" class="profile__label">Новый пароль
              <input type="password" class="profile__input" v-model="newPassword" @input="v$.newPassword.$touch" autocomplete="new-password">
              <span v-if="v$.newPassword.$dirty">
                <span v-if="v$.newPassword.required.$invalid"
                      class="error">Поле обязательно для заполнения</span>
                <span v-if="v$.newPassword.minLength.$invalid" class="error">
                  Пароль должен быть не менее 8 символов
                </span>
              </span>
            </label>
            <label for="" class="profile__label">Подтвердите новый пароль
              <input type="password" class="profile__input" v-model="confirmedPassword" @input="v$.confirmedPassword.$touch" autocomplete="new-password">
              <span v-if="v$.confirmedPassword.$error" class="error">Пароли не совпадают</span>
            </label>
            <div class="profile__btns">
              <button class="profile__btn" @click="updatePas">
                <img src="/images/profile/Vector.png" alt="Сохранить">
              </button>
              <button class="profile__btn" @click="resetPassword">
                <img src="/images/profile/Vector-1.png" alt="Отменить">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {required, minLength, sameAs} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core/dist";


export default {
  name: "ProfilePage",
  data() {
    return {
      newLogin: '',
      oldPassword: '',
      newPassword: '',
      confirmedPassword: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['fetchUser', 'updateLogin', 'updatePassword', 'updateAvatar', 'deleteAvatar']),
    updateLog() {
      this.updateLogin({newLogin: this.newLogin});
    },
    updatePas() {
      this.updatePassword({oldPassword: this.oldPassword, newPassword: this.newPassword});
    },
    onFileChange(e) {
      this.updateAvatar(e.target.files[0]);
    },
    onButtonClick() {
      this.$refs.fileInput.click();
    },
    deleteAva() {
      this.deleteAvatar();
    },
    resetLogin() {

      this.newLogin = this.user.username;
    },
    resetPassword() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmedPassword = '';
    },
  },
  validations() {
    return {
      oldPassword: {required, minLength: minLength(8)},
      newPassword: {required, minLength: minLength(8)},
      confirmedPassword: { required, sameAs: sameAs('newPassword') },
      newLogin: { required, minLength: minLength(3) },
    }
  },
  created() {
    this.fetchUser()
  },
  setup() {
    return {v$: useVuelidate()}
  },
}
</script>

<style scoped lang="scss">
.profile {
  &__inner {
    padding: 30px 110px;
    display: flex;
    gap: 20px;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 10px 5px;
      flex-direction: column;
      align-items: center;
    }
  }

  &__left {
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: row;
      max-width: 488px;
      width: 100%;

    }

    @media (max-width: 425px) {
      flex-direction: column;
    }

    &-btns {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (max-width: 425px) {
        max-width: 235px;
      }
    }

    &-btn {
      padding: 6px 10px;
      background-color: #D9D9D9;
      border-radius: 10px;
      width: 100%;
      border: 1px solid #000000;
      font-size: 24px;
    }
  }

  &__img {
    border-radius: 10px;
    object-fit: cover;

    @media (max-width: 768px) {
      max-height: 150px;
    }

    @media (max-width: 425px) {
      max-height: 194px;
    }
  }

  &__right {
    max-width: 768px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 48px;

    @media (max-width: 768px) {
      display: none;
    }

    &-mobile {
      display: none;
      text-align: center;
      font-size: 24px;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  &__data {
    width: 100%;
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      justify-content: space-between;
      width: unset;
      max-width: 488px;
    }
  }

  &__label {
    width: 100%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__input {
    outline: none;
    padding: 10px 8px;
    font-size: 20px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 10px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  &__form {
    max-width: 325px;
    width: 100%;

    @media (max-width: 768px) {
      max-width: unset;
    }
  }

  &__btns {
    margin-top: 14px;
    display: flex;
    margin-left: auto;
    width: fit-content;
    gap: 15px;
  }
}
</style>