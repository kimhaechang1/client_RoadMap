import '../css/imageButton.css';

const ImageButton = ({imgSrc, style, handler} : {imgSrc : string, style? : string, handler?:()=>void}) =>{
   return ( 
        <button onClick={handler} className={`ImageButton ${style}`} >
            <img src={imgSrc}></img>
        </button>
    )

}

export default ImageButton;