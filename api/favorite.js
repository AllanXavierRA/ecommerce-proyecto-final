import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export async function isFavoriteApi(idUser, idWatch, logout){
    try{
        const url = `${BASE_PATH}/favorites?user=${idUser}&watch=${idWatch}`;
        return await authFetch(url, null, logout)
    }catch(error){
        console.log(error);
        return null;        
    }
}

export async function addFavoriteApi(idUser, idWatch, logout){
    try{
        const dataFound =  await isFavoriteApi(idUser, idWatch, logout);
        if(size(dataFound) > 0 || !dataFound){
            return "Este producto ya lo tienes en tu lista de favoritos";
        }else{
            const url = `${BASE_PATH}/favorites`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user: idUser, watch: idWatch}),
            };
            const result = await authFetch(url, params, logout);
            return result;
        }
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function deleteFavoriteApi(idUser, idWatch, logout){
    try{
        const dataFound =  await isFavoriteApi(idUser, idWatch, logout);
        if(size(dataFound) > 0){
            const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const result = authFetch(url, params, logout);
            return result
        }
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function getFavoriteApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/favorites?user=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}