import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/profile.css';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { fetcher } from '../../hooks/queryClient';
import CommonButton from '../../components/common/button';
import { CurrentUserAuthContext } from '../CurrentUserAuthContext';

const Register = () =>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [major, setMajor] = useState<string>("")
    const [nickname, setNickname] = useState<string>("")
    const context = useContext(CurrentUserAuthContext);
    const majorList = [
        "웹 프론트엔드 개발자", "웹 백엔드 개발자", "인프라", "시스템 프로그래머", "보안 소프트웨어 프로그래머", 
        "안드로이드 개발자", "ios 개발자", "게임 클라이언트 개발자", "게임 서버 개발자",
        "클라우드 엔지니어", "빅데이터 엔지니어", "임베디드 소프트웨어 개발자", "블록체인 엔지니어", "인공지능 개발자" 
    ]
    const postRegister = useMutation({
        mutationFn : ()=> fetcher({
            method : 'POST',
            path : `signup`,
            body : {
                nickName : nickname,
                email : searchParams.get("email"),
                major : major
            }
        }),
        onSuccess : (data)=>{
            const {success, userResponse} = data.body;
            // userId 쿠키저장 
            if(success){
                document.cookie = `id=${userResponse.userId}; path=/; max-age=${60*60*24*7}`;
            }
            // todo : context API에 auth값 넣기
            if(!context) return;
            context.setAuth(data.headers.Authorization[0]);
            navigate('/')
            location.reload();
        },
        onError : ()=>{
            alert("에러가 발생하였습니다.")
        }
    })

    const registerHandler = ()=>{
        postRegister.mutate();
    }

    return(
        <div className="mypageFrame">
            <div className="contentFrame">
                <div className="flexCol profileFrame">
                    <div className="profileTitle">회원정보</div>
                    <div className="flexCol profileContents">
                    <div className="flexCol inputFrame elementGap ">
                        <div className="inputTitle">닉네임</div>
                        <input className="border" onChange={(e)=>{setNickname(e.target.value)}} value={nickname} type="text"/>
                    </div>
                    <div className="flexCol inputFrame elementGap">
                        <div className="inputTitle">직무설정</div>
                            <select  value={major} onChange={(e)=>{setMajor(e.target.value)}} >
                                <option value={"선택"}>선택</option>
                                {majorList.map((major,i)=>{
                                return  (
                                        <option key={i} value={major}>{major}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <CommonButton title={"제출"} handler={registerHandler}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Register;