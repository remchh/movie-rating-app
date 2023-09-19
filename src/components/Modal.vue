<script setup>

// Props
const { visible } = props;

// Methods
const closeModal = () => {
  // Emit an event or update a prop to hide the modal
};

const props = defineProps(['toggleForm'])
const emit = defineEmits(['cancel-edit'])

</script>


<template>
  <div v-show="toggleForm == true" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="modal-container text-white p-1">
      Testing modal
    </div>
    <button type='button' class="bg-gray-600 p-1 rounded-md" @click="$emit('cancel-edit')">
      Cancel
    </button>
  </div>
</template>

<style scoped>
.modal-container {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
