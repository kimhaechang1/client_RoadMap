import '../css/comment.css';

const Comment = () =>{
    return(
        <div className="commentGroup">
            <div className="commentTitleGroup">
                <img className="profileIcon" src="/profile.png"></img>
                <div>닉네임·작성날짜</div>
            </div>
            
            <div className="commentContextGroup">
                <div className="commentMain">댓글 내용</div>
            </div>
        </div>
    )
}

export default Comment;