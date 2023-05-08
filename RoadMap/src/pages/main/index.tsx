import Contents from "../../components/common/contents";
import TopTenBooks from "../../components/main/topTenBooks";
import { useQuery } from "react-query";
import { QueryKeys, fetcher } from "../../hooks/queryClient";
import { Main } from "../../type";
const MainPage = () =>{
    const {data, isSuccess,isLoading} = useQuery<Main>(QueryKeys.MAIN
    ,() =>fetcher({
        method :'GET',
        path : 'main',
    }),{
        cacheTime : 0
    })
    if(isSuccess){
        console.log(data);
    }
    if(isLoading || !data){
        return(
            <div>...Loading</div>
        )
    }
    return (
        <>
        <Contents contents={data.orderByView || []} title={"가장 많이 본 글"}/>
        <Contents contents={data.orderByDate || []}title={"최근에 등록 된 글"}/>
        <TopTenBooks/>
        </>
    )
}
export default MainPage;