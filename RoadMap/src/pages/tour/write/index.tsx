import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, ReturnMsg, TourDetail } from "../../../type";
import CommonButton from "../../../components/common/button";
import '../../css/write.css';
import Tag from "../../../components/tour/tag";
import RoadElement from "../../../components/tour/editableRoad";
import ImageButton from "../../../components/common/ImageButton";
import { QueryKey, useMutation } from "react-query";
import { QueryKeys, fetcher } from "../../../hooks/queryClient";
import { getQueryClient } from "../../../hooks/queryClient";
const TourWritePage = () =>{

    const navigate = useNavigate();

    const [roadmapId, setRoadmapId] = useState<string | undefined>("");
    const [elemTitle, setElemTitle] = useState<string>("");
    const [tagList, setTagList] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<Info[]>([]);
    const [content, setContent] = useState<string>("");

    const postInfo = useMutation({
        mutationFn : (id : string)=>{
            return fetcher({
                method : 'POST',
                path : `tour/${id}/info`,
                body : {
                    infos : roadmap
                }
            })
        },
        onSuccess : (data, variable, ctx)=>{
            console.log(data);
        },
        onError : (error, variable) =>{
            alert("서버 오류로 인해 로드맵 데이터가 저장되지 못했습니다.")
        }
    })

    const postTag = useMutation({
        mutationFn : (id : string) =>{
            return fetcher({
                method : 'POST',
                path : `tour/${id}/tag`,
                body : {
                    tags : tagList
                }
            })
        },
        onSuccess : (data, variable, ctx)=>{
            console.log(data);
        },
        onError : (error) =>{
            alert("서버 오류로 인해 태그 데이터가 저장되지 못했습니다.")
        }
    })

    const post = useMutation({
        mutationFn : (id)=>{
            return fetcher({
                method : 'POST',
                path : 'tour/write',
                body : {
                    title : elemTitle,
                    content : content
                }
            })
        },
        onSuccess : (data, variable, ctx)=>{
            if(!data.id){
                return data;
            }
            let promiseList = [];
            promiseList.push(postTag.mutateAsync(data.id))
            promiseList.push(postInfo.mutateAsync(data.id))
            
            Promise.all(promiseList)
            .then((values)=>{
                values.map(value =>{
                    if(!value.success){
                        alert(value.msg);
                        return;
                    }
                })
                getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                    exact : false,
                    refetchInactive : true
                })
            }).catch((error)=>{
                throw error;
            })
            
        },
        onError : (error)=>{
            alert("서버 오류로 인해 본문 내용이 저장되지 못했습니다.")
        }
    })
    
    
    const onElemTitleChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const element = e.target as HTMLInputElement;
        setElemTitle(element.value)
    }


    const ontagInputKeyUpHandler = (e : React.KeyboardEvent<HTMLInputElement>)=>{
        const element = e.target as HTMLInputElement;
        if(e.code==="Enter"){
            const copy = [...tagList];
            if(!copy.includes(element.value)){
                copy.push(element.value);
                setTagList(copy);
            } 
        }
    }

    const onContentChangeHandler = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const element = e.target as HTMLTextAreaElement;
        setContent(element.value);
    }

    const onInitHandler = () =>{
        const cp = [...roadmap];
        cp.push({title:'',date:'',content : ''})
        setRoadmap(cp);
    }

    const onSubmitHandler = () =>{
        post.mutate();
    }

    return (
        <div className="writeFrame flexCol">
            <div className="flexCol elemGap">
                <div className="elemTitle">제목</div>
                <input value={elemTitle} onChange={(e)=>{onElemTitleChangeHandler(e)}} type="text" className="border" placeholder="제목을 입력해주세요"></input>
            </div>
            <div className="flexCol elemGap">
                <div className="flexCol elemGap">
                    <div className="elemTitle">로드맵</div>
                    {roadmap.length === 0 ? 
                    <ImageButton handler={onInitHandler} imgSrc={"/plus.png"}/> 
                    : 
                    roadmap.map((data,i)=>{
                        return(
                            <RoadElement allRoadmap={roadmap} setRoadmap={setRoadmap} data={data} key={i} index={i}/>
                        )
                    })}
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">태그</div>
                    <div className="tagFrame flexRow writerGap">
                        {tagList.map((tagName,i)=>{
                            return (
                                <Tag key={i} tagName={tagName}></Tag>
                            )
                        })}
                    </div>
                    <input type="text" onKeyUp={(e)=>{ontagInputKeyUpHandler(e)}} className="tagInput border" placeholder="태그를 입력 해주세요"></input>
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">본문</div>
                    <textarea value={content} onChange={(e)=>{onContentChangeHandler(e)}} className="addtionalCtx border" placeholder="내용을 입력해주세요"></textarea>
                </div>
                <div className="writeButtonFrame flexRow writerGap">
                    <CommonButton title={"취소"} style={"reject border"}/>
                    <CommonButton handler={onSubmitHandler} title={"등록"} style={"submit"}/>
                </div>
            </div>
        </div>
    )
}
export default TourWritePage;