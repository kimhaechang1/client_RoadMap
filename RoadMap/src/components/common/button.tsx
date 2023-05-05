import '../css/commonButton.css';

const CommonButton = ({ title, imgSrc, style, handler} : { title? : string, imgSrc? : string, style?:string, handler?:()=>void}) =>{
    return(
        <button onClick={handler} className={style ? style : "commonButton"} >
            {imgSrc ? <img src={imgSrc} className="writeIcon"/> : null}
            {title}
        </button>
    )
}

export default CommonButton