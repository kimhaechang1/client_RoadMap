import '../css/tag.css';

const Tag = ({tagName} : {tagName : string}) =>{
    return(
        <div className="tag flexRow">
            {tagName}
            <img src="/gob.png"></img>
        </div>
    )
}
export default Tag;