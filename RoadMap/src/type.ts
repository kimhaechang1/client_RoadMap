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
    tags : TagType[],
    content : string,
    comments : Comment[]
}
export type PostInfo = {
    date : string,
    title : string,
    content : string
}
export type Info = {
    date : string,
    title : string,
    content: string
}
export type date = {
    year : string,
    month : string,
    day : string
}
export type Comment= {
    commentId : string,
    nickName : string,
    date : string,
    content : string,
}

export type Return = {
    success : boolean,
    id : string,
    msg : string
}

export type TagType = {
    tag : string,
}