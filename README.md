# TripOnTrip
#### 개발 기간 : 2019.08.29 ~ 10.28 / (update)2020.09 ~ 
#### 참여 인원 : 3 (frontend 1, backend 2 / 부분적으로 full-stack 진행)
---
## IDEA
_"하나의 여행 계획을 공유하고 커스터마이징할 수 있다면?"_

시간과 장소가 하나로 묶인 여행 단위(소계획)별로 여행 스케줄을 완성해줌으로써 다수의 여행이 편리하도록 돕는 웹앱 서비스입니다. 

### 메뉴탭 별 기능 설명
+ __Plan__ 회원간 닉네임을 통해 여행 파트너들과 함께 여행 계획을 작성한다. 작성 후에는 소계획 추가 및 각 여행 날짜들에 대한 후기나 비용을 작성할 수 있다.

+ __Expense__ 완성된 계획을 파트너들이 함께 공유, 수정한다.

+ __Favorite Plan__ 타인의 계획에서 '소계획'을 내 계획으로 가져온다.  

+ __Expense__ 여행 중 입력해 둔 소비 내역을 입력된 날짜 기준으로 여행지의 환율을 적용하여 정산한다.

+ __User Profile & My Plan__ 로그인 정보 확인 및 작성한 계획을 확인하고 수정, 삭제한다.

---
## PREVIEW

### 메인페이지
<img src="https://user-images.githubusercontent.com/41335539/96722918-ddd50e00-13e8-11eb-8688-e1ff396a93bd.JPG" width="30%">
   
<img src="https://user-images.githubusercontent.com/41335539/96722925-e1689500-13e8-11eb-968f-4774f491e9bc.JPG" width="30%">

메인페이지에서 타인의 여행 계획 클릭 시 보이는 화면.  
수정권한이 없으며 읽기만 가능합니다.  

<img src="https://user-images.githubusercontent.com/41335539/96724465-d3b40f00-13ea-11eb-8c9e-bf0e0dc457bb.JPG" width="30%">
--- 

### 여행 계획 생성 페이지  

'부산 여행'이라는 타이틀을 가지는 계획을 작성하는 모습.  
닉네임이 jurr, hyeon11인 사용자와 해당 계획을 공유합니다.  

<img src="https://user-images.githubusercontent.com/41335539/96724467-d44ca580-13ea-11eb-9d7d-6cf9e22de46e.JPG" width="30%">

---

### 계획 날짜별 소계획 생성
<img src="https://user-images.githubusercontent.com/41335539/96724471-d4e53c00-13ea-11eb-8077-b71d15376108.JPG" width="30%">
<img src="https://user-images.githubusercontent.com/41335539/96724475-d57dd280-13ea-11eb-98ff-53bbf02e8ba3.JPG" width="30%">

---

### 계획 날짜별 지출 요소 기입
<img src="https://user-images.githubusercontent.com/41335539/96724478-d6166900-13ea-11eb-9239-e093ddfedb86.JPG" width="30%">

---

### 로그인, 회원가입 페이지

<img src="https://user-images.githubusercontent.com/41335539/96724455-d1ea4b80-13ea-11eb-9543-57251c1c0aa5.JPG" width="30%">
<img src="https://user-images.githubusercontent.com/41335539/96724464-d31b7880-13ea-11eb-9306-50833aac3b99.JPG" width="30%">

---

### 내 계획 확인 페이지
로그인한 유저가 참여하는 모든 계획을 확인할 수 있습니다.  
<img src="https://user-images.githubusercontent.com/41335539/96724477-d6166900-13ea-11eb-841b-a2cb0bd1e18e.JPG" width="30%">

---

## SETTING AND INSTALL VERSION
+ OS: Windows10
+ front-end: HTML5, CSS3
+ back-end: javascript, Node.js 10.15.3, cordova(packaging)
+ server: aws-ec2(linux)
+ DB: MySQL 8.0.12(workbench), aws-rds(MySQL instance)
+ api: nodemon, forever, Google Map
+ editer: VSCode

> nodemon은 서버 코드가 변경시 자동으로 재시작 되도록 하기 위해 사용한다.  
> forever은 가상서버(ec2)에서 프로젝트가 24시간 구동되도록 하기 위해 사용한다.  

---

## HOW TO RUN
### RUN ON LOCAL(with AWS RDS)
0. git clone https://github.com/phj2309/TripOnTripFinal.git 후 프로젝트 루트 경로로 이동합니다.

1. /DB/config.js에서 db커넥션 내용(host, user, password)을 RDS인스턴스에 맞게 수정합니다. (DB 이름은 그대로 두기)

2. node_modules 폴더 생성 후 실행합니다.
```bash
npm install     //폴더 생성 명령
npm start       //실행 명령
```
3. chrome(권장)창에 https://localhost:3000 로 접속합니다.

> 이 프로젝트 대부분의 기능은 회원가입(id, pw) 이후 사용이 가능합니다.

### RUN ON WEB HOSTING
chrome(권장)창에 https://www.test:3000 로 접속합니다.  
(url 추후 변경해야 함.)

---

## WEB HOSTING
ec2 인스턴스로 생성한 가상 리눅스 환경에서 node로 작성된 서버 코드가 컴파일된다.  
forever모듈을 이용하여 관리자가 서버에 접근하지 않아도 24시간 프로젝트의 서버 코드가 구동될 수 있도록 설정하였다.
#### forever install

```
$ npm install forever - g
```
설치 후에는 start, stop 명령을 통해 서버를 구동한다.  
현재 구동중인 서버는 `list`명령을 통해 확인할 수 있다.  
서버 중지를 위해서는 `list`에서 확인한 해당 서버의 `pid` 또는 `id` 값이 필요하다.   
```
$ forever start  //서버 구동 시작
$ forever stop [pid]  //서버 구동 정지 
$ forever list  //현재 실행중인 forever 서버 목록 확인
```
#### nodemon install
```
$ npm install -g nodemon
```

---

## 2020 TO DO LIST
실행 시 발생되는 에러들 수정중.
> !개발 유의점!  

> 프론트 관련 작업 수행 시 루트 폴더의 `www`하위에 작업할 것.  
> 절대 안쪽 폴더가 아님!

> auto increment 초기화 SQL문  
> ALTER TABLE 테이블명 AUTO_INCREMENT=1;
---
- [x] 팀원 각자 실행 환경 구축
#### FrontEnd
- [x] Favorite plan 메뉴에서 배경 이미지 변경
- [ ] Favorite plan 클릭 후 메뉴탭의 소메뉴(profile과 myplan, logout) 출력되도록 변경  
- [x] Plan 페이지 디폴트 날짜 2020으로 변경
- [x] Plan 페이지 날짜 입출력 달력형식으로 변경(추후 백엔드와 연동)
- [ ] Detail plan 페이지 드래그앤드롭(핑크색 바) 반응형 길이 조정
- [ ] Detail plan 페이지 메뉴바 선택시 발생하는 오류 해결

- [ ] My plan 페이지 여행 리스트 출력 시 배경 짤림

---
#### BackEnd
- [x] 실행 불능 문제 해결
- [x] aws 기한 만료로 rds 새 인스턴스 생성 후 비밀번호 보안 강화
- [x] 기존 ERD 적용하여 스키마 생성 & 외래키 관련 옵션 설정

 > MySQL에서 reverse engineer로 만든 모델 스키마(.mwb)로 DB생성하기  
 > `File`-`Open Model`-내 pc에서 스키마 찾아서-`열기`  
 > 스키마 파일이 열리면 `Database`-`Forward Engineer`클릭 후 `next`반복하면 적용 완료.

- [x] aws 기한 만료로 ec2 새 인스턴스 생성 및 forever 설정 다시.
- [ ] 내부 mysql.js 정보 변경
- [ ] 완성된 코드 재배포
- [ ] 여행 하나당 이미지 삽입을 어떻게 할 것인가..  
--- 
- [ ] 메인에서 로그인없이 계획들 눌렀을 때 에러
- [x] 회원가입시 DB저장은 되지만 리다이렉트 불능
- [x] Profile 페이지에서 사용자 기본값(아이디와 닉네임) 출력되도록  
---
- [ ] My plan 페이지 구글 지도 로드 불능(추후 수정 예정)
- [x] My plan 페이지 edit 클릭 시 에러(plan_id가 null) 수정
- [x] (위와 연관)My plan에서 각 여행계획에 소계획 추가시 세션값 혼동으로 인한 출력 결과 에러
- [x] My plan 페이지 remove 클릭 시 삭제 구현
- [ ] Plan 페이지에서 새로고침 시 기존 소계획들이 db에 반복 삽입되는 에러 수정
- [ ] Detail plan 페이지에서 delete버튼에 대한 삭제 구현
- [ ] Favorite plan 기능(하트 클릭)에서 db에 저장 되도록 코드 수정
