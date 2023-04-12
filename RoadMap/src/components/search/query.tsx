import { useRef } from 'react';
import '../css/query.css';

const QueryElement = ({query} : {query?:string}) =>{
    const btnRef = useRef<HTMLButtonElement>(null)
    const onClickHandler = () =>{
        const btnElement = btnRef.current;
        if(btnElement?.classList.contains("clicked")){
            btnElement.classList.remove("clicked");
        }else{
            btnElement?.classList.add("clicked");
        }
        
    }
    return(
        <button ref={btnRef} onClick={onClickHandler} className="queryFrame border">
            {query}
        </button>
    )
}
export default QueryElement;