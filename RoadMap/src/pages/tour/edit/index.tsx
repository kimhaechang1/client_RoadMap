import { useEffect, useState } from "react";
import { Info, TourDetail } from "../../../type";
import CommonButton from "../../../components/common/button";
import '../../css/write.css';
import Tag from "../../../components/tour/tag";
import RoadElement from "../../../components/tour/editableRoad";

const TourEditPage = () =>{

    const [elemTitle, setElemTitle] = useState<string>("");
    const [tagList, setTagList] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<Info[]>();
    const [content, setContent] = useState<string>("");
    
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

    return (
        <div className="writeFrame flexCol">
            <div className="flexCol elemGap">
                <div className="elemTitle">제목</div>
                <input value={elemTitle} onChange={(e)=>{onElemTitleChangeHandler(e)}} type="text" className="border" placeholder="제목을 입력해주세요"></input>
            </div>
            <div className="flexCol elemGap">
                <div className="flexCol elemGap">
                    <div className="elemTitle">로드맵</div>
                    {!roadmap ? 
                    <RoadElement index={0}/> 
                    : 
                    roadmap.map((_,i)=>{
                        return(
                            <RoadElement key={i} index={i}/>
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
                    <CommonButton title={"등록"} style={"submit"}/>
                </div>
            </div>
        </div>
    )
}
export default TourEditPage;