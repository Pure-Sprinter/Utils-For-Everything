# Utils-For-Everything

> 개발을 하며 유용했던 함수나 객체를 정리하는 공간입니다.

## Javascript

| 제목                  | 내용                                                                                                           | 파일 이름                                                                                                 | 지원 언어  |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| 나만의 Query 문       | 자바스크립트의 Method Chaining 방식을 사용하기 쉽고 가독성이 쿼리문 작성 기능을 만들었습니다.                  | [Query.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Query.js)           | Javascript |
| API 통합              | 클라이언트 상에서 편한 API 관리 및 호출을 담당하는 함수 입니다.                                                | [Api.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Api.js)               | Javascript |
| SQLlite 모듈          | Express와 SQLite3에서 사용하는 메소드별 작성한 함수 입니다.                                                    | [Database.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Database.js)     | Javascript |
| MySQL 모듈            | Express와 MySQL2에서 사용하는 메소드별 작성한 함수 입니다.                                                     | [MySQL.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/MySQL.js)           | Javascript |
| Date 모음집           | 자바스크립트 상에서 자주 사용하는 Date를 제어하고 활용하는 파일입니다.                                         | [Date.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Date.js)             | Javascript |
| HTML 태그 모듈        | 자바스크립트로 HTML 태그를 접근할 때 자주 사용하는 함수 모음집입니다.                                          | [HTML.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/HTML.js)             | Javascript |
| 도메인 Util Class     | 자바스크립트에서 선언한 클래스가 자바와 같이 여러 가지 유틸 함수를 가질 수 있도록 만든 상위 유틸 클래스입니다. | [Model.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Model.js)           | Javascript |
| Repository Util Class | 자바스크립트에서도 JpaRepository와 같이 여러 가지 유틸 함수를 가질 수 있도록 만든 상위 유틸 클래스입니다.      | [Repository.js](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/javascript/Repository.js) | Javascript |

## Typescript

| 제목                 | 내용                                           | 파일 이름          | 지원 언어  |
| -------------------- | ---------------------------------------------- | ------------------ | ---------- |
| Getter 데코레이터    | Typescript 상에서 정의한 Getter Decorator      | [Getter.ts]()      | Typescript |
| Prisma와 함께 테스트 | Jest, Prisma를 사용하면서 에러를 방지하는 방법 | [Prisma-Jest.ts]() | Typescript |

## CSS

| 제목           | 내용                                                                           | 파일 이름                                                                                                                                                                                | 지원 언어 |
| -------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 정렬 담당 일찐 | HTML 상에서 자주 사용하는 정렬 함수를 Class 타입으로 정의한 디자인 요소입니다. | [align.css](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/css/align.css), [align.scss](https://github.com/Pure-Sprinter/Utils-For-Everything/blob/main/css/align.scss) | CSS       |

## 나중에 해야할 것

- 언어별 테스트 케이스 적용해서 테스트 전용 함수 만들기
- Repository 같은 경우 데이터 상태 관리를 통하여 1차 캐시 형태를 삽입하기
