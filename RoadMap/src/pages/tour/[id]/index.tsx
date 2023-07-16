import {useParams, useNavigate, Link, redirect} from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonButton from '../../../components/common/button';
import Comment from '../../../components/tour/comment';
import '../../css/tour[id].css';
import '../../../components/css/commonButton.css';
import RoadElement from '../../../components/tour/editableRoad';
import Tag from '../../../components/tour/tag';
import Road from '../../../components/tour/road';
import { useMutation, useQuery } from 'react-query';
import { QueryKeys, fetcher, getQueryClient } from '../../../hooks/queryClient';
import { CommentDatas, TourDetail } from '../../../type';
import { CurrentUserAuthContext } from '../../CurrentUserAuthContext';
import { useIsLogin } from '../../../hooks/useIsLogin';


const TourItemPage = () =>{
   
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(CurrentUserAuthContext);
    const [loginUserId , setLoginUserId] = useState<string>("");

    useEffect(()=>{
        if(!id?.match(/[0-9]/g)){
            navigate('/404');
        }
    },[id])

    useEffect(()=>{
        const cookieData = document.cookie;
        setLoginUserId(cookieData.split("=")[1]);
    },[])

    const [commentData, setCommentData] = useState<string>("");

    
    const postComment = useMutation({
        mutationFn : ()=>fetcher({
            method : 'POST',
            path : `tour/${id}/comment`,
            body : {
                content : commentData
            },
            auth : context?.auth 
        }),
        onSuccess : (data,variable,context) =>{
            setCommentData("");
        },
        onError : ()=>{
            alert('에러가 발생하여 댓글이 저장되지 못했습니다.')
        }

    })

    const deleteQuery = useMutation(()=>fetcher({
        method : 'DELETE',
        path : `tour/${id}`,
        auth : context?.auth
    }),{
        onSuccess : ()=>{
            getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                refetchInactive : true
            })
            navigate(`/tour`)   
        },
        onError : ()=>{
            alert('삭제도중 에러가 발생하였습니다.')
        }
    })
    const {data, isLoading}= useQuery<TourDetail>({
        queryKey : [QueryKeys.TOURS, id],
        queryFn :()=> fetcher({
            method : 'GET',
            path : `tour/${id}`
        }),
        onError : ()=>{
            alert('글을 불러오는 도중 에러가 발생하였습니다.')
            
            navigate('/tour');
        },
        onSuccess : ()=>{
            console.log(loginUserId);
        }
    })
    if(!data || isLoading){
        return <div>...Loading</div>
    }
    const onDeleteHandler = () =>{
        if(confirm("해당글을 삭제하시겠습니까?")){
            deleteQuery.mutate();
        }
        
    }
    const onCommentSubmitHandler = () =>{
        if(commentData.length > 0){
            postComment.mutate()
        }
        
    }

    return (
        <div className="contentViewFrame">
            <div className="contentViewTitleGroup">
                <div className="titleNickAndDay">
                    <img className="tourViewProfileIcon" src="/profile.png"></img>
                    <div className="flexRow tourViewNick_day_buttons ">
                        <div className="tourViewNick_day">{data.nickName}·{data.date}</div>
                        <div className="tourViewButtonFrame flexRow writerGap">
                            {
                            loginUserId == data.userId ?
                            <>
                            <CommonButton handler={onDeleteHandler} title={"삭제"} style={"reject border"} />
                            <Link to={`/tour/edit/${id}`}><CommonButton title={"수정"} style={"submit"} /></Link>
                            </>
                            :
                            ""
                            }
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
                    { data.tags.map((tagName, i) => {
                        return (
                            <Tag key={i} tagName={tagName.tag} isDel={false} index={i}></Tag>
                        )
                    })}
                </div>
            </div> : null}
            
            <div className="contentViewCommentFrame">
            { loginUserId ?
                <div className="contentViewComment">
                    <div id="comment_write" className="contentViewCommentNumber">{data.comments.length}개의 댓글</div>
                    <div className="contentViewCommentWrite">
                        <form className="commentWriteArea">
                            <div className="contentViewCommentWriteMain">
                                <img className="profileIcon" src="/profile.png"></img>
                                <textarea value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} required></textarea>
                            </div>
                            <div className="buttonFrame">
                                <CommonButton imgSrc={"/write.png"} title={"작성하기"} handler={onCommentSubmitHandler} />
                            </div>
                        </form>
                    </div>
                </div> 
                : ""}
                {data.comments.length > 0 ? <div className="contentViewCommentMain">
                    {data.comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                <Comment commentId={comment.commentId} content={comment.content} date={comment.date} nickName={comment.nickName} isMyComment={comment.userId==loginUserId} key={comment.commentId} />
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