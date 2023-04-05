import {useSearchParams } from 'react-router-dom';
const SearchResultPage = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    if(searchParams.has("q")){
        return(
            <div>
                <div>검색결과 페이지입니다.</div>
                <div>검색어는 {searchParams.get("q")}</div>
            </div>
        )
    }
    return(
        <div>
            검색결과 페이지입니다.
        </div>
    )
}
export default SearchResultPage;