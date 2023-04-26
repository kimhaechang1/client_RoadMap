import CommonButton from '../common/button';
import Content from '../common/content';
import '../css/contents.css';
import '../css/commonButton.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { Link } from 'react-router-dom';

const TourList = () =>{
    const ref = useRef<HTMLDivElement>(null);
    const [fixedButton, setFixedButton] = useState<boolean>(false);

    useEffect(()=>{
        if(!ref.current) return;
        const observer = new IntersectionObserver((entries)=>{
            setFixedButton(!entries[0].isIntersecting);
        })
        observer.observe(ref.current);
        return ()=>{
            observer.disconnect();
        }
    },[])
    
    

    return (
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame">
                <div className="contentsTitle">Tour</div>
                <div className="buttonFrame" ref={ref}>
                    <Link to={"/tour/write"}>
                        <button className="commonButton">
                            <img className="writeIcon" src="/write.png"/>
                            작성하기
                        </button>
                    </Link>
                </div>
                <div className="contentsGroupFrame">
                    {Array.from({length:10}).map((_,i)=> <Link to={`/tour/${i+1}`}><Content key={i}/></Link> )}
                </div>
                {fixedButton ? 
                <Link to="/tour/write">
                    <button className="circleButton fixed rightSidefromScroll">
                        <img className="writeIcon" src="/write.png"/>
                    </button>
                </Link> : 
                null}
            </div>
        </div>
    )   
}
export default TourList;