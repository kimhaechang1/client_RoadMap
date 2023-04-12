import '../css/commonButton.css';

const CommonButton = ({ title, imgSrc, style} : { title? : string, imgSrc? : string, style?:string}) =>{
    return(
        <button className={style ? style : "commonButton"} >
            {imgSrc ? <img src={imgSrc} className="writeIcon"/> : null}
            {title}
        </button>
    )
}

export default CommonButton