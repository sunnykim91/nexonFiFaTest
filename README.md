# 넥슨 피파 API 적용 테스트 페이지

> 넥슨 인텔리전스 랩스 면접을 위한 넥슨 개발자 센터 API를 활용한 피파 전적 검색 사이트 입니다.

---

## 사용 기술 스택 및 주요 라이브러리

-   React
-   TypeScript
-   Context API (상태관리)
-   MUI
-   moment
-   axios
-   NEXON DEVELOPERS FIFA API

---

## 폴더 구조 설명

-   크게 HomePage / MatchRecordPage 2개의 페이지로 구성
-   각 페이지 마다 컴포넌트 분리
-   Model폴더에는 각 데이터별 타입 정의
-   NEXONAPI 파일에는 각 API 명세
-   config 파일에는 API key 명세
-   RootContext와 Hook을 활용한 상태관리

---

## 주요 구현 내용

-   닉네임에 따른 API 결과 데이터와 메타 데이터간의 매칭
-   Tab에 따른 매칭 결과
-   데이터를 fetch해오는 과정을 보여주는 Progress 표시
-   테이블로 경기 데이터의 표현
-   득점 좌표에 따른 이미지 좌표 표시
-   더보기 버튼 구현

---

## 느낀점

-   좋았던 점

    -   오픈 소스를 활용한 데이터 표현
    -   TypeScript를 활용한 오류 및 실수 방지
    -   Context API를 활용한 전역 상태 관리

-   어려웠던 점, 아쉬운 점
    -   메타 정보와 유저정보/매치정보 등의 데이터 매칭(ex: spId, accessId )
    -   좌표 정보에 대한 명확한 이해 부족(ex: x좌표가 대부분 0.7~1사이)
    -   UX/UI에 대한 경험 / 디자인 미흡
