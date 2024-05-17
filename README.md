# 📚Tree Book - 책들의 나무

<p align="center" fontWeight="bold">
  <br>
  <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/ab196b91-e841-44d2-9833-85742d1c97bd" width="150">
  <br>
</p>
<h4 align="center">📚Tree Book - 책들의 나무📚</h4>
<h5 align="center">배포 링크 : <a href="https://tree-book.vercel.app">Tree-Book-책들의-나무</a></h5>
<h5 align="center">게스트 ID/PW : gkfnck@naver.com / 123123</h5>

<br>

## 프로젝트 소개

<p align="justify">
 책 평가 및 코멘트 서비스 웹 "Tree Book" 은 여러 독자들의 다양한 리뷰를 통해 책에 대한 의견을 공유하고,<br>
  구매 전에는 이미 읽어본 사용자들의 평가를 보고 결정할 수 있는 플랫폼입니다.
</p>

<br>

## 기술 스택

| TypeScript | React |  MUI   |  ReactQuery   | Firebase |
| :--------: | :--------: | :------: | :-----: |:-----: |
| <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/700d2f5b-1d7a-46e5-b9a1-45be06aaaa21" width="200"> | <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/d0e812c5-bc5a-4738-983a-63d3cda83e70" width="200"> | <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/26fdfde4-44be-446e-ad95-6c96215e02b4" width="200"> | <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/0f05751e-bf00-4ef5-98de-ba07a793f658" width="200"> | <img src="https://github.com/DayTeaJun/Tree-Book/assets/108723143/90a3980d-d02d-4ea8-b32f-f9434655377d" width="200"> |

<br>

## 아키텍처
![개인프젝 1차](https://github.com/DayTeaJun/Tree-Book/assets/108723143/e9ba7ff6-9c2e-4761-bfb8-aa2f085044f4)

## 기능

### 회원가입 & 로그인
|회원가입|로그인|
|:---:|:---:|
|![signUp3](https://github.com/DayTeaJun/Tree-Book/assets/108723143/28dad759-5e3a-4b9b-8169-1d726a7d6419)|![signIn](https://github.com/DayTeaJun/Tree-Book/assets/108723143/78f19a6b-c661-4c24-988d-5744a0b0b194)|

**Firebase Authentication**를 이용하여 회원가입을 하고, **Cloud Firestore**에 유저 DB를 저장합니다.

회원가입 시 **정규식**을 이용하여 이메일과 이미지는 해당 정규식을 통과해야 사용할 수 있으며, 통과되지 않는 경우 MUI의 **SnackBar**를 통해 경고문구를 출력하도록 구현하였습니다.

기존의 등록된 이메일이나 닉네임이 있다면 **useDebounce 훅**을 구현하여 타이핑을 완료한 후 0.3초가 지난 뒤에 네트워크 요청을 보내고 해당 중복이 있는지 검사할 수 있도록 구현하였습니다. 

회원가입 및 로그인이 이루어지면, 유저 정보 객체를 받고 **useReducer**와 **Context API**를 사용해 관리합니다.

### 홈피드
|홈피드|반응형 디자인|
|:---:|:---:|
|![HomFeed](https://github.com/DayTeaJun/Tree-Book/assets/108723143/4187f2ad-0ec5-49be-b367-248c94993055)|![HomeFeed2](https://github.com/DayTeaJun/Tree-Book/assets/108723143/8ad61088-35cf-47fc-9090-436b27c5cb24)|

홈피드는 사용자들의 의견이 실시간으로 반영되는 것으로,

**Cloud Firestore**에 사용자들이 등록한 '즐겨찾기', '코멘트', '조회수' 등을 집계하여 나타내는 페이지입니다. 

'Best 책'은 **즐겨찾기가 많은 Top 5**

'리뷰가 많은 책들'은 **리뷰가 많은 Top 9**

'많이 찾고 있는 책들'은 **조회수가 많은 Top 10** 등이 있습니다.

### 검색
|검색|반응형 디자인|
|:---:|:---:|
|![search](https://github.com/DayTeaJun/Tree-Book/assets/108723143/03aa9274-f504-40e8-9f98-8edc7bbcaeec)|![search2](https://github.com/DayTeaJun/Tree-Book/assets/108723143/08121d2f-4048-446a-8fe3-efa51a3e7ac4)|

검색 페이지는 **Kakao Open 도서 API**를 통해 사용자가 책의 제목을 입력하여 검색할 수 있는 기능입니다.

**React Query**를 통해 한번 조회된 검색은 캐싱되어 바로 렌더링될 수 있도록하고,

MUI의 **Pagination**을 이용하여 한번에 로드하지 않고 페이지별로 이동할 수 있게 구현하였습니다.

### 책 상세 페이지
|책 상세 페이지|반응형 디자인|
|:---:|:---:|
|![BookDetail](https://github.com/DayTeaJun/Tree-Book/assets/108723143/14a84b26-e03c-4978-9428-7059fef7f753)|![BookDetail2](https://github.com/DayTeaJun/Tree-Book/assets/108723143/9da73bc8-4eab-404d-adc1-73a03ce0265c)|

책 상세 페이지는 **Kakao Open 도서 API**로 받아온 데이터와 사용자들의 의견이 반영된 **Cloud Firestore**의 데이터를 이용하여

책 정보, 출판사의 다른 책, 즐겨찾기, 사용자들의 코멘트, 별점 분포을 볼 수 있습니다.

### 리뷰 및 별점 등록, 즐겨찾기
|리뷰 등록|리뷰 수정 및 삭제|
|:---:|:---:|
|![commentWrite](https://github.com/DayTeaJun/Tree-Book/assets/108723143/2481ddec-19e6-4129-b5f0-9a7d16a81100)|![commentModifyDel](https://github.com/DayTeaJun/Tree-Book/assets/108723143/f5688644-8724-4c79-b33d-5411a39f4372)|

로그인한 사용자는 리뷰와 별점을 한번만 등록할 수 있습니다.

등록된 리뷰와 별점은 **Cloud Firestore**에 저장됩니다.

리뷰가 등록되면 기존 리뷰 작성 위치에 등록한 리뷰를 볼 수 있으며, 수정 및 삭제가 가능합니다.

|책 즐겨찾기|리뷰 좋아요|리뷰 정렬|
|:---:|:---:|:---:|
|![subscript](https://github.com/DayTeaJun/Tree-Book/assets/108723143/f4cb42a3-9e09-4e26-ae84-88109ae0ca73)|![commentLike](https://github.com/DayTeaJun/Tree-Book/assets/108723143/26c00ecb-7ba2-4d79-9f52-9a3e494a6ab3)|![commentSort](https://github.com/DayTeaJun/Tree-Book/assets/108723143/e77dadb3-ba3a-4515-8af0-e0ea1e549390)|

책 즐겨찾기는 몇 명이 책을 즐겨찾기 했는지 볼 수 있으며, 내 프로필에서 확인 할 수 있습니다.

리뷰 목록은 사용자들의 등록된 리뷰를 볼 수 있으며, 리뷰에 좋아요를 표시 할 수 있습니다.

### 사용자 프로필
|마이 프로필|사용자 프로필|
|:---:|:---:|
|![profileMy](https://github.com/DayTeaJun/Tree-Book/assets/108723143/07dce8c2-8abc-4ffa-8ab9-78c6672e9b1d)|![profileUser](https://github.com/DayTeaJun/Tree-Book/assets/108723143/32662652-34fe-4435-a2ad-e8375541dd3c)|

프로필은 **Cloud Firestore**에 저장되었던, 사용자의 **유저 정보**, **별점 분포**, **즐겨찾기한 책 목록**, **작성한 코멘트**를 한번에 확인 할 수 있습니다.

|프로필 수정|계정 삭제|
|:---:|:---:|
|![profileEdit](https://github.com/DayTeaJun/Tree-Book/assets/108723143/608cb8d3-e079-4a25-831d-935b87e9bb6b)|![UserDel](https://github.com/DayTeaJun/Tree-Book/assets/108723143/19ab9a4f-5692-4b2b-b90a-15650f313d52)|

프로필 수정은 마이 프로필에서 수정이 가능하며, 사용자의 **프로필 이미지**, **닉네임**, **자기소개** 등을 변경 할 수 있습니다.

계정 삭제 기능은 **Firebase Authentication**에 등록된 계정과 **Cloud Firestore**에 저장된 유저DB를 삭제할 수 있습니다. 

### 다크 & 화이트모드
|홈피드 & 책 상세 페이지|검색 & 프로필|
|:---:|:---:|
|![darkMode](https://github.com/DayTeaJun/Tree-Book/assets/108723143/dc4d3bd3-da96-437d-9bea-01e4d1432968)|![darkMode2](https://github.com/DayTeaJun/Tree-Book/assets/108723143/33153f4b-ac89-4b5e-b0fb-b51280b83a62)|

MUI Theme palette를 이용하여 다크 & 화이트 모드를 구현하였습니다.

### Sekeleton UI
|마이 프로필|검색 페이지|
|:---:|:---:|
|||
