import { result } from "lodash";
import { BASE_PATH } from "../utils/constants";

export async function getLastWatchApi(limit){
    try{
        const limitItems= `_limit=${limit}`;
        const sortItem = "_sort=createdAt:desc";
        const url = `${BASE_PATH}/watches?${limitItems}&${sortItem}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function getWatchesPlatformApi(platform, limit, start){
    try{
        const limitItems = `_limit=${limit}`;
        const sortItems = "_sort=createdAt:desc";
        const startItems = `_start=${start}`;
        const url = `${BASE_PATH}/watches?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(error){
    console.log(error);
    return null;
    }
}

export async function getTotalWatchesPlatformApi(platform){
    try{
        const url = `${BASE_PATH}/watches/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function getWatchByUrlApi(path){
    try{
        const url = `${BASE_PATH}/watches?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function searchWatchesApi(title){
    try{
        const url = `${BASE_PATH}/watches?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
        return null;
    }
}