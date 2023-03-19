import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const modalIsOpen = false

  return { modalIsOpen }
})
