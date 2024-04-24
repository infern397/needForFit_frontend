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
    font-size: 36px;
  }

  &__label {
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
    border-radius: 10px;
  }

  &__btns {
    gap: 20px;
    display: flex;
  }

  &__btn {
    padding: 0 30px;
    font-size: 24px;
    border: 1px solid #000000;
    border-radius: 10px;
  }
}
</style>