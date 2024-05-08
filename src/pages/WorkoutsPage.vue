<template>
  <workout-modal ref="modal" v-if="showModal"
                 class="modal"
                 @close="close"
                 @delete-workout="deleteWorkoutByModal"
                 @update-workout="updateWorkoutByModal"
                 :workoutData="selectedWorkout || {}"/>
  <!--                  @save-approach="addApproach"-->
  <!--                  @delete-approach="removeApproach"-->
  <!--                  @update-approach="updateApproach"-->

  <div class="workouts">
    <div class="container workouts__inner">
      <ul class="workouts__list">
        <li class="workouts__item" v-for="(workout, i) in workouts"
            @click="$router.push({name: 'workout', params: { id: workout.id } })"
        >
          <div class="workouts__main">
            <div class="workouts__content">
              <p class="workouts__name">{{ workout.name }}</p>
              <p class="workouts__date">
                {{ workout.created_at.split('T')[0] }}
                {{ workout.created_at.split('T')[1].slice(0, 5) }}
              </p>
            </div>
            <div class="workouts__icons">
              <img src="/images/workouts/arrow.svg" alt="" class="workouts__open-image"
                   @click.stop="openWorkout(workout.id)"
                   v-bind:class="{ 'workouts__open-image_close': workout.id === expandedWorkoutId }">
              <img src="/images/workouts/edit-icon.svg" alt="" class="workouts__edit-image" @click.stop="editDialog(i)">
            </div>
          </div>
          <transition name="expand">
            <div v-if="workout.id === expandedWorkoutId" class="workouts__preview" @click.stop>
              <div class="exercise" v-for="exercise in expandedWorkout">
                <div class="exercise__name">
                  {{ exercise.exercise.name }}
                </div>
                <ul class="exercise__approaches">
                  <li class="exercise__approach" v-for="approach in exercise.approaches">
                    <div class="approach__weight">{{ approach.weight }} кг</div>
                    <div class="approach__reps">{{ approach.reps }} пов</div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

        </li>
      </ul>
    </div>
  </div>
  <!--  <v-container>-->
  <!--    <v-list>-->
  <!--      <v-card-->
  <!--          v-for="(workout, i) in workoutsList"-->
  <!--          class="mb-3 mt-3"-->
  <!--          @click="$router.push({name: 'workout', params: { id: workout.id } })"-->
  <!--          :title="`Тренировка №${i + 1}`" :text="workout.created_at" variant="tonal" color="teal">-->
  <!--        <v-btn-->
  <!--            @click.stop="deleteWorkout(workout.id)"-->
  <!--            class="mt-5 mr-5 v-btn&#45;&#45;size-x-small"-->
  <!--            position="absolute"-->
  <!--            fab-->
  <!--            icon="mdi-delete"-->
  <!--            location="top right"-->
  <!--        ></v-btn>-->
  <!--      </v-card>-->
  <!--    </v-list>-->
  <!--  </v-container>-->
  <div class="add__btn" @click="addWorkout">
    <img src="/images/workouts/gantel.svg" alt="Добавить" class="add__btn-image">
  </div>
  <!--  <v-btn-->
  <!--      @click="addWorkout"-->
  <!--      class="mb-10 mr-10 v-btn&#45;&#45;size-x-large"-->
  <!--      rig-->
  <!--      color="teal"-->
  <!--      icon="mdi-plus"-->
  <!--      position="fixed"-->
  <!--      location="bottom right"-->
  <!--  ></v-btn>-->
</template>

<script>
import axios from '@/axios';
import {mapActions, mapGetters} from 'vuex';
import WorkoutModal from "@/components/modals/WorkoutModal";

export default {
  name: "workouts-page",
  components: {WorkoutModal},
  data: function () {
    return {
      workoutsList: [],
      loading: false,
      expandedWorkoutId: null,
      expandedWorkout: null,
      showModal: false,
      selectedWorkout: null
    }
  },
  methods: {
    ...mapActions(['addWorkout', 'fetchWorkouts', 'deleteWorkout', 'updateWorkout']),
    open(workoutIndex) {
      this.showModal = !this.showModal
      this.selectedWorkout = structuredClone(this.workoutsList[workoutIndex])
    },
    close() {
      this.showModal = false
    },
    editDialog(workoutIndex) {
      this.selectedWorkout = this.workouts[workoutIndex];
      this.showModal = true
    },
    deleteWorkoutByModal() {
      this.deleteWorkout(this.selectedWorkout.id)
      this.showModal = false;
    },
    updateWorkoutByModal(updatedWorkout) {
      this.updateWorkout(updatedWorkout)
      this.showModal = false;
    },
    openWorkout(id) {
      if (this.expandedWorkoutId === id) {
        this.expandedWorkoutId = null
      } else {
        this.expandedWorkoutId = id
        axios
            .get(`approaches/${id}`)
            .then(res => {
              this.expandedWorkout = res.data;
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.loading = false;
            })
      }
    }
  },
  computed: {
    ...mapGetters(['workouts']),
  },
  mounted() {
    this.fetchWorkouts();
    console.log(this.workouts);
  }
}
</script>

<style scoped lang="scss">
.workouts {

  &__list {
    list-style: none;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    background: #D9D9D9;
    border: 1px solid #000000;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  &__main {
    padding: 7px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 34px;
  }

  &__open-image {
    transform: rotateZ(180deg);
    height: 45px;
    width: 45px;

    &_close {
      transform: rotateZ(0deg);
    }
  }

  &__preview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 7px;
    flex-wrap: wrap;
    padding: 7px 16px;
    background-color: rgba(124, 134, 133, 0.5);
    border-top: 1px solid #000000;
    cursor: default;
  }

}

.exercise {
  font-size: 20px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D9D9D9;
  border-radius: 10px;

  &__name {
    font-weight: 500;
    text-align: center;
  }

  &__approaches {
    width: 100%;
    list-style: none;

  }

  &__approach {
    display: flex;
    justify-content: center;
    gap: 10px;
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

.expand-enter-active, .expand-leave-active {
  transition: height 0.5s;
}
.expand-enter, .expand-leave-to {
  height: 0;
}
</style>