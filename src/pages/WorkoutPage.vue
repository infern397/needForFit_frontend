<template>
  <ApproachModal ref="modal" v-show="showModal" @close="close"
                 class="modal"
                 :approachData="selectedApproachData || {}"
                 @save-approach="addApproachToWorkout"
                 @delete-approach="removeApproachFromWorkout"
                 @update-approach="updateApproachInWorkout"
  />
  <div class="container workout__inner">
    <ul class="workout__list">
      <li class="workout__item" v-for="(exercise, i) in workoutList">
        <div class="approaches__header">
          <p class="approaches__title">{{ exercise.exercise ? exercise.exercise.name : '' }}</p>
          <div class="remove__btn" @click="removeExerciseFromWorkout(exercise)">
            <img src="/images/workout/x_icon.png" alt="Добавить" class="add__btn-image">
          </div>
        </div>
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
  <!--    <v-btn-->
  <!--        @click="saveWorkout"-->
  <!--        class="v-btn&#45;&#45;size-x-large"-->
  <!--        rig-->
  <!--        color="teal"-->
  <!--        icon="mdi-check"-->
  <!--    ></v-btn>-->

</template>

<script>
import axios from "@/axios";
import {mapActions, mapGetters} from 'vuex';
import ApproachModal from "@/components/modals/ApproachModal";

export default {

  name: "WorkoutPage",
  components: {ApproachModal},
  data: function () {
    return {
      selectedApproachData: null,
      showModal: false,
    }
  },
  computed: {
    ...mapGetters(['workoutList']),
  },
  methods: {
    ...mapActions(['fetchApproaches', 'addApproach', 'updateApproach', 'removeApproach', 'removeExercise']),
    getExercises() {
      this.fetchApproaches(this.$route.params.id);
    },
    addApproachDialog(exerciseIndex) {
      this.selectedApproachData = null; // Очищаем данные о выбранном подходе
      // Вызов модального окна для добавления подхода к упражнению с заданным индексом
      this.showModal = true
      this.$refs.modal.openAddApproachModal(exerciseIndex);
    },
    editApproachDialog(exerciseIndex, approachIndex) {
      this.selectedApproachData = structuredClone(this.workoutList[exerciseIndex].approaches[approachIndex]);
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
          .then(res => {
            console.log(res)})
          .catch(err => {
            console.log(err);
          })
    },

    removeExerciseFromWorkout(exercise) {
      let wid = this.$route.params.id;
      let eid = exercise.exercise.id;
      this.removeExercise({wid, eid})
    },
    addApproachToWorkout(approach, eid) {
      let wid = this.$route.params.id;
      this.addApproach({eid, wid, reps: Number(approach.reps), weight: Number(approach.weight)});
      this.close()
    },
    updateApproachInWorkout(approach) {
      this.updateApproach(approach);
      this.close()
    },
    removeApproachFromWorkout(exerciseIndex, approachIndex) {
      const approach = this.workoutList[exerciseIndex].approaches[approachIndex];
      this.removeApproach(approach.id);
      this.close()
    },
  },
  mounted() {
    this.getExercises();
    console.log(123)
  },
  beforeRouteLeave(to, from, next) {
    console.log('leave')
    this.saveWorkout();
    next();
  },
}
</script>

<style scoped lang="scss">
.workout {
  &__inner {
    padding-top: 40px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
    //margin-top: auto;
    padding: 8px;
    gap: 3px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));
    list-style: none;

    height: 100%;
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
    font-size: 16px;
    padding: 12px 0;
  }

  &__btn {
    cursor: pointer;
    padding: 0;
    line-height: 0.5;
    font-size: 43px;
    font-weight: 300;
  }

  &__header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

.remove__btn {
  position: absolute;
  right: 0;
}
</style>

