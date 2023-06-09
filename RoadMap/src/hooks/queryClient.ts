import { QueryClient, useMutation } from "react-query";
import { Return } from "../type";

export const getQueryClient = (()=>{
    let client : null | QueryClient = null;
    return ()=>{
        if(!client) client = new QueryClient({
            defaultOptions : {
                queries : {
                    cacheTime : 0,
                    staleTime : 0,
                    refetchOnReconnect : false,
                    refetchOnMount : false,
                    refetchOnWindowFocus : false
                }
            }
        });
        return client;
    }
})();

type AnyObj = {
    [key : string] : any
}

//const BASE_URL = "http://localhost:1234/";
const BASE_URL = "http://localhost:8080/";
export const fetcher = async({
    method,
    path,
    body,
    params
}:{
    method : 'GET' | 'POST' | 'DELETE' | 'PUT',
    path : string,
    body? : AnyObj,
    params? : AnyObj
}) =>{
    try{
        let url = `${BASE_URL}${path}`;
        const fetchOption : RequestInit = {
            method,
            headers : {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin' : BASE_URL
            },
        }
        if(params){
            const URLParams = new URLSearchParams(params);
            url +='?'+URLParams;
        }
        if(body){
            console.log(body);
            fetchOption.body = JSON.stringify(body);
        }
        const res = await fetch(url, fetchOption);
        if(!res.ok){
            throw new Error(`${res.status} 에러 발생`);
        }
        const json = await res.json();
        return json;
    }catch(err){
        throw err;
    }
}

export const QueryKeys = {
    TOURS : 'TOURS',
    MAIN : 'MAIN'
}