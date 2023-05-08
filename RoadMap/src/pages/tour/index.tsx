import TourList from "../../components/tour/list";
import { useInfiniteQuery } from "react-query";
import { QueryKeys, fetcher } from "../../hooks/queryClient";
import { Tours } from "../../type";
import {useRef, useEffect, useState} from 'react';
const TourPage = () =>{
    const targetRef = useRef<HTMLDivElement>(null)
    const [intersecting, setIntersecting] = useState(false);

    const { data, isLoading, hasNextPage, isFetchingNextPage,isSuccess, fetchNextPage } = useInfiniteQuery<Tours>(
        QueryKeys.TOURS, 
        ({pageParam = ""})=>fetcher({
            method:'GET',
            path: 'tour/list',
            params:{
                cursor : pageParam
            }
        }),
        {
            getNextPageParam : (lastPage, allPage) =>{
                return allPage[0].length * (allPage.length)
            }
        }
    )

    useEffect(()=>{
        if(!targetRef.current){
            return;
        }
        const observer = new IntersectionObserver((entries)=>{
            console.log(entries[0].isIntersecting);
            setIntersecting(entries[0].isIntersecting);
        });
        observer.observe(targetRef.current);
        return ()=>{
            observer.disconnect();
        }
    },[isSuccess])

    

    useEffect(()=>{
        if(intersecting && hasNextPage && !isFetchingNextPage){
            fetchNextPage();
        }
    },[intersecting, hasNextPage])

    if(isLoading|| !data){
        return(
            <div>...Loading</div>
        )
    }
    return (
        <>
        <TourList tours = {data.pages || []}/>
        <div ref={targetRef}></div>
        </>
    )
}

export default TourPage;