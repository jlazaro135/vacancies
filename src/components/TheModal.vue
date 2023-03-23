<script setup>

import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal'
import { destinies } from '../js/destinies';
import { ref, watchEffect } from 'vue';
 
const useModal = useModalStore()


const { modalIsOpen } = storeToRefs(useModal)

const getDestinies = ref(destinies)

const props = defineProps({
  destinos: {
    type: Number,
  },
  nombre:{
    type: String,
  }
})

const destinyRef = ref(null)

watchEffect(() => destinyRef.value = props.destinos);

console.log(destinyRef.value)

const allAreChosen = ref(false)

const chosenDestinies = ref([])

function checkDestiniesChosen(chosenCode){
  chosenDestinies.value.push(getDestinies.value.find(destiny => destiny.code === chosenCode))
  destinyRef.value = props.destinos - chosenDestinies.value.length
  if(chosenDestinies.value.length >= props.destinos){
    allAreChosen.value = true
  }
}

const emit = defineEmits(['closeModal'])

</script>

<template>
<dialog :open="modalIsOpen">
  <article>
    <h5>{{ nombre }} - destinos a seleccionar: {{ destinyRef }}</h5>
    <main>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="" :class="!allAreChosen ? '' : 'collapsed'" type="button" data-bs-toggle="collapse" data-bs-target="" aria-expanded="true" aria-controls="collapseOne">
              Destinos a elegir
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse" :class="!allAreChosen ? 'collapse show' : 'collapse'" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="item-card" v-for="destiny in getDestinies" @click="checkDestiniesChosen(destiny.code)">
                  <p>Destino: {{ destiny.destino }}</p>
                  <p>Ciudad: {{ destiny.ciudad }}</p>
                  <p>Código: {{ destiny.code }}</p>
                </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="" :class="allAreChosen ? '' : 'collapsed'" type="button" data-bs-toggle="collapse" data-bs-target="" aria-expanded="false" aria-controls="collapseTwo">
              Destinos elegidos
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse" :class="allAreChosen ? 'collapse show' : 'collapse'" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="item-card" v-for="destiny in chosenDestinies">
                  <p>Destino: {{ destiny.destino }}</p>
                  <p>Ciudad: {{ destiny.ciudad }}</p>
                  <p>Código: {{ destiny.code }}</p>
                </div>
            </div>
          </div>
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
  margin: 1rem 0;
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
  