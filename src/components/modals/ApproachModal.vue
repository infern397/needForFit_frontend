<template>
    <base-modal @close="$emit('close')">
      <p class="approach-form__title">Жим лёжа</p>
      <label for="" class="approach-form__label">Повторения
        <input v-model="approachData.reps" class="approach-form__input"></label>
      <label for="" class="approach-form__label">Вес
        <input v-model="approachData.weight" class="approach-form__input"></label>

      <div class="approach-form__btns">
        <button class="approach-form__btn" @click="saveApproach">Сохранить</button>
        <button class="approach-form__btn" @click="deleteApproach">Удалить</button>
      </div>
    </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";

export default {
  name: "ApproachModal",
  components: {
    BaseModal
  },
  data() {
    return {
      reps: '',
      weight: '',
      isNewApproach: true,
      exerciseIndex: null,
      approachIndex: null,
      approachData: this.approachData
    };
  },
  props: {
    approachData: {
      type: Object,
      default: null
    }
  },

  methods: {
    openAddApproachModal(exerciseIndex) {
      this.isNewApproach = true;
      console.log(exerciseIndex)
      this.exerciseIndex = exerciseIndex;
      this.clearForm();
    },

    openEditApproachModal(exerciseIndex, approachIndex) {
      this.isNewApproach = false;
      this.exerciseIndex = exerciseIndex;
      this.approachIndex = approachIndex;
      this.loadApproachData();
      console.log(this.approachData)
    },

    clearForm() {
      this.reps = '';
      this.weight = '';
    },

    loadApproachData() {
      // Загрузка данных выбранного подхода для редактирования
      // (например, из массива подходов)
    },

    saveApproach() {
      // Логика сохранения нового подхода
      const approach = {
        reps: this.reps,
        weight: this.weight
      };
      if (this.isNewApproach) {
        const approach = {
          reps: this.approachData.reps,
          weight: this.approachData.weight
        };
        this.$emit('save-approach', approach, this.exerciseIndex);
        this.clearForm();
      } else {
        this.updateApproach()
      }
    },

    updateApproach() {
      console.log(this.approachData)
      this.$emit('update-approach', this.approachData);
    },

    deleteApproach() {
      // Логика удаления подхода
      this.$emit('delete-approach', this.exerciseIndex, this.approachIndex);
    }
  }
}
</script>

<style scoped lang="scss">
.approach-form {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 80px 20px;
  background-color: #D9D9D9;
  border-radius: 10px;

  &__title {
    font-size: 40px;
    margin-bottom: 38px;
  }

  &__label {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__input {
    width: 316px;
    outline: none;
    padding: 0 5px;
    font-size: 36px;
    background-color: #fff;
    border: 1px solid #000000;
  }

  &__input:focus {
    outline: 1px solid #000000;
  }

  &__btns {
    margin-top: 65px;
    gap: 8px;
    display: flex;
    width: 100%;
  }

  &__btn {
    flex: 1 1 0px;
    font-size: 36px;
    border: 1px solid #000000;
    border-radius: 10px;
  }
}
</style>