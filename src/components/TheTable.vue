<script setup>
import { people } from '../js/people';
import TheModal from './TheModal.vue'
import { useModalStore } from '../stores/modal.js'
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { getDestiniesFromStorage } from '../js/destinesFromStorage'

let uniqueDestinations = ref([])

const useModal = useModalStore()

let { modalIsOpen } = storeToRefs(useModal)

let position = ref(null)
let nombre = ref('')
let userId = ref(null)
let arrPeople = people
let isLoaded = ref(false)

let destiniesChosen = []

function calculateDestiny(){
    if(uniqueDestinations.value.length < 1)return
    Array.from(uniqueDestinations.value).forEach((data) => {
        let isPresent = arrPeople.some(person => person.userId === data.userId)
        if(isPresent){
            data.destiniesArr.forEach(destiny => {
            let isCodeChosen = destiniesChosen.some(codeChosen => codeChosen === destiny.code) || destiniesChosen.some(codeChosen => codeChosen === data.userId)
            if(!isCodeChosen){
                destiniesChosen.push(destiny.code, data.userId)
                arrPeople.forEach(person => {
                if(data.userId === person.userId){ 
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
        return index + 1 !== uniqueDestinations.value[index]?.userId
    }
    return false
}


function hasChosenDestinies(id){
    console.log(id)
    return Array.from(uniqueDestinations.value).some(destiny => destiny.userId === id)
}

function passDestiniesArr(id){
    let arrFound = Array.from(uniqueDestinations.value).find(destiny => destiny.userId === id)
    console.log(arrFound)
    if(arrFound)return arrFound?.destiniesArr
    return []
}

async function getDataTable(){
    try{
        let res = await getDestiniesFromStorage()
        uniqueDestinations.value = res.uniqueDestinations
        console.log(uniqueDestinations.value)
        calculateDestiny()
        isLoaded.value = true
    }catch(e){
        console.log(e)
    }
}

onBeforeMount(() => {
    getDataTable()
})


// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms


let openModal = (name, index) => {
    position.value = Number(index) + 1
    nombre.value = name.name
    userId.value = name.userId
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
    <div v-if="isLoaded">
        <figure>
        <table role="grid">
        <thead>
            <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Destino</th>
            <th>Ciudad</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(person, index) in arrPeople" :key="person.userId">
            <td>{{ index + 1 }}</td>
            <td>
                <p role="link" style="margin: 0;" @click="openModal(person, index)">{{ person.name }} </p>
            </td>
            <td class="destino" :style="!person.selectedItem ? 'color:darkgray; font-style: italic' : ''">
                {{ person.destino }}<span v-if="checkLength(index, person.selectedItem, person.userId)">*<br> 
                    <small style="color: red; font-style: italic;font-size: 11px; line-height: 0">*Destino provisional, aspirantes con mayor prioridad aun no han seleccionado sus destinos</small>
                </span>
            </td>
            <td :style="!person.selectedItem ? 'color:darkgray; font-style: italic' : ''">{{ person.ciudad }}</td>
            </tr>
        </tbody>
        </table>
    </figure>
    <TheModal 
    @closeModalEmit="closeModal"
    :destinos=position
    :nombre="nombre"
    :id="userId"
    :hasDestinies="hasChosenDestinies(userId)"
    :destiniesArr="passDestiniesArr(userId)"
    />
    </div>
    <div v-else>
        <h4 aria-busy="true" style="text-align: center;">Cargando Tabla...</h4>
    </div>
  </template>
  
<style scoped>
    html{
        scroll-behavior: smooth;
    }
    .destino{
        min-width: 200px;
    }
</style>
  

  