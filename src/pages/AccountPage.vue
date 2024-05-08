<template>
  <CategoryModal v-if="showCreateModal" mode="create" @save-category="addCategoryByModal" @close="closeCreate"/>
  <CategoryModal v-if="showEditModal" :category="chooseCategory" mode="edit" @save-category="updateCategoryByModal"
                 @delete="deleteCategoryByModal" @close="closeEdit"/>
  <div class="container account__inner">
    <div class="account__left">
      <div class="account__left-wrapper">
        <div class="account__info">
        <img src="/images/account/profile.svg" alt="" class="account__profile-img">
        <p class="account__name-mobile">Admin</p>
        </div>
        <div class="account__info-stats">
          <p class="account__name">Admin</p>
          <ul class="account__stats">
            <li class="account__stat">Общий поднятый вес: {{ userStat.ttl_weight }}&nbsp;кг</li>
            <li class="account__stat">Максимальный поднятый вес: {{ userStat.max_weight }}&nbsp;кг</li>
            <li class="account__stat">Общее кол-во повторений: {{ userStat.ttl_reps }}</li>
          </ul>
        </div>
      </div>

      <div class="categories">
        <div class="categories__title" @click="toggleCategoriesList">Мои категории</div>
        <div class="" v-show="isCategoriesListVisible">
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
    </div>
    <div class="account__right">
      <h2 class="account__title">Мои тренировки</h2>
      <ul class="account__trainings">
        <li class="account__training" v-for="(workout, i) in workouts">
          <div class="training__title">
            <p class="training__name">{{ formatHumanDate(workout.created_at) }}</p>
            <!--            <v-icon v-if="!openedWorkouts[i]" icon="mdi-arrow-down-drop-circle-outline"-->
            <!--                    @click="openOrCloseWorkout(i)"></v-icon>-->
            <!--            <v-icon v-else icon="mdi-arrow-down-drop-circle-outline" @click="openOrCloseWorkout(i)"-->
            <!--                    class="mdi-rotate-180"></v-icon>-->
            <button v-if="!openedWorkouts[i]" class="training__open-btn" @click="openOrCloseWorkout(i)">&lt</button>
            <button v-else class="training__open-btn" @click="openOrCloseWorkout(i)" style="transform: rotateZ(90deg)">
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
  <!--    <v-container>-->
  <!--      <v-row>-->
  <!--        <v-col cols="5">-->
  <!--          <v-card>-->
  <!--            <v-card-title class="ml-5">{{ user.username }}</v-card-title>-->
  <!--            <v-card-item>-->
  <!--              <v-list>-->
  <!--                <v-list-item>Общий поднятый вес: {{ userStat.ttl_weight }}кг</v-list-item>-->
  <!--                <v-list-item>Максимальный поднятый вес: {{ userStat.max_weight }}кг</v-list-item>-->
  <!--                <v-list-item>Общее кол-во повторений: {{ userStat.ttl_reps }}</v-list-item>-->
  <!--              </v-list>-->
  <!--            </v-card-item>-->
  <!--          </v-card>-->
  <!--        </v-col>-->

  <!--        <v-col cols="7" offset="0">-->
  <!--          <v-card class="d-flex flex-column align-center">-->
  <!--            <v-card-title class="ml-a">Мои тренировки</v-card-title>-->
  <!--            <v-card-item class="w-100">-->
  <!--              <v-list lines="one" class="w-100">-->
  <!--                <v-card class="w-100 d-block pa-5" v-for="(workout, i) in workouts">-->
  <!--                  <v-row>-->
  <!--                    <v-col cols="12" class="d-flex justify-space-between align-center">-->
  <!--                      <v-card-title>{{ workout.created_at }}</v-card-title>-->
  <!--                      <v-icon v-if="!openedWorkouts[i]" icon="mdi-arrow-down-drop-circle-outline"-->
  <!--                              @click="openOrCloseWorkout(i)"></v-icon>-->
  <!--                      <v-icon v-else icon="mdi-arrow-down-drop-circle-outline" @click="openOrCloseWorkout(i)"-->
  <!--                              class="mdi-rotate-180"></v-icon>-->
  <!--                    </v-col>-->
  <!--                  </v-row>-->
  <!--                  <transition name="drop" appear>-->
  <!--                    <v-row v-show="openedWorkouts[i]" :key="i">-->
  <!--                      <v-col cols="12">-->
  <!--                        <v-row>-->
  <!--                          <v-col cols="4" class="text-center">-->
  <!--                            Любимое упражнение: {{ workout.stat.favorite_exercise }}-->
  <!--                          </v-col>-->
  <!--                          <v-col cols="4" class="text-center">-->
  <!--                            Кол-во упражений: {{ workout.stat.exercises_count }}-->
  <!--                          </v-col>-->
  <!--                          <v-col cols="4" class="text-center">-->
  <!--                            Общий вес: {{ workout.stat.total_weight }}-->
  <!--                          </v-col>-->
  <!--                        </v-row>-->
  <!--                        <v-row>-->
  <!--                          <v-col cols="6">-->
  <!--                            <v-list lines="one">-->
  <!--                              <v-card-title>Максимальное кол-во повторений</v-card-title>-->
  <!--                              <v-list-item v-for="(stat, key) in workout.stat.max_reps">-->
  <!--                                <v-list-item-title>{{ `${key}: ${stat}` }}</v-list-item-title>-->
  <!--                              </v-list-item>-->
  <!--                            </v-list>-->
  <!--                          </v-col>-->
  <!--                          <v-col cols="6">-->
  <!--                            <v-list lines="one">-->
  <!--                              <v-card-title>Максимальный вес</v-card-title>-->
  <!--                              <v-list-item v-for="(stat, key) in workout.stat.max_weights">-->
  <!--                                <v-list-item-title>{{ `${key}: ${stat}` }}</v-list-item-title>-->
  <!--                              </v-list-item>-->
  <!--                            </v-list>-->
  <!--                          </v-col>-->
  <!--                        </v-row>-->
  <!--                      </v-col>-->
  <!--                    </v-row>-->
  <!--                  </transition>-->
  <!--                </v-card>-->
  <!--              </v-list>-->
  <!--            </v-card-item>-->
  <!--          </v-card>-->
  <!--        </v-col>-->
  <!--      </v-row>-->

  <!--    </v-container>-->
</template>

<script>
import axios from "axios";
import CategoryModal from "@/components/modals/CategoryModal"
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "AccountPage",
  components: {
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
      chooseCategory: null,
      isCategoriesListVisible: false,
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
  },
  computed: {
    ...mapGetters(['categories']),
  },
  mounted() {
    this.getUserDate();
    this.fetchCategories();
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

    @media (max-width: 576px) {
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

    @media (max-width: 576px) {
      max-width: unset;
    }

    &-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      align-content: center;
      gap: 6px;
      @media (max-width: 576px) {
        flex-direction: row;
        justify-content: space-between;
        align-content: stretch
      }
    }

  }

  &__profile-img {
    background-color: #fff;
    border-radius: 30px;
    max-height: 235px;

    @media (max-width: 576px) {
      max-height: 110px;

    }
  }

  &__name {
    width: fit-content;
    font-size: 30px;
    font-weight: 500;
    @media (max-width: 576px) {
      display: none;
    }

    &-mobile {
      display: none;
      @media (max-width: 576px) {
        display: block;
      }
    }
  }

  &__stats {
    padding: 5px;
    list-style: none;
    background-color: #D9D9D9;
    border: 1px solid #000000;
    border-radius: 10px;

    @media (max-width: 768px) {
      height: 100%;
      width: 100%;
    }
  }

  &__stat {
    font-size: 24px;

    @media (max-width: 1024px) {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      font-size: 16px;
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
    margin-top: 60px;
    position: relative;
    padding: 5px 30px;
    font-size: 24px;
    border: 1px solid #000000;
    border-radius: 10px;

    @media (max-width: 768px) {
      margin-top: 20px;
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
</style>