<script setup>

import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal'
import { destinies } from '../js/destinies';
import { ref, watchEffect } from 'vue';
import { apiClient } from '../js/apiClient'
import Draggable from 'vuedraggable';


const props = defineProps({
  destinos: {
    type: Number,
  },
  nombre:{
    type: String,
  },
  id:{
    type: Number,

  },
  hasDestinies: {
    type: Boolean,
  },
  destiniesArr: {
    type: Array
  }
})

 
const useModal = useModalStore()

const { modalIsOpen } = storeToRefs(useModal)

const getDestinies = ref(destinies)

const destinyRef = ref(null)

const idRef = ref(null)

const hasDestiniesRef = ref(false)

const destiniesArrRef = ref([])

const modalScroll = ref(null)

const isSelectable = ref(true)

const allAreChosen = ref(false)

const chosenDestinies = ref([])

const stepOne = ref(null)
const stepTwo = ref(null)

const maxHeight = {
  maxHeight: ref('auto')
}

watchEffect(() => {
  destinyRef.value = props.destinos
  idRef.value = props.id
  hasDestiniesRef.value = props.hasDestinies
  destiniesArrRef.value = props.destiniesArr
  if(hasDestiniesRef.value){
    allAreChosen.value = hasDestiniesRef.value
    chosenDestinies.value = destiniesArrRef.value
    isSelectable.value = !destiniesArrRef.value
    maxHeight.maxHeight.value = (stepTwo.value.offsetHeight + 100) + 'px'
  }
});


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
    modalScroll.value.scrollTo(0,0);
    return
  }
}

function deleteDestiny(destiny){
  let indexOfDestiny = chosenDestinies.value.indexOf(destiny.code)
  chosenDestinies.value.splice(indexOfDestiny, 1 )
  destinyRef.value = props.destinos - chosenDestinies.value.length
  allAreChosen.value = false
  isSelectable.value = true
  modalScroll.value.scrollTo(0,0);
  setTimeout(function(){
    maxHeight.maxHeight.value = (stepOne.value.offsetHeight + 100) + 'px'
  }, 500)
}
const emit = defineEmits(['closeModalEmit'])

function closeModal(){
  emit('closeModalEmit')
  location.reload()
}

async function sendDestinies(){
  let data = {
        userId: idRef.value,
        destiniesArr: JSON.stringify(chosenDestinies.value)
    }
    try {
        let res = await apiClient.post('https://x8ki-letl-twmt.n7.xano.io/api:BYuPNyow/destiniesarr', data)
        location.reload()
    } catch (error) {
        console.log(error)
    }finally{
      // modalIsOpen.value = false
    }
  


}

</script>

<template>
<dialog :open="modalIsOpen">
  <article ref="modalScroll">
    <h5 class="destinies-counter" v-if="isSelectable">{{ nombre }} - 
      <span> 
        destinos a seleccionar: {{ destinyRef }}
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
          <div id="collapseOne" class="accordion-collapse" :class="!allAreChosen ? 'collapse show' : 'collapsed'" ref="stepOne">
            <div class="wrapper-padding">
              <div class="item-card" v-for="destiny in getDestinies" @click="checkDestiniesChosen(destiny)" :class="{'is-selected': chosenDestinies.find(chosenDestiny => chosenDestiny.code === destiny.code)}">
              <p class="item-p">Destino: {{ destiny.destino }}</p>
              <p class="item-p">Ciudad: {{ destiny.ciudad }}</p>
              <p class="item-p">Código: {{ destiny.code }}</p>
            </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h3 class="heading" :class="!allAreChosen ? 'h-disabled' : ''">
              Paso 2: Ordena los destinos elegidos
          </h3>
          <draggable v-model="chosenDestinies" handle=".handle" class="accordion-collapse stepTwo" :class="allAreChosen ? 'collapse show' : 'collapsed'" tag="div" :animation="300" itemKey="draggeable" group="destinations" ref="stepTwo">
            <template #item="{ element: destiny }">
                <div class="item-card">
                <div class="handle">
                  <svg viewBox="0 0 100 80" width="16" height="16">
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                  </svg>
                </div>
                <div class="mb-1 p-1 text-center bg-info text-white fw-bold">Posición {{ chosenDestinies.indexOf(destiny) + 1 }}</div>
                <div>
                  <p>Destino: {{ destiny.destino }}</p>
                  <p>Ciudad: {{ destiny.ciudad }}</p>
                  <p>Código: {{ destiny.code }}</p>
                </div>
                <div>
                  <a href="#" @click="deleteDestiny(destiny)" style="color: red">Eliminar</a>
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
  position: relative;
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

  border: 1px solid gray;
  border-top: 0;
  overflow: hidden;
  max-height: v-bind('maxHeight.maxHeight.value');
  transition: max-height 500ms ease-in;
}

.collapsed{   
  max-height: 0;
  transition: max-height 500ms ease-in;

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

.handle{
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: grab
}

.wrapper-padding{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.stepTwo{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

</style>
  