// 192.168.1.134

const API_URL = "http://192.168.1.105:8069/api/pokemon/";

export const getDetailedPokemon = async (id: number) => {
    try{
        const response = await fetch(`${API_URL}${id.toString()}`);

        console.log("Pokemon seleccionado: " + id)

        if(!response.ok){
            throw new Error(`API ${response.status}`);
            
        }
        
        return await response.json();

    } catch (err) {
        console.error(err);
    }
}