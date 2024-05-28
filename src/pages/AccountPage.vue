<template>
  <CategoryModal v-if="showCreateModal" mode="create" @save-category="addCategoryByModal" @close="closeCreate"/>
  <CategoryModal v-if="showEditModal" :category="chooseCategory" mode="edit" @save-category="updateCategoryByModal"
                 @delete="deleteCategoryByModal" @close="closeEdit"/>
  <PhraseModal v-if="showPhraseModal" @close="closePhrase"/>

  <div class="container account__inner">
    <div class="account__left">
      <div class="account__left-wrapper">
        <div class="account__info">
          <img src="/images/account/profile.svg" alt="" class="account__profile-img">
          <p class="account__name-mobile">{{ user.username }}</p>

        </div>
        <div class="account__info-stats">
          <p class="account__name">{{ user.username }}</p>
          <ul class="account__stats">
            <li class="account__stat">Общий поднятый вес: {{ userStat.ttl_weight }}&nbsp;кг</li>
            <li class="account__stat">Максимальный поднятый вес: {{ userStat.max_weight }}&nbsp;кг</li>
            <li class="account__stat">Общее кол-во повторений: {{ userStat.ttl_reps }}</li>
            <!--            <button @click="logout" class="categories__item">Выйти</button>-->

          </ul>
        </div>
      </div>

      <div class="categories">
        <div class="categories__title" @click="toggleCategoriesList">Мои категории</div>
        <div class="categories__wrapper" v-show="isCategoriesListVisible">
          <ul class="categories__list">
            <li v-for="category in categories" class="categories__item"
                @click="openEdit(category)"
            >{{ category.name }}
            </li>
          </ul>
          <button class="categories__btn" @click="openCreate">
            Добавить
          </button>
        </div>
      </div>
      <div class="phrase">
        <div class="phrase__text">
          Моя цитата
        </div>
        <button class="phrase__btn" @click="openPhrase">Установить</button>
      </div>
    </div>
    <div class="account__right">
      <h2 class="account__title">Мои тренировки</h2>
      <ul class="account__trainings">
        <li class="account__training" v-for="(workout, i) in workouts" @click="openOrCloseWorkout(i)">
          <div class="training__title">
            <p class="training__name">{{ formatHumanDate(workout.created_at) }}</p>
            <!--            <v-icon v-if="!openedWorkouts[i]" icon="mdi-arrow-down-drop-circle-outline"-->
            <!--                    @click="openOrCloseWorkout(i)"></v-icon>-->
            <!--            <v-icon v-else icon="mdi-arrow-down-drop-circle-outline" @click="openOrCloseWorkout(i)"-->
            <!--                    class="mdi-rotate-180"></v-icon>-->
            <button v-if="!openedWorkouts[i]" class="training__open-btn">&lt</button>
            <button v-else class="training__open-btn" style="transform: rotateZ(90deg)">
              &lt;
            </button>
          </div>
          <transition name="drop" appear>
            <div class="training__stats" v-show="openedWorkouts[i]" :key="i">
              <div class="stats__total">
                <p class="total__exercise">Любимое упражнение: {{ workout.stat.favorite_exercise }}</p>
                <p class="total__amount">Кол-во упражнений: {{ workout.stat.exercises_count }}</p>
                <p class="total__weight">Общий вес: {{ workout.stat.total_weight }}</p>
              </div>
              <div class="stats__bottom">
                <div class="stats__group">
                  <h3 class="group__title">
                    Максимум повторений
                  </h3>
                  <ul class="group__list">
                    <li class="group__item" v-for="(stat, key) in workout.stat.max_reps">{{ `${key}: ${stat}` }}</li>
                  </ul>
                </div>
                <div class="stats__group">
                  <h3 class="group__title">
                    Макимальный вес
                  </h3>
                  <ul class="group__list">
                    <li class="group__item" v-for="(stat, key) in workout.stat.max_weights">{{ `${key}: ${stat}` }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryModal from "@/components/modals/CategoryModal"
import {mapActions, mapGetters} from 'vuex';
import instance from "@/axios";
import router from "@/router";
import PhraseModal from "@/components/modals/PhraseModal";

export default {
  name: "AccountPage",
  components: {
    PhraseModal,
    CategoryModal
  },

  data() {
    return {
      user: {},
      userStat: {},
      workouts: {},
      openedWorkouts: [],
      opens: false,
      showCreateModal: false,
      showEditModal: false,
      showPhraseModal: false,
      chooseCategory: null,
      isCategoriesListVisible: true,
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'deleteCategory', 'addCategory', 'updateCategory']),
    openCreate() {
      this.showCreateModal = true
    },
    closeCreate() {
      this.showCreateModal = false
    },
    openEdit(category) {
      this.chooseCategory = structuredClone(category)
      this.showEditModal = true
    },
    closeEdit() {
      this.chooseCategory = null
      this.showEditModal = false
    },
    openPhrase() {
      this.showPhraseModal = true;
    },
    closePhrase() {
      this.showPhraseModal = false
    },
    getUserDate() {
      axios.get('http://127.0.0.1:8000/api/users/stats/' + localStorage.getItem('uid'))
          .then(res => {
            this.user = res.data.user;
            this.userStat = this.user.stat;
            this.workouts = res.data.workouts.filter(e => e.stat);
            this.openedWorkouts = new Array(this.workouts.length).fill(false);
          })
          .catch(err => console.log(err));
    },
    openOrCloseWorkout(index) {
      this.openedWorkouts[index] = !this.openedWorkouts[index];
    },

    addCategoryByModal(data) {
      this.addCategory(data)
      this.showCreateModal = false
    },
    updateCategoryByModal(data) {
      this.updateCategory(data)
      this.showEditModal = false
    },
    deleteCategoryByModal(id) {
      this.deleteCategory(id)
      this.showEditModal = false
    },
    formatHumanDate(dateString) {
      let date = new Date(dateString);
      let formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      let hours = date.getHours();
      let minutes = date.getMinutes();

      // Добавляем ведущий ноль к часам и минутам, если они меньше 10
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;

      return `${formattedDate} ${hours}:${minutes}`;
    },
    toggleCategoriesList() {
      if (window.innerWidth <= 425) {
        this.isCategoriesListVisible = !this.isCategoriesListVisible;
      }
    },
    logout() {
      // Удаляем токен из localStorage
      localStorage.removeItem('access_token');
      // Удаляем заголовок авторизации
      delete instance.defaults.headers.common['Authorization'];
      // Перенаправляем пользователя на страницу входа
      router.push('/login');
    },
  },
  computed: {
    ...mapGetters(['categories']),
  },
  mounted() {
    this.getUserDate();
    this.fetchCategories();
    if (window.innerWidth <= 425) {
      this.isCategoriesListVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">

.account {

  &__inner {
    padding-top: 34px;
    display: flex;
    justify-content: space-between;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__info {
    display: flex;

    flex-direction: column;
    align-items: center;

    &-stats {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
      width: 100%;
    }
  }

  &__left {
    max-width: 470px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    @media (max-width: 768px) {
      max-width: unset;
    }

    &-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      align-content: center;
      gap: 6px;
      @media (max-width: 768px) {
        max-width: unset;
        flex-direction: row;
      }
      @media (max-width: 576px) {
        justify-content: space-between;
        align-content: stretch
      }
    }

  }

  &__profile-img {
    background-color: #fff;
    border-radius: 30px;
    max-height: 235px;

    @media (max-width: 768px) {
      max-height: 120px;
    }

    @media (max-width: 576px) {
      max-height: 110px;

    }
  }

  &__name {
    width: fit-content;
    font-size: 30px;
    font-weight: 500;
    @media (max-width: 768px) {
      display: none;
    }

    &-mobile {
      display: none;
      font-size: 20px;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  &__stats {
    display: flex;
    flex-direction: column;
    padding: 5px;
    list-style: none;
    background-color: #D9D9D9;
    border: 1px solid #000000;
    border-radius: 10px;

    @media (max-width: 768px) {
      height: 100%;
      width: 100%;
      justify-content: space-around;
    }
  }

  &__stat {
    font-size: 24px;

    @media (max-width: 1024px) {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 576px) {
      font-size: 15px;
    }
  }

  &__title {
    width: fit-content;
    padding: 5px;
    font-size: 36px;
    font-weight: 400;
    background-color: #D9D9D9;
    border-radius: 10px;
    border: 1px solid #000000;

    @media (max-width: 1024px) {
      font-size: 28px;
    }

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 655px;

    @media (max-width: 768px) {
      max-width: unset;
    }
  }
}

.account__trainings {
  width: 100%;
  list-style: none;
}

.training {
  &__title {
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000000;
  }

  &__open-btn {
    font-size: 24px;
    transform: rotateZ(-90deg);
  }

  &__name {
    font-size: 24px;

    @media (max-width: 1024px) {
      font-size: 22px;
    }

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
}

.stats {
  &__total {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000000;
  }

  &__bottom {
    padding: 15px;
    display: flex;
    gap: 5px;
    justify-content: space-between;
  }
}

.group {
  &__title {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 20px;
  }
}

.training__stats {
  &__bottom {

  }

  padding: 5px;
  margin-top: 5px;
  background-color: #D9D9D9;
  border-radius: 5px;
  border: 1px solid #000000;
}

.group {
  &__list {
    list-style: none;
  }
}


.categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  width: 100%;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 10px;

  &__wrapper {
    width: 100%;
  }

  &__title {
    line-height: 1;
    font-size: 36px;

    @media (max-width: 1024px) {
      font-size: 32px;
    }

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  &__list {
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    width: 100%;

    &:before {
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      width: 210px;
      height: 1px;
      background: #000000;
      content: "";
    }
  }

  &__item {
    padding: 5px;
    text-align: center;
    background-color: #FFFFFF;
    line-height: 1;
    font-size: 32px;
    border: 1px solid #000000;
    border-radius: 10px;
    cursor: pointer;
    @media (max-width: 1024px) {
      font-size: 24px;
    }

    &::after {
      display: block;
    }
  }

  &__btn {
    position: relative;
    padding: 5px 30px;
    font-size: 24px;
    border: 1px solid #000000;
    border-radius: 10px;
    margin: 20px auto 0;
    display: block;

    @media (max-width: 768px) {
      margin: 20px auto 0;
    }

    &:before {
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      width: 210px;
      height: 1px;
      background: #000000;
      content: "";
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

.drop-enter-active {
  animation: bounce-in .3s ease-out;
}

.drop-leave-active {
  animation: bounce-in .2s reverse ease-in;
}

@keyframes bounce-in {
  0% {
    max-height: 0;
  }
  99% {
    max-height: 1000px;
  }
  100% {
    max-height: unset;
  }
}

.phrase {
  width: 100%;
  flex-wrap: wrap;
  padding: 23px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 10px;

  &__text {
    font-size: 36px;
    line-height: 1;
    @media (max-width: 1024px) {
      font-size: 24px;
    }
  }

  &__btn {
    padding: 5px 20px;
    font-size: 24px;
    border: 1px solid #000000;
    border-radius: 10px;
    @media (max-width: 1024px) {
      font-size: 18px;
    }
  }
}
</style>