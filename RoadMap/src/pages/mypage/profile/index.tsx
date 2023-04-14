import '../../css/profile.css';

const ProfilePage = () =>{
    return(
        <div className="flexCol profileFrame">
            <div className="profileTitle">회원정보</div>
            <div className="flexCol profileContents">
                <div className="flexCol inputFrame elementGap ">
                    <div className="inputTitle">닉네임</div>
                    <input className="border" type="text"/>
                </div>
                <div className="flexCol inputFrame elementGap">
                    <div className="inputTitle">직무설정</div>
                    <input className="border" type="text"/>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;