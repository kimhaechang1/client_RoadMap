import '../../css/act.css';

const ActPage = () =>{
    return(
        <div className="flexCol actFrame">
            <div className="actTitle">활동내역</div>
            <div className="flexCol contents">
                {Array.from({length:5}).map((_,i)=>{
                    return(
                    <div className="actContent">
                        <div className="actContentTitle">글제목</div>
                        <div className="actView_comment">
                            <img className="actContextIcon eye" src="/eye.png"></img>
                            <div className="eye">0</div>
                            <img className="actContextIcon" src="/comment.png"></img>
                            <div>0</div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ActPage;