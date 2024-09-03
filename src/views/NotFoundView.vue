<script setup lang="ts">
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>

<template>
  <div class="grid h-4/5screen place-content-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-black text-gray-200">404</h1>

      <p class="text-2xl font-bold tracking-tight text-gray-400 sm:text-4xl">Uh-oh!</p>

      <p class="mt-4 text-gray-500">We can't find that {{ resource }}.</p>

      <button class="btn mt-4">
        <RouterLink :to="{ name: 'country-list-view' }">Back to homepage</RouterLink>
      </button>
    </div>
  </div>
</template>
