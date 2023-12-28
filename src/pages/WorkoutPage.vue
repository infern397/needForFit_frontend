<template>
  <approach-modal v-model="showModal"/>
  <v-container>
    <v-row>
      <v-col class="v-col-4" v-for="(exercise, i) in exercisesList">
        <v-card position="relative">
          <v-btn
              @click="removeExercise($route.params.id, exercise.exercise.id)"
              class="mt-1 mr-1 v-btn--size-x-small"
              position="absolute"
              fab
              icon="mdi-delete"
              location="top right"
          ></v-btn>
          <v-card-title>{{ `Упражение ${exercise.exercise.name}` }}</v-card-title>
          <v-card-subtitle>{{ `Описание: ${exercise.exercise.description}` }}</v-card-subtitle>
          <v-card-item>
            <v-row>
              <v-col cols="6" v-for="approach in exercise.approaches">
                <v-card variant="tonal" class="pb-3 d-flex flex-column align-center">
                  <v-card-item class="w-100">
                    <v-responsive class="ma-0 pa-0" width="100%">
                      <v-text-field label="Повторения" v-model="approach.reps"
                                    @change="updateApproach(approach)"></v-text-field>
                    </v-responsive>
                    <v-text-field label="Вес" v-model="approach.weight"
                                  @change="updateApproach(approach)"></v-text-field>
                  </v-card-item>
                  <v-btn @click="removeApproach(approach.id, approach.eid)">
                    Удалить
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card variant="tonal" class="h-100" @click="addApproach($route.params.id, exercise.exercise.id)">
                  <v-card-item class="d-flex align-center justify-center">
                    <p class="">Добавить</p>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div class="btns d-flex position-fixed ga-3">
    <v-btn
        @click="$router.push({name: 'exercises', params: { id: $route.params.id }})"
        class="v-btn--size-x-large"
        rig
        color="teal"
        icon="mdi-plus"

    >
    </v-btn>
    <v-btn
        @click="saveWorkout"
        class="v-btn--size-x-large"
        rig
        color="teal"
        icon="mdi-check"
    ></v-btn>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "WorkoutPage",
  data: function () {
    return {
      exercisesList: [],
      showModal: false,
    }
  },
  methods: {
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
    addApproach(wid, eid) {
      console.log(eid);
      axios.post('http://127.0.0.1:8000/api/approaches/',
          {
            eid,
            wid,
            "reps": 0,
            "weight": 0,
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
    removeApproach(aid, eid) {

      axios.delete('http://127.0.0.1:8000/api/approaches/' + aid)
          .then(res => {
            let exercise = this.exercisesList.find(e => e.exercise.id === eid)
            let approachIndex = exercise.approaches.findIndex(e => e.id === res.aid);
            exercise.approaches.splice(approachIndex, 1);
          })
          .catch(err => {
            console.log(err)
          })
    },
    updateApproach(approach) {
      axios.post('http://127.0.0.1:8000/api/approaches/update/',
          approach)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
    },
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

<style scoped>
.btns {
  right: 15px;
  bottom: 15px;
}
</style>

