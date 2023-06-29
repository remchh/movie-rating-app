<script setup>
import { items } from "./movies.json"
import {ref, computed} from 'vue'

/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from "@heroicons/vue/24/solid"

const movies = ref(items)

function updateRating(movieIndex, rating) {
  movies.value[movieIndex].rating = rating
}

</script>

<template>
  <!-- This is where your template goes	-->
  <div class="justify-center grid gap-4 md:flex md:mt-4">
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
