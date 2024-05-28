<template>
  <div class="container contacts__inner">
    <div class="contacts__title">Связь</div>
    <swiper class="contacts__list" :modules="modules" :pagination="{ clickable: true }" :slides-per-view="1"
            :space-between="10"
            :breakpoints="{
              '320': {
                slidesPerView: 1,
                spaceBetween: 20
              },
              '768': {
                slidesPerView: 2,
                spaceBetween: 40
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 50
              }
            }"

    >
      <swiper-slide>
        <div class="contacts__item">
          <img src="/images/contacts/Семён.png" class="contacts__item-img" alt="">
          <div class="contacts__item-title">Семён Мочалов</div>
          <div class="contacts__item-subtitle">Тим-лид команды, фронтенд проекта</div>
          <div class="contacts__item-descr">Не сказать, что он умный малый, скорее всего умный высокий. Всего добился
            сам,
            купил машину, заработал на квартиру, вообщем и целом, успех его второе имя! Жмёт 150кг от груди, любит свою
            кису
          </div>
          <div class="contacts__item-links">
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/VK.svg" alt="Vk">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/TG.svg" alt="tg">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/DS.svg" alt="ds">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/GIT.svg" alt="git">
                      </a>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="contacts__item">
          <img src="/images/contacts/Аркадий.png" class="contacts__item-img" alt="">
          <div class="contacts__item-title">Аркадий Шенберг</div>
          <div class="contacts__item-subtitle">Душа команды, бэкенд проекта</div>
          <div class="contacts__item-descr">
            Настоящая живая легенда, всегда приходит на помощь, подскажет во всём. Всего
            добился благодаря опыту, делал отчёты по БЖД сам, жмёт 100кг от груди, любит поспать
          </div>
          <div class="contacts__item-links">
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/VK.svg" alt="Vk">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/TG.svg" alt="tg">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/DS.svg" alt="ds">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/GIT.svg" alt="git">
                      </a>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="contacts__item">
          <img src="/images/contacts/Бокал.png" class="contacts__item-img" alt="">
          <div class="contacts__item-title">Илья Бокаленко</div>
          <div class="contacts__item-subtitle">Анекдот команды, дизайнер проекта</div>
          <div class="contacts__item-descr">
            Умеет фигмить, что-то прогать, веселый малый. Ничего не добился, заслужил ПГАС, любит пирожки и потравить
            анекдоты. В беде не бросит, лишнего не спросит
          </div>
          <div class="contacts__item-links">
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/VK.svg" alt="Vk">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/TG.svg" alt="tg">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/DS.svg" alt="ds">
                      </a>
                      <a href="" class="contacts__item-link">
                        <img src="/images/contacts/GIT.svg" alt="git">
                      </a>
          </div>
        </div>
      </swiper-slide>

    </swiper>
  </div>
</template>

<script>
import SwiperClass, {Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  name: "ContactsPage",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination]
    }
  }

}
</script>

<style scoped lang="scss">
.contacts {
  &__inner {
    padding: 0 100px;

    @media (max-width: 728px) {
      padding: 0 50px;
    }

    @media (max-width: 425px) {
      padding: 0 15px;
    }
  }

  &__title {
    display: block;
    margin: 0 auto;
    width: fit-content;
    font-size: 64px;

    @media (max-width: 728px) {
      font-size: 42px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding-bottom: 30px;
  }

  &__item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &-title {
      font-size: 36px;
      line-height: 1;

      @media (max-width: 1024px) {
        font-size: 28px;
      }


    }

    &-subtitle {
      color: #E3311D;
      font-size: 20px;
    }

    &-descr {
      text-align: justify;
      font-size: 20px;

      @media (max-width: 1024px) {
        font-size: 18px;
      }
    }

    &-links {
      margin-top: auto;
      display: flex;
      gap: 2px;
      justify-content: space-between;
    }

    &-link {
      display: block;
      border: 1px solid #7C8685;
      border-radius: 20px;
      img {
        width: 100%;
        height: 100%;
        max-width: 80px;
        max-height: 80px;
      }

    }

    &-img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 5px;
      object-fit: contain;

      @media (max-width: 768px) {
        height: 425px;
      }
      @media (max-width: 425px) {
        height: 280px;
      }
    }

    &-link {

    }
  }


}
</style>