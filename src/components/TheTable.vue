<script setup>
import { toRefs } from 'vue';


import TheModal from './TheModal.vue'
import { useModalStore } from '../stores/modal'

const useModal = useModalStore()

let {modalIsOpen} = toRefs(useModal)

console.log(modalIsOpen.value)

let openModal = () => {
    modalIsOpen.value = true
}

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
                <p role="link" style="margin: 0;" @click="openModal">Elegir destinos</p>
            </td>
            </tr>
        </tbody>
        </table>
    </figure>
    <TheModal :modalIsOpen="modalIsOpen"/>
  </template>
  
<style scoped>
    .destino{
        min-width: 200px;
    }
</style>
  

  