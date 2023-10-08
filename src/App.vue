<script setup>
import { items } from "./movies.json"
import {ref, computed, defineAsyncComponent} from 'vue'

import MovieItem from "./components/MovieItem.vue"

const MovieForm = defineAsyncComponent(() =>
 import('./components/MovieForm.vue')
)

const Modal = defineAsyncComponent(() => 
 import('./components/Modal.vue')
)

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.

import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid" 
*/

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

<Transition name="slide-fade">
  <Modal :toggleForm="toggleForm" @cancel-edit="cancelEdit">
    <template #title>
    Add Movie
    </template>
    <MovieForm
      v-model:name="name"
      v-model:description="description"
      v-model:image="image"
      v-model:selected="selected"
      v-model:toggle="toggle"
      :id="id"
      :toggleForm="toggleForm"
      @save-movie="saveMovie"
      @cancel-edit="cancelEdit"
    />
  </Modal>
</Transition>

  <MovieItem
    v-for="(movie, movieIndex) in movies" 
    :key="movie.id"
    :name="movie.name"
    :description="movie.description"
    :image="movie.image"
    :rating="movie.rating"
    :selected="movie.genres"
    :movieIndex="movieIndex"
    v-bind="movie"
    @edit-movie="editMovie"
    @delete-movie="deleteMovie"
    @update-rating="updateRating"
  />

</template>

<style scoped>
.disable {
  cursor: not-allowed;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.4s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

</style>

<!-- https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg
  Spider-Man: Across the Spider-Verse
  Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.
https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg
  Interstellar
  When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.

-->
