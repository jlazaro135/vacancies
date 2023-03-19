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
  nombre:{
    type: String,
  }
})


const emit = defineEmits(['closeModal'])

</script>

<template>
<dialog :open="modalIsOpen">
  <article>
    <h5>{{ nombre }} - destinos a seleccionar: {{ destinos }}</h5>
    <main>
      <div class="box-wrapper">
        <div class="box">
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
          <div class="item-card">
            <p>Destino: Centro social de mis huevos morenos</p>
            <p>Ciudad: Sevilla</p>
            <p>Código: 12345xssd</p>
          </div>
        </div>
        <div class="box">
          derecha
        </div>
      </div>
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
width: 100%;  
max-width: 100%;
}

.box-wrapper{
  display: flex;
  gap: 0.5rem;
}


.box{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  border: 1px solid lightgray;
  padding: 1rem;
  max-width: 50%;
  max-height: 50vh;
  overflow: auto;
}

@media screen and (max-width: 992px) {
  .box-wrapper{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
  .box{
    max-width: 100%;
  }
}

.item-card{
  background-color: rgb(233, 233, 233);
  padding: 0.5rem;
  border: 1px solid gray;
  cursor: pointer;
  box-shadow: 0;
  transition: box-shadow 0.3s ease-out;
  position: relative;
  left: 0;
  top: 0;
}

.item-card:hover{
  background-color: rgb(233, 233, 233);
  box-shadow: 5px 5px rgb(44, 44, 44);
  padding: 0.5rem;
  transition: box-shadow 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out;
  left: -5px;
  top: -5px;
}

p{
  margin: 0;
  font-size: 14px;
}
</style>
  