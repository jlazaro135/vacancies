<script setup>
import { people} from '../js/people';
import TheModal from './TheModal.vue'
import { useModalStore } from '../stores/modal.js'
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount } from 'vue';

const useModal = useModalStore()

let { modalIsOpen } = storeToRefs(useModal)

let position = ref(null)
let nombre = ref('')
let id = ref(null)
let destiniesFromStorage = ref()

const arrayPeople = ref(people)


// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms


let openModal = (name, index) => {
    position.value = Number(index) + 1
    nombre.value = name.name
    id.value = name.id
    if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
    modalIsOpen.value = true
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        document.documentElement.classList.remove(openingClass);
    }, animationDuration);
}

// Close modal
const closeModal = modal => {
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modalIsOpen.value = false
  }, animationDuration);
}


// Get scrollbar width
const getScrollbarWidth = () => {

// Creating invisible container
const outer = document.createElement('div');
outer.style.visibility = 'hidden';
outer.style.overflow = 'scroll'; // forcing scrollbar to appear
outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
document.body.appendChild(outer);

// Creating inner element and placing it in the container
const inner = document.createElement('div');
outer.appendChild(inner);

// Calculating difference between container's full width and the child width
const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

// Removing temporary elements from the DOM
outer.parentNode.removeChild(outer);

return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
}

function getDestiniesFromStorage(){
    let destiniesArrString = localStorage.getItem('destiniesArr')
    let destiniesArr = JSON.parse(destiniesArrString)
    return destiniesArr
}

let destiniesAccumulatorArr = []

function calculateDestiny(personId){
    let personFound = destiniesFromStorage ? destiniesFromStorage.find(destiny=> destiny.id === personId) : '';
    if(personFound){
        for (let i = 0; personFound.destiniesArr.length > i; i++){
            if(destiniesAccumulatorArr.some(code => code === personFound.id))return
            if(!destiniesAccumulatorArr.some(code => code === personFound.destiniesArr[i].code)){
                destiniesAccumulatorArr = [...destiniesAccumulatorArr, personFound.destiniesArr[i].code, personFound.id]
                return personFound.destiniesArr[i].destino
            }
        }
    }
    return 'Destino no elegido'
}

onBeforeMount(() => {
    destiniesFromStorage = getDestiniesFromStorage()
})
  
</script>

<template>
    <figure>
        <table role="grid">
        <thead>
            <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Destino</th>
            <th>Ciudad</th>
            <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(person, index) in arrayPeople" :key="person.id">
            <td>{{ index + 1 }}</td>
            <td>{{ person.name }}</td>
            <td class="destino">{{ calculateDestiny(person.id) }}</td>
            <td>{{ person.ciudad }}</td>
            <td>
                <p role="link" style="margin: 0;" @click="openModal(person, index)">Elegir destinos</p>
            </td>
            </tr>
        </tbody>
        </table>
    </figure>
    <TheModal 
    @closeModalEmit="closeModal"
    :destinos=position
    :nombre="nombre"
    :id="id"
    />
  </template>
  
<style scoped>
    html{
        scroll-behavior: smooth;
    }
    .destino{
        min-width: 200px;
    }
</style>
  

  