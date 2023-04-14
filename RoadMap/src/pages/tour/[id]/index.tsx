import {useParams, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import CommonButton from '../../../components/common/button';
import Comment from '../../../components/tour/comment';
import '../../css/tour[id].css';
import profile from '../../../../public/profile.png';

const TourItemPage = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!id?.match(/[0-9]/g)){
            navigate('/404');
        }
    },[id])

    return (
        <div className="contentViewFrame">
            <div className="contentViewTitleGroup">
                <div className="titleNickAndDay">
                    <img className="profileIcon" src="/profile.png"></img>
                    <div className="nick_day">닉네임·작성날짜</div>                    
                </div>
                <div className="titleAndViews">
                    <div>글 제목</div>
                    <div className="viewPoint">
                        <img className="viewIcon" src="/eye.png"></img>
                        <div>0</div>
                    </div>
                    
                </div>

            </div>
            <div className="contentViewMain">
                본문 내용
            </div>
            <div className="contentViewCommentFrame">
                <div className="contentViewComment">
                    <div className="contentViewCommentNumber">N개의 댓글</div>
                    <div className="contentViewCommentWrite">
                        <div className="contentViewCommentWriteMain">
                            <img className="profileIcon" src="/profile.png"></img>
                            <textarea></textarea>
                        </div>
                        <div className="buttonFrame">
                            <CommonButton imgSrc={"/write.png"} title={"작성하기"}/>
                        </div>
                    </div>
                </div>
                <div className="contentViewCommentMain">
                    {Array.from({length:3}).map((_,i)=>{
                        return (
                            <div key={i}>
                                <Comment/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TourItemPage;