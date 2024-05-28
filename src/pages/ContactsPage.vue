<template>
  <div class="container contacts__inner">
    <h2 class="contacts__title">Связь</h2>
    <p class="contacts__descr">
      Если у Вас возникли вопросы или предложения по проекту, пишите нам
    </p>
    <ul class="contacts__list">
      <li class="contacts__item">
        <a href="#" class="contacts__link">
          <img src="/images/contacts/tg.png" alt="Telegram" class="contacts__img">
        </a>
      </li>
      <li class="contacts__item">
        <a href="#" class="contacts__link">
          <img src="/images/contacts/git.png" alt="Guthub" class="contacts__img">
        </a>
      </li>
      <li class="contacts__item">
        <a href="#" class="contacts__link">
          <img src="/images/contacts/vk.png" alt="Vk" class="contacts__img">
        </a>
      </li>
      <li class="contacts__item">
        <a href="#" class="contacts__link">
          <img src="/images/contacts/ds.png" alt="Discord" class="contacts__img">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContactsPage"
}
</script>

<style scoped lang="scss">
.contacts {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;

    @media (max-width: 425px) {
      gap: 20px;
    }
  }

  &__title {
    font-size: 64px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 40px;
    }
    @media (max-width: 425px) {
      font-size: 32px;
    }
  }

  &__descr {
    max-width: 1000px;
    text-align: center;
    font-size: 40px;
    @media (max-width: 768px) {
      font-size: 32px;
    }
    @media (max-width: 425px) {
      font-size: 24px;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    gap: 32px;

    @media (max-width: 768px) {
      gap: 15px;
    }
    @media (max-width: 425px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  &__item {
    max-width: 100px;
  }

  &__link {
    max-width: 176px;
    max-height: 176px;

    @media (max-width: 768px) {
      max-width: 140px;
      max-height: 140px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>