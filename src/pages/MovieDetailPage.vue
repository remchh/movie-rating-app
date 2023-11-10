<script setup>
import { ref, computed } from "vue"
import { items } from "@/movies.json"
import { StarIcon } from "@heroicons/vue/24/solid"
defineProps(['rating'])


// Right now we're just displaying the info for the first movie
// You should get the id from the URL and display the info for the proper movie
// 💡 HINT: You do NOT need to modifiy the template



const movie = ref(items[0]);
</script>
<template>

 <div
    class="container flex items-center max-w-6xl gap-4 p-10 m-auto dark:text-white"
  >
    <figure class="relative">
      <img :src="movie.image" :alt="movie.name" class="w-96" />
    </figure>

    <div class="flex justify-center items-center absolute top-5 right-5 h-12 w-12">
      <div class="absolute text-black ">
        {{ movie.rating }} 
   
      </div>
      <StarIcon :style="{color: '#FFD700'}" />
    </div>

    <div>
      <h1 class="mb-4 text-5xl">{{ movie.name }}</h1>
      <div class="mb-3 movie-item-genres-wrapper">
        <span
          v-for="genre in movie.genres"
          :key="`${movie.id}-${genre}`"
          class="!text-lg movie-item-genre-tag"
          >{{ genre }}</span
        >
      </div>
      <p class="text-xl">{{ movie.description }}</p>
    </div>
  </div> 
</template>
