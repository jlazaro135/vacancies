import { defineStore } from 'pinia'
import { apiClient } from '../js/apiClient';


export const useDestiniesStore = defineStore('destiniesFromStorage', async () => {
    let destiniesFromStorage = await getDestiniesFromStorage()

    if(destiniesFromStorage){
    destiniesFromStorage.sort((a, b) => {
    return a.userId - b.userId;
    });
    }

    let uniqueDestinations = [];

    destiniesFromStorage.forEach((element) => {
        if (!uniqueDestinations.some(el => element.userId === el.userId )) {
            uniqueDestinations.push(element);
            return
        }
        let destinyFound = uniqueDestinations.find(d => d.userId === element.userId)
        let idx = uniqueDestinations.indexOf(destinyFound)
        uniqueDestinations.splice(idx, 1)
        uniqueDestinations.push(element);
    });


    if(uniqueDestinations){
        uniqueDestinations.sort((a, b) => {
        return a.userId - b.userId;
        });
    }


    async function getDestiniesFromStorage(){
        try{
            let res = await apiClient.get('https://x8ki-letl-twmt.n7.xano.io/api:BYuPNyow/destiniesarr')
            return res
        }catch(e){
            console.log(e)
        }
        // let destiniesArrString = localStorage.getItem('destiniesArr')
        // let destiniesArr = JSON.parse(destiniesArrString)
        // return destiniesArr ?? []
    }

  return { uniqueDestinations }
})
