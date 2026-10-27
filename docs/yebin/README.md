# W1 - UI 표현하기 (1)

## 1. 첫 번째 컴포넌트

([첫 번째 컴포넌트](https://ko.react.dev/learn/your-first-component))

### 컴포넌트

컴포넌트란 **재사용 가능한 UI 요소**를 뜻함
HTML 태그와 마찬가지로 컴포넌트를 작성하고 순서를 지정/중첩하여 전체 페이지를 디자인할 수 있음
이미 작성한 컴포넌트를 재사용하여 화면 구성 가능 → 개발 속도 향상!
React 컴포넌트는 일반적으로 JavaScript 함수임

- 컴포넌트의 이름은 항상 대문자로 시작
- JSX 마크업을 반환

### 컴포넌트를 빌드

1. 컴포넌트 내보내기
   - `export default` 접두사 사용
2. 함수 정의하기
   - `function FunctionName() {}`
   - 함수 이름은 대문자로 시작해야 하며 그렇지 않을 경우 작동 X
3. 마크업 추가하기
   - 마크업이 모두 `return` 키워드와 같은 줄에 있지 않다면 `return (` 처럼 괄호로 묶고 여는 괄호를 같은 줄에 두기
   - 괄호가 없으면 `return` 뒷 줄에 있는 모든 코드가 무시됨

### 컴포넌트 중첩 및 구성

```jsx
export default function Gallery() {
  return (
    <section>
      <h1>리얼리 아자잣</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

위의 예시에서 `Profile` 컴포넌트는 `Gallery` 안에서 렌더링되기 때문에 `Gallery`는 각 `Profile`을 자식으로 렌더링하는 **부모 컴포넌트**라고 할 수 있음
`Profile`과 `Gallery`처럼 컴포넌트는 다른 컴포넌트를 렌더링할 수 있지만 **정의를 중첩해서는 안 됨**

```jsx
export default function Gallery() {
  // ❌ 컴포넌트 안에서 다른 컴포넌트 정의하면 안 됨!!
  function Profile() {
    // ...
  }
  // ...
}
```

컴포넌트 안에서 다른 컴포넌트를 정의하지 말고 **최상위 레벨**에서 컴포넌트 선언하기!!

## 2. 컴포넌트 import 및 export 하기

[컴포넌트 import 및 export 하기](https://ko.react.dev/learn/importing-and-exporting-components)

### 컴포넌트를 import & export 하는 방법

1. 컴포넌트를 추가할 JS 파일 **생성**
2. 새로 만든 파일에서 함수 컴포넌트를 **export**
3. 컴포넌트를 사용할 파일에서 **import**
   → 재사용성이 높아지고 관리하기 쉬움!

### Default & Named Exports

한 파일에서는 하나의 default export만 존재 가능, named export는 제한 X

| Syntax | Default                              | Named                                   |
| ------ | ------------------------------------ | --------------------------------------- |
| Export | `export default fuction Button() {}` | `export fuction Button() {}`            |
| Import | `import Button from './button.js';`  | `import { Button } from './button.js';` |

Default import를 사용하는 경우 원한다면 `import` 뒤에 다른 이름으로 지정해서 값을 가져올 수 있음
`import { Really } from './button.js'` 라고 작성해도 같은 default export 값을 가져옴
**Named** import를 사용할 때는 양쪽 파일에서 사용하고자 하는 값의 이름이 동일해야 됨

보편적으로 한 파일에서 하나의 컴포넌트만 export 할 때 default export 방식을 사용하고 여러 컴포넌트를 export 할 경우에는 name export 방식을 사용함

## 3. JSX로 마크업 작성하기

[JSX로 마크업 작성하기](https://ko.react.dev/learn/writing-markup-with-jsx)

### JSX

JSX: HTML과 비슷한 마크업을 작성할 수 있도록 JavaScript를 확장한 문법
웹은은 HTML(내용), CSS(디자인), JavaScript(로직)를 기반으로 만들어져 왔음
웹이 인터랙티브해지면서 로직이 내용을 결정하는 경우가 많아짐 → JavaScript가 HTML을 담당!

JSX와 React는 서로 다른 별개의 개념
함께 사용되기도 하지만 독립적으로 사용할 수도 있음
JSX는 확장된 문법이고 React는 JavaScript 라이브러리임

### JSX의 규칙

1. 하나의 루트 엘리먼트로 반환하기
   - 한 컴포넌트에서 여러 엘리먼트를 반환하려면 하나의 부모 태그로 감싸 주기 (`<>`, `</>`)
2. 모든 태그 닫기
   - JSX에서는 태그를 명시적으로 닫아야 함
3. 대부분 CamelCase로 작성
   - JavaScript는 변수명에 대시를 포함하거나 `class`같은 예약어를 사용할 수 없음
   - 그러나 `aria-*`와 `data-*`는 HTML과 동일하게 대시를 사용하여 작성

### Fragment

`<>`, `</>`처럼 빈 태그를 Fragment라고 함
Fragment는 브라우저상의 HTML 트리 구조에서 흔적을 남기지 않고 그룹화해 줌
JSX는 HTML처럼 보이지만 일반 JavaScript 객체로 변환되기 때문에 하나의 배열로 감싸지 않은 하나의 함수에서는 두 개의 객체를 반환할 수 없음
→ Fragment로 묶어 주기~~

## 4. 중괄호가 있는 JSX 안에서 자바스크립트 사용하기

[중괄호가 있는 JSX 안에서 자바스크립트 사용하기](https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces)

문자열 전달 → 따옴표
JavaScript 값 전달 → 중괄호 `{}`

```jsx
<img className="avatar" src={avatar} alt={description} />
```

중괄호를 사용하면 마크업에서 바로 JavaScript 사용 가능!

### 중괄호를 사용하는 곳

1. JSX 태그 안의 **문자**
   - ✅ `<h1>{name}’s To Do List</h1>`
   - ❌ `<{tag}>Yebin’s To Do List</{tag}>`
2. `=` 바로 뒤에 오는 **속성**
   - `src={avatar}` → `avatar` 변수 읽음
   - `src="{avatar}"` → `"{avatar}"` 문자열 전달

### 이중 중괄호 사용하기

JSX에는 문자열, 숫자, JS 표현식뿐만 아니라 객체도 전달 가능
객체는 `{ name: "Yebin" , age: 23 }`처럼 중괄호로 표시되기 때문에 JSX에서 객체를 전달하려면 중괄호 쌍으로 객체를 감싸야 함
JSX의 인라인 CSS 스타일에서도 이중 중괄호를 사용

```jsx
<ul style={{
  backgroundColor: 'black',
  color: 'pink'
}}>
```

`style` 속성에 객체 전달
→ 이중 중괄호는 특별한 문법이 아님!!!! 그냥 JSX 중괄호 안에 들어 있는 JavaScript 객체일 뿐임!!!!

## 5. 컴포넌트에 props 전달하기

[컴포넌트에 props 전달하기](https://ko.react.dev/learn/passing-props-to-a-component)

props란? 부모가 자식에게 전달하는 정보

### 컴포넌트에 props 전달하기

1. 자식 컴포넌트에 props 전달하기
   ```jsx
   export default function Profile() {
     return (
       <Avatar
         person={{ name: "Lin Lanying", imageId: "1bX5QH6" }}
         size={100}
       />
     );
   }
   ```
2. 자식 컴포넌트 내부에서 props 읽기
   ```jsx
   function Avatar({ person, size }) {
     // person과 size는 함수 내에서 사용 가능!
   }
   ```
   props를 사용하면 부모 컴포넌트와 자식 컴포넌트를 독립적으로 생각할 수 있음

props를 선언할 때 `()`안에 `{}` 잊지 말기! → **구조 분해 할당**

```jsx
function Avatar({ person, size }) {
  // ...
}
```

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### prop 기본값 지정하기

값이 지정되지 않았을 때 prop에 기본값을 주고 싶다면 변수 바로 뒤에 `=`과 기본값을 넣어 구조 분해 할당을 해 줄 수 있음!

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

→ `<Avatar person={...} />`가 `size` prop 없이 렌더링 되면 `size`는 `100`으로 설정됨
이 기본값은 size prop이 없거나 `size={undefined}`로 전달될 때 사용됨 그러나 `size={null}` 또는 `size={0}`으로 전달된다면 기본값은 사용되지 X

### JSX spread 문법으로 props 전달하기

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

spread 문법을 사용하면 모든 props의 이름을 나열하지 않고 컴포넌트로 전달
spread 문법은 제한적으로 사용하기!!

### children

JSX 태그 내에 콘텐츠를 중첩하면 부모 컴포넌트는 해당 콘텐츠를 `children`이라는 prop으로 받음

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

위 예시에서 `Card` 컴포넌트는 `<Avatar />`로 설정된 `children` prop을 받아 이를 래퍼 div에 렌더링함
`Card`는 내부에서 무엇이 렌더링되는지 알지 않아도 됨!

props는 “변경할 수 없다”는 의미의 **불변성**을 가지고 있음
컴포넌트가 props를 변경해야 하는 경우 부모 컴포넌트에 다른 props(새로운 객체)를 전달하도록 요청해야 함
그러면 기존의 props는 버려지고 자바스크립트 엔진은 기존 props가 차지했던 메모리를 회수함
props는 변경할 수 없기 때문에 상호작용이 필요한 경우에는 state를 설정해야 함!
