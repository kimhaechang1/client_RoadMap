import CommonButton from '../../components/common/button';
import Content from '../../components/common/content';
import Contents from '../../components/common/contents';
import QueryElement from '../../components/search/query';
import '../css/search.css';

const SearchPage = ()=>{
    return(
        <div className="flexCol searchMainFrame">
            <div className="searchBodyFrame flexCol sectionGap">
                <div className="flexCol innerGap">
                    <div className="queryTitle">검색제목</div>
                    <div className="searchBox flexRow">
                        <input type="text" className="border"></input>
                        <CommonButton imgSrc={"/search_black.png"}/>                        
                    </div>

                </div>
                <div className="flexCol innerGap">
                    <div className="queryTitle">검색직무</div>
                    <div className="flexRow queryGap">
                        <QueryElement query={"한국인"}/>
                    </div>                    
                </div>
                <div className="flexCol innerGap">
                    <div className="queryTitle">정렬기준</div>
                    <div className="flexRow queryGap">
                        <QueryElement query={"최신순"}/>
                        <QueryElement query={"조회순"}/>
                    </div>                    
                </div>
            </div>
            <div className="flexCol searchResultFrame">
                <div className="searchResultTitle">
                    검색결과
                </div>
                <div className="">
                    <div className="flexCol sectionGap">{Array.from({length:5}).map((_,i)=>{
                        return(
                            <Content key={i}/>
                        )
                    })}
                    </div>
                    
                </div>
            </div>
        </div>
        // <Contents>
    )
}

export default SearchPage;