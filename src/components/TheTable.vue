<script setup>
import { people } from '../js/people';
import TheModal from './TheModal.vue'
import { useModalStore } from '../stores/modal.js'
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount } from 'vue';

const useModal = useModalStore()

let { modalIsOpen } = storeToRefs(useModal)

let position = ref(null)
let nombre = ref('')
let id = ref(null)
let destiniesFromStorage = getDestiniesFromStorage()
let arrPeople = people


if(destiniesFromStorage){
    destiniesFromStorage.sort((a, b) => {
    return a.id - b.id;
    });
}

let destiniesChosen = []

const arrayPeople = ref(people)

function getDestiniesFromStorage(){
    let destiniesArrString = localStorage.getItem('destiniesArr')
    let destiniesArr = JSON.parse(destiniesArrString)
    return destiniesArr
}


function calculateDestiny(){
    if(!destiniesFromStorage)return
    destiniesFromStorage.forEach((data) => {
        let isPresent = arrPeople.some(person => person.id === data.id)
        if(isPresent){
            data.destiniesArr.forEach(destiny => {
            let isCodeChosen = destiniesChosen.some(codeChosen => codeChosen === destiny.code) || destiniesChosen.some(codeChosen => codeChosen === data.id)
            if(!isCodeChosen){
                destiniesChosen.push(destiny.code, data.id)
                arrPeople.forEach(person => {
                if(data.id === person.id){ 
                    person.destino = destiny.destino
                    person.ciudad = destiny.ciudad
                    person.selectedItem = true
                }
                })
            }
            })
        }
    })
}

function checkLength(index, selectedItem){
    if(selectedItem){
        let indexInStorage = destiniesFromStorage.indexOf(destiniesFromStorage[index])
        console.log(indexInStorage, index)
        return index !== indexInStorage
    }
    return false
}

onBeforeMount(() => {
    calculateDestiny()
})


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
            <td class="destino" :style="!person.selectedItem ? 'color:darkgray; font-style: italic' : ''">
                {{ person.destino }}<span v-if="checkLength(index, person.selectedItem)">*<br> 
                    <small style="color: red; font-style: italic;font-size: 11px; line-height: 0">*Destino provisional, aspirantes con mayor prioridad aun no han rellenado sus destinos</small>
                </span>
            </td>
            <td :style="!person.selectedItem ? 'color:darkgray; font-style: italic' : ''">{{ person.ciudad }}</td>
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
  

  