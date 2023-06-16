import '../css/tag.css';

const Tag = ({tagName, tagList = [], isDel = true, index, setTagList} : {tagName : string, isDel? : boolean, tagList? : string[], index : number, setTagList : React.Dispatch<React.SetStateAction<string[]>>}) =>{
    const onDeleteHandler = () =>{
        let cp = [...tagList];
        cp = [...cp.slice(0,index), ...cp.slice(index+1)];
        setTagList(cp);
    }
    return(
        <div className="tag flexRow">
            {tagName}
            {isDel ? <img onClick={onDeleteHandler} src="/gob.png"></img> : null}
        </div>
    )
}
export default Tag;