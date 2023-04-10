import '../css/bookSlider.css';
import Book from './book';

const BookSlider = () =>{
    return(
        <div className="bookSliderFrame">
            <img className ="left" src="./left.png"></img>
            <div className="books">
                {Array.from({length:3}).map((_,i)=> <Book key={i}/> )}
            </div>
            <img className ="right" src="./right.png"></img>
        </div>
    )
}

export default BookSlider;