import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CommonButton from '../../../components/common/button';
import Comment from '../../../components/tour/comment';
import '../../css/tour[id].css';
import '../../../components/css/commonButton.css';
import RoadElement from '../../../components/tour/editableRoad';
import Tag from '../../../components/tour/tag';
import Road from '../../../components/tour/road';
import { useQuery } from 'react-query';
import { QueryKeys, fetcher } from '../../../hooks/queryClient';
import { TourDetail } from '../../../type';


const TourItemPage = () =>{
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!id?.match(/[0-9]/g)){
            navigate('/404');
        }
    },[id])

    const {data, isSuccess, isLoading}= useQuery<TourDetail>([QueryKeys.TOURS, id]
        ,()=> fetcher({
            method : 'GET',
            path : `article/${id}`
        }))
    if(isSuccess){
        console.log(data)
    }
    if(isLoading || !data){
        return (
            <div>...Loading</div>
        )
    }
    return (
        <div className="contentViewFrame">
            <div className="contentViewTitleGroup">
                <div className="titleNickAndDay">
                    <img className="tourViewProfileIcon" src="/profile.png"></img>
                    <div className="flexRow tourViewNick_day_buttons ">
                        <div className="tourViewNick_day">{data.nickName}·{data.date}</div>
                        <div className="tourViewButtonFrame flexRow writerGap">
                            <CommonButton title={"삭제"} style={"reject border"} />
                            <CommonButton title={"수정"} style={"submit"} />
                        </div>
                    </div>
                </div>
                <div className="titleAndViews">
                    <div className="tourViewTitle">{data.title}</div>
                    <div className="viewPoint">
                        <img className="viewIcon" src="/eye.png"></img>
                        <div>{data.view}</div>
                    </div>

                </div>

            </div>
             <div className="contentViewMain">
                <div className="tourViewFrame flexCol">
                    <div className="flexCol elemGap">
                        {data.infos.length > 0 ? <div className="flexCol elemGap">
                            {data.infos.map((info,i) => {
                                return (
                                    <Road key={i} {...info} />
                                )
                            })}
                        </div>:null}
                        {data.content ?
                        <div className="flexCol elemGap">
                            <div className="viewAddtionalCtx border">{data.content}</div>
                        </div> : null}
                    </div>
                </div>
            </div>
            { data.tags.length > 0 ? <div className="flexCol elemGap">
                <div className="tagFrame flexRow writerGap">
                    {data.tags.map((tagName, i) => {
                        return (
                            <Tag key={i} tagName={tagName} isDel={false}></Tag>
                        )
                    })}
                </div>
            </div> : null}
            <div className="contentViewCommentFrame">
                <div className="contentViewComment">
                    <div id="comment_write" className="contentViewCommentNumber">{data.comments.length}개의 댓글</div>
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
                {data.comments.length > 0 ? <div className="contentViewCommentMain">
                    {data.comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                <Comment {...comment} key={comment.commentId}/>
                            </div>
                        )
                    })}
                </div> : null}
                <a href="#header" className="circleButton goTop rightSidefromScroll">
                    Up
                </a>
            </div>
        </div>
    )
}

export default TourItemPage;