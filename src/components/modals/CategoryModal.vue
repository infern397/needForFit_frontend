<template>
  <base-modal @close="$emit('close')">
    <h2 class="modal-form__title">{{ mode === 'create' ? 'Добавить категорию' : 'Редактировать категорию' }}</h2>
    <label class="modal-form__label">Название
      <input class="modal-form__input" v-model="category.name"></label>
    <div class="modal-form__btns">
      <button @click="saveCategory" class="modal-form__btn">{{ mode === 'create' ? 'Добавить' : 'Изменить' }}</button>
      <button v-if="mode === 'edit'" @click="$emit('delete', category.id)" class="modal-form__btn">Удалить</button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";

export default {
  name: "CategoryModal",
  components: {
    BaseModal
  },

  props: {
    mode: {
      type: String,
      required: true,
      validator: function (value) {
        return ['create', 'edit'].includes(value);
      }
    },
    category: {
      type: Object,
      default: function () {
        return {name: ''};
      }
    }
  },

  methods: {
    saveCategory() {
      if (this.category.name.trim() !== '')
        this.$emit('save-category', this.category);
    },
  }
}
</script>

<style scoped lang="scss">
.modal-form {
  &__title {
    line-height: 1;
    text-align: center;
    font-size: 40px;
    margin-bottom: 38px;

    @media (max-width: 768px) {
      margin-bottom: 10px;
      font-size: 30px;
    }
  }

  &__label {
    width: 100%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__input {
    outline: none;
    padding: 0 5px;
    font-size: 36px;
    background-color: #fff;
    border: 1px solid #000000;

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 425px) {
      //font-size: 20px;
    }
  }

  &__btns {
    margin-top: 65px;
    gap: 8px;
    display: flex;
    width: 100%;

    @media (max-width: 768px) {
      margin-top: 15px;
    }

    @media (max-width: 425px) {
      font-size: 22px;
      flex-direction: column;
      gap: 3px;
    }
  }

  &__btn {
    flex: 1 1 0px;
    font-size: 36px;
    border: 1px solid #000000;
    border-radius: 10px;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 22px;
    }
  }
}
</style>