<!-- BaseModal.vue -->
<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-form">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
}
</script>

<style scoped lang="scss">
.modal-form {
  max-width: 680px;
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 520px;
    gap: 15px;
  }

  @media (max-width: 425px) {
    max-width: 90%;
    gap: 5px;
  }
}
</style>