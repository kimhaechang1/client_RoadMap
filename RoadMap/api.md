/list?cursor=1

GET 요청

설명 : 

글 작성 날짜 기준으로 내림차순 정렬된 글들 중 에서

쿼리스트링으로 넘겨준 cursor 값 번호 + 9 만큼의 글들

즉, 최대 10개의 글들을 아래 형식에 맞춰서 배열형태로 주면 됨

더이상 불러올 글들이 없으면 빈배열 리턴시켜주셈

```json
[
	{
		"RoadMapId" : "글 ID",
		"UserId" : "글 작성자",
		"RoadMapDate" : "글 작성 날짜",
		"RoadMapTitle" : "제목",
		"RoadMapViews" : "조회수",
		"CommentCount" : "코멘트 개수" 
	}	
]
```
/new

POST 요청

설명 : 

새 글쓰기

아래의 데이터 형식으로 DB에 저장 해 넣을것

응답 데이터는 일단

```json
{
	"success" : false or true 로 주셈
}
```
```json

{
    "RoadMapId" : "글 ID",
    "UserId" : "글 작성자",
    "RoadMapDate" : "글 작성 날짜",
    "RoadMapTitle" : "제목",
    "RoadMapViews" : "조회수",
    "RoadMaps" : [
            {
                "RoadMapTimes" : "시작시점",
                "RoadMapBookTitle" : "책제목",
                "RoadMapIntroduce" : "로드맵 설명",
            }
    ],
	"RoadMapTags" : [],
	"RoadMapContents" : "본문"
}	
```

/article/{RoadMapId}

PUT 요청

설명 : 

글 수정으로 어떤글 수정인지는 req.params로 던져넣겠음

아래의 데이터 형식으로 DB에 저장 해 넣을것

응답 데이터는 일단

```json
{
	"success" : false or true 로 주셈
}
```

```json
{
    "RoadMapId" : "글 ID",
    "UserId" : "글 작성자",
    "RoadMapDate" : "글 작성 날짜",
    "RoadMapTitle" : "제목",
    "RoadMapViews" : "조회수",
    "RoadMaps" : [
            {
                "RoadMapTimes" : "시작시점",
                "RoadMapBookTitle" : "책제목",
                "RoadMapIntroduce" : "로드맵 설명",
            }
    ],
	"RoadMapTags" : [],
    "RoadMapContents" : "본문"
}	
```

/article/{RoadMapId}

DELETE 요청

설명 : req.params로 던진 아이디 값에 해당하는 글 삭제

삭제할때 코멘트도 같이 날려야 할듯요

응답 데이터는 일단

```json
{
	"success" : false or true 로 주셈
}
```

/article/{RoadMapId}

GET 요청

설명 : 

req.params로 던진 아이디값 기준으로 글 하나 조회하기

```json
	{
		"RoadMapId" : "글 ID",
		"UserId" : "글 작성자",
		"RoadMapDate" : "글 작성 날짜",
		"RoadMapTitle" : "제목",
		"RoadMapViews" : "조회수",
		"RoadMaps" : [
			    {
				    "RoadMapTimes" : "시작시점",
				    "RoadMapBookTitle" : "책제목",
				    "RoadMapIntroduce" : "로드맵 설명",
				}
		],
		"RoadMapTags" : [], // 태그 배열
		"RoadMapContents" : "본문",
		"Comments" : [
				{
					"CommentId" : "댓글 ID",
					"UserId" : "닉네임",
					"CommentDate" : "작성날짜",
					"CommentContents" : "댓글내용"
				}
		]
	}	
```
