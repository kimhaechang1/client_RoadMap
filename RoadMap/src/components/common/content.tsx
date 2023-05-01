import '../css/content.css';
import { Tour } from '../../type';
const Content = ({ 
    roadmapId ,
    nickName ,
    date ,
    view,
    title ,
    commentCount
} : Tour) =>{
    return(
        <div className="contentGroup">
            <div className="contentTitleGroup">
                <img className="profileIcon" src="./profile.png"></img>
                <div className="nick_day">{nickName}·{date}</div>
            </div>
            
            <div className="contentContextGroup">
                <div className="title">{title}</div>
                <div className="view_comment">
                    <img className="contextIcon eye" src="./eye.png"></img>
                    <div className="eye">{view}</div>
                    <img className="contextIcon comment" src="./comment.png"></img>
                    <div className="comment">{commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default Content;