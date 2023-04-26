import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CommonButton from '../../../components/common/button';
import Comment from '../../../components/tour/comment';
import '../../css/tour[id].css';
import '../../../components/css/commonButton.css';
import RoadElement from '../../../components/tour/editableRoad';
import Tag from '../../../components/tour/tag';
import Road from '../../../components/tour/road';


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
                    <img className="tourViewProfileIcon" src="/profile.png"></img>
                    <div className="flexRow tourViewNick_day_buttons ">
                        <div className="tourViewNick_day">닉네임·작성날짜</div>
                        <div className="tourViewButtonFrame flexRow writerGap">
                            <CommonButton title={"삭제"} style={"reject border"} />
                            <CommonButton title={"수정"} style={"submit"} />
                        </div>
                    </div>
                </div>
                <div className="titleAndViews">
                    <div className="tourViewTitle">글 제목</div>
                    <div className="viewPoint">
                        <img className="viewIcon" src="/eye.png"></img>
                        <div>0</div>
                    </div>

                </div>

            </div>
            <div className="contentViewMain">
                <div className="tourViewFrame flexCol">
                    <div className="flexCol elemGap">
                        <div className="flexCol elemGap">
                            {Array.from({ length: 2 }).map((_, i) => {
                                return (
                                    <Road key={i} index={i} />
                                )
                            })}
                        </div>
                        <div className="flexCol elemGap">
                            <div className="viewAddtionalCtx border">추가적인 글내용 {id}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flexCol elemGap">
                <div className="tagFrame flexRow writerGap">
                    {['태그1', '태그2', '태태그1', '프론트엔드 개발자'].map((tagName, i) => {
                        return (
                            <Tag key={i} tagName={tagName} isDel={false}></Tag>
                        )
                    })}
                </div>
            </div>
            <div className="contentViewCommentFrame">
                <div className="contentViewComment">
                    <div id="comment_write" className="contentViewCommentNumber">N개의 댓글</div>
                    <div className="contentViewCommentWrite">
                        <div className="contentViewCommentWriteMain">
                            <img className="profileIcon" src="/profile.png"></img>
                            <textarea></textarea>
                        </div>
                        <div className="buttonFrame">
                            <CommonButton imgSrc={"/write.png"} title={"작성하기"} />
                        </div>
                    </div>
                </div>
                <div className="contentViewCommentMain">
                    {Array.from({ length: 10 }).map((_, i) => {
                        return (
                            <div key={i}>
                                <Comment />
                            </div>
                        )
                    })}
                </div>
                <a href="#header" className="circleButton goTop rightSidefromScroll">
                    Up
                </a>
            </div>
        </div>
    )
}

export default TourItemPage;