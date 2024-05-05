# 개발자입니까?<!-- .element: class="r-fit-text" -->

---

## 개발자에게 필요한 것

- 사용하는 랭귀지의 문법 습득<!-- .element: class="fragment" -->
- 데이터 타입별 차이를 이해하고 그 활용 방법에 대한 고찰<!-- .element: class="fragment" -->
- 알고리즘 숙지 (일반로직/암호화/검색트리)<!-- .element: class="fragment" -->
- 비즈니스 로직에 대한 이해도<!-- .element: class="fragment" -->
- 데이터 처리 방식의 다양한 방법론을 습득<!-- .element: class="fragment" -->
- 트래픽 발생의 원인과 트래픽 과다 상태에서 발생하는 현상에 대한 이해<!-- .element: class="fragment" -->
- 동기화/비동기화 처리의 차이점 이해와 서버에서의 mutex/channeling 을 구현<!-- .element: class="fragment" -->

---

# 이런 것도 중요하지만.<!-- .element: class="r-fit-text" -->

---

## 규칙 - protocol/rule

- 개발은 처음부터 끝까지 모든 것이 약속이다.<!-- .element: class="fragment" -->
    - 너와 나의 연결고리
    - 개발중에 document 참고는 선택이 아닌 필수
- input/output의 데이터 타입과 형태<!-- .element: class="fragment" -->
    - "1" 과 1 은 다르다
    - "STRING" 과 STRING 도 다르다
- 클래스, 함수, api 제작시에는 반드시 명확한 규칙을 정할 것<!-- .element: class="fragment" -->
    - 심플할수록 좋다

---

## 오류 메세지

- 개발중에 오류 메세지를 많이 본 사람이 서비스 중에는 오류 메세지를 안 볼 확률이 크다<!-- .element: class="fragment" -->
    - 개발을 잘못해서 나오는 오류는 제외
    - 로컬 개발 중에는 반드시 모든 오류 메세지를 출력 상태로 설정하자
- notice 에러도 에러다<!-- .element: class="fragment" -->
    - 모든 에러 메세지에는 이유가 있다
- 오류 메세지에 대한 로깅은 절대로 낭비가 아니다<!-- .element: class="fragment" -->
    - 오류는 언제나 예상하지 못한 곳에서 발생한다

---

## 변화에 집중

- 데이터가 변경되는 지점<!-- .element: class="fragment" -->
- 처리 시간이 변경되는 지점<!-- .element: class="fragment" -->
- 입력과 출력이 시작/종료되는 지점<!-- .element: class="fragment" -->
- 함수의 시작과 끝<!-- .element: class="fragment" -->
- 조건문의 시작과 끝<!-- .element: class="fragment" -->
- 다른 플랫폼 또는 다른 프로토콜과의 통신<!-- .element: class="fragment" -->

---

## 개발 친구

- 나와 비슷한, 또는 더 훌륭한 개발자를 조언자로 두는게 좋다<!-- .element: class="fragment" -->
- 내 생각은 진리가 아니다<!-- .element: class="fragment" -->
- 나는 반드시 실수를 한다<!-- .element: class="fragment" -->
- 자만이 에러를 낳는다<!-- .element: class="fragment" -->

---

## 다양한 플랫폼

- 개발환경은 점점 더 빠르게 진화하고 변화하고 있다<!-- .element: class="fragment" -->
- 데스크탑, 모바일, 맥, 리눅스, 웨어러블디바이스, 산업디바이스와 같은 디바이스만이 아닌 통신 프로토콜에서도 다양한 변화가 있다<!-- .element: class="fragment" -->
    - 여러 개발환경과 디바이스에서 통용될 수 있는 코드를 작성하자.
    - 지금까지 웹(http) 환경만 개발해봤다면, rtc, stream, udp, websocket 등 다양한 프로토콜을 시도해보길 바란다.

---

## 창의력까지는 무리라도, 스스로의 한계를 만들지는 말자.

- 한가지 랭귀지에 집착하지 말라<!-- .element: class="fragment" -->
    - php의 개발환경에 있다고, c를 쓰지 못할 것은 없다.
    - javascript를 사용한다고, python을 쓰지 못할 것도 없다.
    - 위의 예제는 실제로 되는걸 적어둔거다.

---

## &nbsp;

- 프레임웍과 라이브러리가 매일 수십개씩 출시되는 개발 춘추전국시대에 돌입해 있다.
    - 프레임웍과 라이브러리의 예제를 보고 그 예제에 있는 것 외에 생각할 수 없다면, 더 많은 프레임웍과 라이브러리를 경험해야 한다.
    - 당신이 보지 못하는 저 멀리 있는 것은 당신이 더 많은 것을 알게 되었을때 당신을 찾아온다.

---

## 마지막으로

- 어떤 개발자가 되고 싶은지는 가지각색일지라도, 개발을 잘 하고 싶은 마음은 모두 같을 것이라고 생각한다.
- 개발을 잘 하고 싶다면, 모든 일이 그렇듯 방법은 딱 하나 뿐이다.
- 관심, 노력, 연습이다.
- 개발은 머리로 하는 것이 아니다, 손으로 하는 것이다.

---

# 끝
