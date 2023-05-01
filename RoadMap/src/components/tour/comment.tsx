import { Comment } from '../../type';
import '../css/comment.css';

const Comment = ({
    content,
    date,
    nickName,
} : Comment) =>{
    return(
        <div className="commentGroup">
            <div className="commentTitleGroup">
                <img className="profileIcon" src="/profile.png"></img>
                <div className="commentNick_day">{nickName}·{date}</div>
            </div>
            
            <div className="commentContextGroup">
                <div className="commentMain">{content}</div>
            </div>
        </div>
    )
}

export default Comment;