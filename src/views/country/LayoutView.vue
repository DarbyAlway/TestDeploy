<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCountryStore } from '@/stores/country'
const store = useCountryStore()
const { country } = storeToRefs(store)
</script>

<template>
  <div v-if="country">
    <h1 class="text-6xl mb-6">{{ country.name }}</h1>

    <div role="tablist" class="tabs tabs-boxed flex justify-center max-w-96 mx-auto">
      <RouterLink :to="{ name: 'country-detail-view' }">
        <a role="tab" class="tab max-w-40">Details</a>
      </RouterLink>
      <RouterLink :to="{ name: 'country-sport-view' }">
        <a role="tab" class="tab max-w-40">Sports</a>
      </RouterLink>
      <RouterLink :to="{ name: 'country-cheer-up-view' }">
        <a role="tab" class="tab max-w-500">Cheer-Up</a>
      </RouterLink>
    </div>

    <RouterView :country="country"></RouterView>
  </div>
</template>
