<template>
  <v-container color="red">
    <v-list>
      <v-card
          v-for="(workout, i) in workoutsList"
          class="mb-3 mt-3"
          @click="$router.push({name: 'workout', params: { id: workout.id } })"
          :title="`Тренировка №${i + 1}`" :text="workout.created_at" variant="tonal" color="teal">
        <v-btn
            @click.stop="deleteWorkout(workout.id)"
            class="mt-5 mr-5 v-btn--size-x-small"
            position="absolute"
            fab
            icon="mdi-delete"
            location="top right"
        ></v-btn>
      </v-card>
    </v-list>
  </v-container>
  <v-btn
      @click="addWorkout"
      class="mb-10 mr-10 v-btn--size-x-large"
      rig
      color="teal"
      icon="mdi-plus"
      position="fixed"
      location="bottom right"
  ></v-btn>
</template>

<script>
import axios from 'axios'

export default {
  name: "workouts-page",
  data: function () {
    return {
      workoutsList: [],
      loading: false,
    }
  },
  methods: {
    getWorkouts() {
      this.loading = true;
      axios
          .get('http://127.0.0.1:8000/api/workouts/1')
          .then(res => {
            this.workoutsList = res.data;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false;
          })
    },
    addWorkout() {
      this.loading = true;
      axios.post('http://127.0.0.1:8000/api/workouts/', {"uid": 1})
          .then(res => {
            this.workoutsList.push(res.data)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false;
          })
    },
    deleteWorkout(id) {
      axios.delete('http://127.0.0.1:8000/api/workouts/' + id)
          .then(res => {
            const workoutIndex = this.workoutsList.findIndex(e => e.id === res.data.id);
            this.workoutsList.splice(workoutIndex, 1)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false;
          })
    }
  },
  mounted() {
    this.getWorkouts();
  }
}
</script>

<style scoped>

</style>