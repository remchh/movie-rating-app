<script setup>

import { onUpdated } from 'vue'

onUpdated(() => {
  console.log(props.toggle)
})

const props = defineProps({
  name: String,
  description: String,
  image: String,
  selected: Array,
  toggle: Boolean,
  toggleForm: Boolean,
  id: Number
})
const emit = defineEmits(['save-movie', 'cancel-edit', 'update:name', 'update:description', 'update:image', 'update:selected', 'update:toggle'])

const updateSelected = (event) => {
  const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
  emit('update:selected', selectedValues);
}

const updateToggle = () => {
  emit('update:toggle', !props.toggle);
}

console.log(props.toggle)

</script>

<template>
  <form @submit.prevent="$emit('save-movie')">
    <div v-show="toggleForm == true" class="form-container my-4 flex justify-center">
      <div class="form grid justify-items-left bg-white dark:bg-slate-800 text-white p-4 space-y-2 mt-2 text-lg rounded-md">
        <div class="input-movie-name ">
          <p>Name</p>
          <input
            type="text"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
            class="bg-slate-900 w-80 p-1 rounded-md"
            placeholder='Enter movie name'
          >
        </div>
        <div class="input-movie-description">
          <p>Description</p>
          <textarea
            type="text"
            :value="description"
            @input="$emit('update:description', $event.target.value)"
            class="bg-slate-900 w-80 p-1 rounded-md"
            cols="30"
            rows="5">
          </textarea>
        </div>
        <div class="input-movie-image">
          <p>Image</p>
          <input
            type="text"
            :value="image"
            @input="$emit('update:image', $event.target.value)"
            class="bg-slate-900 w-80 p-1 rounded-md"
            placeholder="Enter url image"
          >
        </div>
        <div class="select-movie-genre">
          <div >Genres</div>
          <select
            :value="selected"
            @input="updateSelected"
            class="bg-slate-900 w-80 p-1 rounded-md"
            name="genre"
            multiple
          >
            <option>Drama</option>
            <option>Crime</option>
            <option>Action</option>
            <option>Comedy</option>
          </select>
        </div>
        <div class="input-select-theaters flex flex-row gap-2">
          <div>In theaters</div>
          <div class="input-select">
          <input
            type="checkbox"
            :value="toggle"
            @input="updateToggle"
            :true-value="true"
            :false-value="false" />
          </div>
        </div>
        <div class="flex justify-between" >
          <button type='button' class="bg-gray-600 p-1 rounded-md" @click="$emit('cancel-edit')">
            Cancel
          </button>
          <button type='submit' class="bg-blue-600 p-1 rounded-md" >
            <span v-if="id">Update</span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </div>
  </form> 
</template>