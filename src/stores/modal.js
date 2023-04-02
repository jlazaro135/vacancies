import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modalIsOpen = ref(false)
  return { modalIsOpen }
})
