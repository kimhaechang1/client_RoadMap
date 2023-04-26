import '../css/tag.css';

const Tag = ({tagName, isDel = true} : {tagName : string, isDel? : boolean}) =>{
    return(
        <div className="tag flexRow">
            {tagName}
            {isDel ? <img src="/gob.png"></img> : null}
        </div>
    )
}
export default Tag;