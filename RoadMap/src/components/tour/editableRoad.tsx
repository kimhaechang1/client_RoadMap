import { Info } from "../../type";
import ImageButton from "../common/ImageButton"
import '../css/editableRoad.css';

const RoadElement = ({index, data, allRoadmap, setRoadmap} :
    {index:number, data : Info, allRoadmap : Info[], setRoadmap:React.Dispatch<React.SetStateAction<Info[]>>}) => {

    const onInsertHandler = () =>{
        const cp = [...allRoadmap];
        console.log(index);
        cp.splice(index+1,0,{
            title: '',
            date : '',
            content : ''
        })
        console.log(cp);
        setRoadmap(cp);
        
    }

    const onDeleteHandler = () =>{
        const cp = [...allRoadmap];
        console.log(index);
        cp.splice(index, 1);
        setRoadmap(cp);
    }
    const onContentChangeHandler = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const cp = [...allRoadmap];
        cp[index].content = e.target.value;
        setRoadmap(cp);
    }   
    const onTimeLineChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const cp = [...allRoadmap];
        cp[index].date = e.target.value;
        setRoadmap(cp);
    }
    return (
        <div className="roadContentFrame writerGap">
            <div className="flexCol leftWidth elemGap">
                <input value={data.date} onChange={(e)=>{onTimeLineChangeHandler(e)}} className="border" type="text" placeholder="시점을 입력해주세요"></input>
                <div className="bookWriter flexCol">
                    <img src="/book.png"></img>
                    <div className="bookWriterCtx flexCol">
                        <div>아이콘을 클릭해</div>
                        <div>책 정보를 불러와주세요</div>
                    </div>
                </div>
            </div>
            <textarea value={data.content} onChange={(e)=>{onContentChangeHandler(e)}} className="roadMapContextWriter border" placeholder="로드맵에 대해 간략하게 적어주세요"></textarea>
            <div className="roadButtonFrame flexCol">
                {index >= 1 ? 
                <div className="flexRow">
                    <ImageButton handler={onDeleteHandler} imgSrc={"/gob.png"} style={"left deleteRightBorder"}/>
                    <ImageButton handler={onInsertHandler}imgSrc={"/plus.png"} style={"right"}/>
                </div>
                :
                <ImageButton handler={onInsertHandler} imgSrc={"/plus.png"} /> 
                }
            </div>
        </div>
    )
}
export default RoadElement;