import Contents from "../../components/common/contents";
import TopTenBooks from "../../components/main/topTenBooks";

const MainPage = () =>{
    return (
        <>
        <Contents title={"가장 많이 본 글"}/>
        <Contents title={"최근에 등록 된 글"}/>
        <TopTenBooks/>
        </>
    )
}
export default MainPage;