<script setup>
import TheTable from './components/TheTable.vue';

</script>

<template>
  <div class="container">
    <header>
      <h1>Destinos Psicología - A1.2016</h1>
      <h4>Funcionamiento de la app</h4>
      <ol>
        <li>Haz click en tu nombre para seleccionar los destinos</li>
        <li>En el primer paso selecciona los destinos. Tendrás que elegir tantos destinos como posición ocupes.</li>
        <li>En el segundo paso ordena los destinos de mayor a menor prioridad</li>
        <li>Los resultados siempre son ORIENTATIVOS</li>
      </ol>
    </header>
    <TheTable />
  </div>
</template>

<style scoped>
header{
  padding: 1rem 0;
}
h1, h4{
  text-align: center;
}
h4{
  margin-bottom: 1rem;
  text-decoration: underline;
}
ol{
  width: fit-content;
  max-width: 600px;
  margin: auto;
}
</style>
