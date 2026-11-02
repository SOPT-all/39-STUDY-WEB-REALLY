# Week1. UI 표현하기 ①

> 컴포넌트/ Import·Export/ JSX/ JSX에서 JavaScript 사용하기/ Props

## 학습 자료

- [첫 번째 컴포넌트](https://ko.react.dev/learn/your-first-component)
- [컴포넌트 Import 및 Export](https://ko.react.dev/learn/importing-and-exporting-components)
- [JSX로 마크업 작성하기](https://ko.react.dev/learn/writing-markup-with-jsx)
- [JSX에서 JavaScript 사용하기](https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces)
- [컴포넌트에 Props 전달하기](https://ko.react.dev/learn/passing-props-to-a-component)

---

## 1. 컴포넌트

### 컴포넌트란?

컴포넌트: **재사용 가능한 UI 단위**

작은 요소(ex버튼)~큰 영역(ex페이지)까지 컴포넌트로 표현 가능
작은 컴포넌트+작은 컴포넌트...= 더 큰 UI

함수 컴포넌트는 JavaScript 함수로 정의하며, 보통 JSX를 반환한다.

```jsx
function Welcome() {
  return <h1>Welcome to Real:ly!</h1>;
}

export default function App() {
  return (
    <main>
      <Welcome />
      <Welcome />
    </main>
  );
}
```

- `Welcome`은 컴포넌트를 정의하는 함수
- `<Welcome />`은 해당 컴포넌트를 사용하는 JSX
- 같은 컴포넌트를 여러 위치에서 사용 가능

### 컴포넌트 이름? start with 대문자

| 표현          | 의미                            |
| ------------- | ------------------------------- |
| `<section>`   | 기본 HTML 태그                  |
| `<Welcome />` | 직접 정의하거나 가져온 컴포넌트 |

JSX에서 소문자로 시작하는 태그 이름은 기본 태그 이름으로 취급된다.
사용자 self 정의 컴포넌트는 대문자로 시작해야 한다.

컴포넌트 이름과 파일명은 별개다. 파일명이 `welcome.jsx`여도
컴포넌트 이름은 `Welcome`으로 '다르게' 작성할 수 있다.

### 여러 줄의 JSX를 반환해보자

```jsx
return (
  <section>
    <h1>Real:ly</h1>
  </section>
);
```

`return` 다음 줄에 바로 JSX를 작성하면
JavaScript의 자동 세미콜론 삽입으로 의도한 값을 반환하지 못할 수 있다.
여러 줄로 작성할 때는 `return (`처럼 여는 괄호를 같은 줄에 두도록

### 컴포넌트 정의를 중첩하지 않아요~

부모 컴포넌트 안에서 자식 컴포넌트를 사용하는 것은 괜찮지만,
자식 컴포넌트 함수를 부모 함수 내부에서 정의하지는 않는다.

이게 무슨 말이냐고?

컴포넌트 정의는 **최상위**에 둔다.
중첩(N) 정의는 부모가 렌더링될 때마다 새로운 컴포넌트 함수를 만들어
State 보존 등에 문제를 일으킬 수 있다.

### H의 한 줄 정리🆙💅🏼

컴포넌트는 단순히 파일을 나누는 기준이 아닌,
**관련된 UI와 로직을 묶어 조합하는 단위**다.

---

## 2. Import·Export

### 컴포넌트를 파일로 분리하는 이유?

- 필요한 코드를 찾기 easy
- 다른 파일에서 재사용할 수 있다.
- 관련 코드끼리 관리하기 easy

단, 컴포넌트 하나당 파일 하나가 필수는 아니다.
밀접하게 관련된 여러 컴포넌트를 한 파일에 둘 수도 있다.

### Import/ Export

다른 파일에서 사용하려는 값은 `export`
사용할 파일에서는 `import`

둘 다 React 전용 기능 아니라,
**JavaScript의 모듈 문법**이다.

### Default Export/ Named Export

| 구분          | Default Export                      | Named Export                         |
| ------------- | ----------------------------------- | ------------------------------------ |
| 모듈당 개수   | 최대 1개                            | 여러 개 가능                         |
| 내보내기      | `export default function Card() {}` | `export function Card() {}`          |
| 가져오기      | `import Card from './card.jsx';`    | `import { Card } from './card.jsx';` |
| 가져오는 이름 | 다른 이름으로 지정 가능             | 내보낸 이름을 지정하거나 별칭 사용   |

```jsx
// card.jsx
export default function Card() {
  return <article>Card</article>;
}

export function CardTitle() {
  return <h2>Title</h2>;
}
```

```jsx
// app.jsx
import ProfileCard, { CardTitle as Title } from "./card.jsx";
```

- Default와 Named Export를 한 파일에서 함께 사용? 가능 !!
- Default로 내보낸 `Card`를 `ProfileCard`라는 이름으로 가져옴.
- Named로 내보낸 `CardTitle`은 `as`를 사용해 `Title`이라는 별칭을 붙임.
- Named Import의 중괄호는 구조 분해 할당 문법이 아님.

### 주의PLZ

- Export 방식과 Import 방식을 맞춰야 한다.
- 같은 파일에서만 사용하는 컴포넌트는 Export하지 않아도 된다.
- 루트 컴포넌트 파일이 항상 `App.jsx`인 것은 아니다.
- Import 경로의 확장자 생략 가능 여부는 프로젝트 도구와 설정에 따라 다르니 확인요망

---

## 3. JSX로 마크업 작성하기

### 그래서, JSX란?

JSX는 JavaScript 안에서 HTML과 비슷한 마크업을 작성하는 **문법 확장**이다.

**React**는 UI를 구성하는 **라이브러리**이고,
**JSX**는 UI를 표현할 때 사용할 수 있는 **문법**
둘은 서로 다른 개념이며, React를 사용한다고 JSX가 반드시 필요한 것은 아님.

### UI/ 로직을 함께 작성하는 이유

인터랙티브한 화면에서는 데이터와 로직이 표시할 내용을 결정한다.
컴포넌트는 관련된 화면 구조와 렌더링 로직을 함께 묶어 관리한다.
반대로 서로 관련이 없는 UI는 별도 컴포넌트로 분리 가능

### JSX 작성 규칙

| 규칙                          | 예시                                   |
| ----------------------------- | -------------------------------------- |
| 인접한 JSX 태그를 하나로 묶기 | `<div>...</div>`, `<>...</>`           |
| 모든 태그 닫기                | `<img />`, `<input />`, `<li>...</li>` |
| 대부분의 속성은 camelCase     | `className`, `onClick`, `strokeWidth`  |
| 일부 속성은 예외              | `aria-label`, `data-testid`            |

```jsx
function StudyInfo() {
  return (
    <>
      <h1 className="title">Real:ly</h1>
      <label htmlFor="nickname">닉네임</label>
      <input id="nickname" />
    </>
  );
}
```

### Fragment

`<>...</>`는 Fragment

여러 요소를 묶지만, 이를 감싸는 별도의 DOM 요소는 추가하지 않는다.
반면 `<div>`로 묶으면 실제 DOM에 `div` 요소가 생긴다.

### 인접한 태그를 묶어야 하는 이유

JSX는 변환 과정을 통해 JavaScript 값으로 표현된다.
함수에서 인접한 JSX 표현식을 그대로 나열해 반환할 수는 없으므로 하나의 표현식으로 묶는다.

이는 React 컴포넌트가 배열을 반환할 수 없다는 뜻은 아니다.

**Umm... 이게 무슨 말이냐고?**
JSX는 여러 태그를 나란히 반환할 수 없으므로,
여러 물건을 하나의 상자에 담듯 Fragment나 배열로 묶어서 반환해야 한다. 는 말이란다~

### JSX 내부 주석

```jsx
<section>
  {/* 스터디 이름 */}
  <h1>Real:ly</h1>
</section>
```

### 자주 하는 실수s

- 태그를 닫지 않는 경우
- 여러 태그를 묶지 않고 나열하는 경우
- 태그를 잘못 중첩(N)하는 경우
- HTML의 `class`를 `className`으로 바꾸지 않는 경우

---

## 4. JSX에서 JavaScript 사용해보자

### 따옴표/ 중괄호

따옴표는 문자열을 전달하고,
중괄호는 JavaScript 표현식을 사용한다.

```jsx
const name = 'Hwang';

<Member name="name" />
<Member name={name} />
<Member name="{name}" />
```

| 표현            | 전달하는 값           |
| --------------- | --------------------- |
| `name="name"`   | 문자열 `"name"`       |
| `name={name}`   | 변수의 값인 `"Hwang"` |
| `name="{name}"` | 문자열 `"{name}"`     |

뭔말알? 너무 쉽지요

### 중괄호를 사용하는 위치

- JSX 태그 사이의 내용
- 속성의 `=` 바로 뒤

```jsx
<h1>{name}</h1>
<img src={imageUrl} alt={name} />
```

태그 이름 자체를 `<{tag}>`처럼 중괄호로 작성할 수는 없으세요.

### 표현식/ 문장 구분하자

중괄호 안에는 값을 만들어내는 JavaScript 표현식을 넣는다.

```jsx
<p>{1 + 2}</p>
<p>{formatName(name)}</p>
<p>{isMember ? '스터디원' : '가족들'}</p>
```

`if`, `for`, `const` 선언문을 중괄호 안에 그대로 작성할 수는? 없다.
필요한 변수 선언이나 분기는 `return` 전에 작성할 수? 있다.

함수 호출도 가능하지만,
렌더링 중 외부 데이터를 변경하는 부수 효과를 발생시키지 않도록 주의요망

### 이중 중괄호, 너 대체 뭐니?

```jsx
<section style={{ backgroundColor: "pink", padding: 16 }}>Real:ly</section>
```

`{{ }}`는 별도의 특별한 문법이 아님.

- 바깥 중괄호: JavaScript 표현식을 넣는 JSX 문법
- 안쪽 중괄호: JavaScript 객체 리터럴

### 스타일 객체

인라인 스타일은 문자열이 아닌,
객체로 전달

- CSS 속성 이름은 `backgroundColor`처럼 camelCase로 작성
- 많은 길이 관련 속성의 숫자 값은 픽셀로 처리됨.
- 단위가 없는 속성도 있으므로 모든 숫자에 `px`이 붙는 것은 아님.
- 스타일 객체 대신 `className`으로 CSS를 연결해도 됨.

### 객체 전달/ 객체 출력은 달라달라

```jsx
<Member person={{ name: 'Hwang' }} />
<p>{person.name}</p>
```

객체를 Prop으로 전달하는 것은 가능
But, 일반 객체를 `<p>{person}</p>`처럼 그대로 렌더링하면 오류 발생 !!
화면에 표시하려면 객체에서 문자열이나 숫자 등 표시할 값을 선택 필수

---

## 5. 컴포넌트에 Props를 전달하자

### Props란?

Props는
부모 컴포넌트가 자식 컴포넌트에 전달하는 입력

문자열, 숫자, 객체, 배열, 함수, JSX 등 다양한 JavaScript 값을 전달할 수 있다.
같은 컴포넌트도 받은 Props에 따라 다른 내용을 표현할 수 있다.

```jsx
function Member({ name, week = 1 }) {
  return (
    <p>
      {name}: Week {week}
    </p>
  );
}

export default function App() {
  return <Member name="Hwang" week={2} />;
}
```

### Props를 받는 방법

```jsx
function Member(props) {
  return <p>{props.name}</p>;
}
```

구조 분해 할당을 사용하면
아래와 같이 작성

```jsx
function Member({ name }) {
  return <p>{name}</p>;
}
```

일반적인 Props는 각각의 위치 인수가 아닌
하나의 객체로 전달된다.

### Props 기본값

```jsx
function Member({ name, week = 1 }) {
  return (
    <p>
      {name}: Week {week}
    </p>
  );
}
```

| 전달한 값   | `week` 값 |
| ----------- | --------- |
| 생략        | `1`       |
| `undefined` | `1`       |
| `null`      | `null`    |
| `0`         | `0`       |

기본값은
Prop이 없거나,
`undefined`일 때 적용된다.

### 전개 구문으로 Props 전달하기

전개 구문(...)은 배열/ 객체에 담긴 값들을 펼쳐서
다른 배열·객체에 넣음 or 함수·컴포넌트에 전달하는 JavaScript 문법

(참고로 ...은 위치에 따라 나머지 매개변수 or 나머지 속성 문법으로도 사용됨.
모양은 같지만 역할은 다르니 주의~)

```jsx
function MemberWrapper(props) {
  return <Member {...props} />;
}
```

전달받은 Props를 다른 컴포넌트로 넘길 수 있다.
다만,
과도하게 사용하면 어떤 데이터가 전달되는지 파악하기 어려워질 수 있으므로
필요한 상황에 적절하게 사용할 것

### children

컴포넌트의 여는 태그와 닫는 태그 사이에 넣은 내용은
`children`으로 전달된다.

```jsx
function Card({ children }) {
  return <section className="card">{children}</section>;
}
```

```jsx
<Card>
  <h2>Real:ly</h2>
  <p>React 공식문서 스터디</p>
</Card>
```

`Card`는
내부 콘텐츠를 구체적으로 알지 않아도
공통 레이아웃을 제공할 수 있다.

### Props는 읽기 전용이다

자식 컴포넌트는 전달받은 Props를 직접 수정하지 않음.
Props로 전달된 객체나 배열도 마찬가지

단, 읽기 전용은 값이 영원히 바뀌지 않는다는 뜻❌
부모가 다른 값을 전달하면 자식은 다음 렌더링에서 새로운 Props를 받음

즉, 다음 두 개념을 구분 필수

- 부모로부터 받는 Props는 시간에 따라 달라질 수 있음.
- 자식은 전달받은 Props를 직접 변경하면 안 됨.

상호작용으로 데이터를 변경하는 방법은?
이후 State/ 이벤트 처리에서 학습해보지~

---

## Hwang's SELF questions?

- 컴포넌트 이름은 왜 대문자로 시작해야 할까?
- 컴포넌트 사용과 컴포넌트 중첩 정의는 어떻게 다를까?
- Default Export와 Named Export는 어떻게 구분할까?
- JSX와 HTML의 차이는 무엇일까?
- Fragment와 `div`는 어떤 차이가 있을까?
- JSX에서 따옴표와 중괄호는 각각 무엇을 의미할까?
- `style={{ ... }}`에서 두 중괄호의 역할은 무엇일까?
- 객체를 Prop으로 전달하는 것과 화면에 출력하는 것은 어떻게 다를까?
- Props 기본값은 언제 적용될까?
- `children`은 어떤 상황에서 유용할까?
- Props가 읽기 전용이라는 것과 변경되지 않는다는 것은 같은 뜻일까?

## 실습 기록📤

챌린지 코드/ 풀이 해설은
[개인 실습 폴더](../../../practice/yurim/week1/)에 별도로 정리해두었으니
많관부
