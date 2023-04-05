
import { apiClient } from '../js/apiClient';

export async function getDestiniesFromStorage(){
    try{
        let destiniesFromStorage = await apiClient.get('https://x8ki-letl-twmt.n7.xano.io/api:BYuPNyow/destiniesarr')
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

            return { uniqueDestinations }

    }catch(e){
        console.log(e)
    }
}
