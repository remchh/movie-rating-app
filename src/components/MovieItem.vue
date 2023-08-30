<script setup>
import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid"

defineProps(['key', 'name', 'image', 'description', 'genres', 'rating', 'movie', 'movieIndex'])
defineEmits(['edit-movie', 'delete-movie', 'update-rating'])


</script> 

<template>
  <!--<div class="bg-white rounded-lg flex justify-center">
    <h2> Testing Component </h2>
  </div> -->
  
  <div class="movie-cards justify-center grid gap-4 md:flex md:mt-4">

      <div class="h-full bg-white dark:bg-slate-800 rounded-lg px-6 py-8 max-w-sm" >
        <div class="max-w-sm relative ">
          <div class="flex justify-center items-center absolute top-0 right-0 h-12 w-12">
            <div class="absolute ">
              {{ rating }}
            </div>
            <StarIcon :style="{color: rating >= 1  ? '#FFD700' : ''}" />
          </div>
          <img :src="image" class="h-[500px]"> 
        </div>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-2xl">
          {{ name }}
        </p>
        <div class="flex flex-row gap-4 ">
          <div v-for='gen in genres' class="bg-cyan-800 w-16 text-center rounded-md text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {{ gen }}
          </div>
        </div>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          {{ description }}
        </p>
        <p class="text-slate-500 dark:text-slate-400 mt-2"> 
        Rating: ({{ rating }}/5 ) 
        </p>
        <div class="flex flex-row justify-between">
          <div class="stars">
              <button
              v-for="star in 5"
              :key="star"
              :style="{color: star <= rating  ? '#FFD700' : ''}"
              :class="star === rating ? 'disable' : ''"
              @click="$emit('update-rating', movieIndex, star)"
              >
              <StarIcon ref='star' class="h-6 w-6" />
            </button>
          </div>
          <div class="edit flex flex-row gap-2">
            <button @click="$emit('delete-movie', movieIndex)" class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center hover:bg-red-500"> 
            <TrashIcon class="h-5 w-5" />
            </button>
            <button @click="$emit('edit-movie', movieIndex)" class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center hover:bg-sky-500"> 
            <PencilIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

  </div>
</template>