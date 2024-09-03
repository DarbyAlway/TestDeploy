<template>
  <div class="h-4/5screen place-content-center px-4">
    <h1 class="uppercase tracking-widest text-gray-200 text-2xl">Error | Network</h1>
    <button class="btn mt-4">
      <RouterLink :to="{ name: 'country-list-view' }">Try again</RouterLink>
    </button>
  </div>
</template>
