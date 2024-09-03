<script setup lang="ts">
import type { Country, Sports } from '@/types'
import { computed, ref, toRef, toRefs } from 'vue'
const props = defineProps<{
  country: Country
}>()

const country = computed(() => props.country)
console.log('country: ', country.value.sports)
const sports = ref<Sports[] | null>(null)
sports.value = country.value.sports

const totalGoldMedals = computed(() => {
  var total = 0
  sports.value?.forEach((sport) => {
    if (sport.gold != undefined) {
      total = total + Number(sport.gold)
    }
  })
  return total
})
const totalSilverMedals = computed(() => {
  var total = 0
  sports.value?.forEach((sport) => {
    if (sport.silver != undefined) {
      total += Number(sport.silver)
    }
  })
  return total
})
const totalBronzeMedals = computed(() => {
  var total = 0
  sports.value?.forEach((sport) => {
    if (sport.bronze != undefined) {
      total += Number(sport.bronze)
    }
  })
  return total
})

const totalMedals = computed(() => {
  return totalGoldMedals.value + totalSilverMedals.value + totalBronzeMedals.value
})
</script>

<template>
  <!-- <RouterLink to="/event/5928101"> -->

  <tr class="hover:bg-hover">
    <td>
      <RouterLink :to="{ name: 'country-detail-view', params: { id: country.id } }">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="rounded-lg h-12 w-12">
              <img :src="country.squareFlag" alt="Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold">{{ country.name }}</div>
            <span class="badge badge-ghost badge-sm">{{ country.code }}</span>
          </div>
        </div>
      </RouterLink>
    </td>
    <td class="text-center">{{ totalGoldMedals }}</td>
    <td class="text-center">{{ totalSilverMedals }}</td>
    <td class="text-center">{{ totalBronzeMedals }}</td>
    <td class="text-center">{{ totalMedals }}</td>
  </tr>
</template>
