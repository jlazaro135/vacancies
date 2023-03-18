<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import items from '../items'

const selectedItems = ref(items);

const emits = defineEmits(['closeModal']);

function closeModal() {
  emits('closeModal');
  selectedItems.value = [];
}
</script>

<template>
    <div class="modal" v-show="show">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Choose {{ selectedPerson.name }}'s items:</h2>
        <div class="item-list">
          <label v-for="(item, index) in availableItems" :key="item.id">
            <input type="checkbox" v-model="selectedItems" :value="item" />
            {{ item.name }}
          </label>
        </div>
        <draggable v-model="selectedItems" class="drag-container">
          <div v-for="(item, index) in selectedItems" :key="item.id" class="drag-item">
            <span class="drag-handle">&#x2195;</span>
            {{ item.name }}
          </div>
        </draggable>
      </div>
    </div>
  </template>
  
  <style>
  /* Styles for the modal */
  </style>
  