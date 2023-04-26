import ImageButton from "../common/ImageButton"
import '../css/editableRoad.css';

const RoadElement = ({index} : {index:number}) => {
    return (
        <div className="roadContentFrame writerGap">
            <div className="flexCol leftWidth elemGap">
                <input className="border" type="text" placeholder="시점을 입력해주세요"></input>
                <div className="bookWriter flexCol">
                    <img src="/book.png"></img>
                    <div className="bookWriterCtx flexCol">
                        <div>아이콘을 클릭해</div>
                        <div>책 정보를 불러와주세요</div>
                    </div>
                </div>
            </div>
            <textarea className="roadMapContextWriter border" placeholder="로드맵에 대해 간략하게 적어주세요"></textarea>
            <div className="roadButtonFrame flexCol">
                {index >= 1 ? 
                <div className="flexRow">
                    <ImageButton imgSrc={"/gob.png"} style={"left deleteRightBorder"}/>
                    <ImageButton imgSrc={"/plus.png"} style={"right"}/>
                </div>
                :
                <ImageButton imgSrc={"/plus.png"} /> 
                }
            </div>
        </div>
    )
}
export default RoadElement;