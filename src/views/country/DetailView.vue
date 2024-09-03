<script setup lang="ts">
import type { Country } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})
</script>

<template>
  <div v-if="props.country">
    <img class="w-96 mx-auto my-6" :src="props.country.fullFlag" alt="" />
    <p>{{ props.country.name }}</p>
    <p>{{ props.country.code }}</p>
  </div>
</template>
