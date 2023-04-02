import { defineStore } from 'pinia'

export const useDestiniesStore = defineStore('destiniesFromStorage', () => {
  let destiniesFromStorage = getDestiniesFromStorage()
  if(destiniesFromStorage){
    destiniesFromStorage.sort((a, b) => {
    return a.id - b.id;
    });
}

let uniqueDestinations = [];

destiniesFromStorage.forEach((element) => {
    if (!uniqueDestinations.some(el => element.id === el.id )) {
        uniqueDestinations.push(element);
        return
    }
    let destinyFound = uniqueDestinations.find(d => d.id === element.id)
    let idx = uniqueDestinations.indexOf(destinyFound)
    uniqueDestinations.splice(idx, 1)
    uniqueDestinations.push(element);
});



if(uniqueDestinations){
    uniqueDestinations.sort((a, b) => {
    return a.id - b.id;
    });
}


function getDestiniesFromStorage(){
    let destiniesArrString = localStorage.getItem('destiniesArr')
    let destiniesArr = JSON.parse(destiniesArrString)
    return destiniesArr ?? []
}


  return { uniqueDestinations }
})
