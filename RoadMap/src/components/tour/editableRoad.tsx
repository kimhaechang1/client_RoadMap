import { Info } from "../../type";
import ImageButton from "../common/ImageButton"
import '../css/editableRoad.css';

const RoadElement = ({index, data, allRoadmap, setRoadmap} :
    {index:number, data : Info, allRoadmap : Info[], setRoadmap:React.Dispatch<React.SetStateAction<Info[]>>}) => {

    const onInsertHandler = () =>{
        const cp = [...allRoadmap];
        console.log(index);
        cp.splice(index+1,0,{
            date : '',
            title: '',
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
    const onDateChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const cp = [...allRoadmap];
        cp[index].date = e.target.value;
        setRoadmap(cp);
    }
    // const onYearChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    //     const cp = [...allRoadmap];
    //     cp[index].date.year = (e.target.value)
    //     setRoadmap(cp);
    // }
    // const onMonthChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    //     const cp = [...allRoadmap];
    //     cp[index].date.month = (e.target.value)
    //     setRoadmap(cp);
    // }
    // const onDayChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    //     const cp = [...allRoadmap];
    //     cp[index].date.day = (e.target.value)
    //     setRoadmap(cp);
    // }
    return (
        <div className="roadContentFrame writerGap">
            <div className="flexCol leftWidth elemGap">
                <div className="flexRow" style={{gap : "10px"}}>
                    <input type ="date" className="dateInput" data-placeholder="해당 로드맵 시작날짜" aria-required="true" value={data.date} onChange={(e)=>{onDateChangeHandler(e)}} required/>
                    {/* <input type="text" value={data.date.year} onChange={(e)=>{onYearChangeHandler(e)}} className="border" placeholder="년도 ex) 2023"></input>
                    <input type="text" value={data.date.month} onChange={(e)=>{onMonthChangeHandler(e)}} className="border" placeholder="월 ex) 00"></input>
                    <input type="text" value={data.date.day} onChange={(e)=>{onDayChangeHandler(e)}} className="border" placeholder="일 ex) 00"></input> */}
                </div>
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
                <div className="flexRow">
                    <ImageButton handler={onDeleteHandler} imgSrc={"/gob.png"} style={"left deleteRightBorder"}/>
                    <ImageButton handler={onInsertHandler}imgSrc={"/plus.png"} style={"right"}/>
                </div>
            </div>
        </div>
    )
}
export default RoadElement;