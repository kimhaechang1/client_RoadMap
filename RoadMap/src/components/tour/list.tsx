import CommonButton from '../common/button';
import Content from '../common/content';
import '../css/contents.css';

const TourList = () =>{
    return (
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame">
                <div className="contentsTitle">Tour</div>
                <div className="buttonFrame">
                    <CommonButton imgSrc={"/write.png"} title={"작성하기"}/>
                </div>
                <div className="contentsGroupFrame">
                    {Array.from({length:10}).map((_,i)=> <Content key={i}/> )}
                </div>
            </div>
        </div>
    )   
}
export default TourList;