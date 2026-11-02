# Week2. UI 표현하기 ②

> 조건부 렌더링/ 리스트 렌더링/ 컴포넌트 순수성/ 트리로서의 UI

Week1에서 컴포넌트를 만들고 데이터를 전달했다면?  
이번에는 골라 보여주고/여러 개 보여주고/  
그 과정에서 지켜야 할 약속까즤~ 알아보자

컴포넌트? 만들었다고 끝이 아니었으세요~..

## 학습 자료

- [조건부 렌더링](https://ko.react.dev/learn/conditional-rendering)
- [리스트 렌더링](https://ko.react.dev/learn/rendering-lists)
- [컴포넌트를 순수하게 유지하기](https://ko.react.dev/learn/keeping-components-pure)
- [트리로서 UI 이해하기](https://ko.react.dev/learn/understanding-your-ui-as-a-tree)

---

## 1. 조건부 렌더링

### 보여줄까 말까? JavaScript로 결정

조건부 렌더링:
**조건에 따라 다른 JSX를 반환 OR 일부 JSX를 포함/제외하는 것**

React 전용 조건문이 따로 있는 것은 아님.  
익숙한 JavaScript의 `if`, 삼항 연산자, `&&`를 사용

### if: 반환할 UI 자체가 달라?

```jsx
function Submission({ isSubmitted }) {
  if (isSubmitted) {
    return <p>제출 완료~Hwang 오늘도 해냈다!</p>;
  }

  return <p>아직 미제출~Umm... 팀원들이 그대를 기다립니다?</p>;
}
```

### null: 이번에는 아무것도 안 보여줄게

```jsx
function Reminder({ isSubmitted }) {
  if (isSubmitted) {
    return null;
  }

  return <p>PLZ 과제 제출을 잊지 말어</p>;
}
```

`null`을 반환하면:
해당 컴포넌트는 화면에 표시할 내용을 반환하지 않음.  
부모에서 조건에 따라 컴포넌트를 포함하거나 제외 가능

### 삼항 연산자: 둘 중 하나, 골라골라

```jsx
function Submission({ isSubmitted }) {
  return <p>{isSubmitted ? "제출 complete" : "제출 notYET"}</p>;
}
```

주변 구조는 같고 내용만 다를 때 simple  
조건이 복잡해지면?  
변수나 `if`로 분리해도 됨.

짧다고 무조건 읽기 좋은 코드는 아니라는 사실 !!

### &&: 조건이 맞으면? 추가로 보여주자

```jsx
<p>쏘니&고니 {isReviewer && "(이번 주 나의 리뷰어들)"}</p>
```

조건이 맞으면?  
오른쪽 JSX를 포함한다.  
`false`, `null`, `undefined`는 자식 위치에서 화면에 표시되지 않는다.

**But, 숫자 0은 다르다.**

```jsx
// count가 0이면 숫자 0표시 가능
{
  count && <p>댓글 {count}개</p>;
}

// 비교식으로 boolean 만들어봄
{
  count > 0 && <p>댓글 {count}개</p>;
}
```

`&&`는 항상 boolean을 반환하는 연산자가 아니다.  
왼쪽이 `0`이면? 결과도 `0`  
React는 숫자 `0`을 렌더링

### H황의 한 줄 정리

**if는? 분기/ 삼항은? 선택/ &&는? 조건부 추가**  
복잡하면 JSX를 변수에 담아도 Okay~  
읽는 사람도 챙겨주자~

---

## 2. 리스트 렌더링

### 복붙하던 컴포넌트, 배열로 관리하자

비슷한 UI가 반복된다면  
달라지는 데이터를 배열에 담고 `map()`으로 JSX를 만든다.

```jsx
// 리얼리 가좍들 발표 힘내
const members = [
  { id: "yurim", name: "유림", isPresenter: false },
  { id: "yebin", name: "예빈", isPresenter: true },
  { id: "jiyeon", name: "지연", isPresenter: true },
];

function MemberList() {
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>{member.name}</li>
      ))}
    </ul>
  );
}
```

`map()`은 각 항목을 JSX로 변환한다.  
`filter()`는 조건에 맞는 항목을 추린다.

```jsx
const presenters = members.filter((member) => member.isPresenter);
```

### map 콜백의 return, 놓쳐서는 안돼

```jsx
// 소괄호: 표현식을 암시적으로 반환
members.map((member) => <li key={member.id}>{member.name}</li>);

// 중괄호: return을 직접 작성
members.map((member) => {
  return <li key={member.id}>{member.name}</li>;
});
```

### key: 순번표가 아니라.. like 항목's 신분증

삽입/삭제/정렬 후에도 항목을 대응시키는 식별자다.

- 같은 형제 목록 안에서 고유해야 함
- 렌더링할 때마다 바뀌면 안 됨
- 다른 목록에서는 같은 key를 사용해도 됨
- `key`는 일반 Prop으로 전달되지 않음
- ID가 필요하면? `memberId` 같은 Prop을 별도로 전달

인덱스는 순서가 바뀌면 다른 항목을 가리킬 수 있다.  
`Math.random()`은 매번 바뀌므로 재생성&입력 상태 손실을 유발할 수 있다.

데이터의 안정적인 ID를 사용하는게 맞다.

여러 요소를 묶어 반환한다면?  
짧은 `<>` 대신  
`<Fragment key={member.id}>`처럼 key를 지정하기로 약속해~

### H황의 한 줄 정리

**filter로 고르고/ map으로 바꾸고/ key로 구분하는거야~**

---

## 3. 컴포넌트를 순수하게 유지하자

### 순수함의 기준은? 두 가지

- **같은 입력**에는 **같은 결과**
- 렌더링 전에 존재하던 변수/객체를 **변경하지 않아요**~

```jsx
// 렌더링 중 외부 변수를 변경? 피해야 함
let count = 0;

function Member() {
  count += 1;
  return <p>{count}번 팀원</p>;
}
```

호출 횟수와 순서에 따라 결과가 달라진다.  
Props로 번호를 받아 계산하면? 이런 의존성을 없앨 수 있다.

### Props/ State/ Context? 읽기 전용

받은 데이터를 렌더링 중 직접 바꾸지 않아요~  
화면 변경은 State 업데이트 등 적절한 방식으로 처리한다.

**같은 JSX라는 말이 곧?**  
**같은 객체 참조를 반환하라는 뜻❌**  
**같은 입력으로 같은 UI결과를 계산⭕️**

### push 자체가 금지인 것은 아님주의

```jsx
function MemberList({ members }) {
  const items = [];

  for (const member of members) {
    items.push(<li key={member.id}>{member.name}</li>);
  }

  return <ul>{items}</ul>;
}
```

해당 렌더링 안에서 새로 만든 배열의 변경은 가능하다.  
반면 전달받은 `members`를 직접 변경하는 것은 다른 이야기~

### Strict Mode..그리고 사이드 이펙트

Strict Mode는 개발 중 컴포넌트 함수를 추가 호출해  
순수성 문제를 드러내는 데 도움을 준다.  
프로덕션에서 항상 두 번 실행된다는 뜻은 아님.

저장/요청/DOM 변경 같은 **사이드 이펙트**는 렌더링 중이 아닌  
이벤트 핸들러 등 적절한 위치에서 처리한다.  
Effect가 무조건 첫 해결책은 아니겠지

### H황의 한 줄 정리

**렌더링은 UI 계산. 외부 변경은 그 밖에서~**

---

## 4. 트리로서 UI 이해하자

### 화면 구조/ 파일 관계는 엄연히 다르다

React 앱을 트리로 보면  
[누가 누구 아래에 있는가?]를 파악하기 easy

| 구분   | 렌더 트리             | 모듈 의존성 트리        |
| ------ | --------------------- | ----------------------- |
| 노드   | 컴포넌트              | 파일·모듈               |
| 연결   | 렌더링상의 부모·자식  | Import 관계             |
| 관심사 | UI 구성과 데이터 흐름 | 코드 의존성과 번들 구성 |

### 렌더 트리

한 번 렌더링한 결과의 컴포넌트 관계다.  
루트에서 가지가 이어지고,  
자식 컴포넌트가 없는 노드는 리프다.

그니까..내말은..

조건에 따라 표시하는 컴포넌트가 달라지면  
렌더 트리도 달라질 수 있다.

이 장의 렌더 트리는 컴포넌트를 중심으로 표현하므로  
`div`, `section` 등을 포함하는 DOM 트리와 동일하지 않다.

### 모듈 의존성 트리

- 각 파일이 무엇을 Import하는지 보여줌.
- 컴포넌트뿐 아니라 데이터/유틸리티 모듈도 포함
- 번들러는 모듈 의존 관계를 분석해 빌드에 활용

### Import했으니 렌더링 부모다? Nope

Umm..  
`App`이 아래 JSX를 만든다고 해보자?

```jsx
<Card>
  <Profile />
</Card>
```

`Card`가 `children`을 반환하면  
렌더 트리에서 `Profile`은 `Card` 아래에 놓인다.

BUT, `Card`가 `Profile`을 Import할 필요는 없다.  
already `App`이 두 컴포넌트를 Import해서 조합할 수 있기 때문~

### H황의 한 줄 정리

**렌더 트리=화면의 관계/ 모듈 의존성 트리=코드의 관계**  
비슷해 보여도  
같은 족보는 **절대** 아니라는 거~

---

## Hwang's SELF questions?

- `null` 반환과 부모에서 컴포넌트를 제외하는 방식은 어떻게 표현할까?
- `0 && <Component />`에서 왜 0이 표시될까?
- map 콜백에서 중괄호를 쓰면 왜 return이 필요할까?
- key를 인덱스나 랜덤값으로 지정하면 어떤 문제가 생길까?
- key와 일반 Prop은 어떻게 다를까?
- 새로 만든 배열의 push와 Props 배열의 push는 왜 다를까?
- Strict Mode에서 문제가 드러났다면 무엇부터 확인할까?
- 내가 Import 관계와 렌더 트리가 다른 예시를 설명할 수 있을까?

## 실습 기록📤

챌린지 코드/ 풀이 해설은
[개인 실습 폴더](../../../practice/yurim/week2/)에 별도로 정리해두었으니 많관부
