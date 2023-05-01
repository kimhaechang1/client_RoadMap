import Content from "./content";
import '../css/contents.css';
import { Tours } from "../../type";
import { Link } from "react-router-dom";

const Contents = ({ title, contents } : { title : string, contents : Tours }) =>{
    return(
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame">
                <div className="contentsTitle">{title}</div>
                <div className="contentsGroupFrame">
                    {contents.map((content)=> <Link to={`/tour/${content.roadmapId}`}><Content {...content} key={content.roadmapId}/></Link> )}
                </div>
            </div>
        </div>
    )
}

export default Contents;