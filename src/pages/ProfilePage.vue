<template>
  <div class="container">
    <div class="profile__title-mobile">
      Профиль
    </div>
    <div class="profile__inner">
      <div class="profile__left">
        <img src="/images/profile/Авторизация.png" alt="" class="profile__img">
        <div class="profile__left-btns">
          <button class="profile__left-btn">Загрузить фото</button>
          <button class="profile__left-btn">Удалить фото</button>
        </div>
      </div>
      <div class="profile__right">
        <div class="profile__title">Профиль</div>
        <div class="profile__data">
          <div class="profile__form">
            <label for="" class="profile__label">Логин
              <input type="text" class="profile__input">

            </label>
            <div class="profile__btns">
              <button class="profile__btn">
                <img src="/images/profile/Vector.png" alt="Сохранить">
              </button>
              <button class="profile__btn">
                <img src="/images/profile/Vector-1.png" alt="Отменить">
              </button>
            </div>
          </div>
          <div class="profile__form">
            <label for="" class="profile__label">Старый пароль
              <input type="text" class="profile__input">
            </label>
            <label for="" class="profile__label">Новый пароль
              <input type="text" class="profile__input">
            </label>
            <label for="" class="profile__label">Подтвердите новый пароль
              <input type="text" class="profile__input">
            </label>
            <div class="profile__btns">
              <button class="profile__btn">
                <img src="/images/profile/Vector.png" alt="Сохранить">
              </button>
              <button class="profile__btn">
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
export default {
  name: "ProfilePage"
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