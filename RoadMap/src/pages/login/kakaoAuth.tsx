import { useContext, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, redirect } from "react-router-dom";
import { useQuery } from "react-query";
import { QueryKeys, fetcher } from "../../hooks/queryClient";
import { CurrentUserAuthContext } from "../CurrentUserAuthContext";

const KakaoAuth = () =>{
    const context  = useContext(CurrentUserAuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!searchParams.get('code')){
            navigate('/404')
        }
    },[searchParams.get('code')])

    const {data, isLoading}= useQuery({
        queryKey : [QueryKeys.KAKAO_AUTH],
        queryFn : ()=> fetcher({
            method : 'GET',
            path : `login/oauth2/code/kakao?code=${searchParams.get('code')}`
        }),
        onError : ()=>{
            alert('인증도중 에러가 발생하였습니다.')
        },
        onSuccess : (data)=>{
            if(!data.body.success){
                navigate(`/login/register?email=${data.body.userResponse.email}&nickname=${data.body.userResponse.nickName}`)
                
            }else{
                alert("로그인 되었습니다!");   
                const {success, userResponse} = data.body;
                // userId 쿠키저장 
                if(success){
                    console.log(`id=${userResponse.userId}; max-age=${60*60*24*7}`);
                    document.cookie = `id=${userResponse.userId}; path=/; max-age=${60*60*24*7}`;
                    
                }
                // todo : context API에 auth값 넣기
                if(!context) return;
                context.setAuth(data.headers.Authorization[0]);    
                navigate('/')
                location.reload();
            }
        }
    })

    if(!data||isLoading){
        return <div>인증 중 입니다.</div>
    }
 
    return (
        <div>로딩중입니다.</div>
    )
}

export default KakaoAuth;