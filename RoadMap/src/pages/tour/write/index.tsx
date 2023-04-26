import CommonButton from "../../../components/common/button";
import '../../css/write.css';
import Tag from "../../../components/tour/tag";
import RoadElement from "../../../components/tour/editableRoad";

const TourWritePage = () =>{
    return (
        <div className="writeFrame flexCol">
            <div className="flexCol elemGap">
                <div className="elemTitle">제목</div>
                <input type="text" className="border" placeholder="제목을 입력해주세요"></input>
            </div>
            <div className="flexCol elemGap">
                <div className="flexCol elemGap">
                    <div className="elemTitle">로드맵</div>
                    {Array.from({length:2}).map((_,i)=>{
                        return(
                            <RoadElement key={i} index={i}/>
                        )
                    })}
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">태그</div>
                    <div className="tagFrame flexRow writerGap">
                        {['태그1','태그2','태태그1','프론트엔드 개발자'].map((tagName,i)=>{
                            return (
                                <Tag key={i} tagName={tagName}></Tag>
                            )
                        })}
                    </div>
                    <input type="text" className="tagInput border" placeholder="태그를 입력 해주세요"></input>
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">본문</div>
                    <textarea className="addtionalCtx border" placeholder="내용을 입력해주세요"></textarea>
                </div>
                <div className="writeButtonFrame flexRow writerGap">
                    <CommonButton title={"취소"} style={"reject border"}/>
                    <CommonButton title={"등록"} style={"submit"}/>
                </div>
            </div>
        </div>
    )
}
export default TourWritePage;