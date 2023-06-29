import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, PostInfo, Return, TourDetail, TagType } from "../../../type";
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

    const postInfo = useMutation<any,any,string,any>({
        mutationFn : (id : string)=>{
            let postData : PostInfo[] = [];
            let cp = [...roadmap];
            cp.map((data)=>{
                let newDate = data.date.replaceAll("-","/");
                postData.push({
                    date : newDate,
                    title : data.title,
                    content : data.content
                })
            })
            
            return fetcher({
                method : 'POST',
                path : `tour/${id}/info`,
                body : postData
            })
        },
        onSuccess : (data, variable, ctx)=>{
            
        },
        onError : (error, variable) =>{
            
            alert("오류로 인해 로드맵 데이터가 저장되지 못했습니다.")
        }
    })

    const postTag = useMutation<any,any,string,any>({
        mutationFn : (id : string) =>{
            let tags : TagType[] = tagList.map((tag)=>{
                return {
                    tag
                }
            });
            return fetcher({
                method : 'POST',
                path : `tour/${id}/tag`,
                body : tags
            })
        },
        onSuccess : (_data, _variable, _ctx)=>{
           
        },
        onError : (_error) =>{
            alert("오류로 인해 태그 데이터가 저장되지 못했습니다.")
        }
    })

    const post = useMutation(
        ()=> fetcher({
                method : 'POST',
                path : 'tour/write',
                body : {
                    title : elemTitle,
                    content : content
                }
        }),
        {

        onSuccess : (data)=>{
            if(!data){
                return;
            }
            
            let promiseList = [postTag, postInfo];
            let requests : Promise<any>[]  = promiseList.map(post=>
                post.mutateAsync(data)
            )
            
            
            Promise.all(requests)
            .then(()=>{
                getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                    exact : false,
                    refetchInactive : true
                })
                navigate("/tour")
                
            })
            .catch((error)=>{
                throw error;
            })
            
        },
        onError : ()=>{
            alert("서버 오류로 인해 본문 내용이 저장되지 못했습니다.")
            }
        }
    )
    
    
    const onElemTitleChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const element = e.target as HTMLInputElement;
        setElemTitle(element.value)
    }


    const ontagInputKeyUpHandler = (e : React.KeyboardEvent<HTMLInputElement>)=>{
        const element = e.target as HTMLInputElement;
        if(e.code==="Enter"){
            const copy = [...tagList];
            const data = element.value;
            if(!copy.includes(data) && data){
                element.value = "";
                copy.push(data);
                setTagList(copy);
                console.log([...tagList]);
            } 
        }
    }

    const onContentChangeHandler = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const element = e.target as HTMLTextAreaElement;
        setContent(element.value);
    }

    const onInitHandler = () =>{
        const cp = [...roadmap];
        cp.push({title:'',date: '', content : ''})
        setRoadmap(cp);
    }

    const onSubmitHandler = () =>{
        post.mutate();
    }

    return (
        <div className="writeFrame flexCol">
            <div className="flexCol elemGap">
                <div className="elemTitle">제목</div>
                <input value={elemTitle} onChange={(e)=>{onElemTitleChangeHandler(e)}} type="text" className="border" placeholder="제목을 입력해주세요" required></input>
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
                                <Tag key={i} tagName={tagName} index={i} tagList={tagList} setTagList={setTagList}></Tag>
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
                    <CommonButton handler={onSubmitHandler} title={"TEST"} style={"submit"}/>
                </div>
            </div>
        </div>
    )
}
export default TourWritePage;