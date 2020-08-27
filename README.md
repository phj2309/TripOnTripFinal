# TripOnTrip
#### write by subingim
---
_여럿이 모여 하나의 여행 플랜을 짤 수 있다면?_

시간과 장소가 묶인 하나의 여행 단위별로 커스터마이징하여 여행 스케줄을 완성해주는 웹앱 서비스.
+ 완성된 계획을 여행 참여자들과 함께 공유, 수정한다.

+ 여행 중 소비한 내역을 입력해두면 입력된 날짜 기준 환율을 적용하여 정산된다.

---
## 개발 기간
2019.08.29 ~ 10.28

---
## 기술 스택
front-end: HTML5, CSS3
back-end: javascript, Node.js 10.15.3, cordova(packaging)
server: awd-ec2
DB: MySQL, aws-rds
api: nodemon, forever
> nodemon은 서버 코드가 변경시 자동으로 재시작 되도록 하기 위해 사용한다.  
> forever은 가상서버(ec2)에서 프로젝트가 24시간 구동되도록 하기 위해 사용한다.  
---
## 시작하기
터미널 창에 아래 명령을 통해 프로젝트 실행이 가능합니다.
```linux
npm serve
```

---
## 배포
ec2 인스턴스로 생성한 가상 리눅스 환경에서 node로 작성된 서버 코드가 컴파일된다. forever모듈을 이용하여 24시간 서버 코드를 구동될 수 있도록 하였다.
#### forever install
```
$ npm install forever - g
```
설치 후에는 start, stop 명령을 통해 서버를 구동한다. 현재 구동중인 서버는 `list`명령을 통해 확인할 수 있다.  서버 중지를 위해서는 `list`에서 확인한 해당 서버의 `pid` 또는 `id` 값이 필요하다.   
```
$ forever start  //서버 구동 시작
$ forever stop [pid]  //서버 구동 정지 
$ forever list  //현재 실행중인 forever 서버 목록 확인
```
#### nodemon install
```
$ npm install -g nodemon
```
