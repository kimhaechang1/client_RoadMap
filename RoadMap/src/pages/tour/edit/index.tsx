import { useEffect, useState } from "react";
import { Info, ReturnMsg, TourDetail } from "../../../type";
import CommonButton from "../../../components/common/button";
import '../../css/write.css';
import Tag from "../../../components/tour/tag";
import RoadElement from "../../../components/tour/editableRoad";
import ImageButton from "../../../components/common/ImageButton";
import { useMutation, useQuery } from "react-query";
import { QueryKeys, fetcher, getQueryClient } from "../../../hooks/queryClient";
import { useParams, useNavigate } from "react-router-dom";

const TourEditPage = () =>{
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [elemTitle, setElemTitle] = useState<string>("");
    const [tagList, setTagList] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<Info[]>([]);
    const [content, setContent] = useState<string>("");

    useEffect(()=>{
        if(!id?.match(/[0-9]/g)){
            navigate('/404');
        }
    },[id])

    const {data}= useQuery<TourDetail>([QueryKeys.TOURS, id], ()=>fetcher({
        method: 'GET',
        path:`tour/${id}`,
    }))

    const editQuery = useMutation<ReturnMsg>(()=>fetcher({
        method:'PUT',
        path : `tour/edit/${id}`,
        body : {
            title : elemTitle,
            infos : roadmap,
            tags : tagList,
            content : content
        }
    }),{
        onSuccess: ()=>{
            if(editQuery.data?.success){
                getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                    exact : false,
                    refetchInactive : true
                })
                navigate(`/tour/${editQuery.data.id}`)
                
                
            }else{
                alert(editQuery.data?.msg);
                getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                    exact : false,
                    refetchInactive : true
                })
            }
        }
    })

    useEffect(()=>{
        if(!data) return;
        setElemTitle(data?.title);
        setTagList(data?.tags);
        setRoadmap(data?.infos);
        setContent(data?.content);
    },[data])

    
    const onInitHandler = () =>{
        const cp = [...roadmap];
        cp.push({title:'',date:'',content : ''})
        setRoadmap(cp);
    }

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

    const onSubmitHandler = () =>{
        editQuery.mutate();
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
                    {!roadmap || roadmap.length === 0 ? 
                    <ImageButton handler={onInitHandler} imgSrc={"/plus.png"}/> 
                    : 
                    roadmap?.map((data,i)=>{
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
export default TourEditPage;