<template>
  <ApproachModal ref="modal" v-show="showModal" @close="close"
                  class="modal"
                  :approachData="selectedApproachData || {}"
                  @save-approach="addApproach"
                  @delete-approach="removeApproach"
                  @update-approach="updateApproach"
  />
  <div class="container workout__inner">
    <ul class="workout__list">
      <li class="workout__item" v-for="(exercise, i) in exercisesList">
        <p class="approaches__title">{{ exercise.exercise.name }}</p>
        <ul class="approaches__list">
          <li class="approaches__item" @click="editApproachDialog(i, e)" v-for="(approach, e) in exercise.approaches">
            <p class="approaches__weight">{{ approach.weight }} кг</p>
            <p class="approaches__count">{{ approach.reps }} пвт</p>
          </li>

          <li @click="addApproachDialog(exercise.exercise.id)" class="approaches__item approaches__btn">+</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="add__btn" @click="$router.push({name: 'exercises', params: { id: $route.params.id }})">
    <img src="/images/workouts/gantel.svg" alt="Добавить" class="add__btn-image">
  </div>
<!--  <approach-modal v-model="showModal"/>-->
<!--  <v-container>-->
<!--    <v-row>-->
<!--      <v-col class="v-col-4" v-for="(exercise, i) in exercisesList">-->
<!--        <v-card position="relative">-->
<!--          <v-btn-->
<!--              @click="removeExercise($route.params.id, exercise.exercise.id)"-->
<!--              class="mt-1 mr-1 v-btn&#45;&#45;size-x-small"-->
<!--              position="absolute"-->
<!--              fab-->
<!--              icon="mdi-delete"-->
<!--              location="top right"-->
<!--          ></v-btn>-->
<!--          <v-card-title>{{ `Упражение ${exercise.exercise.name}` }}</v-card-title>-->
<!--          <v-card-subtitle>{{ `Описание: ${exercise.exercise.description}` }}</v-card-subtitle>-->
<!--          <v-card-item>-->
<!--            <v-row>-->
<!--              <v-col cols="6" v-for="approach in exercise.approaches">-->
<!--                <v-card variant="tonal" class="pb-3 d-flex flex-column align-center">-->
<!--                  <v-card-item class="w-100">-->
<!--                    <v-responsive class="ma-0 pa-0" width="100%">-->
<!--                      <v-text-field label="Повторения" v-model="approach.reps"-->
<!--                                    @change="updateApproach(approach)"></v-text-field>-->
<!--                    </v-responsive>-->
<!--                    <v-text-field label="Вес" v-model="approach.weight"-->
<!--                                  @change="updateApproach(approach)"></v-text-field>-->
<!--                  </v-card-item>-->
<!--                  <v-btn @click="removeApproach(approach.id, approach.eid)">-->
<!--                    Удалить-->
<!--                  </v-btn>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--              <v-col cols="6">-->
<!--                <v-card variant="tonal" class="h-100" @click="addApproach($route.params.id, exercise.exercise.id)">-->
<!--                  <v-card-item class="d-flex align-center justify-center">-->
<!--                    <p class="">Добавить</p>-->
<!--                  </v-card-item>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card-item>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->
<!--  <div class="btns d-flex position-fixed ga-3">-->
<!--    <v-btn-->
<!--        @click="$router.push({name: 'exercises', params: { id: $route.params.id }})"-->
<!--        class="v-btn&#45;&#45;size-x-large"-->
<!--        rig-->
<!--        color="teal"-->
<!--        icon="mdi-plus"-->

<!--    >-->
<!--    </v-btn>-->
<!--    <v-btn-->
<!--        @click="saveWorkout"-->
<!--        class="v-btn&#45;&#45;size-x-large"-->
<!--        rig-->
<!--        color="teal"-->
<!--        icon="mdi-check"-->
<!--    ></v-btn>-->
<!--  </div>-->

</template>

<script>
import axios from "axios";
import ApproachModal from "@/components/modals/ApproachModal";

export default {

  name: "WorkoutPage",
  components: {ApproachModal},
  data: function () {
    return {
      exercisesList: [],
      selectedApproachData: null,
      showModal: false,
    }
  },
  methods: {
    addApproachDialog(exerciseIndex) {
      this.selectedApproachData = null; // Очищаем данные о выбранном подходе
      // Вызов модального окна для добавления подхода к упражнению с заданным индексом
      this.showModal = true
      // console.log(this.$refs.modal)
      this.$refs.modal.openAddApproachModal(exerciseIndex);
    },

    editApproachDialog(exerciseIndex, approachIndex) {
      this.selectedApproachData = this.exercisesList[exerciseIndex].approaches[approachIndex];
      console.log(this.selectedApproachData)
      // Вызов модального окна для редактирования подхода к упражнению с заданными индексами
      this.showModal = true
      this.$refs.modal.openEditApproachModal(exerciseIndex, approachIndex);
    },

    close() {
      this.showModal = false
    },
    show(exerciseIndex, approachIndex) {
      this.showModal = true
    },

    saveWorkout() {
      axios.post('http://127.0.0.1:8000/api/workouts/' + this.$route.params.id)
          .then(this.$router.push({name: 'workouts'}))
          .catch(err => {
            console.log(err);
          })
    },
    getExercises() {
      this.loading = true;
      axios.get('http://127.0.0.1:8000/api/approaches/' + this.$route.params.id)
          .then(res => {
            this.exercisesList = res.data
            console.log(this.exercisesList)
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false
          })
    },
    removeExercise(wid, eid) {
      console.log(wid + ' ' + eid);
      axios.delete(`http://127.0.0.1:8000/api/approaches/${wid}/${eid}`)
          .then((res) => {
            this.exercisesList.splice(this.findExerciseIndex(eid), 1);
          })
          .catch(err => {
            console.log(err);
          })
    },
    addApproach(approach, eid) {
      this.showModal = false
      console.log('add')
      let wid = this.$route.params.id
      axios.post('http://127.0.0.1:8000/api/approaches/',
          {
            eid,
            wid,
            "reps": Number(approach.reps),
            "weight": Number(approach.weight),
            "time": 0
          })
          .then(res => {
            this.findExercise(res.data.eid).approaches
                .push(res.data);
          })
          .catch(err => {
            console.log(err)
          })
    },
    removeApproach(exerciseIndex, approachIndex) {
      this.showModal = false
      const exercise = this.exercisesList[exerciseIndex];
      const approach = exercise.approaches[approachIndex];
      axios.delete(`http://127.0.0.1:8000/api/approaches/${approach.id}`)
          .then(() => {
            exercise.approaches.splice(approachIndex, 1);
          })
          .catch(err => {
            console.log(err)
          })
    },
    updateApproach(approach) {
      this.showModal = false
      axios.post(`http://127.0.0.1:8000/api/approaches/update`, approach)
          .then(() => {
            // Обновляем данные подхода в списке
            const exercise = this.exercisesList.find(exercise => exercise.exercise.id === approach.eid);
            const approachIndex = exercise.approaches.findIndex(a => a.id === approach.id);
            if (approachIndex !== -1) {
              exercise.approaches[approachIndex] = approach;
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    // updateApproach(approach) {
    //   axios.post('http://127.0.0.1:8000/api/approaches/update/',
    //       approach)
    //       .then(res => {
    //         console.log(res);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       })
    // },
    findExercise(eid) {
      return this.exercisesList[this.exercisesList.findIndex(e => e.exercise.id === eid)];
    },
    findExerciseIndex(eid) {
      return this.exercisesList.findIndex(e => e.exercise.id === eid);
    },
  },
  mounted() {
    this.getExercises();
  }
}
</script>

<style scoped lang="scss">
.workout {
  &__inner {
    padding-top: 40px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D9D9D9;
    border-radius: 10px;
  }

}

.approaches {
  &__list {
    max-height: 63px;
    padding: 8px;
    gap: 3px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 47px);
    list-style: none;

    width: 100%;
    background-color: #7C8685;
    border-radius: 10px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;

    font-size: 12px;
    background-color: #D9D9D9;
    border-radius: 10px;
    cursor: pointer;
  }

  &__title {
    font-size: 20px;
    padding: 12px 0;
  }

  &__btn {
    cursor: pointer;
    padding: 0;
    line-height: 0.5;
    font-size: 43px;
    font-weight: 300;
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



.btns {
  right: 15px;
  bottom: 15px;
}
</style>

