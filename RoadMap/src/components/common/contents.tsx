import Content from "./content";
import '../css/contents.css';

const Contents = ({ title } : { title : string }) =>{
    return(
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame">
                <div className="contentsTitle">{title}</div>
                <div className="contentsGroupFrame">
                    {Array.from({length:5}).map((_,i)=> <Content key={i}/> )}
                </div>
            </div>
        </div>
    )
}

export default Contents;