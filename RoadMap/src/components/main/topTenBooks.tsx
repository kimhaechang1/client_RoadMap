import '../css/contents.css';

import BookSlider from './bookSlider';

const TopTenBooks = () =>{
    return(
        <div className="contentsOuterFrame">
            <div className="contentsInnerFrame">
                <div className="contentsTitle">탑 10 북</div>
                <BookSlider/>
            </div>
        </div>
    )
}

export default TopTenBooks;