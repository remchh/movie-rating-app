<script setup>
import { items } from "./movies.json"
import {ref, computed} from 'vue'

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from "@heroicons/vue/24/solid"

const movies = ref(items)
const name = ref('')
const description = ref('')
const image = ref('')
const selected = ref([])
const toggle = ref(false)
const createMovie = () => {
  console.log('movie created')
  movies.value.push({
    id: movies.value.length + 1,
    name: name.value,
    description: description.value,
    image: image.value,
    rating: 0,
    genres: selected.value,
    inTheaters: toggle.value
  })
  console.log('cancel editing')
  name.value = '',
  description.value = '',
  image.value = '',
  selected.value = [],
  toggle.value = false
}

const cancelEdit = () => {
  console.log('cancel editing')
  name.value = '',
  description.value = '',
  image.value = '',
  selected.value = [],
  toggle.value = false
  toggleForm.value = false
}

const toggleForm = ref(false)
const showForm = () => {
  toggleForm.value = true
}

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating
}

</script>

<template>
  <!-- This is where your template goes	-->
  <div class="text-2xl bg-gray-300 grid justify-items-center ">
    <button @click="showForm">
      Add movie
    </button>
  </div>

  <form @submit.prevent="createMovie">
  <div v-show="toggleForm == true" class="form-container my-4 flex justify-center">
    <div class="form grid justify-items-left bg-white dark:bg-slate-800 text-white p-4 space-y-2 mt-2 text-lg rounded-md">
      <div class="input-movie-name ">
        <p>Name</p>
        <input class="bg-slate-900 w-80 p-1 rounded-md" v-model="name" placeholder='Enter movie name' >
      </div>
      <div class="input-movie-description">
        <p>Description</p>
        <textarea class="bg-slate-900 w-80 p-1 rounded-md" v-model="description" cols="30" rows="5"></textarea>
      </div>
      <div class="input-movie-image">
        <p>Image</p>
        <input class="bg-slate-900 w-80 p-1 rounded-md" v-model="image" placeholder="Enter url image">
      </div>
      <div class="select-movie-genre">
        <div >Genres</div>
        <select class="bg-slate-900 w-80 p-1 rounded-md" v-model="selected" multiple>
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
          v-model="toggle"
          true-value="yes"
          false-value="no" />
        </div>
      </div>
      <div class="flex justify-between" >
        <button class="bg-gray-600 p-1 rounded-md" @click="cancelEdit">
          Cancel
        </button>
        <button class="bg-blue-600 p-1 rounded-md" >
          Create
        </button>
      </div>
    </div>
  </div>
  </form> 

  <div class="movie-cards justify-center grid gap-4 md:flex md:mt-4">
    <div
      v-for="(item, movieIndex) in movies"
      :key="item.id"
    >
      <div class="h-full bg-white dark:bg-slate-800 rounded-lg px-6 py-8 max-w-sm" >
        <div class="max-w-sm relative ">
          <div class="flex justify-center items-center absolute top-0 right-0 h-12 w-12">
            <div class="absolute ">
              {{ item.rating }}
            </div>
            <StarIcon :style="{color: item.rating >= 1  ? '#FFD700' : ''}" />
          </div>
          <img :src="item.image" class="h-[500px]"> 
        </div>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-2xl">
          {{ item.name }}
        </p>
        <div class="flex flex-row gap-4 ">
          <div v-for='gen in item.genres' class="bg-cyan-800 w-16 text-center rounded-md text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {{ gen }}
          </div>
        </div>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          {{ item.description }}
        </p>
        <p class="text-slate-500 dark:text-slate-400 mt-2"> 
        Rating: ({{ item.rating}}/5 ) 
        </p>
        <div class="flex flex-row">
          <button
            v-for="star in 5"
            :key="star"
            :style="{color: star <= item.rating  ? '#FFD700' : ''}"
            :class="star === item.rating ? 'disable' : ''"
            @click="updateRating(movieIndex, star)"
          >
          <StarIcon ref='star' class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.disable {
  cursor: not-allowed;
}

</style>

<!-- https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg
  Spider-Man: Across the Spider-Verse
  Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.
https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg
  Interstellar
  When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.

-->