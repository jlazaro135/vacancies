<script setup>

import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal'
import { destinies } from '../js/destinies';
import { ref, watchEffect } from 'vue';
import Draggable from 'vuedraggable';

const props = defineProps({
  destinos: {
    type: Number,
  },
  nombre:{
    type: String,
  },
  id:{
    type:  Number,

  }
})

 
const useModal = useModalStore()

const { modalIsOpen } = storeToRefs(useModal)

const getDestinies = ref(destinies)

const destinyRef = ref(null)

const idRef = ref(null)

const modalScroll = ref(null)

const isSelectable = ref(true)

watchEffect(() => {
  destinyRef.value = props.destinos
  idRef.value = props.id
});

const allAreChosen = ref(false)

const chosenDestinies = ref([])

function checkDestiniesChosen(chosenCode){
  if(chosenDestinies.value.find(destiny => destiny.code === chosenCode.code)){
    let indexOfDestiny = chosenDestinies.value.indexOf(chosenCode)
    chosenDestinies.value.splice(indexOfDestiny, 1 )
    destinyRef.value = props.destinos - chosenDestinies.value.length
    return
  }
  chosenDestinies.value.push(getDestinies.value.find(destiny => destiny.code === chosenCode.code))
  destinyRef.value = props.destinos - chosenDestinies.value.length
  if(chosenDestinies.value.length >= props.destinos){
    allAreChosen.value = true
    isSelectable.value = false
    window.scrollTo(0,0);
    return
  }
}

function deleteDestiny(destiny){
  let indexOfDestiny = chosenDestinies.value.indexOf(destiny.code)
  chosenDestinies.value.splice(indexOfDestiny, 1 )
  destinyRef.value = props.destinos - chosenDestinies.value.length
  allAreChosen.value = false
  isSelectable.value = true
  window.scrollTo(0,0);
}
const emit = defineEmits(['closeModalEmit'])

function closeModal(){
  emit('closeModalEmit')
  location.reload()
}

function sendDestinies(){
  if(localStorage.getItem('destiniesArr')){
    const destiniesArrStringFromStorage = localStorage.getItem('destiniesArr')
    const destiniesArrFromStoraege = JSON.parse(destiniesArrStringFromStorage)
    const destiniesArr = [...destiniesArrFromStoraege,
      {
      id: idRef.value,
      destiniesArr: chosenDestinies.value
      } 
    ]
    const destiniesArrString = JSON.stringify(destiniesArr)
    localStorage.setItem("destiniesArr", destiniesArrString);
    modalIsOpen.value = false
    location.reload()
    return
  }

  const destiniesArr = [{
    id: idRef.value,
    destiniesArr: chosenDestinies.value
  }]
  
  const destiniesArrString = JSON.stringify(destiniesArr)
  localStorage.setItem("destiniesArr", destiniesArrString);
  location.reload()
  modalIsOpen.value = false
}

</script>

<template>
<dialog :open="modalIsOpen">
  <article ref="modalScroll">
    <h5 class="destinies-counter">{{ nombre }} - 
      <span v-if="isSelectable"> 
        destinos a seleccionar: {{ destinyRef }}
      </span>
      <span v-else>
        Ordena los destinos
      </span>
    </h5>
    <a class="close" @click="closeModal()"></a>
    <main>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h3 class="heading" :class="allAreChosen ? 'h-disabled' : ''">
              Paso 1: Elegir destinos
              <span style="font-size: 12px;">- Ordénalos en el siguiente paso</span>
          </h3>
          <div id="collapseOne" class="accordion-collapse" :class="!allAreChosen ? 'collapse show' : 'collapsed'">
            <div class="item-card" v-for="destiny in getDestinies" @click="checkDestiniesChosen(destiny)" :class="{'is-selected': chosenDestinies.find(chosenDestiny => chosenDestiny.code === destiny.code)}">
              <p class="item-p">Destino: {{ destiny.destino }}</p>
              <p class="item-p">Ciudad: {{ destiny.ciudad }}</p>
              <p class="item-p">Código: {{ destiny.code }}</p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h3 class="heading" :class="!allAreChosen ? 'h-disabled' : ''">
              Paso 2: Ordena los destinos elegidos
          </h3>
          <draggable v-model="chosenDestinies" class="accordion-collapse" :class="allAreChosen ? 'collapse show' : 'collapsed'" tag="div" :animation="300" itemKey="draggeable" group="destinations">
            <template #item="{ element: destiny }">
              <div class="item-card">
                <div class="mb-1 p-1 text-center bg-info text-white fw-bold">Posición {{ chosenDestinies.indexOf(destiny) + 1 }}</div>
                <div>
                  <p>Destino: {{ destiny.destino }}</p>
                  <p>Ciudad: {{ destiny.ciudad }}</p>
                  <p>Código: {{ destiny.code }}</p>
                </div>
                <div>
                  <a href="#" @click="deleteDestiny(destiny)">Eliminar</a>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </main>
    <footer>
      <button href="#cancel" role="button" class="secondary" @click="closeModal()">Cancelar</button>
      <button href="#confirm" role="button" @click="sendDestinies()" :disabled="!allAreChosen" >Confirmar</button>
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
  .box-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  }
  .box {
    max-width: 100%;
  }
}

.destinies-counter{
  position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  width: fit-content;
  max-width: 90%;
  margin: 0 auto;
  z-index: 9;
  background-color: rgb(0, 4, 255);
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 0 10px lightgray
}

.item-card{
  background-color: rgba(233, 233, 233, 0.521);
  padding: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
}

.item-p{
  max-width: 80%;
}

.item-card:hover{
  box-shadow: 0 0 10px rgb(201, 201, 201)
}

.is-selected{
  background-color: rgb(196, 255, 196);
  border-color: darkgreen;
  position: relative;
  z-index: 0;
}

.is-selected:after{
  content: '✓';
    display: grid;
    place-content: center;
    width: 32px;
    height: 32px;
    padding: 0.5rem;
    text-align: center;
    position: absolute;
    background-color: green;
    border: 1px solid darkgreen;
    color: white;
    top: 5px;
    right: 5px;
    font-size: 17px;
    border-radius: 50%;
}


p{
  margin: 0;
  font-size: 14px;
}

.accordion-collapse{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid gray;
  padding: 1rem;
  border-top: 0;
  overflow: hidden;
  max-height: auto;
  transition:  padding ease-in-out 0.5s;
}

.collapsed{
  max-height: 0;
  padding: 0;
  transition: padding ease-in-out 0.5s;

}

.heading{
  padding: 1rem;
  background-color: #fff5db;
  border: 1px solid gray;
  margin: 0;
  overflow: hidden;
}

.h-disabled{
  background-color: lightgray;
  color: gray;
  cursor: not-allowed;
}

button{
  max-width: 140px;
}

</style>
  