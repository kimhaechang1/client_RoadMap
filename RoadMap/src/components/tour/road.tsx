import { Info } from "../../type";
import ImageButton from "../common/ImageButton";
import '../css/road.css';

const Road = ({
    content,
    title,
    date
} : Info) =>{
    return (
        <div className="roadContentFrame writerGap">
            <div className="flexCol leftWidth elemGap">
                <div className="roadContentTimeline border">{date}</div>
                <div className="bookFrame flexCol">
                    <div className="book flexCol">
                        <img src="http://via.placeholder.com/140x220"></img>
                        <div>책 제목</div>
                    </div>
                </div>
            </div>
            <div className="roadContext border">{content}</div>
        </div>
    )
}
export default Road;