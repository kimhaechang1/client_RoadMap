import { useContext, useEffect, useState } from "react";
import { Info, Return, TourDetail, PostInfo, TagType } from "../../../type";
import CommonButton from "../../../components/common/button";
import '../../css/write.css';
import Tag from "../../../components/tour/tag";
import RoadElement from "../../../components/tour/editableRoad";
import ImageButton from "../../../components/common/ImageButton";
import { useMutation, useQuery } from "react-query";
import { QueryKeys, fetcher, getQueryClient } from "../../../hooks/queryClient";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { useIsLogin } from "../../../hooks/useIsLogin";
import { CurrentUserAuthContext } from "../../CurrentUserAuthContext";

const TourEditPage = () =>{
    
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(CurrentUserAuthContext);
    const [elemTitle, setElemTitle] = useState<string>("");
    const [tagList, setTagList] = useState<string[]>([]);
    const [roadmap, setRoadmap] = useState<Info[]>([]);
    const [content, setContent] = useState<string>("");

    useEffect(()=>{
        if(!id?.match(/[0-9]/g)){
            navigate('/404');
        }
    },[id])

    useEffect(()=>{
        const result = useIsLogin();
        result.then((data)=>{
            console.log("쓰기인데용")
            if(!data.isLogin){
                alert(data.msg);
                navigate("/login")
            }else{
                context?.setAuth(data.auth);
            }
        })
    },[])

    const {data}= useQuery<TourDetail>([QueryKeys.TOURS, id], ()=>fetcher({
        method: 'GET',
        path:`tour/${id}`,
    }))

    

    useEffect(()=>{
        if(!data) return;
        data?.infos.map(info=>{
            info.date = info.date.replaceAll("/","-");
        })
        let tagList = data?.tags.map((tagData)=>{
            return tagData.tag;
        })
        setElemTitle(data?.title);
        setTagList(tagList);
        setRoadmap(data?.infos);
        setContent(data?.content);
    },[data])

    

    const onInitHandler = () =>{
        const cp = [...roadmap];
        cp.push({title:'',date:'',content : ''})
        setRoadmap(cp);
    }

    const onElemTitleChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const element = e.target as HTMLInputElement;
        setElemTitle(element.value)
    }


    const ontagInputKeyUpHandler = (e : React.KeyboardEvent<HTMLInputElement>)=>{
        const element = e.target as HTMLInputElement;
        if(e.code==="Enter"){
            const copy = [...tagList];
            const data = element.value;
            if(!copy.includes(data) && data){
                element.value = "";
                copy.push(data);
                setTagList(copy);
                console.log([...tagList]);
            } 
        }
    }

    const onContentChangeHandler = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        const element = e.target as HTMLTextAreaElement;
        setContent(element.value);
    }

    const putRoadmap = useMutation<any, any, any, any>({
        mutationFn: (id) =>{
            return fetcher({
                method : 'PUT',
                path : `tour/${id}`,
                body : {
                    title : elemTitle,
                    content : content
                },
                auth : context?.auth
            })
        },
        onError : ()=>{
            alert("본문 저장 중 에러가 발생하였습니다.");
        }
    })

    const postInfo = useMutation<any,any,string,any>({
        mutationFn : (id)=>{
            let postData : PostInfo[] = [];
            let cp = [...roadmap];
            cp.map((data)=>{
                let newDate = data.date.replaceAll("-","/");
                postData.push({
                    date : newDate,
                    title : data.title,
                    content : data.content
                })
            })
            return fetcher({
                method : 'POST',
                path : `tour/${id}/info`,
                body : postData,
                auth : context?.auth
            })
        },
        onError : (error, variable) =>{
            alert("서버 오류로 인해 로드맵 데이터가 저장되지 못했습니다.")
        }
    })

    const postTag = useMutation<any,any,string,any>({
        mutationFn : (id) =>{
            let tags : TagType[] = tagList.map((tag)=>{
                return {
                    tag
                }
            });
            return fetcher({
                method : 'POST',
                path : `tour/${id}/tag`,
                body : tags,
                auth : context?.auth
            })
        },
        onError : (_error) =>{
            alert("서버 오류로 인해 태그 데이터가 저장되지 못했습니다.")
        }
    })

    const deleteInfos = useMutation<any,any, string | undefined, any>({
        mutationFn : (id) =>{
            return fetcher({
                method : 'DELETE',
                path : `tour/${id}/info`,
                auth : context?.auth
            })
        }, 
        onError : ()=>{
            alert("삭제 수행도중 에러가 발생하였습니다.");
        }
    })

    const deleteTags = useMutation<any,any, string | undefined, any>({
        mutationFn : (id) =>{
            return fetcher({
                method : 'DELETE',
                path : `tour/${id}/tag`,
                auth : context?.auth
            })
        }, 
        onError : ()=>{
            alert("삭제 수행도중 에러가 발생하였습니다.");
        }
    })

    const onSubmitHandler = () =>{
        const delPromiseList = [deleteInfos,deleteTags];
        let delRequests : (Promise<any> | undefined)[] = delPromiseList.map(promise=> promise.mutateAsync(id)) 
        const putPromiseList = [putRoadmap, postInfo, postTag]
        Promise.all(delRequests)
       .then(()=>{
            let putRequests : (Promise<Return>)[] = putPromiseList.map(promise => promise.mutateAsync(id));
            Promise.all(putRequests)
            .then(()=>{
                getQueryClient().invalidateQueries(QueryKeys.TOURS,{
                    exact : false,
                    refetchInactive : true
                })
                navigate('/tour');
            }).catch((error)=> {
                throw error
            })

        }).catch((error)=>{
            throw error;
        })
    }
    const onCancleHandler = () =>{
        navigate(`/tour/${id}`)
    }

    return (
        <div className="writeFrame flexCol">
            <div className="flexCol elemGap">
                <div className="elemTitle">제목</div>
                <input value={elemTitle} onChange={(e)=>{onElemTitleChangeHandler(e)}} type="text" className="border" placeholder="제목을 입력해주세요"></input>
            </div>
            <div className="flexCol elemGap">
                <div className="flexCol elemGap">
                    <div className="elemTitle">로드맵</div>
                    {!roadmap || roadmap.length === 0 ? 
                    <ImageButton handler={onInitHandler} imgSrc={"/plus.png"}/> 
                    : 
                    roadmap?.map((data,i)=>{
                        return(
                            <RoadElement allRoadmap={roadmap} setRoadmap={setRoadmap} data={data} key={i} index={i}/>
                        )
                    })}
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">태그</div>
                    <div className="tagFrame flexRow writerGap">
                        {tagList.map((tagName,i)=>{
                            return (
                                <Tag key={i} tagName={tagName} index={i} tagList={tagList} setTagList={setTagList}></Tag>
                            )
                        })}
                    </div>
                    <input type="text" onKeyUp={(e)=>{ontagInputKeyUpHandler(e)}} className="tagInput border" placeholder="태그를 입력 해주세요"></input>
                </div>
                <div className="flexCol elemGap">
                    <div className="elemTitle">본문</div>
                    <textarea value={content} onChange={(e)=>{onContentChangeHandler(e)}} className="addtionalCtx border" placeholder="내용을 입력해주세요"></textarea>
                </div>
                <div className="writeButtonFrame flexRow writerGap">
                    <CommonButton handler={onCancleHandler} title={"취소"} style={"reject border"}/>
                    <CommonButton handler={onSubmitHandler} title={"등록"} style={"submit"}/>
                </div>
            </div>
        </div>
    )
}
export default TourEditPage;