import {useParams} from 'react-router-dom';

const TourItemPage = () =>{
    const { id } = useParams();
    return (
        <div>tour 페이지 {id}번 입니다.</div>
    )
}

export default TourItemPage;