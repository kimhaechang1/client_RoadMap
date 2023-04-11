import '../css/imageButton.css';

const ImageButton = ({imgSrc, style} : {imgSrc : string, style? : string}) =>{
   return ( 
        <button className={`ImageButton ${style}`} >
            <img src={imgSrc}></img>
        </button>
    )

}

export default ImageButton;