import { useState,useEffect, useCallback, useRef } from 'react';
import { Comment } from '../../type';
import CommonButton from '../common/button';
import '../css/comment.css';
import { useMutation } from 'react-query';
import { QueryKeys, fetcher, getQueryClient } from '../../hooks/queryClient';
import { useParams, useNavigate, redirect } from 'react-router-dom';

const Comment = ({
    commentId,
    content,
    date,
    nickName,
} : Comment) =>{

    const input = useRef<HTMLInputElement>(null)

    const [comment, setComment] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {id} = useParams();

    
    
    useEffect(()=>{
        setComment(content);
        setIsEdit(false);

    },[])

    
    
    const putComment = useMutation({
        mutationFn : ()=>fetcher({
            method : 'PUT',
            path : `tour/${id}/comment/${commentId}`,
            body :{
                content : comment
            }
        }),
        onSuccess : ()=>{
            getQueryClient().invalidateQueries([QueryKeys.TOURS,id],{
                refetchInactive : true
            })
            setIsEdit(false)
            redirect(`/tour/${id}`)
        },
        onError : ()=>{
            alert("댓글 추가도중 에러가 발생하였습니다.");
        }
    })

    const deleteComment = useMutation({
        mutationFn : ()=>fetcher({
            method : 'DELETE',
            path : `tour/${id}/comment/${commentId}`
        }),
        onSuccess : ()=>{
            getQueryClient().invalidateQueries([QueryKeys.TOURS,id],{
                refetchInactive : true
            })
            redirect(`/tour/${id}`)
        },
        onError : ()=>{
          alert("댓글 삭제도중 에러가 발생하였습니다.");
        }
    })


    const onDeleteHandler = () =>{
        if(confirm("해당 댓글을 정말 삭제하시겠습니까?")){
            deleteComment.mutate();
        }
        
    }

    const onClickHandler = () =>{
        isEdit ? setIsEdit(false) : setIsEdit(true);
        input.current?.focus();
    }
    
    const onSubmitHandler = () =>{
        putComment.mutate();
    }

    return(
        <div className={`${isEdit ? "borderIntense" : "" } commentGroup`}>
            <div className="commentTitleGroup">
                <div className="commentTitleHead">
                    <img className="profileIcon" src="/profile.png"></img>
                    <div className="commentNick_day">{nickName}·{date}</div>
                </div>
                { isEdit ?
                    <div className="commentTitleTail">
                        <CommonButton title={"삭제"} handler={onDeleteHandler} style={"reject border"} />
                        <CommonButton title={"취소"} handler={onClickHandler} style={"reject border"} />
                        <CommonButton title={"확인"} handler={onSubmitHandler} style={"submit"} />
                    </div>
                    : 
                    <div className="commentTitleTail">
                        <CommonButton title={"삭제"} handler={onDeleteHandler} style={"reject border"} />
                        <CommonButton title={"수정"} handler={onClickHandler} style={"submit"} />
                    </div>
                }
                
            </div>
            
            <div className="commentContextGroup">
                { isEdit ? 
                    <input ref={input} value={comment} onChange={(e)=>{setComment(e.target.value)}}></input>
                    :
                    <div className="commentMain">{content}</div>
                }
            </div>
        </div>
    )
}

export default Comment;