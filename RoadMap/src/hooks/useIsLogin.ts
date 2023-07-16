import { fetcher } from "./queryClient";
export const useIsLogin = async () =>{
    let result = {
        isLogin : true,
        msg : "",
        auth : ""
    }
    if(document.cookie.length <= 0){
        result.isLogin =  false;
        result.msg = "로그아웃 되었습니다."
    }else{
        const data = await fetcher({
            method : 'GET',
            path : 'reissue'
        })
        if(!data.body.success){
            result.isLogin= false;
            result.msg = "토큰이 만료되었습니다."
            document.cookie = "id=; domain=localhost; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }else{
            result.auth = data.headers.Authorization[0];
        } 
    }
    return result;
}