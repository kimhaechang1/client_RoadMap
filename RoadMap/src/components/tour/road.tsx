import ImageButton from "../common/ImageButton";
import '../css/road.css';

const Road = ({index} : {index:number}) =>{
    return (
        <div className="roadContentFrame writerGap">
            <div className="flexCol leftWidth elemGap">
                <div className="roadContentTimeline border">시점 #{index}</div>
                <div className="bookFrame flexCol">
                    <div className="book flexCol">
                        <img src="http://via.placeholder.com/140x220"></img>
                        <div>책 제목</div>
                    </div>
                </div>
            </div>
            <div className="roadContext border">로드맵 내용은 다음과 같습니다 #{index}</div>
        </div>
    )
}
export default Road;