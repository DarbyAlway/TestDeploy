import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentsStore = defineStore('comments', () => {
  const commentsByCountry = ref<{ [key: string]: { id: number; text: string }[] }>({})

  // Initialize comments from localStorage if available
  if (localStorage.getItem('commentsByCountry')) {
    commentsByCountry.value = JSON.parse(localStorage.getItem('commentsByCountry') as string)
  }

  const addComment = (countryName: string, commentText: string) => {
    if (!commentsByCountry.value[countryName]) {
      commentsByCountry.value[countryName] = []
    }

    commentsByCountry.value[countryName].push({
      id: commentsByCountry.value[countryName].length + 1,
      text: commentText
    })
  }

  return {
    commentsByCountry,
    addComment
  }
})
