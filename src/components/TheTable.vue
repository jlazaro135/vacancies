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
            <td>{{ name.destino }}</td>
            <td>{{ name.ciudad }}</td>
            <td>
                <p role="link" style="margin: 0;">Elegir destinos</p>
            </td>
            </tr>
        </tbody>
        </table>
    </figure>
  </template>
  
<script setup>
  
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
  