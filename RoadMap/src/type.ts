export type Tours = [
    {
		roadmapId : string,
		nickName : string,
		date : string,
		view : number,
		title : string,
		commentCount : number
	}
]
export type Tour ={
    roadmapId : string,
    nickName : string,
    date : string,
    view : number,
    title : string,
    commentCount : number
}
export type Main ={
    orderByView : Tours,
    orderByDate : Tours
}
export type TourDetail = {
    roadmapId : string,
    nickName : string,
    date : string,
    view : number,
    title : string,
    infos : Info[],
    tags : string[],
    content : string,
    comments : Comment[]
}

export type Info = {
    date : string,
    title : string,
    content: string
}
export type Comment= {
    commentId : string,
    nickName : string,
    date : string,
    content : string,
}
export type ReturnMsg = {
    success : string,
    msg? : string,
    id? : string
}