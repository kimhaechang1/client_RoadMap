import '../../css/act.css';

const ActPage = () =>{
    return(
        <div className="flexCol actFrame">
            <div className="actTitle">활동내역</div>
            <div className="flexCol contents">
                {Array.from({length:5}).map((_,i)=>{
                    return(
                    <div className="actContent">
                        <div className="title">글제목</div>
                        <div className="view_comment">
                            <img className="contextIcon" src="/eye.png"></img>
                            <div>0</div>
                            <img className="contextIcon" src="/comment.png"></img>
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