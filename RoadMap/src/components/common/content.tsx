import '../css/content.css';

const Content = () =>{
    return(
        <div className="contentGroup">
            <div className="contentTitleGroup">
                <img className="profileIcon" src="./profile.png"></img>
                <div className="nick_day">닉네임·작성날짜</div>
            </div>
            
            <div className="contentContextGroup">
                <div className="title">제목이최대몇자까지일까라고생각할때면누군가가나에게말했지</div>
                <div className="view_comment">
                    <img className="contextIcon eye" src="./eye.png"></img>
                    <div className="eye">0</div>
                    <img className="contextIcon comment" src="./comment.png"></img>
                    <div className="comment">0</div>
                </div>
            </div>
        </div>
    )
}

export default Content;