<script setup>
import TheModal from './TheModal.vue'
import { useModalStore } from '../stores/modal.js'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const useModal = useModalStore()

let { modalIsOpen } = storeToRefs(useModal)

let position = ref(null)
let nombre = ref('')


const names = [
    {
        name: 'Alice',
        destino: 'Consejería de Familia política social y educación ton to',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Destino sin elegir'
    },
    {
        name: 'Alice Montalbán Vazquez',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },
    {
        name: 'Alice',
        destino: 'Consejería de mis huevos morenos',
        ciudad: 'Málaga'
    },

];

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms


let openModal = (name, index) => {
    position.value = Number(index) + 1
    nombre.value = name.name
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
            <th>Position</th>
            <th>Name</th>
            <th>Destino</th>
            <th>Ciudad</th>
            <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(name, index) in names" :key="names.index">
            <td>{{ index + 1 }}</td>
            <td>{{ name.name }}</td>
            <td class="destino">{{ name.destino }}</td>
            <td>{{ name.ciudad }}</td>
            <td>
                <p role="link" style="margin: 0;" @click="openModal(name, index)">Elegir destinos</p>
            </td>
            </tr>
        </tbody>
        </table>
    </figure>
    <TheModal 
    @closeModal="closeModal"
    :destinos=position
    :nombre="nombre"
    />
  </template>
  
<style scoped>
    .destino{
        min-width: 200px;
    }
</style>
  

  