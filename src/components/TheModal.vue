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

const allAreChosen = ref(false)

const chosenDestinies = ref([])

function checkDestiniesChosen(chosenCode){
  if(chosenDestinies.value.find(destiny => destiny.code === chosenCode.code)){
    let indexOfDestiny = chosenDestinies.value.indexOf(chosenCode)
    chosenDestinies.value.splice(indexOfDestiny, 1 )
    return
  }
  chosenDestinies.value.push(getDestinies.value.find(destiny => destiny.code === chosenCode.code))
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
    <h5 class="destinies-counter">{{ nombre }} - destinos a seleccionar: {{ destinyRef }}</h5>
    <main>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h3 class="heading">
              Paso 1: Elegir destinos
              <span style="font-size: 12px;">- Ordénalos en el siguiente paso</span>
          </h3>
          <div id="collapseOne" class="accordion-collapse" :class="!allAreChosen ? 'collapse show' : 'collapse'" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="item-card" v-for="destiny, index in getDestinies" @click="checkDestiniesChosen(destiny)" :class="{'is-selected': chosenDestinies.find(chosenDestiny => chosenDestiny.code === destiny.code)}">
              <p class="item-p">Destino: {{ destiny.destino }}</p>
              <p class="item-p">Ciudad: {{ destiny.ciudad }}</p>
              <p class="item-p">Código: {{ destiny.code }}</p>
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
                <div class="item-card" v-for="destiny, index in chosenDestinies">
                  <div class="mb-1 p-1 text-center bg-info text-white fw-bold">Posición {{ index + 1 }}</div>
                    <div>
                      <p>Destino: {{ destiny.destino }}</p>
                      <p>Ciudad: {{ destiny.ciudad }}</p>
                      <p>Código: {{ destiny.code }}</p>
                    </div>
                  <div>
                    <a href="#">Eliminar</a>
                  </div>
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
  overflow: hidden;
  z-index: 0;
}

.is-selected:after{
  content: 'Elegido';
    width: 193px;
    height: 41px;
    text-align: center;
    position: absolute;
    background-color: darkgreen;
    padding: 0.5rem;
    color: white;
    top: 10px;
    right: -59px;
    transform: rotate(43deg);
    font-size: 17px;
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
}

.heading{
  padding: 1rem;
  background-color: lightcyan;
  border: 1px solid gray;
  border-bottom: 0;
  margin: 0
}
</style>
  