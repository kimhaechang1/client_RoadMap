import { useQuery } from "react-query"
import { QueryKeys, fetcher } from "./queryClient"
import { useContext, useEffect } from "react";
import { CurrentUserAuthContext } from "../pages/CurrentUserAuthContext";
import { redirect } from "react-router-dom";
import { useRemoveCookie } from "./useRemoveCookie";

export const silentAuth = async (loginAuth : boolean=false) =>{
    const context = useContext(CurrentUserAuthContext);
    const {data, isLoading, isSuccess} = useQuery({
        queryKey : QueryKeys.KAKAO_AUTH,
        queryFn : ()=>fetcher({
            method : 'GET',
            path : 'reissue'
        }),
        
    })
    
    if(isSuccess){
        return await data;
    }
    
    /*if(result.isSuccess && result.data.body.success && !loginAuth){
        context?.setAuth(result.data.headers.Authorization[0]);
        /*if( && ){
            console.log('dfasfda');
            context?.setAuth(result.data.headers.Authorization[0]);
        }else if(!result.data.success && loginAuth){
            alert('로그아웃 되었습니다.');
            useRemoveCookie('id');
            redirect('/login');
        }else if(!result.data.success && !loginAuth){
            useRemoveCookie('id');
        }
    }
    */
}

