<template>
  <div class="container exercises__inner">
    <nav class="filter">
      <ul class="filter__list">
        <li class="filter__item" v-bind:class="{ 'filter__item-active': activeType === null }"
            @click="getExercises()">
          All
        </li>
        <li class="filter__item" v-bind:class="{ 'filter__item-active': activeType === type.id }"
            v-for="type in typesList" :key="type.id"
            @click="getExercisesByType(type.id)">
          {{ type.name }}
        </li>
      </ul>
      <button class="filter__btn">
        >
      </button>
    </nav>
    <div class="exercises">
      <ul class="exercises__list">
        <li class="exercises__item" v-for="exercise in exercisesList" :key="exercise.id"
            @click="addExerciseToWorkout(exercise.id)">
          <div class="exercises__item-wrapper">
            <img src="" alt="" class="exercises__img">
            <p class="exercises__name">{{ exercise.name }}</p>
          </div>
          <button class="exercises__item-btn" @click="addExerciseToWorkout(exercise.id)">Добавить</button>
        </li>

      </ul>
    </div>
  </div>
  <!--    <v-row>-->
  <!--      <v-col cols="4" v-for="exercise in exercisesList" :key="exercise.id"-->
  <!--      >-->
  <!--        <v-card-->
  <!--            @click="addExercise(exercise.id, $route.params.id)"-->
  <!--        >-->
  <!--          <v-card-title>{{ exercise.name }}</v-card-title>-->
  <!--          <v-card-text>{{ exercise.description }}</v-card-text>-->
  <!--          <v-card-item>-->
  <!--            <v-img :src="exercise.image"></v-img>-->
  <!--          </v-card-item>-->
  <!--        </v-card>-->
  <!--      </v-col>-->
  <!--    </v-row>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExercisesPage",
  data: function () {
    return {
      loading: false,
      activeType: null
    }
  },
  computed: {
    ...mapGetters(['exercisesList', 'typesList']),
  },
  methods: {
    ...mapActions(['fetchExercises', 'fetchExercisesByType', 'addExercise', 'fetchTypes']),
    getExercises() {
      this.fetchExercises();
    },
    getExercisesByType(id) {
      this.fetchExercisesByType(id);
      this.activeType = id;
    },
    addExerciseToWorkout(eid) {
      let wid = this.$route.params.id;
      this.addExercise({eid, wid}).then(res => {
        this.$router.push({name: 'workout', params: {id: wid}});
      });
    },
    getTypes() {
      this.fetchTypes();
    }
  },
  mounted() {
    this.getExercises()
    this.getTypes()
  }
}
</script>

<style scoped lang="scss">
.exercises {
  padding-top: 10px;

  &__inner {
    padding-top: 5px;
  }

  &__list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px 10px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (max-width: 425px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    padding: 10px;
    background-color: #D9D9D9;
    border-radius: 10px;
    cursor: pointer;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 425px) {
      aspect-ratio: unset;
    }

    &-btn {
      display: none;
      padding: 8px 0;
      background-color: #fff;
      border-radius: 10px;
      @media (max-width: 425px) {
        display: block;
      }
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      @media (max-width: 425px) {
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
    }
  }

  &__img {
    flex-grow: 1;

    width: 100%;
    object-fit: cover;
    background: #7C8685;
    border-radius: 10px;

    @media (max-width: 425px) {
      flex-grow: 0;
      flex-shrink: 0;
      width: 38px;
      height: 38px;
    }
  }

  &__name {
    text-align: center;
    font-size: 20px;

    @media (max-width: 425px) {
      font-size: 16px;
    }
  }
}

.filter {
  position: relative;
  border-radius: 5px;
  padding: 12px 15px;
  background-color: #7C8685;

  &__list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px 20px;

    @media (max-width: 425px) {
      display: flex;
      padding: 5px;
      overflow-x: auto;
      gap: 10px;
    }
  }

  &__item {
    padding: 7px 7px;
    text-align: center;
    grid-column: 1 span;
    font-size: 20px;
    background-color: #D9D9D9;
    border-radius: 10px;
    line-height: 1;

    &-active {
      outline: 2px solid #000000;
    }
  }

  &__btn {
    font-size: 20px;
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: -5px;
    right: 50%;
    transform: translateX(50%) rotateZ(90deg);
    background-color: #D9D9D9;
    border-radius: 50%;
  }

}

</style>