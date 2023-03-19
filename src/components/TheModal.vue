<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal'
 
const useModal = useModalStore()

const { modalIsOpen } = storeToRefs(useModal)

const props = defineProps({
  destinos: {
    type: Number,
    default: Math.ceil(Math.random()*10)
  },
})


const emit = defineEmits(['closeModal'])

</script>

<template>
<dialog :open="modalIsOpen">
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
      <a href="#cancel" role="button" class="secondary" @click="emit('closeModal')">Cancelar</a>
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
  