<script setup lang="ts">
import CountryItem from '@/components/CountryItem.vue'
import OlympicService from '@/service/OlympicService'

import { type Country } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter

const props = defineProps({
  limit: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  }
})

const countries = ref<Country[] | null>(null)
const totalCountries = ref(0)

const page = computed(() => props.page)
const limit = computed(() => props.limit)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalCountries.value / limit.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    OlympicService.getCountries(limit.value, page.value)
      .then((response) => {
        // console.log(response.data)
        countries.value = response.data
        totalCountries.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log('There was an error!', error)
      })
  })
})
</script>

<template>
  <!-- new element -->
  <div class="flex flex-col items-center text-red-500">
    <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
  </div>

  <div class="overflow-x-auto px-4 sm:px-28 md:px-32 lg:px-80 xl:px-96">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>
            <div class="h-4 w-4 mx-auto">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMC41IDhDMC41IDMuODc2MTQgMy44NzYxNCAwLjUgOCAwLjVDMTIuMTIzOSAwLjUgMTUuNSAzLjg3NjE0IDE1LjUgOEMxNS41IDEyLjEyMzkgMTIuMTIzOSAxNS41IDggMTUuNUMzLjg3NjE0IDE1LjUgMC41IDEyLjEyMzkgMC41IDhaIiBmaWxsPSIjRkRFNDhFIiBzdHJva2U9IiM4MDY0MDEiLz4KICA8cGF0aCBkPSJNOS4yNDgwNSAxMkg3LjU1NDY5VjUuNDcyNjZMNS41MzMyIDYuMDk5NjFWNC43MjI2Nkw5LjA2NjQxIDMuNDU3MDNIOS4yNDgwNVYxMloiIGZpbGw9IiM4MDY0MDEiLz4KPC9zdmc+"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </th>
          <th>
            <div class="h-4 w-4 mx-auto">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMC41IDhDMC41IDMuODc2MTQgMy44NzYxNCAwLjUgOCAwLjVDMTIuMTIzOSAwLjUgMTUuNSAzLjg3NjE0IDE1LjUgOEMxNS41IDEyLjEyMzkgMTIuMTIzOSAxNS41IDggMTUuNUMzLjg3NjE0IDE1LjUgMC41IDEyLjEyMzkgMC41IDhaIiBmaWxsPSIjRDhEOEQ4IiBzdHJva2U9IiM1OTU5NTkiLz4KICA8cGF0aCBkPSJNMTAuOTgyNCAxMkg1LjEzNDc3VjEwLjgzOThMNy44OTQ1MyA3Ljg5ODQ0QzguMjczNDQgNy40ODQzOCA4LjU1MjczIDcuMTIzMDUgOC43MzI0MiA2LjgxNDQ1QzguOTE2MDIgNi41MDU4NiA5LjAwNzgxIDYuMjEyODkgOS4wMDc4MSA1LjkzNTU1QzkuMDA3ODEgNS41NTY2NCA4LjkxMjExIDUuMjU5NzcgOC43MjA3IDUuMDQ0OTJDOC41MjkzIDQuODI2MTcgOC4yNTU4NiA0LjcxNjggNy45MDAzOSA0LjcxNjhDNy41MTc1OCA0LjcxNjggNy4yMTQ4NCA0Ljg0OTYxIDYuOTkyMTkgNS4xMTUyM0M2Ljc3MzQ0IDUuMzc2OTUgNi42NjQwNiA1LjcyMjY2IDYuNjY0MDYgNi4xNTIzNEg0Ljk2NDg0QzQuOTY0ODQgNS42MzI4MSA1LjA4Nzg5IDUuMTU4MiA1LjMzMzk4IDQuNzI4NTJDNS41ODM5OCA0LjI5ODgzIDUuOTM1NTUgMy45NjI4OSA2LjM4ODY3IDMuNzIwN0M2Ljg0MTggMy40NzQ2MSA3LjM1NTQ3IDMuMzUxNTYgNy45Mjk2OSAzLjM1MTU2QzguODA4NTkgMy4zNTE1NiA5LjQ5MDIzIDMuNTYyNSA5Ljk3NDYxIDMuOTg0MzhDMTAuNDYyOSA0LjQwNjI1IDEwLjcwNyA1LjAwMTk1IDEwLjcwNyA1Ljc3MTQ4QzEwLjcwNyA2LjE5MzM2IDEwLjU5NzcgNi42MjMwNSAxMC4zNzg5IDcuMDYwNTVDMTAuMTYwMiA3LjQ5ODA1IDkuNzg1MTYgOC4wMDc4MSA5LjI1MzkxIDguNTg5ODRMNy4zMTQ0NSAxMC42MzQ4SDEwLjk4MjRWMTJaIiBmaWxsPSIjNTk1OTU5Ii8+Cjwvc3ZnPg=="
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </th>
          <th>
            <div class="h-4 w-4 mx-auto">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMC41IDhDMC41IDMuODc2MTQgMy44NzYxNCAwLjUgOCAwLjVDMTIuMTIzOSAwLjUgMTUuNSAzLjg3NjE0IDE1LjUgOEMxNS41IDEyLjEyMzkgMTIuMTIzOSAxNS41IDggMTUuNUMzLjg3NjE0IDE1LjUgMC41IDEyLjEyMzkgMC41IDhaIiBmaWxsPSIjRkJENTlGIiBzdHJva2U9IiM4QTUzMDMiLz4KICA8cGF0aCBkPSJNNi44NTc0MiA2Ljk4NDM4SDcuNzU5NzdDOC4xODk0NSA2Ljk4NDM4IDguNTA3ODEgNi44NzY5NSA4LjcxNDg0IDYuNjYyMTFDOC45MjE4OCA2LjQ0NzI3IDkuMDI1MzkgNi4xNjIxMSA5LjAyNTM5IDUuODA2NjRDOS4wMjUzOSA1LjQ2Mjg5IDguOTIxODggNS4xOTUzMSA4LjcxNDg0IDUuMDAzOTFDOC41MTE3MiA0LjgxMjUgOC4yMzA0NyA0LjcxNjggNy44NzEwOSA0LjcxNjhDNy41NDY4OCA0LjcxNjggNy4yNzUzOSA0LjgwNjY0IDcuMDU2NjQgNC45ODYzM0M2LjgzNzg5IDUuMTYyMTEgNi43Mjg1MiA1LjM5MjU4IDYuNzI4NTIgNS42Nzc3M0g1LjAzNTE2QzUuMDM1MTYgNS4yMzI0MiA1LjE1NDMgNC44MzM5OCA1LjM5MjU4IDQuNDgyNDJDNS42MzQ3NyA0LjEyNjk1IDUuOTcwNyAzLjg0OTYxIDYuNDAwMzkgMy42NTAzOUM2LjgzMzk4IDMuNDUxMTcgNy4zMTA1NSAzLjM1MTU2IDcuODMwMDggMy4zNTE1NkM4LjczMjQyIDMuMzUxNTYgOS40Mzk0NSAzLjU2ODM2IDkuOTUxMTcgNC4wMDE5NUMxMC40NjI5IDQuNDMxNjQgMTAuNzE4OCA1LjAyNTM5IDEwLjcxODggNS43ODMyQzEwLjcxODggNi4xNzM4MyAxMC41OTk2IDYuNTMzMiAxMC4zNjEzIDYuODYxMzNDMTAuMTIzIDcuMTg5NDUgOS44MTA1NSA3LjQ0MTQxIDkuNDIzODMgNy42MTcxOUM5LjkwNDMgNy43ODkwNiAxMC4yNjE3IDguMDQ2ODggMTAuNDk2MSA4LjM5MDYyQzEwLjczNDQgOC43MzQzOCAxMC44NTM1IDkuMTQwNjIgMTAuODUzNSA5LjYwOTM4QzEwLjg1MzUgMTAuMzY3MiAxMC41NzYyIDEwLjk3NDYgMTAuMDIxNSAxMS40MzE2QzkuNDcwNyAxMS44ODg3IDguNzQwMjMgMTIuMTE3MiA3LjgzMDA4IDEyLjExNzJDNi45Nzg1MiAxMi4xMTcyIDYuMjgxMjUgMTEuODkyNiA1LjczODI4IDExLjQ0MzRDNS4xOTkyMiAxMC45OTQxIDQuOTI5NjkgMTAuNDAwNCA0LjkyOTY5IDkuNjYyMTFINi42MjMwNUM2LjYyMzA1IDkuOTgyNDIgNi43NDIxOSAxMC4yNDQxIDYuOTgwNDcgMTAuNDQ3M0M3LjIyMjY2IDEwLjY1MDQgNy41MTk1MyAxMC43NTIgNy44NzEwOSAxMC43NTJDOC4yNzM0NCAxMC43NTIgOC41ODc4OSAxMC42NDY1IDguODE0NDUgMTAuNDM1NUM5LjA0NDkyIDEwLjIyMDcgOS4xNjAxNiA5LjkzNzUgOS4xNjAxNiA5LjU4NTk0QzkuMTYwMTYgOC43MzQzOCA4LjY5MTQxIDguMzA4NTkgNy43NTM5MSA4LjMwODU5SDYuODU3NDJWNi45ODQzOFoiIGZpbGw9IiM4QTUzMDMiLz4KPC9zdmc+"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </th>
          <th>
            <div class="h-4 w-4 mx-auto">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICA8bWFzayBpZD0icGF0aC0xLWluc2lkZS0xXzIzMDZfMjk3MiIgZmlsbD0id2hpdGUiPgogICAgPHBhdGggZD0iTTguMDAwMDEgMEM2LjA0NDQ2IDAgNC40NDQ0NiAxLjYgNC40NDQ0NiAzLjU1NTU2QzQuNDQ0NDYgNS41MTExMSA2LjA0NDQ2IDcuMTExMTEgOC4wMDAwMSA3LjExMTExQzkuOTU1NTcgNy4xMTExMSAxMS41NTU2IDUuNTExMTEgMTEuNTU1NiAzLjU1NTU2QzExLjU1NTYgMS42IDkuOTU1NTcgMCA4LjAwMDAxIDBaIi8+CiAgPC9tYXNrPgogIDxwYXRoIGQ9Ik04LjAwMDAxIDBDNi4wNDQ0NiAwIDQuNDQ0NDYgMS42IDQuNDQ0NDYgMy41NTU1NkM0LjQ0NDQ2IDUuNTExMTEgNi4wNDQ0NiA3LjExMTExIDguMDAwMDEgNy4xMTExMUM5Ljk1NTU3IDcuMTExMTEgMTEuNTU1NiA1LjUxMTExIDExLjU1NTYgMy41NTU1NkMxMS41NTU2IDEuNiA5Ljk1NTU3IDAgOC4wMDAwMSAwWiIgZmlsbD0iI0ZERTQ4RSIvPgogIDxwYXRoIGQ9Ik04LjAwMDAxIC0xQzUuNDkyMTcgLTEgMy40NDQ0NiAxLjA0NzcyIDMuNDQ0NDYgMy41NTU1Nkg1LjQ0NDQ2QzUuNDQ0NDYgMi4xNTIyOCA2LjU5Njc0IDEgOC4wMDAwMSAxVi0xWk0zLjQ0NDQ2IDMuNTU1NTZDMy40NDQ0NiA2LjA2MzQgNS40OTIxNyA4LjExMTExIDguMDAwMDEgOC4xMTExMVY2LjExMTExQzYuNTk2NzQgNi4xMTExMSA1LjQ0NDQ2IDQuOTU4ODMgNS40NDQ0NiAzLjU1NTU2SDMuNDQ0NDZaTTguMDAwMDEgOC4xMTExMUMxMC41MDc5IDguMTExMTEgMTIuNTU1NiA2LjA2MzQgMTIuNTU1NiAzLjU1NTU2SDEwLjU1NTZDMTAuNTU1NiA0Ljk1ODgzIDkuNDAzMjggNi4xMTExMSA4LjAwMDAxIDYuMTExMTFWOC4xMTExMVpNMTIuNTU1NiAzLjU1NTU2QzEyLjU1NTYgMS4wNDc3MiAxMC41MDc5IC0xIDguMDAwMDEgLTFWMUM5LjQwMzI4IDEgMTAuNTU1NiAyLjE1MjI4IDEwLjU1NTYgMy41NTU1NkgxMi41NTU2WiIgZmlsbD0iIzgwNjQwMSIgbWFzaz0idXJsKCNwYXRoLTEtaW5zaWRlLTFfMjMwNl8yOTcyKSIvPgogIDxtYXNrIGlkPSJwYXRoLTMtaW5zaWRlLTJfMjMwNl8yOTcyIiBmaWxsPSJ3aGl0ZSI+CiAgICA8cGF0aCBkPSJNMy41NTU1NiA4Ljg4ODg5QzEuNiA4Ljg4ODg5IDAgMTAuNDg4OSAwIDEyLjQ0NDRDMCAxNC40IDEuNiAxNiAzLjU1NTU2IDE2QzUuNTExMTEgMTYgNy4xMTExMSAxNC40IDcuMTExMTEgMTIuNDQ0NEM3LjExMTExIDEwLjQ4ODkgNS41MTExMSA4Ljg4ODg5IDMuNTU1NTYgOC44ODg4OVoiLz4KICA8L21hc2s+CiAgPHBhdGggZD0iTTMuNTU1NTYgOC44ODg4OUMxLjYgOC44ODg4OSAwIDEwLjQ4ODkgMCAxMi40NDQ0QzAgMTQuNCAxLjYgMTYgMy41NTU1NiAxNkM1LjUxMTExIDE2IDcuMTExMTEgMTQuNCA3LjExMTExIDEyLjQ0NDRDNy4xMTExMSAxMC40ODg5IDUuNTExMTEgOC44ODg4OSAzLjU1NTU2IDguODg4ODlaIiBmaWxsPSIjRDhEOEQ4Ii8+CiAgPHBhdGggZD0iTTMuNTU1NTYgNy44ODg4OUMxLjA0NzcyIDcuODg4ODkgLTEgOS45MzY2IC0xIDEyLjQ0NDRIMUMxIDExLjA0MTIgMi4xNTIyOCA5Ljg4ODg5IDMuNTU1NTYgOS44ODg4OVY3Ljg4ODg5Wk0tMSAxMi40NDQ0Qy0xIDE0Ljk1MjMgMS4wNDc3MiAxNyAzLjU1NTU2IDE3VjE1QzIuMTUyMjggMTUgMSAxMy44NDc3IDEgMTIuNDQ0NEgtMVpNMy41NTU1NiAxN0M2LjA2MzQgMTcgOC4xMTExMSAxNC45NTIzIDguMTExMTEgMTIuNDQ0NEg2LjExMTExQzYuMTExMTEgMTMuODQ3NyA0Ljk1ODgzIDE1IDMuNTU1NTYgMTVWMTdaTTguMTExMTEgMTIuNDQ0NEM4LjExMTExIDkuOTM2NiA2LjA2MzQgNy44ODg4OSAzLjU1NTU2IDcuODg4ODlWOS44ODg4OUM0Ljk1ODgzIDkuODg4ODkgNi4xMTExMSAxMS4wNDEyIDYuMTExMTEgMTIuNDQ0NEg4LjExMTExWiIgZmlsbD0iIzU5NTk1OSIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTJfMjMwNl8yOTcyKSIvPgogIDxtYXNrIGlkPSJwYXRoLTUtaW5zaWRlLTNfMjMwNl8yOTcyIiBmaWxsPSJ3aGl0ZSI+CiAgICA8cGF0aCBkPSJNMTIuNDQ0NCA4Ljg4ODg5QzEwLjQ4ODkgOC44ODg4OSA4Ljg4ODg5IDEwLjQ4ODkgOC44ODg4OSAxMi40NDQ0QzguODg4ODkgMTQuNCAxMC40ODg5IDE2IDEyLjQ0NDQgMTZDMTQuNCAxNiAxNiAxNC40IDE2IDEyLjQ0NDRDMTYgMTAuNDg4OSAxNC40IDguODg4ODkgMTIuNDQ0NCA4Ljg4ODg5WiIvPgogIDwvbWFzaz4KICA8cGF0aCBkPSJNMTIuNDQ0NCA4Ljg4ODg5QzEwLjQ4ODkgOC44ODg4OSA4Ljg4ODg5IDEwLjQ4ODkgOC44ODg4OSAxMi40NDQ0QzguODg4ODkgMTQuNCAxMC40ODg5IDE2IDEyLjQ0NDQgMTZDMTQuNCAxNiAxNiAxNC40IDE2IDEyLjQ0NDRDMTYgMTAuNDg4OSAxNC40IDguODg4ODkgMTIuNDQ0NCA4Ljg4ODg5WiIgZmlsbD0iI0ZCRDU5RiIvPgogIDxwYXRoIGQ9Ik0xMi40NDQ0IDcuODg4ODlDOS45MzY2IDcuODg4ODkgNy44ODg4OSA5LjkzNjYgNy44ODg4OSAxMi40NDQ0SDkuODg4ODlDOS44ODg4OSAxMS4wNDEyIDExLjA0MTIgOS44ODg4OSAxMi40NDQ0IDkuODg4ODlWNy44ODg4OVpNNy44ODg4OSAxMi40NDQ0QzcuODg4ODkgMTQuOTUyMyA5LjkzNjYgMTcgMTIuNDQ0NCAxN1YxNUMxMS4wNDEyIDE1IDkuODg4ODkgMTMuODQ3NyA5Ljg4ODg5IDEyLjQ0NDRINy44ODg4OVpNMTIuNDQ0NCAxN0MxNC45NTIzIDE3IDE3IDE0Ljk1MjMgMTcgMTIuNDQ0NEgxNUMxNSAxMy44NDc3IDEzLjg0NzcgMTUgMTIuNDQ0NCAxNVYxN1pNMTcgMTIuNDQ0NEMxNyA5LjkzNjYgMTQuOTUyMyA3Ljg4ODg5IDEyLjQ0NDQgNy44ODg4OVY5Ljg4ODg5QzEzLjg0NzcgOS44ODg4OSAxNSAxMS4wNDEyIDE1IDEyLjQ0NDRIMTdaIiBmaWxsPSIjOEE1MzAzIiBtYXNrPSJ1cmwoI3BhdGgtNS1pbnNpZGUtM18yMzA2XzI5NzIpIi8+Cjwvc3ZnPg=="
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- rows -->
        <!-- <tr class="hover:bg-hover">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="rounded-lg h-12 w-12">
                  <img
                    src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">United States of America</div>
                <span class="badge badge-ghost badge-sm">USA</span>
              </div>
            </div>
          </td>
          <td class="text-center">1</td>
          <td class="text-center">5</td>
          <td class="text-center">2</td>
          <td class="text-center">8</td>
        </tr> -->

        <CountryItem v-for="country in countries" :key="country.id" :country="country" />
      </tbody>
    </table>
  </div>
  <div class="flex justify-center mt-10">
    <div class="join">
      <RouterLink
        :to="{ name: 'country-list-view', query: { page: page - 1, limit: limit } }"
        rel="prev"
        v-if="page != 1"
      >
        <button class="join-item btn">«</button>
      </RouterLink>
      <button class="join-item btn">Page {{ page }}</button>

      <RouterLink
        :to="{ name: 'country-list-view', query: { page: page + 1, limit: limit } }"
        rel="next"
        v-if="hasNextPage"
      >
        <button class="join-item btn">»</button>
      </RouterLink>
    </div>
  </div>
</template>
