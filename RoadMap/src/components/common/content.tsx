import '../css/content.css';

const Content = () =>{
    return(
        <div className="contentGroup">
            <div className="contentTitleGroup">
                <img className="profileIcon" src="./profile.png"></img>
                <div className="nick_day">닉네임·작성날짜</div>
            </div>
            
            <div className="contentContextGroup">
                <div className="title">글제목</div>
                <div className="view_comment">
                    <img className="contextIcon" src="./eye.png"></img>
                    <div>0</div>
                    <img className="contextIcon" src="./comment.png"></img>
                    <div>0</div>
                </div>
            </div>
        </div>
    )
}

export default Content;