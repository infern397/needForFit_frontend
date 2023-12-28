<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-card-title class="ml-5">{{ user.username }}</v-card-title>
          <v-card-item>
            <v-list>
              <v-list-item>Общий поднятый вес: {{ userStat.ttl_weight }}кг</v-list-item>
              <v-list-item>Максимальный поднятый вес: {{ userStat.max_weight }}кг</v-list-item>
              <v-list-item>Общее кол-во повторений: {{ userStat.ttl_reps }}</v-list-item>
            </v-list>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="7" offset="0">
        <v-card class="d-flex flex-column align-center">
          <v-card-title class="ml-a">Мои тренировки</v-card-title>
          <v-card-item class="w-100">
            <v-list lines="one" class="w-100">
              <v-card class="w-100 d-block pa-5" v-for="(workout, i) in workouts">
                <v-row>
                  <v-col cols="12" class="d-flex justify-space-between align-center">
                    <v-card-title>{{ workout.created_at }}</v-card-title>
                    <v-icon v-if="!openedWorkouts[i]" icon="mdi-arrow-down-drop-circle-outline"
                            @click="openOrCloseWorkout(i)"></v-icon>
                    <v-icon v-else icon="mdi-arrow-down-drop-circle-outline" @click="openOrCloseWorkout(i)"
                            class="mdi-rotate-180"></v-icon>
                  </v-col>
                </v-row>
                <transition name="drop" appear>
                  <v-row v-show="openedWorkouts[i]" :key="i">
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="4" class="text-center">
                          Любимое упражнение: {{ workout.stat.favorite_exercise }}
                        </v-col>
                        <v-col cols="4" class="text-center">
                          Кол-во упражений: {{ workout.stat.exercises_count }}
                        </v-col>
                        <v-col cols="4" class="text-center">
                          Общий вес: {{ workout.stat.total_weight }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-list lines="one">
                            <v-card-title>Максимальное кол-во повторений</v-card-title>
                            <v-list-item v-for="(stat, key) in workout.stat.max_reps">
                              <v-list-item-title>{{ `${key}: ${stat}` }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-col>
                        <v-col cols="6">
                          <v-list lines="one">
                            <v-card-title>Максимальный вес</v-card-title>
                            <v-list-item v-for="(stat, key) in workout.stat.max_weights">
                              <v-list-item-title>{{ `${key}: ${stat}` }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </transition>
              </v-card>
            </v-list>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountPage",
  data() {
    return {
      user: {},
      userStat: {},
      workouts: {},
      openedWorkouts: [],
      opens: false,
    }
  },
  methods: {
    getUserDate() {
      axios.get('http://127.0.0.1:8000/api/users/stats/' + this.$route.params.id)
          .then(res => {
            console.log(res);
            this.user = res.data.user;
            this.userStat = this.user.stat;
            this.workouts = res.data.workouts.filter(e => e.stat);
            this.openedWorkouts = new Array(this.workouts.length).fill(false);
          })
          .catch(err => console.log(err));
    },
    openOrCloseWorkout(index) {
      this.openedWorkouts[index] = !this.openedWorkouts[index];
    }
  },
  mounted() {
    this.getUserDate();
  }
}
</script>

<style scoped>
.drop-enter-active {
  animation: bounce-in .3s ease-out;
}
.drop-leave-active {
  animation: bounce-in .3s reverse ease-in;
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