import { QueryClient } from "react-query";

export const getQueryClient = (()=>{
    let client : null | QueryClient = null;
    return ()=>{
        if(!client) client = new QueryClient({
            defaultOptions : {
                queries : {
                    cacheTime : 1000 * 60 * 60 * 24,
                    staleTime : 1000 * 60,
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

const BASE_URL = "http://localhost:1234/";

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
                'Access-Controll-Allow-Origin' : BASE_URL
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
        const json = await res.json();
        return json;
    }catch(err){
        console.log(err);
    }
}

export const QueryKeys = {
    TOURS : 'TOURS',
    MAIN : 'MAIN'
}
