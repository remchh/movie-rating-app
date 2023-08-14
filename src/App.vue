<script setup>
import { items } from "./movies.json"
import {ref, computed} from 'vue'

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid"

const movies = ref(items)


let id = ref(null)
let name = ref('')
let description = ref('')
let image = ref('')
let selected = ref([])
let toggle = ref(false)

function saveMovie() {
  if (id.value) {
    updateMovie();
  } else {
    createMovie();
  }
}

const createMovie = () => {
  console.log('movie created')
  movies.value.push({
    id: movies.value.length + 1,
    name: name.value,
    description: description.value,
    image: image.value,
    rating: movies.value.rating,
    genres: selected.value,
    inTheaters: toggle.value
  })
  name.value = '',
  description.value = '',
  image.value = '',
  selected.value = [],
  toggle.value = false
  console.log('values reseted')

  toggleForm.value = false
}

const cancelEdit = () => {
  console.log('cancel creating')
  id.value = null
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


const deleteMovie = (index) => {
  console.log('movie deleted', index)
  movies.value.splice(index, 1)
}


const editMovie = (index) => {
  console.log('movie edited', index)
  const movie = movies.value[index]

  id.value = movie.id
  name.value = movie.name
  description.value = movie.description
  image.value = movie.image
  selected.value = movie.genres
  toggle.value = movie.inTheaters

  showForm()
}


const updateMovie = () => {
  console.log('movie updated')

  const movie = {
    id: id.value,
    name: name.value,
    description: description.value,
    image: image.value,
    genres: selected.value,
    inTheaters: toggle.value,
    rating: 0
  }
  movies.value = movies.value.map((m) => {
    if (m.id === movie.id) {
      movie.rating = m.rating
      return movie
    }
    return m
  })
  name.value = '',
  description.value = '',
  image.value = '',
  selected.value = [],
  toggle.value = false
  console.log('values reseted')

  toggleForm.value = false
}

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating
  console.log(rating)
}

const totalMovies = computed(() => {
  return movies.value.length
})


const avRating = computed(() => {
  let numerador = 0
  movies.value.forEach(movie => {
    numerador += movie.rating
  })
  let denominador = movies.value.length
  let promedio = numerador / denominador
  return promedio
})

const resetRatings = () => {
  console.log('ratings to 0')
  movies.value.forEach(movie => {
    movie.rating = 0
  })
}

</script>

<template>
  <!-- This is where your template goes	-->
  <div class="flex flex-col items-center gap-2 md:flex-row justify-between text-lg text-white p-4">
    <div>
      Total movies: {{ totalMovies }} | Avg rating: {{ avRating }}
    </div>
    <div class="nav-buttons flex flex-row gap-4">
      <button @click="showForm" class="rounded-full bg-sky-500/100 w-28">
        Add movie
      </button>
      <button @click="resetRatings" class="rounded-full bg-red-600 w-40">
        Remove ratings
      </button>
    </div>
  </div>

  <form @submit.prevent="saveMovie">
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
          <select class="bg-slate-900 w-80 p-1 rounded-md" v-model="selected" multiple name="genre">
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
            :true-value="true"
            :false-value="false" />
          </div>
        </div>
        <div class="flex justify-between" >
          <button type='button' class="bg-gray-600 p-1 rounded-md" @click="cancelEdit">
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

  <!-- <form @submit.prevent="saveMovie">
    <div v-show="toggleFormEdit == true" class="form-container my-4 flex justify-center">
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
          <button type='button' class="bg-gray-600 p-1 rounded-md" @click="cancelEdit">
            Cancel
          </button>
          <button type='submit' class="bg-blue-600 p-1 rounded-md" >
            Update
          </button>
        </div>
      </div>
    </div>
  </form> -->

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
        <div class="flex flex-row justify-between">
          <div class="stars">
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
          <div class="edit flex flex-row gap-2">
            <button @click='deleteMovie(movieIndex)' class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center hover:bg-red-500"> 
            <TrashIcon class="h-5 w-5" />
            </button>
            <button @click='editMovie(movieIndex)' class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center hover:bg-sky-500"> 
            <PencilIcon class="h-5 w-5" />
            </button>
          </div>
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