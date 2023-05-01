import CommonButton from '../common/button';
import Content from '../common/content';
import '../css/contents.css';
import '../css/commonButton.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { Link } from 'react-router-dom';
import {  Tours,Tour } from '../../type';

const TourList = ( {tours} : {tours : Tours[]} ) =>{
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
                    {tours.map( tour => tour.map((item)=>{
                        return(
                            <Link to={`/tour/${item.roadmapId}`}><Content {...item} key={item.roadmapId}/></Link>
                        )  
                    }) )}
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