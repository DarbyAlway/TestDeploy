<script setup lang="ts">
import { ref } from 'vue'
import { useCommentsStore } from '@/stores/comment'
import type { Country } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})

const commentsStore = useCommentsStore()
const newComment = ref('')

const addComment = () => {
  if (newComment.value.trim()) {
    commentsStore.addComment(props.country.name, newComment.value)
    newComment.value = ''
  }
}
</script>

<template>
  <div v-if="props.country">
    <div class="w-96 mx-auto mt-4">
      <label for="OrderNotes" class="sr-only">Order notes</label>

      <div
        class="overflow-hidden rounded-lg border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <textarea
          v-model="newComment"
          id="OrderNotes"
          class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm bg-transparent"
          rows="4"
          placeholder="Enter any additional order notes..."
        ></textarea>

        <div class="flex items-center justify-end gap-2 p-3">
          <button
            type="button"
            @click="addComment"
            class="btn btn-sm rounded px-3 text-sm font-medium text-white"
          >
            submit
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="
        commentsStore.commentsByCountry[props.country.name] &&
        commentsStore.commentsByCountry[props.country.name].length
      "
      class="mt-6"
    >
      <h3 class="font-bold mb-2">Comments:</h3>
      <ul>
        <li
          v-for="comment in commentsStore.commentsByCountry[props.country.name]"
          :key="comment.id"
          class="mb-2 p-2 rounded w-1/2 mx-auto"
        >
          {{ comment.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
