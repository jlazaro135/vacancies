<script setup>
import { ref } from 'vue';

const props = defineProps({
  destinos: {
    type: Number,
    default: Math.ceil(Math.random()*10)
  },
  isModalOpen: {
    type: Boolean,
    default: true
  }
})

let isOpen = ref(props.isModalOpen)


const closeModal = () => isOpen.value = false

</script>

<template>
<dialog :open="isOpen">
  <article>
    <h3>Selecciona {{ destinos }} destinos</h3>
    <main>
      <p>
        Mauris non nibh vel nisi sollicitudin malesuada. 
        Donec ut sagittis erat. Praesent eu eros felis. 
        Ut consectetur placerat pulvinar.
      </p>
    </main>
    <footer>
      <a href="#cancel" role="button" class="secondary" @click="closeModal">Cancelar</a>
      <a href="#confirm" role="button">Confirmar</a>
    </footer>
  </article>
</dialog>
</template>
  
<style>
dialog article{
max-width: 100%;
}

main{
  max-height: 50vh;
  overflow: auto;
}
</style>
  