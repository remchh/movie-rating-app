<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";


const props = defineProps(['toggleForm'])
const emit = defineEmits(['cancel-edit'])

</script>


<template>
  <div v-if="toggleForm == true" class="fixed inset-0 flex items-center justify-center z-20 bg-gray-800/40 backdrop-blur" >
      <!-- <h3 class="modal-title" v-if="title">{{ title }}</h3> -->
      <div class="absolute top-20 uppercase text-lg text-white">
        <slot name="title"></slot>
      </div>
      <slot></slot>
      <button type='button' class="absolute right-12 top-2 text-gray-300 p-2 hover:text-white" @click="$emit('cancel-edit')">
    
      <XMarkIcon class="h-6 w-6"  />
    </button>
  </div>

</template>

<style scoped>
.modal-container {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
