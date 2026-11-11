# Week3. 상호작용성 더하기 ①

> 이벤트/ State/ 렌더링과 커밋/ 스냅샷

Week2에서는 조건에 따라 골라 보여주고, 배열로 여러 개를 보여줬다면?  
이번에는 내가 버튼을 누른 순간부터 **화면이 바뀌기까지** 무슨 일이 생기는지 알아보자.

버튼 눌렀고요. setter도 불렀는데요.  
왜 바로 다음 줄의 값은 그대로이신지요~..?

## 학습 자료

- [이벤트에 응답하기](https://ko.react.dev/learn/responding-to-events)
- [State: 컴포넌트의 기억 저장소](https://ko.react.dev/learn/state-a-components-memory)
- [렌더링 그리고 커밋](https://ko.react.dev/learn/render-and-commit)
- [스냅샷으로서의 State](https://ko.react.dev/learn/state-as-a-snapshot)

---

## 1. 이벤트에 응답하기

### 버튼 눌렀을 때 할 일, 함수로 전달하자

클릭/ 입력/ 폼 제출처럼 사용자가 무언가 했을 때 실행할 함수를 **이벤트 핸들러**라고 한다.

```jsx
function ReviewButton() {
  function handleClick() {
    alert("Real:ly 동지의 PR에 리뷰하러 가자~");
  }

  return <button onClick={handleClick}>리뷰하러 G0G0</button>;
}
```

- `onClick={handleClick}` → 함수 전달. 클릭이 들어오면 React가 호출.
- `onClick={handleClick()}` → JSX를 계산하는 중에 바로 호출. 클릭까지 기다려주지 않으세요~
- `onClick={() => handleClick()}` → 화살표 함수 전달. 클릭하면 그 안에서 호출.

`onClick={() => handleReview("Week3")}`처럼 클릭할 때 인자를 넘길 수도 있음.

### 자식은 버튼을 그리고, 부모는 할 일을 정한다

```jsx
function ReviewButton({ onReview }) {
  return <button onClick={onReview}>리뷰하기</button>;
}

function StudyPage() {
  function handleReview() {
    alert("설레는 Week3 리뷰 시작 ..");
  }

  return <ReviewButton onReview={handleReview} />;
}
```

직접 만든 `ReviewButton`의 prop은 `onReview`처럼 **무슨 일을 하는지** 드러내는 이름으로 정할 수 있다.  
실제 `<button>`에 연결할 때는 React가 알아보는 `onClick`을 사용.

### 클릭 한 번인데 왜 둘 다 실행돼?

버튼을 감싼 부모에도 `onClick`이 있으면, 버튼 클릭이 부모까지 **버블링**해서 두 핸들러가 실행될 수 있다.

```jsx
<div onClick={() => console.log("스터디 카드 열기")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("북마크 추가");
    }}
  >
    북마크
  </button>
</div>
```

여기서 북마크를 누르면 `북마크 추가`만 찍힌다.  
`stopPropagation()`을 빼면 버튼 로그 다음에 카드 로그도 찍힘.

- `stopPropagation()`은 **이벤트가 다른 요소로 전파되는 것**을 막는다.
- `preventDefault()`는 **브라우저의 기본 동작**을 막는다.  
   ex? 폼의 `onSubmit`에서 호출하면 브라우저의 기본 제출을 취소할 수 있음.

참고로 `onClickCapture`를 쓰면 자식의 `onClick`보다 앞서 캡처 단계에서 이벤트를 받을 수 있다.  
그리고 React의 `onScroll`은 스크롤 이벤트를 붙인 요소에서만 동작한다.

### H황의 한 줄 정리

클릭해서 할 일은 `onClick={handleClick}`으로 넘겨두자.  
괄호 붙이면 렌더링할 때 이미 출근하십니다~!

---

## 2. State: 컴포넌트의 기억 저장소

### `let`으로 숫자 올렸는데 왜 화면은 그대로?

```jsx
function ReviewCounter() {
  let count = 0;

  function handleClick() {
    count += 1;
    console.log(count);
  }

  return <button onClick={handleClick}>리뷰 {count}개</button>;
}
```

버튼을 여러 번 누르면 콘솔에서는 `1`, `2`, `3`이 찍힐 수 있다.  
현재 핸들러가 같은 지역 변수를 계속 변경하기 때문.  
BUT, 버튼 글자는 여전히 `리뷰 0개`

1. 지역 변수를 바꿔도 React에 다시 렌더링해 달라는 요청이 가지 않는다.
2. 다른 이유로 컴포넌트가 다시 실행되면 `let count = 0`도 다시 실행된다.

값을 **다음 렌더링까지 기억**하고,  
값이 달라졌을 때 **다시 렌더링을 요청**하려면?  
`useState`를 쓰면 가능 !!

### `useState`가 주는 two가지

```jsx
import { useState } from "react";

export default function ReviewCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>리뷰 {count}개</button>;
}
```

- `count`는? **이번 렌더링**에 받은 값
- `setCount`는? **다음 렌더링에 사용할 값**을 React에 요청하는 함수
- `0`은 이 컴포넌트가 처음 나타났을 때 사용할 초기값

`useState`는 컴포넌트나 커스텀 Hook의 최상위에서 호출한다.  
조건문/ 반복문/ 이벤트 핸들러 안에 넣지 말기 PLZ.  
React는 호출 순서로 각각의 state를 찾기 때문에 매 렌더링에서 순서가 같아야 한다.

### 같은 컴포넌트를 두 번 그리면? 기억도 두 개

```jsx
function StudyPage() {
  return (
    <>
      <ReviewCounter />
      <ReviewCounter />
    </>
  );
}
```

위쪽 버튼을 눌러도 아래쪽 숫자는 그대로다.  
같은 `ReviewCounter` 함수를 써도,  
화면의 서로 다른 위치에 렌더링된 두 컴포넌트는 각자 state를 가진다.

실습 갤러리에서는 **현재 몇 번째 카드인지**는 `index`로 기억하고,  
**현재 카드가 무엇인지**는 매번 `studyCards[index]`로 구한다.  
이미 가지고 있는 값으로 계산할 수 있기때문에 카드까지 따로 저장할 필요가❌

### H황의 한 줄 정리

기억할 값은 state에 두고,  
이미 기억한 값으로 구할 수 있는 건 렌더링할 때 계산하자.

---

## 3. 렌더링 그리고 커밋

### 클릭에서 화면까지, 중간에 뭐가 있더라?

| 단계   | 하는 일                                    | 리뷰 버튼 예시                   |
| ------ | ------------------------------------------ | -------------------------------- |
| 트리거 | 첫 화면을 요청하거나 state 업데이트를 예약 | 클릭 핸들러가 `setCount(1)` 호출 |
| 렌더링 | React가 컴포넌트를 호출해 UI 결과를 계산   | `count`가 `1`인 JSX 계산         |
| 커밋   | 계산 결과를 바탕으로 필요한 DOM 변경 적용  | 버튼 텍스트가 `리뷰 1개`로 바뀜  |

브라우저는 커밋된 DOM을 바탕으로 화면을 그린다.  
React가 **어떤 UI가 필요한지 계산하는 일**과  
브라우저가 **픽셀을 그리는 일**까지 한 단어로 뭉뚱그리면 헷갈림 주의 !!

### 컴포넌트를 다시 불렀다고 DOM을 싹 갈아끼울까?

```jsx
function ReviewPanel({ count }) {
  return (
    <section>
      <p>리뷰 {count}개</p>
      <input placeholder="리뷰 초안" />
    </section>
  );
}
```

`count`만 바뀌어 다시 렌더링하면 `<p>` 안의 텍스트는 바뀐다.  
같은 위치에 유지된 `<input>` DOM은 재사용되므로 직접 입력해둔 초안도 남아있음.

**직접 확인해보자,응응**
**순서도 알려줄게,응응**

1. [State 실습](../../../practice/yurim/week3/02-state-a-components-memory/App.js)을 띄우고 `리뷰 초안`에 글을 쓴다.
2. DevTools의 Elements 탭에서 초안 입력창을 찾는다.
3. `다음`을 누르면 카드 제목과 번호가 바뀐다.  
   초안 입력창에 쓴 글은 그대로 남는지 확인~

Week2의 순수성 얘기도 여기서부터 연결됨.  
렌더링 중에는 같은 입력으로 같은 JSX를 계산하고, 클릭 때문에 실행할 동작은 이벤트 핸들러에 둔다.

### H황의 한 줄 정리

렌더링에서는 다음 UI를 계산하고,  
커밋에서는 필요한 DOM만 바꾼다.

---

## 4. 스냅샷으로서의 State

### setter를 불렀는데 왜 바로 다음 줄은 `0`이야?

```jsx
function handleClick() {
  console.log(count); // 0
  setCount(count + 1);
  console.log(count); // 0
}
```

`count`가 `0`인 렌더링에서 만들어진 `handleClick`은 **그 렌더링의 `count`**를 읽는다.  
setter가 `1`을 요청하더라도?  
이미 실행 중인 함수가 읽는 `count`는 `0`// 다음 렌더링에서 새 값 `1`

### +1 세 번 했으니 +3? 값을 직접 넣어보자

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

이번 렌더링의 `count`가 `0`이면, 세 줄 모두 `setCount(0 + 1)`
한 번 클릭하고 나면 `1`이 됨.  
**한 핸들러 안의 `count`가 줄마다 `0 → 1 → 2`로 변한다고 생각하면? 함정~**

이전 업데이트 결과를 이어 받아 `+3` 하는 방법은...  
Week4's State 업데이트 큐에서 이어서 보자,우리

### 타이머가 늦게 실행되면 최신 값을 볼까?

```jsx
function handleSend() {
  setTimeout(() => {
    alert(`${reviewer}에게 리뷰 요청🫪`);
  }, 3000);
}
```

리뷰어가 `HWANG`일 때 버튼을 누르고 3초 안에 `오늘의발표자,현영`으로 바꾸면?  
알림에는 `HWANG`이 나온다.  
WHY?  
타이머 콜백이 **버튼을 누른 렌더링의 `reviewer`**를 기억하고 있기 때문.

신호등 실습도 같은 원리.  
setter 뒤에서도 `walk`는 클릭 당시 값이라,  
알림에 보여줄 다음 상태는 `nextWalk`로 먼저 계산해두면 읽기 SOEASY

### H황의 한 줄 정리

이벤트 핸들러는 자기가 태어난 렌더링의 state를 읽는다.  
타이머가 늦게 와도 그 값 그대로.

---

## Hwang's SELF questions?

1. **`onClick={handleClick()}`을 쓰면 언제 실행돼?**  
   JSX를 계산하면서 호출된다. 클릭할 때 실행하려면 함수 자체를 넘긴다.

2. **`let count`도 콘솔에서는 올라가던데, 왜 state를 써?**  
   지역 변수 변경은 리렌더링을 요청하지 않고, 컴포넌트가 다시 호출되면 지역 변수도 새로 만들어진다.

3. **렌더링하면 무조건 DOM이 바뀌나?**  
   React는 다시 계산한 결과에서 실제로 달라진 부분을 커밋한다. 이전 결과와 같으면 해당 DOM을 그대로 유지할 수 있다.

4. **면접에서 `setState 직후에 왜 이전 값이 찍혀요?`라고 물으면?**  
   setter는 새 렌더링을 요청하고, 지금 실행 중인 핸들러는 자신이 만들어진 렌더링의 state 값을 읽기 때문이라고 답할 것 !!
   (나의리뷰어들께만TIP드린겁니다//아님)

## 실습 기록📤

- [Week3 챌린지 실습 모아보기](../../../practice/yurim/week3/README.md)
- 이벤트 핸들러 고치기/ 갤러리 완성하기/ 신호등 구현하기 총 3문제
- 렌더링과 커밋은 갤러리의 카드와 리뷰 초안 입력창을 비교하며 확인
